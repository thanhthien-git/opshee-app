import { ROLE } from "@/enums/role.enum";

export interface IUserData {
  date_of_birth: Date;
  role: keyof typeof ROLE;
  user_address: string;
  user_create_at: Date;
  user_email: string;
  user_first_name: string;
  user_id: number;
  user_last_name: string;
  user_name: string;
  user_phone: string;
  user_update_at: Date;
}
