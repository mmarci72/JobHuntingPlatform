import { Position } from "./job.model";

export type Company = {
  id?: number;
  name: string;
  founded: Date;
  location: string;
  sizeMin: number;
  sizeMax: number;
  industryDomainName?: string;
  creationDate?: Date;
  positions: Position[];
  logoFileName: string;
};

export type CompanyWithLogo = { logo: string } & Company;

export const isCompanyWithLogo = (
  company: Company | CompanyWithLogo
): company is CompanyWithLogo => {
  return (company as CompanyWithLogo).logo !== undefined;
};
