import { CustomFile } from './dropzone';

export interface IChatTitle {
  title?: string;
  subTitle?: string;
}

export interface IMessage {
  id?: string | number;
  file?: CustomFile | null;
  ticketId?: string | number;
  text?: string;
  reply?: number;
  fileToken?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: TicketProfile;
  replyId?: string | number | null;
}

export interface ITicket {
  id?: string | number;
  ticketId?: string | number;
  file?: CustomFile | null;
  assignUser?: TicketProfile;
  createdBy?: TicketProfile;
  title?: string;
  text?: string;
  status?: string | string[];
  createdAt?: string;
  updatedAt?: string;
  priority?: any | null;
  priorityId?: string | number;
  department?: any | null;
  departmentId?: string | number;
}

export interface ITickets {
  items: ITicket[];
  total: number;
  offset?: number | string;
  limit?: number | string;
}

export interface History {
  messages: IMessage[];
  ticket: ITicket;
}

export interface TicketProfile {
  id: number;
  externalId: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  status: string;
  mobile: string;
  nationalCode: string;
}
