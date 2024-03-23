import { Position } from "./job.model";

export type Application = {
  id: number;
  position: Position;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  resumePath: string;
  applicationDate: Date;
};
