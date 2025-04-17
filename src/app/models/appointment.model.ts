import { Moment } from 'moment';
import { User } from './user.model';

export interface Appointment {
  id: number;
  service: string;
  duration: number;
  startTime: Moment;
  comment?: string;
  user?: User;
  adminAdded: boolean;
}

export interface AppInterface extends Appointment {
  date?: string;
  time?: string;
}

export interface ScheduledAppointment extends Appointment {
  canBeCanceled: boolean;
  date: string;
  time: string;
}

