export class StorageService {
  private static readonly TOKEN_KEY = "token";

  static getToken(): string | null {
    return (
      localStorage.getItem(StorageService.TOKEN_KEY) ||
      sessionStorage.getItem(StorageService.TOKEN_KEY) ||
      null
    );
  }
  static setToken(token: string, isRemember = true): void {
    isRemember
      ? localStorage.setItem(StorageService.TOKEN_KEY, token)
      : sessionStorage.setItem(StorageService.TOKEN_KEY, token);
  }

  static clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  static clearAndRedirect() {
    StorageService.clear();
    window.location.href = "/login";
  }
}
