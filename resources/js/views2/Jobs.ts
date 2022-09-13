import wrapped from '../components/DefaultWrapper';
import Header from '../components/Header';
import TextFilter from '../components/TextFilter';
import SortFilter from '../components/SortFilter';
import CRUDButtons from '../components/CRUDButtons';
import API from '../API';
import swal from 'sweetalert2';
import { BFormCheckbox, BModal, BTable } from 'bootstrap-vue';
import EditJob from '../components/EditJob';
import Card from '../components/Card';
import Calendar from '../components/Calendar';
import { vif1 } from '../util';

export default {
   render(h) {
      const table = (h) => h('div', { class: 'row justify-content-center' }, [
         h('div', { class: 'col-md-10' }, [
            h(BTable, {
               props: {
                  striped: true,
                  hover: true,
                  items: this.items,
                  fields: this.fields,
                  'selcet-mode': this.selectMode,
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
         ]),
      ]);

      const cards = (h) => h('div', { class: 'cards' }, this.items.map(x => h(Card, {
         scopedSlots: {
            header: () => h('div', 'yooo'),
            default: () => h('div', 'brooooooooooooooo')
         }
      })))

      return wrapped(h, () => [
         h(Header, { props: { header: 'Εργασίες' }}),

         h('div', { class: 'col-md-10 sf' }, [
            h(TextFilter, {
               props: { value: this.filter },
               on: { input: x => this.filter = x },
            }),
            h(SortFilter, {
               props: {
                  value: this.sortBy,
                  direction: this.sortDirection,
                  options: this.sortOptions,
               },
               on: {
                  input: x => this.sortBy = x,
                  'update:direction': x => this.sortDirection = x
               },
            }),
         ]),

         h(CRUDButtons, {
            props: { query: 'Υλικά' },
            on: {
               add: this.NewEntry,
               edit: this.Selected_modal,
               delete: this.deleteCRUD,
               query: this.SelectedChildren,
            },
            scopedSlots: {
               default: () => h(BFormCheckbox,  {
                  props: { checked: this.cards },
                  on: { change: x => this.cards = x },
               }, ['Cards view'])
            },
         }),

         this.cards ? cards(h) : table(h),

         vif1(this.cards)(() => h(Calendar, {
            props: {
               data: [],
            }
         })),

         h(BModal, {
            id: 'modal-prevent-closing',
            ref: 'modal',
            props: { title: 'New Entry' },
            on: {
               show: this.resetModal,
               hidden: this.resetModal,
               ok: () => this.$refs.edit.submit(),
            },
            scopedSlots: {
               default: () => h(EditJob, {
                  ref: 'edit',
                  props: { value: this.temp_page_table },
                  on: {
                     input: x => {
                        this.temp_page_table = x;
                        this.handleSubmit();
                     },
                  },
               }),
            }
         }),
      ]);
   },

   data() {
      return {
         //parent table
         uniqueIds: [],
         addresses: [],
         appliances: [],
         job_lines: [],
         page_table: {},
         page_table_name: 'jobs',
         temp_page_table: {
            address_id: null,
            appliance_id: null,
            client_status: '',
            date: undefined,
            agreed_price: 0,
            is_completed: 0,
         },
         currentUser: {},
         token: localStorage.getItem('token'),
         errors: [],
         fields: [
            {
               key: 'id',
               label: 'ID',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'date',
               label: 'Ημερομηνία',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'customer_name',
               label: 'Ονομα',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'customer_surname',
               label: 'Επώνυμο',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'customer_telephone',
               label: 'Τηλέφωνο',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'client_status_format',
               label: 'Κατάσταση Πελάτ',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'materials_status',
               label: 'Κατάσταση Υλικώ',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'address_name',
               label: 'Διεύθυνση',
               sortable: true,
               sortDirection: 'desc',
            },
            {
               key: 'is_completed_format',
               label: 'Κατάσταση Εργασία',
               sortable: true,
               sortDirection: 'desc',
            },
         ],
         items: [],
         selected: [],
         //table options
         selectMode: 'single',
         sortBy: 'date',
         sortDirection: 'desc',
         filter: null,
         filterOn: [],
         //GET options
         cu: '',
         parent_id: 0,
         client_statuses: [
            { value: 'pending', text: 'Αναμονή Πελάτη' },
            { value: 'OK', text: 'Συμφωνία Πελάτη' },
         ],
         job_statuses: [
            { value: 0, text: 'Εκρεμμεί' },
            { value: 1, text: 'Ολοκληρωμένη' },
         ],
         api: null,
         /** toggling between cards and non-cards view */
         cards: false,
      };
   },

   computed: {
      sortOptions() {
         return this.fields
            .filter(f => f.sortable)
            .map(f => ({ text: f.label, value: f.key }));
      },

      sortDesc() {
         return this.sortDirection === 'desc';
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
      this.path_url = this.$route.path;
      const tokens = this.path_url.split('/').slice(1);
      this.path_url = '/'+tokens[0];
      console.log('param', this.path_url);
      this.init();
   },

   methods: {
      init() {
         this.getCRUD();
         this.getAddresses();
         this.getJobLines();
         this.getAppliances();
      },

      formatTableFields() {
         this.items.forEach(obj => {
            obj.is_completed_format = obj.is_completed === 1 ? 'Ολοκληρωμένη' : 'Εκρεμμεί';
            obj.client_status_format = obj.client_status=== 'OK' ? 'Συμφωνία Πελάτη' : 'Αναμονή Πελάτη';
         });
      },

      getAddresses() {
         this.api.Address.all()
            .then(data => {
               this.addresses = data;

               //address fullname creation
               this.addresses.forEach(address => {
                  address.fullname = address.name + ' ' + address.city;
               });

               //for each child add the name of the parent
               this.items.forEach(child => {
                  const parent = this.addresses.find(obj => {
                     return obj.id === child.address_id;
                  });
                  child.address_name = parent.name + ' ' + parent.city;
               });
            }).catch(console.log);
      },

      getAppliances() {
         this.api.Appliance.all()
            .then(data => {
               this.appliances = data;

               //custome fullname creation
               this.appliances.forEach(appliance => {
                  appliance.fullname = appliance.name + ' ' + appliance.model + ' ' + appliance.brand;
               });

               //for each child add the name of the parent
               this.items.forEach(child => {
                  const parent = this.appliances.find(obj => {
                     return obj.id === child.appliance_id;
                  });
                  child.appliance_name = parent.name + ' ' + parent.brand + ' ' + parent.model;
               });

               this.formatTableFields();
            }).catch(console.log);
      },

      getJobLines() {
         this.api.JobLine.all()
            .then(data => {
               this.job_lines = data;

               //for each child add the name of the parent
               this.items.forEach(job => {
                  const pending_jobs = this.job_lines.filter(job_line => {
                     return job_line.job_id === job.id && job_line.status === 'pending';
                  });
                  console.log(pending_jobs, pending_jobs.length === 0);
                  job.materials_status = pending_jobs.length === 0 ? 'OK' : 'Εκκρεμεί';
               });

               this.formatTableFields();
            }).catch(console.log);
      },

      getCRUD() {
         this.api.Job.all()
            .then((data) => {
               this.items = data;
               if (this.parent_id) {
                  console.log(this.items, 'inside filter');
                  this.items = this.items.filter(item => {
                     return item.address_id == this.parent_id;
                  });
               }
               this.formatTableFields();
            }).catch(console.log);
      },

      Selected_modal() {
         if (!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
         } else {
            this.cu = 'update';
            this.$refs.modal.show();
            this.temp_page_table = this.selected[0];
            console.log(this.selected[0], '<<<');
         }
      },

      SelectedChildren() {
         if (!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
         } else {
            this.$router.push('/job_lines/' + this.selected[0].id);
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
         this.api.Job.create(this.page_table)
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
         this.api.Job.update(this.selected[0].id, this.page_table)
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
            if (!result.isConfirmed) return;
            this.api.Job.delete(this.selected[0].id)
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

      handleSubmit() {
         this.page_table = this.temp_page_table;
         console.log('>><<>><<> from submit \n', this.page_table);
         if (this.cu == 'create')
            this.createCRUD();
         else if (this.cu == 'update')
            this.updateCRUD();
         // Hide the modal manually
         this.$nextTick(() => {
            this.$refs.modal.hide();
         });
         this.init();
      },
   },
};
