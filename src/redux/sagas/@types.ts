import { CardListType } from "../../utils/@globalTypes";

export type AllPostsResponse = {
  count: number;
  next: string;
  previous: string;
  results: CardListType;
};

export type SingUpUserResponse = {
  username: string;
  email: string;
  id: number;
};

export type SingInResponse = {
  access: string;
  refresh: string;
};
