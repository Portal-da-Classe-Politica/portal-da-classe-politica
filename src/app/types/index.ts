export interface Filter {
  title: string;
  key: string;
  type: string;
  values: { label: string; value: any }[];
}
