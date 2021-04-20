export interface TableModel {
  id: string;
  name: string;
  price: string;
  changes_1h: string;
  changes_24h: string;
  changes_7d: string;
  changes_30d: string;
  list: () => string[];
}
