import { VNode } from 'vue';

export const slot = (f: () => VNode|string|Array<VNode|string>, rest: Record<string, () => VNode|string|Array<VNode|string>> = {}) => ({
   default: f,
   ...rest,
});

export const vif = (q: boolean) => (node: string | VNode) => q ? node : '';

export const vif1 = (q: boolean) => (node: () => string | VNode) => q ? node() : '';
