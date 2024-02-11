import { Company, CompanyWithLogo } from "./company.model";

export type Position = {
  positionId: number;
  positionName: string;
  startDate: Date;
  roleName: string;
  seniorityName: string;
  salaryMin: number;
  salaryMax: number;
  postDate: Date;
  companyId: number;
  company?: Company | CompanyWithLogo;
  requirementsDescription: string;
  offerDescription: string;
  responsibilitiesDescription: string;
  language: string;
};
