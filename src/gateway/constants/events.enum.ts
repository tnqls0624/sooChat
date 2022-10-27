export const EVENT = {
  JOIN_ROOM: "joinRoom",
} as const;

export type EVENT = typeof EVENT[keyof typeof EVENT];
