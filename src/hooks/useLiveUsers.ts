import { useOthers, useSelf } from "@liveblocks/react";

interface LiveUser {
  connectionId: number;
  name: string;
  avatar?: string;
  isCurrentUser: boolean;
}

const AVATAR_COLORS = [
  "#E53E3E", // Red
  "#DD6B20", // Orange
  "#38A169", // Green
  "#3182CE", // Blue
  "#805AD5", // Purple
  "#D53F8C", // Pink
  "#00B5D8", // Cyan
  "#F56500", // Orange variant
];

export const useLiveUsers = () => {
  const others = useOthers();
  const self = useSelf();

  // Get all connected users including self
  const liveUsers: LiveUser[] = [];

  // Add current user first
  if (self?.info) {
    liveUsers.push({
      connectionId: self.connectionId,
      name: self.info.name || "You",
      avatar: self.info.avatar,
      isCurrentUser: true,
    });
  }

  // Add other users
  others.forEach(({ connectionId, info }) => {
    if (info) {
      liveUsers.push({
        connectionId,
        name: info.name || "Anonymous",
        avatar: info.avatar,
        isCurrentUser: false,
      });
    }
  });

  const getAvatarColor = (connectionId: number) => {
    return AVATAR_COLORS[connectionId % AVATAR_COLORS.length];
  };

  return {
    liveUsers,
    getAvatarColor,
    connectedUsersCount: liveUsers.length,
  };
};
