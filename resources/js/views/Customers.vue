<template>
    <div class="container">
        <div>
            <Navbar></Navbar>
        </div>
        <div class="row justify-content-center">
            <!-- title and login,logout-->
            <div class="col-md-10">
                <h5 class="text-center">Πελάτες</h5>
            </div>

            <!-- filter -->
            <div class="col-md-10">
                <b-col lg="6" class="my-1">
                    <b-form-group
                    label="Filter"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    >
                    <b-input-group size="sm">
                        <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                        ></b-form-input>

                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>
            </div>

            <!-- crud opts -->
            <div class="col-md-10">
                <h5 class="text-center">  </h5>
                <button type="button" @click="clearSelected" class="btn btn-primary">Clear selections</button>
                <button type="button" @click="deleteCustomer()" class="btn btn-danger">Delete Selected</button>
                <b-button variant="success" v-b-modal.modal-prevent-closing @click="NewCustomer()">Add New</b-button>
                <b-button @click="SelectedCustomer()">Edit Selected</b-button>
            </div>
        </div>
        <br>

        <!-- table -->
        <div class="row justify-content-center">
            <div class="col-md-10">
                <b-table striped hover 
                    :items="items" 
                    :fields="fields"
                    :select-mode="selectMode"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    responsive="sm"
                    stacked
                    ref="selectableTable"
                    selectable
                    @row-selected="onRowSelected"
                    @filtered="onFiltered"
                >

                    <!-- Example scoped slot for select state illustrative purposes -->
                    <template #cell(selected)="{ rowSelected }">
                        <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">Selected</span>
                        </template>
                        <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">Not selected</span>
                        </template>
                    </template>
                </b-table>
            </div>
        </div>

        <!-- modal -->
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="New Entry"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Ονομα"
                label-for="name-input"
                invalid-feedback="Name is required"
                :state="modal_state.nameState"
                >
                <b-form-input
                    id="name-input"
                    v-model="temp_customer.name"
                    :state="modal_state.nameState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="surname"
                label-for="surname-input"
                invalid-feedback="surname is required"
                :state="modal_state.surnameState"
                >
                <b-form-input
                    id="surname-input"
                    v-model="temp_customer.surname"
                    :state="modal_state.surnameState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="ID εταιρειας"
                label-for="company_id-input"
                >
                <b-form-select 
                    v-model="temp_customer.company_id" 
                    :options="companies"
                    value-field="id"
                    text-field="name">
                </b-form-select>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="telephone"
                label-for="telephone-input"
                invalid-feedback="telephone is required"
                :state="modal_state.telephoneState"
                >
                <b-form-input
                    id="telephone-input"
                    v-model="temp_customer.telephone"
                    :state="modal_state.telephoneState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="remarks"
                label-for="remarks-input"
                invalid-feedback="remarks is required"
                :state="modal_state.remarksState"
                >
                <b-form-input
                    id="remarks-input"
                    v-model="temp_customer.remarks"
                    :state="modal_state.remarksState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'
    import axios from 'axios'
    window.axios = require('axios')
    import swal from 'sweetalert2';
    window.Swal = swal; 

    export default {
        components:{
            Navbar
        },

        data() {
            return {
                companies: [],
                customer: {},
                temp_customer: {
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
                    {key: 'name', label: 'Ονομα', sortable: true, sortDirection: 'desc', },
                    {key: 'surname', label: 'Επώνυμο', sortable: true, sortDirection: 'desc', },
                    {key: 'telephone', label: 'Τηλέφωνο', sortable: true, sortDirection: 'desc', },
                    {key: 'remarks', label: 'Σχόλια', sortable: true, sortDirection: 'desc', },
                    {key: 'company_name', label: 'Εταιρεια', sortable: true, sortDirection: 'desc', },
                ],
                items: [],
                selected: [],
                selectMode: 'single',
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                cu: "",
                parent_id: 0,
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
            }
        },

        methods: {
            init(){
                this.getCustomers()
                this.getCompanies()
            },

            getCompanies(){
                const axios = require('axios');
                axios.get('api/v1/companies').then((response) => {
                    this.companies = response.data.data
                    this.companies.unshift({
                        id: null,
                        name: "",
                    })

                    //for each child add the name of the parent
                    this.items.forEach(child => {
                        var parent = this.companies.find(obj => {
                            return obj.id === child.company_id
                        })
                        child.company_name = parent.name;
                    })
                }).catch((errors) => {
                    console.log(errors)
                });
            },

            getCustomers(){
                const axios = require('axios');

                if (this.parent_id) {
                    this.items = []
                    axios.get('api/v1/companies/customers/' + this.parent_id).then((response) => {
                        this.items = response.data.data
                    }).catch((errors) => {
                        console.log(errors)
                    });
                }
                else {
                    this.items = []
                    axios.get('api/v1/customers').then((response) => {
                        this.items = response.data.data
                    }).catch((errors) => {
                        console.log(errors)
                    });
                }
            },

            SelectedCustomer(){
                if(!this.selected[0]) {
                    Swal.fire(
                            'First Select Customer',
                            'No Customer Has been selected',
                            'error'
                    )
                }
                else {
                    this.cu = 'update'
                    this.$bvModal.show('modal-prevent-closing')
                    this.temp_customer = this.selected[0];
                }
            },

            NewCustomer(){
                Object.keys(this.temp_customer).forEach(key => {
                    this.temp_customer[key] = null;
                })
                this.cu = 'create'
            },

            createCustomer(){
                axios.post('api/v1/customer/', this.customer).then((response) => {
                        this.init()
                    }).catch((errors) => {
                        console.log(errors)
                        this.errors.push(errors)
                        Swal.fire(
                        'Adding new - error!',
                        'something went wrong',
                        'error'
                    )
                    })
            },
            updateCustomer(){
                axios.put('api/v1/customers/' + this.selected[0].id, this.customer).then((response) => {
                        this.init()
                    }).catch((errors) => {
                        console.log(errors)
                        this.errors.push(errors)
                        Swal.fire(
                        'Updating - error!',
                        'something went wrong',
                        'error'
                    )
                    })
            },
            deleteCustomer(){
                if(!this.selected[0]) {
                    Swal.fire(
                        'First Select Customer',
                        'No Customer Has been selected',
                        'error'
                    )
                }
                else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete('api/v1/customers/' + this.selected[0].id).then((response) => {
                                this.init()
                            }).catch((errors) => {
                                console.log(errors)
                                this.errors.push(errors)
                                Swal.fire(
                                'error!',
                                'You have added addresses for this customer',
                                'error'
                            )
                            })
                            Swal.fire(
                                'Deleted!',
                                'Your record has been deleted.',
                                'success'
                            )
                        }
                    })
                }
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
                console.log('>><<>><<> from ok \n', this.customer)
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    this.init()
                    return
                }
                else {
                    this.customer = this.temp_customer;
                    console.log('>><<>><<> from submit \n', this.customer)
                    if(this.cu == 'create'){
                        this.createCustomer();
                    }
                    else if(this.cu == 'update'){
                        this.updateCustomer();
                    }
                }
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
                this.init()
            }
        },

        mounted() {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            if(!this.token) {
                Swal.fire(
                    'Access Denied!',
                    'Log in to see information',
                    'error'
                )
            }
            this.parent_id = this.$route.params.id
            console.log('param', this.parent_id)
            this.init();
        },
    }
</script>