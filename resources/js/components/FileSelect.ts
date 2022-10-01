import './FileSelect.css';
import API from '../API';

export default {
   props: ['value'],

   data() {
      return {
         file: null,
         files: [],
         api: null,
      };
   },

   async created() {
      this.api = API();
      this.files = await this.api.File.all();
      console.log(this.files);
   },

   methods: {
      async fileSelected(x) {
         this.api.File.create(x.target.files[0]);
         this.files = await this.api.File.all();
      },

      imageClicked(x) {
         this.$emit('input', x);
      },
   },

   render(h) {
      return h('div', { class: 'file-select' }, [
         h('input', {
            class: 'uploader',
            domProps: {
               type: 'file',
               value: this.file,
               accept: 'image/png, image/jpeg',
            },
            on: {
               change: this.fileSelected,
            },
         }),

         h('div', { class: 'files' }, this.files.map(x => h('div', {
            class: this.value === x ? 'selected' : '',
         }, [
            h('img', {
               domProps: {
                  src: `/${x}`,
                  loading: 'lazy',
                  width: '192',
                  height: '192',
               },
               on: {
                  click: () => this.imageClicked(x),
               }
            }),
         ]))),
      ]);
   },
};
