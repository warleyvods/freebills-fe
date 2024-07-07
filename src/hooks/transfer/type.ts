export type Transfer = {
  id?: number;
  amount: number,
  toAccountId: string,
  fromAccountId: string,
  date: string;
  observation?: string,
}
