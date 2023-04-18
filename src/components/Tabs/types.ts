export enum TabsNames {
  ALL,
  MYPOSTS,
  POPULAR,
  FAVOURITES,
}
export type TabsProps = {
tabsListArray: TabsType[];
activeTab: number;
onClick: (key: TabsNames)=>()=> void;
}
export type TabsType = {
  title: string;
  disabled: boolean;
  key: TabsNames,
}