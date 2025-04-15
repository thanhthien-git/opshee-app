import { endpoint } from "@/constants/endpoint";
import api from "../api";
import { ILogin } from "./interfaces/login.interface";

export class AuthService {
  static async login(data: ILogin) {
    try {
      const response = await api.post(endpoint.auth.login, data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
}
