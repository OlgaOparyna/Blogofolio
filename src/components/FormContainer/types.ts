import { ReactNode } from "react";

export type FormContainerType = {
  title: string,
  children: ReactNode,
  textButton?: string,
  onButtonClick: ()=>void,
}