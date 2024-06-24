import { ReactNode } from "react";

export type TableColumn = {
  link?: {
    url?: string;
    component?: (id: number, name: string) => Element | JSX.Element
  },
  tag?: {
    animation?: boolean;
    trueLabel: string;
    falseLabel: string;
  }
  name: {
    name: string,
    fontWeight?: string;
    function?: (data: any) => any;
  };
  align: "start" | "center" | "end";
  label: string;
};

export type ButtonOptions = {
  active: boolean;
  editIsModal: {
    active: boolean;
    component?: (object?: any) => Element | JSX.Element | ReactNode
  };
  isMenu?: {
    active?: boolean;
    component?: (object?: any) => Element | JSX.Element | ReactNode
  }
  deleteButton: boolean;
}

export type CustomButton = {
  editPath: string;
  titleDelete: string;
  descriptionDelete: string;
  buttonTextDelete: string;
  deleteVariant: string;
}

export interface Options {
  value: string;
  label: string;
  active?: boolean
}

export type TableHeadProps = {
  buttonOptions: Options[]
  menuOptions: Options[]
  onActiveButton?: (active: string) => void;
  onKeyword?: (keyword: string) => void;
  onSort?: (sort: string) => void;
  activeSearch: boolean;
}
