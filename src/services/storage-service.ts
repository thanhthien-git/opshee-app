import { config } from "@/constants/config";
import { IJwtPayload } from "@/interfaces/token-payload.interface";
import { verify, decode, JwtPayload } from "jsonwebtoken";

export class StorageService {
  private static readonly TOKEN_KEY = "token";
  private static readonly SECRET_KEY = config.secretKey;

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem(StorageService.TOKEN_KEY) ||
        sessionStorage.getItem(StorageService.TOKEN_KEY) ||
        null
      );
    }
    return null;
  }
  static setToken(token: string, isRemember = true): void {
    isRemember
      ? localStorage.setItem(StorageService.TOKEN_KEY, token)
      : sessionStorage.setItem(StorageService.TOKEN_KEY, token);
  }

  static verifyToken(): IJwtPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded = decode(token) as IJwtPayload;
    if (Date.now() >= decoded.exp * 1000) {
      return null;
    }
    return decoded;
  }

  static clear(): void {
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  static clearAndRedirect(route = "/login"): void {
    StorageService.clear();
    window.location.href = route;
  }
}
