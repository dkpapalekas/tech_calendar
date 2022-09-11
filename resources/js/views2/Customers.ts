import { BModal, BTable } from 'bootstrap-vue';
import swal from 'sweetalert2';
import API from '../API';
import EditCustomer from '../components/EditCustomer';
import TextFilter from '../components/TextFilter';
import SortFilter from '../components/SortFilter';
import CRUDButtons from '../components/CRUDButtons';
import Header from '../components/Header';
import wrapped from '../components/DefaultWrapper';

export default {
   render(h) {
      return wrapped(h, () => [
         // header
         h(Header, { props: { header: 'Πελάτες' }}),

         // filters
         h('div', { class: 'col-md-10 sf'}, [
            h(TextFilter, {
               props: { value: this.filter },
               on: { input: x => this.filter = x },
            }),
            h(SortFilter, {
               props: {
                  value: this.sortBy,
                  options: this.sortOptions,
               },
               on: { input: x => this.sortBy = x },
            }),
         ]),

         h(CRUDButtons, {
            props: { query: 'Διευθ.' },
            on: {
               add: this.NewEntry,
               edit: this.Selected_modal,
               delete: this.deleteCRUD,
               query: this.SelectedChildren,
            }
         }),

         h('div', { class: 'justify-content-center' }, [
            h('div', { class: 'col-md-10' }, [
               h(BTable, {
                  props: {
                     items: this.items,
                     fields: this.fields,
                     'select-mode': this.selectMode,
                     filter: this.filter,
                     'filter-included-fields': this.filterOn,
                     'sort-by.sync': this.sortBy,
                     'sort-desc.sync': this.sortDesc,
                     'sort-direction': this.sortDirection,
                     'label-sort-asc': '',
                     'label-sort-desc': '',
                     'label-sort-clear': '',
                     responsive: true,
                     stacked: 'md',
                     selectable: true,
                  },
                  ref: 'selectableTable',
                  on: {
                     'row-selected': this.onRowSelected,
                     filtered: this.onFiltered,
                  },
               }),
            ])
         ]),

         h(BModal, {
            ref: 'modal',
            title: 'New Entry',

            on: {
               show: this.resetModal,
               hidden: this.resetModal,
               ok: this.handleOk,
            },
            scopedSlots: {
               default: () => h(EditCustomer, {
                  props: { value: this.temp_page_table },
                  on: { input: x => this.temp_page_table = x }
               }),
            },
         }),
      ]);
   },

   data() {
      return {
         //parent table
         companies: [],
         page_table: {},
         temp_page_table: {
            company_id: null,
            name: '',
            surname: '',
            telephone: '',
            remarks: '',
         },
         currentUser: {},
         token: localStorage.getItem('token'),
         errors: [],
         fields: [
            { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
            { key: 'name', label: 'Ονομα', sortable: true, sortDirection: 'desc' },
            { key: 'surname', label: 'Επώνυμο', sortable: true, sortDirection: 'desc' },
            { key: 'telephone', label: 'Τηλέφωνο', sortable: true, sortDirection: 'desc' },
            { key: 'remarks', label: 'Σχόλια', sortable: true, sortDirection: 'desc' },
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
         this.getCRUD();
         this.getCompanies();
      },

      getCompanies() {
         this.api.Company.all()
            .then(data => {
               this.companies = data;
               this.companies.unshift({ id: null, name: '' });

               //for each child add the name of the parent
               this.items.forEach(child => {
                  const parent = this.companies.find(obj => {
                     return obj.id === child.company_id;
                  });
                  child.company_name = parent.name;
               });
            }).catch(console.log);
      },

      getCRUD() {
         if (this.parent_id) {
            this.items = [];
            this.api.Company.customers(this.parent_id)
               .then((data) => this.items = data)
               .catch(console.log);
         } else {
            this.items = [];
            this.api.Customer.all()
               .then((data) => this.items = data)
               .catch(console.log);
         }
      },

      Selected_modal() {
         if(!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
         } else {
            this.cu = 'update';
            this.$refs.modal.show();
            this.temp_page_table = this.selected[0];
         }
      },

      SelectedChildren() {
         if(!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
         } else {
            this.$router.push('/addresses/' + this.selected[0].id);
         }
      },

      NewEntry() {
         Object.keys(this.temp_page_table).forEach(key => {
            this.temp_page_table[key] = null;
         });
         this.cu = 'create';
         this.$refs.modal.show();
      },

      createCRUD() {
         this.api.Customer.create(this.page_table)
            .then(() => this.init())
            .catch((errors) => {
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
            .then(() => this.init())
            .catch((errors) => {
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
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then((result) => {
            if (!result.isConfirmed) return;
            this.api.Customer.delete(this.selected[0].id)
               .then(() => this.init())
               .catch((errors) => {
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
         this.totalRows = filteredItems.length;
         // this.currentPage = 1
      },

      onRowSelected(items) {
         this.selected = items;
         if (this.selected.length) {
            console.log(this.selected);
            console.log(this.selected[0].id);
         }
      },

      clearSelected() {
         this.$refs.selectableTable.clearSelected();
      },

      resetModal() {
         this.name = '';
         this.nameState = null;
      },

      handleOk(bvModalEvent) {
         // Prevent modal from closing
         bvModalEvent.preventDefault();
         // Trigger submit handler
         this.handleSubmit();
         console.log('>><<>><<> from ok \n', this.page_table);
      },

      handleSubmit() {
         // Exit when the form isn't valid
         if (!this.value) {
            this.init();
            return;
         } else {
            this.page_table = this.temp_page_table;
            console.log('>><<>><<> from submit \n', this.page_table);
            if(this.cu == 'create') {
               this.createCRUD();
            } else if(this.cu == 'update') {
               this.updateCRUD();
            }
         }
         // Hide the modal manually
         this.$nextTick(() => {
            this.$refs.modal.hide();
         });
         this.init();
      },
   },
};
