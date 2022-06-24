import Vue from "vue";

declare class BaseComponent extends Vue {
  static install(vue: typeof Vue): void;
}

declare class ContentView extends BaseComponent {
  contentStyle?: Record<string, string | number>;
}

declare class GlobalHeader extends BaseComponent {
  opened?: boolean;
}

declare class GlobalAside extends BaseComponent {
  collapsed?: boolean;
  data: RegisterMenuData[];
  logo?: string;
  title?: string;
  Authorized?: (...args: any[]) => boolean;
  checkMenuDisabled?: (...args: any[]) => boolean;
  menuTitleRender?: (...args: any[]) => boolean;
  menuHeaderExtraRender?: (...args: any[]) => boolean;
  menuTextClass?: any;
  routeParams?: Record<string, any>;
  sidebarWidths?: [string, string];
}

declare class Layout extends GlobalAside {
  fixedHeader?: boolean;
  collapsed?: boolean;
}

declare interface RegisterMenuData {
  title: string;
  path: string;
  icon?: string;
  hide?: boolean;
  query?: Record<string, any>;
  params: Record<string, any>;
  redirect?: string;
  children?: RegisterMenuData[];
  target?: string;
  subMenuProps?: Record<string, any>;
  authority?: (...args: any[]) => boolean;
}
