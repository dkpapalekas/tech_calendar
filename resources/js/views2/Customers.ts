import './Customers.css';

import { BButton, BFormGroup, BFormInput, BFormSelect, BInputGroup, BTable } from 'bootstrap-vue';

import swal from 'sweetalert2';
import API from '../API';

const header = (h) => h('div', { class: 'col-md-10 title '}, [
   h('h5', { class: 'text-center' }, 'Πελάτες')
]);

const filters = (h, self) => h('div', { class: 'col-md-10 sf'}, [
   text_filter(h, self),
   sort_filter(h, self),
]);

const text_filter = (h, self) => h(BFormGroup, {
   class: 'mb-0',
   props: {
      label: 'Φίλτρο',
      'label-for': 'filter-input',
      'label-cols-sm': 3,
      'label-align-sm': 'right',
      'label-size': 'sm',
   },
   scopedSlots: {
      default: () => h(BInputGroup, {
         class: 'filter-class',
         props: { size: 'sm' },
         scopedSlots: {
            default: () => h(BFormInput, {
               props: {
                  type: 'search',
                  placeholder: 'Type to Search',
               },
               id: 'filter-input',
               value: self.filter,
               on: { value: x => self.filter = x },
            })
         }
      })
   }
});

const sort_filter = (h, self) => h(BFormGroup, {
   props: {
      label: 'Ταξινόμηση',
      'label-for': 'sort-by-select',
      'label-cols-sm': 3,
      'label-align-sm': 'right',
      'label-size': 'sm',
   },
   class: 'mb-0',
   scopedSlots: {
      default: () => h(BInputGroup, {
         props: { size: 'sm', },
         scopedSlots: {
            default: () => h(BFormSelect, {
               props: {
                  options: self.sortOptions,
                  value: self.sortBy,
               },
               on: { value: x => self.sortBy = x },
               class: 'w-75',
            })
         },
      })
   }
});

const crud_options = (h, self) => h('div', { class: 'stickies' }, [
   h('div', { class: 'crud' }, [
      h(BButton, {
         props: {
            variant: 'success',
            'v-b-modal.modal-prevent-closing': true,
         },
         on: { click: self.NewEntry }
      }, '+'),

      h(BButton, {
         props: {
            type: 'button',
         },
         on: { click: self.Selected_modal },
      }, 'edit'),

   ]),

   h('div', { class: 'query' }, [
      h(BButton, {
         on: { click: self.SelectedChildren }
      }, 'Διευθ.')
   ])
]);

const table = (h, self) => h(BTable, {
   props: {
      items: self.items,
      fields: self.fields,
      'select-mode': self.selectMode,
      filter: self.filter,
      'filter-included-fields': self.filterOn,
      'sort-by.sync': self.sortBy,
      'sort-desc.sync': self.sortDesc,
      'sort-direction': self.sortDirection,
      'label-sort-asc': '',
      'label-sort-desc': '',
      'label-sort-clear': '',
      responsive: true,
      stacked: 'md',
      selectable: true,
   },
   ref: 'selectableTable',
   on: {
      'row-selected': self.onRowSelected,
      filtered: self.onFiltered,
   },
   scopedSlots: {
      cell: (...xs) => console.log('!!!!!!!!!!!!!!!', xs) // TODO
   },
});

const modal = (h, self) => 'yoooooooooo'; // TODO

export default {
   render(h) {
      return h('div', { class: 'container customers' }, [
         h('div', { class: 'row justify-content-center' }, [
            header(h),
            filters(h, this),
            crud_options(h, this),
            h('div', { class: 'justify-content-center' }, [
               h('div', { class: 'col-md-10' }, [
                  table(h, this),
               ])
            ]),

            modal(h, this),
         ])
      ])
   },

   data() {
      return {
         //parent table
         companies: [],
         page_table: {},
         temp_page_table: {
            company_id: null,
            name: "",
            surname: "",
            telephone: "",
            remarks: "",
         },
         modal_state: {
            nameState: null,
            surnameState: null,
            telephoneState: null,
            remarksState: null,
         },
         currentUser: {},
         token: localStorage.getItem('token'),
         errors: [],
         fields: [
            {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc', },
            {key: 'name', label: 'Ονομα', sortable: true, sortDirection: 'desc', },
            {key: 'surname', label: 'Επώνυμο', sortable: true, sortDirection: 'desc', },
            {key: 'telephone', label: 'Τηλέφωνο', sortable: true, sortDirection: 'desc', },
            {key: 'remarks', label: 'Σχόλια', sortable: true, sortDirection: 'desc', },
            // {key: 'company_name', label: 'Εταιρεια', sortable: true, sortDirection: 'desc', },
         ],
         items: [],
         selected: [],
         //table options
         selectMode: 'single',
         sortBy: '',
         sortDesc: false,
         sortDirection: 'asc',
         filter: null,
         filterOn: [],
         //GET options
         cu: '',
         parent_id: 0,
         api: null,
      };
  },

  computed: {
      sortOptions() {
         // Create an options list from our fields
         return this.fields
            .filter(f => f.sortable)
            .map(f => ({ text: f.label, value: f.key }));
      },

      headers() {
         return {
            Authorization: `Bearer ${this.token}`
         };
      },
   },

   mounted() {
      if(!this.token)
          swal.fire(
            'Access Denied!',
            'Log in to see information',
            'error'
         );
      this.api = API(this.token);
      this.parent_id = this.$route.params.id;
      console.log('param', this.parent_id);
      this.init();
  },

  methods: {
      init() {
         this.getCRUD()
         this.getCompanies()
      },

      getCompanies() {
         this.api.Company.all()
            .then(data => {
               this.companies = data;
               this.companies.unshift({ id: null, name: "" })

               //for each child add the name of the parent
               this.items.forEach(child => {
                  var parent = this.companies.find(obj => {
                     return obj.id === child.company_id
                  })
                  child.company_name = parent.name;
               });
            }).catch((errors) => {
               console.log(errors);
            });
      },

      getCRUD() {
         if (this.parent_id) {
            this.items = []
            this.api.Company.customers(this.parent_id)
               .then((data) => this.items = data)
               .catch((errors) => {
                  console.log(errors)
               });
         } else {
            this.items = []
            this.api.Customer.all()
               .then((data) => this.items = data)
               .catch((errors) => {
                  console.log(errors)
               });
         }
      },

      Selected_modal() {
         if(!this.selected[0]) {
            swal.fire(
            'First Select entry',
            'No entry Has been selected',
            'error'
            )
         } else {
            this.cu = 'update'
            this.$bvModal.show('modal-prevent-closing')
            this.temp_page_table = this.selected[0];
         }
      },

      SelectedChildren() {
         if(!this.selected[0]) {
            swal.fire(
            'First Select entry',
            'No entry Has been selected',
            'error'
            )
         } else {
            this.$router.push('/addresses/' + this.selected[0].id)
         }
      },

      NewEntry() {
         Object.keys(this.temp_page_table).forEach(key => {
            this.temp_page_table[key] = null;
         })
         this.cu = 'create'
      },

      createCRUD() {
         this.api.Customer.create(this.page_table)
            .then((response) => {
               this.init();
            }).catch((errors) => {
               console.log(errors);
               this.errors.push(errors);
               swal.fire(
                  'Adding new - error!',
                  'something went wrong',
                  'error'
               );
            });
      },

      updateCRUD() {
         this.api.Customer.update(this.selected[0].id, this.page_table)
            .then((response) => {
               this.init();
            }).catch((errors) => {
               console.log(errors);
               this.errors.push(errors);
               swal.fire(
                  'Updating - error!',
                  'something went wrong',
                  'error'
               );
            });
      },

      deleteCRUD() {
         if(!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
            return;
         }
         swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         })
         .then((result) => {
            if (!result.isConfirmed) return;
            this.api.Customer.delete(this.selected[0].id)
               .then((response) => {
                  this.init();
               }).catch((errors) => {
                  console.log(errors);
                  this.errors.push(errors);
                  swal.fire(
                     'error!',
                     'You have added children for this entry',
                     'error'
                  );
               });
               swal.fire(
                  'Deleted!',
                  'Your record has been deleted.',
                  'success'
               );
            });
      },

      onFiltered(filteredItems) {
         // Trigger pagination to update the number of buttons/pages due to filtering
         this.totalRows = filteredItems.length
         // this.currentPage = 1
      },

      onRowSelected(items) {
         this.selected = items
         if (this.selected.length) {
            console.log(this.selected)
            console.log(this.selected[0].id)
         }
      },

      clearSelected() {
         this.$refs.selectableTable.clearSelected()
      },

      checkFormValidity() {
         const valid = this.$refs.form.checkValidity()
         this.modal_state.nameState = valid
         this.modal_state.surnameState = valid
         this.modal_state.telephoneState = valid
         this.modal_state.remarksState = valid
         return valid
      },

      resetModal() {
         this.name = ''
         this.nameState = null
      },

      handleOk(bvModalEvent) {
         // Prevent modal from closing
         bvModalEvent.preventDefault()
         // Trigger submit handler
         this.handleSubmit()
         console.log('>><<>><<> from ok \n', this.page_table)
      },

      handleSubmit() {
         // Exit when the form isn't valid
         if (!this.checkFormValidity()) {
            this.init()
            return
         } else {
            this.page_table = this.temp_page_table;
            console.log('>><<>><<> from submit \n', this.page_table)
            if(this.cu == 'create'){
               this.createCRUD();
            } else if(this.cu == 'update'){
               this.updateCRUD();
            }
         }
         // Hide the modal manually
         this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
         })
         this.init()
      },
   },
};
