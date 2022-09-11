export default {
   render(h) {
      return h('div', {
         class: 'card',
      }, [
         h('div', { class: 'card-header' }, this.$scopedSlots.header()),
         h('div', { class: 'card-body' }, this.$scopedSlots.default()),
      ]);
   }
};
