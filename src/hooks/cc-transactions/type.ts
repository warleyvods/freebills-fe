export type CCTransaction = {
  id?: number;
  amount: number;
  date: string;
  description: string;
  categoryId: string;
  creditCardId: string;
  expirationDate?: string,
  createdAt?: string;
  updatedAt?: string;
}
