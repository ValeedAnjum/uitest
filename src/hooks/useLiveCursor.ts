import { useMyPresence, useOthers } from "@liveblocks/react";
import { useCallback, useEffect, useRef } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CURSOR_COLORS = [
  "#E53E3E", // Red
  "#DD6B20", // Orange
  "#38A169", // Green
  "#3182CE", // Blue
  "#805AD5", // Purple
  "#D53F8C", // Pink
  "#00B5D8", // Cyan
  "#DD6B20", // Orange
];

// Throttle interval for cursor updates
// 30fps = ~33ms (reduces network calls from 60+/sec to 30/sec)
// Can be adjusted based on performance needs: 16ms = 60fps, 50ms = 20fps
const CURSOR_THROTTLE_MS = 33;

/**
 * Hook for managing live cursor functionality with throttled updates
 *
 * Performance optimizations:
 * - Throttles cursor position updates to 30fps (33ms intervals)
 * - Reduces Liveblocks network calls by ~50%
 * - Always sends the most recent cursor position when throttle period expires
 * - Immediately updates cursor on pointer leave for better UX
 * - Cleans up pending timeouts on unmount to prevent memory leaks
 */
export const useLiveCursor = () => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // Refs for throttling cursor updates
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestCursorRef = useRef<CursorPosition | null>(null);

  // Cleanup pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
        throttleTimeoutRef.current = null;
      }
    };
  }, []);

  // Throttled cursor update function - reduces network overhead
  const throttledUpdateCursor = useCallback(
    (cursor: CursorPosition | null) => {
      // Store the latest cursor position
      latestCursorRef.current = cursor;

      // If there's already a pending update, just return (we'll use the latest position)
      if (throttleTimeoutRef.current) return;

      // Schedule the update with throttling
      throttleTimeoutRef.current = setTimeout(() => {
        updateMyPresence({
          cursor: latestCursorRef.current
            ? {
                x: latestCursorRef.current.x,
                y: latestCursorRef.current.y,
              }
            : null,
        });
        throttleTimeoutRef.current = null;
      }, CURSOR_THROTTLE_MS);
    },
    [updateMyPresence]
  );

  // Immediate cursor update for critical actions (no throttling)
  const updateCursor = useCallback(
    (cursor: CursorPosition | null) => {
      updateMyPresence({
        cursor: cursor ? { x: cursor.x, y: cursor.y } : null,
      });
    },
    [updateMyPresence]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      throttledUpdateCursor({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    [throttledUpdateCursor]
  );

  const onPointerLeave = useCallback(() => {
    // Clear any pending throttled updates
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
      throttleTimeoutRef.current = null;
    }

    // Immediately update cursor to null when leaving (better UX)
    updateCursor(null);
  }, [updateCursor]);

  // Get other users' cursors with their information
  const othersCursors = others
    .map(({ connectionId, presence, info }) => {
      const cursor = presence?.cursor as CursorPosition | null | undefined;
      if (!cursor || !info) return null;

      return {
        connectionId,
        x: cursor.x,
        y: cursor.y,
        name: info.name || "Anonymous",
        avatar: info.avatar,
        color: CURSOR_COLORS[connectionId % CURSOR_COLORS.length],
      };
    })
    .filter(Boolean);

  return {
    onPointerMove,
    onPointerLeave,
    othersCursors,
    myPresence,
  };
};
