import { inject, provide } from "vue";
import { ActiveMenuRulesType } from "../types";

const LayoutKey = "__charrue_layout_context_key__";

interface LayoutContext {
  absolute: boolean;
  logo: string;
  title: string;
  homeRoute: string | { name: string };
  activeMenuRules: ActiveMenuRulesType;
}

const defaultValue: LayoutContext = {
  absolute: false,
  logo: "",
  title: "",
  homeRoute: "/",
  activeMenuRules: {},
};
export const createProvider = (context: LayoutContext) => {
  provide(LayoutKey, context);
};

export const useProvider = () => {
  return inject(LayoutKey, defaultValue);
};
