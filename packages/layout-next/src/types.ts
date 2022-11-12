export interface LayoutMenuItem {
  title: string;
  /**
   * route path
   */
  path?: string;
  /**
   * route name
   */
  name?: string;
  icon?: string;
  children?: LayoutMenuItem[];
}

export interface LayoutMenuItemVO extends Required<LayoutMenuItem> {
  pathStack: string[];
}

export type ActiveMenuRulesType = Record<string, string | { name: string }>;
