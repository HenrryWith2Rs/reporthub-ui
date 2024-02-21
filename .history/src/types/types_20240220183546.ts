import { ReactNode } from 'react';

export type Props = {
  children?: ReactNode;
};

export type User = {
  sub: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
};

export type AuthContextType = {
  user: User | null;
  setUser: (newState: User | null) => void;
  // logUserIn: (newState: User) => void;
  // logUserOut: () => void;
};

// types.ts
export type BotType = 'appointment' | 'billing';
export type ReportType = 'detailed' | 'summary';
export type FormatType = 'pdf' | 'json' | 'html';
export type ViewType = 'html' | 'graph' | 'table';

export type RequestParameters = {
  bot: BotType;
  reportType: ReportType;
  format: FormatType;
  dateStart: string | Date;
  dateEnd: string | Date;
};

export type HandlerProps = {
  apiResponse: any;
  bot: BotType;
  reportType: ReportType;
  date: string;
};

export type ResultSetItem = {
  Cell_Percentage: number;
  Cell_Result: string;
  Description: string;
  Order: number;
  Percentage: string | number;
  Result: number;
  Tags: string;
};

export type reportApiResponse = {
  date: string;
  resultSet: ResultSetItem[];
};
