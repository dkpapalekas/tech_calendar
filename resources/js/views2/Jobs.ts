import './Jobs.css';
import wrapped from '../components/DefaultWrapper';
import Header from '../components/Header';
import TextFilter from '../components/TextFilter';
import SortFilter from '../components/SortFilter';
import CRUDButtons from '../components/CRUDButtons';
import API from '../API';
import swal from 'sweetalert2';
import { BFormCheckbox, BModal, BTable } from 'bootstrap-vue';
import EditJob, { Methods as EditJobMethods } from '../components/EditJob';
import Card from '../components/Card';
import Calendar from '../components/Calendar';
import { date_format, days_between, vif1 } from '../util';
import { JobWithExtra } from '../API/Job';
import type { Data } from '../components/Calendar';
import { next_frame } from 'fpts/promise';

interface Refs {
   modal: {
      show: () => void;
      hide: () => void;
   };
   edit: EditJobMethods;
}

interface Methods {
   startDrag: (event: DragEventInit, item: JobWithExtra) => void;
   onDrop: (x: [DragEvent, Date]) => void;
   init: () => void;
   formatTableFields: () => void;
   getAddresses: () => void;
   getAppliances: () => void;
   getJobLines: () => void;
   getCRUD: () => void;
   showEditModal: () => void;
   SelectedChildren: () => void;
   NewEntry: () => void;
   createJob: () => void;
   updateJob: () => void;
   deleteJob: () => void;
   onFiltered: (filteredItems: JobWithExtra[]) => void;
   onRowSelected: (items: JobWithExtra[]) => void;
   resetModal: () => void;
   handleSubmit: () => void;
   jobFromId: (id: number) => JobWithExtra;
   api: ReturnType<typeof API>;
   calendar_item_hovered: (e: MouseEvent, id: string) => void;
   calendar_item_unhovered: (e: MouseEvent) => void;
}

interface This extends Methods {
   temp_page_table: JobWithExtra;
   items: JobWithExtra[];
   cards: boolean;
   sortDirection: 'asc'|'desc';
   sortDesc: boolean;
   selectMode: 'single';
   fields: Array<{
      key: keyof JobWithExtra;
      label: string;
      sortable: boolean;
      sortDirection: 'asc'|'desc';
   }>;
   filter: null | 'string';
   sortBy: keyof JobWithExtra;
   calendarItems: Array<{
      id: number;
      date: Date;
      duration: number;
   }>;
   filterOn: [];
   sortOptions: Array<{
      text: string;
      value: keyof JobWithExtra;
   }>;
   errors: any[];
   preview: boolean;
   preview_position: { left: number; top: number };
   preview_job: JobWithExtra;
   $refs: Refs;
}

export default {
   render(this: This, h) {
      const has_cards = vif1(this.cards);
      const has_table = vif1(!this.cards);
      const table = () => h('div', { class: 'row justify-content-center' }, [
         h('div', { class: 'col-md-10' }, [
            h(BTable, {
               props: {
                  striped: true,
                  hover: true,
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
         ]),
      ]);

      const cards = () => h('div', {
         class: 'cards flex wrap g3 m-3 start'
      }, this.items
         .filter(x => x.is_completed === 0 && !x.date)
         .map(x => h(Card, {
            class: 'pointer',
            domProps: {
               draggable: true,
            },
            nativeOn: {
               dragstart: (e: DragEventInit) => this.startDrag(e, x),
            },
            scopedSlots: {
               header: () => h('div', x.date || 'χωρίς ημ/νία'),
               default: () => h('div', `${x.customer_name} ${x.customer_surname}`)
            }
         })));

      const children = [
         has_table(() => h(Header, { props: { header: 'Εργασίες' }})),

         has_table(() => h('div', { class: 'col-md-10 sf' }, [
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
         ])),

         has_table(() => h(CRUDButtons, {
            props: { query: 'Υλικά' },
            on: {
               add: this.NewEntry,
               edit: this.showEditModal,
               delete: this.deleteJob,
               query: this.SelectedChildren,
            },
            scopedSlots: {
               default: () => h(BFormCheckbox,  {
                  props: { checked: this.cards },
                  on: { change: x => this.cards = x },
               }, ['Cards view'])
            },
         })),

         has_table(() => table()),

         has_cards(() => h(BFormCheckbox,  {
            props: { checked: this.cards },
            on: { change: x => this.cards = x },
         }, ['Cards view'])),

         has_cards(() => h('div', { class: 'flex' }, [
            cards(),
            h(Calendar, {
               ref: 'calendar',
               style: {
                  height: '90vh',
               },
               on: {
                  setDate: this.onDrop,
               },
               props: {
                  data: this.calendarItems,
               },
               scopedSlots: {
                  entry: (entry: Data) => h('div', {
                     style: {
                        height: '100%',
                        background: this.jobFromId(parseFloat(entry.id)).is_completed === 1
                           ? 'green'
                           : 'lightgray',
                     },
                     on: {
                        mouseover: e => this.calendar_item_hovered(e, entry.id),
                        mouseleave: this.calendar_item_unhovered,
                     },
                  }, entry.duration.toString())
               },
            }),
         ])),


         vif1(Boolean(this.cards && this.preview))(() => h('div', {
            class: 'preview',
            style: {
               left: this.preview_position.left + 'px',
               top: this.preview_position.top + 'px',
            },
         }, [
            h('div', [
               this.preview_job.customer_name,
               ' ',
               this.preview_job.customer_surname,
            ]),
            h('div', [
               this.preview_job.address_name,
               ' ',
               this.preview_job.address_number,
            ]),
            h('div', this.preview_job.appliance_name),
         ])),

         h(BModal, {
            domProps: {
               id: 'modal-prevent-closing',
            },
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
      ];

      if (this.cards)
         return h('div', { class: 'jobs' }, children);
      else
         return wrapped(h, () => children);
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
         preview: false,
         preview_position: {
            left: 0,
            top: 0,
         },
      };
   },

   computed: {
      start_of_current_year() {
         return new Date(new Date().getFullYear(), 0, 1);
      },

      days_since_year_start() {
         return Math.floor(days_between(new Date(), this.start_of_current_year));
      },

      sortOptions(this: This) {
         return this.fields
            .filter(f => f.sortable)
            .map(f => ({ text: f.label, value: f.key }));
      },

      sortDesc(this: This) {
         return this.sortDirection === 'desc';
      },

      calendarItems(this: This) {
         if (!this.items) return [];
         return this.items.map(x => ({
            id: x.id,
            date: x.date ? new Date(x.date) : x.date,
            duration: x.duration || 1,
         }));
      },
   },

   mounted() {
      console.debug('this', this);
      this.api = API();
      this.parent_id = this.$route.params.id;
      console.log('param', this.parent_id);
      this.init();
   },

   watch: {
      async cards(value: boolean) {
         if (value) {
            await this.$nextTick();
            await next_frame();
            this.$refs.calendar.$el.scrollLeft = (this.days_since_year_start - 3) * 48;
         }
      },
   },

   methods: {
      calendar_item_hovered(this: This, e: MouseEvent, id: string) {
         this.preview = true;
         this.preview_position.left = e.clientX - 200;
         this.preview_position.top = e.clientY - 50;
         this.preview_job = this.jobFromId(parseFloat(id));
      },

      calendar_item_unhovered(this: This, e: MouseEvent) {
         this.preview = false;
      },

      jobFromId(this: This, id: number): JobWithExtra {
         return this.items.find(x => x.id === id)!;
      },

      startDrag(this: This, event: DragEventInit, item: JobWithExtra) {
         event.dataTransfer!.setData('jobID', item.id.toString());
      },

      onDrop(this: This, [event, date]: [DragEvent, Date]) {
         const jobID = parseFloat(event.dataTransfer!.getData('jobID'));
         const job = this.items.find(x => x.id === jobID);
         if (!job) return;
         job.date = date_format(date);
         this.api.Job.update(job.id.toString(), job)
            .then(() => this.init())
            .catch(errors => {
               console.error(errors);
               this.errors.push(errors);
               swal.fire(
                  'Updating - error!',
                  'something went wrong',
                  'error'
               );
            });
      },

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

      showEditModal() {
         if (!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
            return;
         }
         this.cu = 'update';
         this.temp_page_table = { ...this.selected[0] };
         this.$refs.modal.show();
         console.debug(this.selected[0], '<<<');
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
         if (this.parent_id) this.temp_page_table.address_id = this.parent_id;
         this.cu = 'create';
         this.$refs.modal.show();
      },

      createJob() {
         this.api.Job.create({
            ...this.page_table,
            date: date_format(this.page_table.date),
         })
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

      updateJob() {
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

      deleteJob() {
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
            this.createJob();
         else if (this.cu == 'update')
            this.updateJob();
         // Hide the modal manually
         this.$nextTick(() => {
            this.$refs.modal.hide();
         });
         this.init();
      },
   },
};
