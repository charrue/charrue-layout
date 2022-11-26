export interface LayoutMenuItem {
  title: string;
  path?: string;
  name?: string;
  icon?: string;
  children?: LayoutMenuItem[];
}

export interface LayoutMenuItemVO extends Required<LayoutMenuItem> {
  pathStack: string[];
}

export type ActiveMenuRulesType = Record<string, string | { name: string }>;
