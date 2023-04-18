export type CardType= {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  description: string;
  author: number;
}

export enum CardSize {
  Large,
  Medium,
  Small,
  Search,
}
export type CardListType = CardType[]

export enum ButtonType {
  Primary = "Primary",
  Secondary = "Secondary",
  Error = "Error",
}