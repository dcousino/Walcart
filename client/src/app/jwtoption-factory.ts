import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment';
export class JWTOptionFactory {
  constructor() {}
  getOptions() {
    const authService = new AuthService();
    return {
      tokenGetter: () => {
        const token = authService.getToken();
        if (token) return authService.getToken();
        else return '';
      },
      whitelistedDomains: environment.whitelist
    };
  }
}
