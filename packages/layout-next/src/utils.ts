export const cleanPath = (path: string) => {
  return path.replace(/\/\//g, "/");
};

const HttpReg =
  // eslint-disable-next-line no-useless-escape
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string) {
  return HttpReg.test(path);
}

export function urlToList(url: string) {
  const segments = url.split("/").filter((i) => i);
  return segments.map((_, index) => `/${segments.slice(0, index + 1).join("/")}`);
}

export const warn = (msg: string, ...args: any[]) => {
  console.warn(`[charrue-layout]${msg}`, ...args);
};
