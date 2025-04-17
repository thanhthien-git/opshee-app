import { ROLE } from "@/enums/role.enum";

export interface ILogin {
  username: string;
  password: string;
  role: keyof typeof ROLE;
}

export interface IUserRegister {
  userName: string;
  userPhone: string;
  userPassword: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  dayOfBirth: Date;
  role: keyof typeof ROLE;
}
