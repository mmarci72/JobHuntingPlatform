import { Company, CompanyWithLogo } from "./company.model";
import { PaginatedModel } from "./paginated.model";

export type Position = {
  positionId?: number;
  positionName: string;
  startDate?: Date;
  roleName: string;
  seniorityName: string;
  salaryMin: number;
  salaryMax: number;
  postDate?: Date;
  companyId: number;
  company?: Company | CompanyWithLogo;
  requirementsDescription: string;
  positionDescription: string;
  responsibilitiesDescription: string;
  technologies: string[];
  languages: string[];
};

export type PaginatedPosition = PaginatedModel<Position>;

export const comparePositions = (position1: Position, position2: Position) => {
  if (!position1.postDate || !position2.postDate) {
    return 0;
  }

  if (position1.postDate.getTime() === position2.postDate.getTime()) {
    return position1.positionName.localeCompare(position2.positionName);
  }

  return position2.postDate.getTime() - position1.postDate.getTime();
};
