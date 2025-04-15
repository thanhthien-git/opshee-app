import { ROLE } from "@/enums/role.enum";

export interface ILogin {
  username: string;
  password: string;
  role: keyof typeof ROLE;
}
