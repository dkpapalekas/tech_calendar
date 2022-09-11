export default {
   props: [
      'for',
      'label',
   ],

   render(h) {
      return h('div', { class: 'form-group' }, [
         h('label', { for: this.for }, this.label),
         ...this.$scopedSlots.default()
      ]);
   }
};
