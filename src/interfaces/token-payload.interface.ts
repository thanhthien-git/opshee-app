import { ROLE } from "@/enums/role.enum";
import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload extends JwtPayload {
  userId: number;
  role: keyof typeof ROLE;
}
