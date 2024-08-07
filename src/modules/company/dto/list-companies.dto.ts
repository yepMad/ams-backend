export class ListCompaniesDto {
  categoryId?: string;

  page?: number;

  perPage?: number;

  order?: 'asc' | 'desc';
}
