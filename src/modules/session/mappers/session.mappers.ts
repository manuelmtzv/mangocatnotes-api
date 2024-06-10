import { SessionDataWithPassport } from '../interfaces/SessionDataWithPassport';

export function sessionDataToActiveSession(
  sessionData: SessionDataWithPassport,
) {
  return {
    id: sessionData.id,
    userId: sessionData.passport.user.id,
    expiresAt: sessionData.cookie.expires,
  };
}
