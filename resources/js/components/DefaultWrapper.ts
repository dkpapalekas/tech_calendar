import './DefaultWrapper.css'
import { VNode } from "vue"

const component = {
   render(h) {
      return h('div', { class: 'container default-wrapper' }, [
         h('div', { class: 'row justify-content-center' }, this.$scopedSlots.default())
      ])
   }
}

export default (h, f: () => string | VNode | Array<string|VNode>) => h(component, {
   scopedSlots: {
      default: f
   }
});
