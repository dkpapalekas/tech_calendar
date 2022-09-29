import { VNode } from 'vue';

export const slot = (f: () => VNode|string|Array<VNode|string>, rest: Record<string, () => VNode|string|Array<VNode|string>> = {}) => ({
   default: f,
   ...rest,
});

export const vif = (q: boolean) => (node: string | VNode) => q ? node : '';

export const vif1 = (q: boolean) => (node: () => string | VNode) => q ? node() : '';

export const zeroes = (x: number, n=2) => x.toString().padStart(n, '0');

export const date_format = (x: Date): string|undefined =>
   // @ts-ignore
   isNaN(x)
      ? undefined
      : `${x.getFullYear()}-${zeroes(x.getMonth()+1)}-${zeroes(x.getDate())} ${zeroes(x.getHours())}:${zeroes(x.getMinutes())}:${zeroes(x.getSeconds())}`;
