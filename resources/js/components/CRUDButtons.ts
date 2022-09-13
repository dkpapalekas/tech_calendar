import './CRUDButtons.css';
import { BButton } from 'bootstrap-vue';
import { vif1 } from '../util';

export default {
   props: {
      query: {
         required: false,
         default: undefined,
         type: String,
      },
   },

   render(h) {
      return h('div', { class: 'stickies' }, [
         h('div', { class: 'crud' }, [
            h(BButton, {
               props: {
                  variant: 'success',
               },
               on: { click: (x) => this.$emit('add', x) }
            }, '+'),

            h(BButton, {
               props: {
                  type: 'button',
               },
               on: { click: (x) => this.$emit('edit', x) },
            }, 'edit'),

            h(BButton, {
               class: 'btn btn-danger',
               type: 'button',
               on: { click: (x) => this.$emit('delete', x) },
            }, 'del'),
         ]),

         vif1(this.query)(() => h('div', { class: 'query' }, [
            h(BButton, {
               on: { click: (x) => this.$emit('query', x) }
            }, this.query)
         ])),

         this.$scopedSlots.default ? this.$scopedSlots.default() : '',
      ]);
   }
};
