import { User } from "./type";

export const mockUsers: User[] = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
];

export function getMockUsers(): User[] {
  return mockUsers;
}
