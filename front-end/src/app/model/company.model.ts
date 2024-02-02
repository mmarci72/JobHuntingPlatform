import { Position } from "./job.model";

export type Company = {
  id: number;
  name: string;
  description: string;
  founded: Date;
  location: string;
  sizeMin: number;
  sizeMax: number;
  industryDomain: string;
  creationDate: Date;
  positions: Position[];
};
