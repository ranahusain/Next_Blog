export interface IUser {
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // optional backend sets default
  createdAt?: Date; // optional when sending to backend
}
