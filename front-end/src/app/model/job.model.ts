import { Company } from "./company.model";

export type Position = {
  positionId: number;
  positionName: string;
  startDate: Date;
  roleName: string;
  seniorityName: string;
  salaryMin: number;
  salaryMax: number;
  postDate: Date;
  company: Company;
  requirementsDescription: string;
  offerDescription: string;
  responsibilitiesDescription: string;
  language: string;
};
