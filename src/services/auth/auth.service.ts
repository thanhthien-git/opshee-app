import { endpoint } from "@/constants/endpoint";
import api from "../api";
import { ILogin, IUserRegister } from "./interfaces/auth.interface";

export class AuthService {
  static async login(data: ILogin) {
    try {
      const response = await api.post(endpoint.auth.login, data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async register(data: IUserRegister) {
    try {
      const response = await api.post(endpoint.auth.register, data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
