import { endpoint } from "@/constants/endpoint";
import api from "../api";
import { IUserData } from "@/interfaces/user-data.interface";

export class UserService {
  static async getCurrentUser(): Promise<IUserData> {
    try {
      const response = await api.get(endpoint.user.me);
      return response.data as IUserData;
    } catch (err) {
      throw new Error(err);
    }
  }
}
