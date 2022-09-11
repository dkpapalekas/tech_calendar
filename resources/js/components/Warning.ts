export default {
   props: [
      'text'
   ],

   render(h) {
      if (!this.text)
         return '';
      return h('p', { class: 'text-danger' }, this.text);
   }
};
