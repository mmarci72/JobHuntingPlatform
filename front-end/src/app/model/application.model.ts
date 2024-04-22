export type Application = {
  id?: number;
  positionId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  applicationDate?: Date;
  approved: boolean;
  reviewed: boolean;
};
