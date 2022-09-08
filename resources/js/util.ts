import { VNode } from 'vue'

export const slot = (f: () => VNode|string|Array<VNode|string>, rest: Record<string, () => VNode|string|Array<VNode|string>> = {}) => ({
   default: f,
   ...rest,
})
