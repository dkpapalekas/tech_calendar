import { BModal, BTable } from 'bootstrap-vue';
import CRUDButtons from '../components/CRUDButtons';
import wrapped from '../components/DefaultWrapper';
import EditAddress from '../components/EditAddress';
import Header from '../components/Header';
import SortFilter from '../components/SortFilter';
import TextFilter from '../components/TextFilter';
import API from '../API';
import swal from 'sweetalert2';

export default {
   render(h) {
      return wrapped(h, () => [
         h(Header, { props: { header: 'Διευθύνσεις' }}),

         h('div', { class: 'col-md-10 sf' }, [
            h(TextFilter, {
               props: { value: this.filter },
               on: { input: x => this.filter = x },
            }),
            h(SortFilter, {
               props: {
                  value: this.sortBy,
                  options: this.sortOptions,
               }
            }),
         ]),

         h(CRUDButtons, {
            props: { query: 'Εργασίες' },
            on: {
               add: this.NewEntry,
               edit: this.Selected_modal,
               delete: this.deleteCRUD,
               query: this.SelectedChildren,
            },
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
                     ref: 'selectableTable',
                     selectable: true,
                  },
                  on: {
                     'row-selected': this.onRowSelected,
                     filtered: this.onFiltered,
                  },
               })
            ])
         ]),

         h(BModal, {
            ref: 'modal',
            title: 'New Entry',
            on: {
               show: this.resetModal,
               hidden: this.resetModal,
               ok: () => this.$refs.edit.submit(),
            },
            scopedSlots: {
               default: () => h(EditAddress, {
                  ref: 'edit',
                  props: { value: this.temp_page_table },
                  on: {
                     input: x => {
                        this.temp_page_table = x;
                        this.handleSubmit();
                     },
                  },
               })
            }
         })
      ]);
   },

   data() {
      return {
         //parent table
         page_table: {},
         temp_page_table: {
            customer_id: null,
            name: '',
            number: '',
            city: '',
            floor: '',
            remarks: '',
         },
         currentUser: {},
         errors: [],
         fields: [
            { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
            { key: 'name', label: 'Οδός', sortable: true, sortDirection: 'desc' },
            { key: 'number', label: 'Αριθμός', sortable: true, sortDirection: 'desc' },
            { key: 'city', label: 'Πόλη', sortable: true, sortDirection: 'desc' },
            { key: 'floor', label: 'Οροφος', sortable: true, sortDirection: 'desc' },
            { key: 'remarks', label: 'Σχόλια', sortable: true, sortDirection: 'desc' },
            { key: 'customer_name', label: 'Πελάτης', sortable: true, sortDirection: 'desc' },
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
      };
   },

   computed: {
      sortOptions() {
         // Create an options list from our fields
         return this.fields
            .filter(f => f.sortable)
            .map(f => ({ text: f.label, value: f.key }));
      },
   },

   mounted() {
      this.api = API();
      this.parent_id = this.$route.params.id;
      console.log('param', this.parent_id);
      this.init();
   },

   methods: {
      init() {
         this.getCRUD();
         this.getCustomers();
      },

      getCustomers() {
         this.api.Customer.all()
            .then(data => {
               this.customers = data;
               //customer fullname creation
               this.customers.forEach(customer => {
                  customer.fullname = customer.name + ' ' + customer.surname;
               });

               //for each child add the name of the parent
               this.items.forEach(child => {
                  const parent = this.customers.find(obj => {
                     return obj.id === child.customer_id;
                  });
                  child.customer_name = parent.name + ' ' + parent.surname;
               });
            }).catch(console.log);
      },

      getCRUD() {
         if (this.parent_id)
            this.api.Customer.addresses(this.parent_id)
               .then(x => this.items = x)
               .catch(console.log);
         else
            this.api.Address.all()
               .then(x => this.items = x)
               .catch(console.log);
      },

      Selected_modal() {
         if(!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
            return;
         }
         this.cu = 'update';
         this.$refs.modal.show();
         this.temp_page_table = this.selected[0];
      },

      SelectedChildren() {
         if(!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
            return;
         }
         this.$router.push('/jobs/' + this.selected[0].id);
      },

      NewEntry() {
         Object.keys(this.temp_page_table).forEach(key => {
            this.temp_page_table[key] = null;
         });
         if (this.parent_id) this.temp_page_table.customer_id = this.parent_id;
         this.cu = 'create';
         this.$refs.modal.show();
      },

      createCRUD() {
         this.api.Address.create(this.page_table)
            .then(() => this.init())
            .catch(errors => {
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
         this.api.Address.update(this.selected[0].id, this.page_table)
            .then(() => this.init())
            .catch(errors => {
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
            if (!result.isConfirmed)
               return;
            this.api.Address.delete(this.selected[0].id)
               .then(() => this.init())
               .catch(errors => {
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

      handleSubmit() {
         // Exit when the form isn't valid
         this.page_table = this.temp_page_table;
         console.log('>><<>><<> from submit \n', this.page_table);
         if(this.cu == 'create') {
            this.createCRUD();
         } else if(this.cu == 'update') {
            this.updateCRUD();
         }
         // Hide the modal manually
         this.$nextTick(() => this.$refs.modal.hide());
         this.init();
      }
   }
};
