import { DeviceMetadata } from '@/shared/interfaces/DeviceMetadata';
import { SessionData } from 'express-session';

export interface SessionDataWithPassport extends SessionData {
  id: string;
  passport: {
    user: {
      id: string;
    };
  };
  deviceMetadata?: DeviceMetadata;
}
