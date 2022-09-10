export default {
   props: [
      'header',
   ],

   render(h) {
      return h('div', { class: 'col-md-10 title '}, [
         h('h5', { class: 'text-center' }, this.header),
      ]);
   }
}
