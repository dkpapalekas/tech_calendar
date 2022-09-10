import { BModal, BTable } from 'bootstrap-vue';
import CRUDButtons from '../components/CRUDButtons';
import EditCompany from '../components/EditCompany';
import Header from '../components/Header'
import SortFilter from '../components/SortFilter';
import TextFilter from '../components/TextFilter';
import API from '../API';
import swal from 'sweetalert2';
import wrapped from '../components/DefaultWrapper';

export default {
   render(h) {
      return wrapped(h, () => [
         h(Header, { props: { header: 'Εταιρείες' }}),

         h('div', { class: 'col-md-10 sf' }, [
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
            on: {
               add: this.NewEntry,
               edit: this.Selected_modal,
               delete: this.deleteCRUD,
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
                  }
               })
            ]),
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
               default: () => h(EditCompany, {
                  props: { value: this.temp_page_table },
                  on: { input: x => this.temp_page_table = x },
               })
            },
         }),
      ]);
   },

   data() {
      return {
         companies: {},
         page_table: {},
         temp_page_table: {
            name: '',
            address: '',
            city: '',
            profession: '',
            vat: '',
            irs: '',
         },
         modal_state: {
            nameState: null,
            addressState: null,
            cityState: null,
            professionState: null,
            vatState: null,
            irsState: null,
         },
         currentUser: {},
         token: localStorage.getItem('token'),
         errors: [],
         fields: [
            {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc', },
            {key: 'name', label: 'Ονομασία', sortable: true, sortDirection: 'desc', },
            {key: 'address', label: 'Διεύθυνση', sortable: true, sortDirection: 'desc', },
            {key: 'city', label: 'Πόλη', sortable: true, sortDirection: 'desc', },
            {key: 'profession', label: 'Εξειδίκευση', sortable: true, sortDirection: 'desc', },
            {key: 'vat', label: 'ΑΦΜ', sortable: true, sortDirection: 'desc', },
            {key: 'irs', label: 'ΔΟΥ', sortable: true, sortDirection: 'desc',},
         ],
         items: [],
         selected: [],
         selectMode: 'single',
         sortBy: '',
         sortDesc: false,
         sortDirection: 'asc',
         filter: null,
         filterOn: [],
         cu: '',
         path_url: '',
         parent_id: '',
         api: null,
      }
   },

   computed: {
      sortOptions() {
         // Create an options list from our fields
         return this.fields
            .filter(f => f.sortable)
            .map(f => ({ text: f.label, value: f.key }));
      }
   },

   mounted() {
      if(!this.token)
         swal.fire(
            'Access Denied!',
            'Log in to see information',
            'error'
         )
      this.api = API(this.token);
      this.path_url = this.$route.path;
      var tokens = this.path_url.split('/').slice(1);
      this.path_url = '/'+tokens[0];
      console.log('mounted', this.path_url);
      this.getCRUD();
   },

   methods: {
      getCRUD(){
         const axios = require('axios');

         if (this.parent_id) {
            // this.items = []
            // axios.get('api/v1/companies/customers/' + this.parent_id).then((response) => {
            //     this.items = response.data.data
            // }).catch((errors) => {
            //     console.log(errors)
            // });
         } else {
            this.items = []
            this.api.Customer.all()
               .then(data => this.items = data)
               .catch(console.log);
         }
      },

      Selected_modal(){
         if(!this.selected[0]) {
            swal.fire(
               'First Select entry',
               'No entry Has been selected',
               'error'
            );
            return
         }
         this.cu = 'update'
         this.$refs.modal.show();
         this.temp_page_table = this.selected[0];
      },

      SelectedChildren(){
         if(!this.selected[0]) {
               swal.fire(
                  'First Select entry',
                  'No entry Has been selected',
                  'error'
               );
               return
         }
         this.$router.push('/customers/' + this.selected[0].id)
      },

      NewEntry(){
         Object.keys(this.temp_page_table).forEach(key => {
            this.temp_page_table[key] = null;
         });
         this.cu = 'create'
         this.$refs.modal.show();
      },

      createCRUD(){
         this.api.Company.create(this.page_table)
            .then(() => this.getCrud())
            .catch(errors => {
               console.log(errors)
               this.errors.push(errors)
               swal.fire(
                  'Adding new - error!',
                  'something went wrong',
                  'error'
               );
            });
      },

      updateCRUD(){
         this.api.Company.update(this.selected[0].id, this.page_table)
            .then(() => this.CRUD())
            .catch(errors => {
               console.log(errors)
               this.errors.push(errors)
               swal.fire(
                  'Updating - error!',
                  'something went wrong',
                  'error'
               );
            });
      },

      deleteCRUD(){
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
            confirmButtonText: 'Yes, delete it!',
         }).then((result) => {
            if (!result.isConfirmed) return;
            this.api.Company.delete(this.selected[0].id)
               .then(() => this.getCRUD())
               .catch(errors => {
                  console.log(errors)
                  this.errors.push(errors)
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
            console.log(this.selected[0].vat)
         }
      },

      clearSelected() {
         this.$refs.selectableTable.clearSelected()
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
         this.page_table = this.temp_page_table;
         console.log('>><<>><<> from submit \n', this.page_table)
         if(this.cu == 'create'){
            this.createCRUD();
         } else if(this.cu == 'update'){
            this.updateCRUD();
         }
         // Hide the modal manually
         this.$nextTick(() => {
            this.$refs.modal.hide();
         });
         this.getCRUD();
      }
   },
}
