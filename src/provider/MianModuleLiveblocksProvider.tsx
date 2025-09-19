"use client";

import { useAuth } from "@/contexts/AuthContext";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface SafetyScopeProviderProps {
  children: ReactNode;
}

export function SafetyScopeMianModuleProvider({
  children,
}: SafetyScopeProviderProps) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { user } = useAuth();
  // Only provide Liveblocks context if we have a project ID
  if (!projectId) {
    return <>{children}</>;
  }

  const roomId = `safety-scope-${projectId}`;

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            userInfo: {
              id: user?.uid || "", // In real app, get from auth context
              name: user?.displayName || "", // In real app, get from auth context
              email: user?.email || "", // In real app, get from auth context
              avatar: user?.photoURL || "", // In real app, get from auth context
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }

        const result = await response.json();
        return result;
      }}
      resolveUsers={async ({ userIds }) => {
        const response = await fetch("/api/liveblocks-resolve-users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        });

        if (!response.ok) {
          throw new Error("Failed to resolve users");
        }

        const users = await response.json();
        return users;
      }}
    >
      <RoomProvider
        id={roomId}
        initialStorage={() => ({
          nodes: [
            {
              id: "1",
              type: "primaryBasicNode",
              position: { x: 0, y: 0 },
              data: { label: "Primary Node", moduleId: "001" },
              deletable: false,
            },
          ],
          edges: [],
        })}
      >
        {children}
      </RoomProvider>
    </LiveblocksProvider>
  );
}
