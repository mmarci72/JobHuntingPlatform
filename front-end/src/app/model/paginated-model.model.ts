export type PaginatedModel<ModelType> = {
  entities: ModelType[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
};
