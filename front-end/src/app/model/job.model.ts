import { Company } from "./company.model";

export type Position = {
  id: number;
  name: string;
  startDate: Date;
  role: string;
  seniority: string;
  salaryMin: number;
  salaryMax: number;
  postDate: Date;
  company: Company;
  requirementsDescription: string;
  offerDescription: string;
  responsibilitiesDescription: string;
  language: string;
};
