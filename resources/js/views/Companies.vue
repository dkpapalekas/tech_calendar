<template>
    <div class="container">
        <div>
            <Navbar></Navbar>
        </div>
        <div class="row justify-content-center">
            <!-- title and login,logout-->
            <div class="col-md-10">
                <h5 class="text-center">Εταιρείες</h5>
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
                <button type="button" @click="deleteCompany()" class="btn btn-danger">Delete Selected</button>
                <b-button variant="success" v-b-modal.modal-prevent-closing @click="NewCompany()">Add New</b-button>
                <b-button @click="SelectedCompany()">Edit Selected</b-button>
                <!-- <b-button v-b-modal.modal-prevent-closing @click="SelectedCompany()">Edit Selected</b-button> -->
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
                label="Ονομασία"
                label-for="name-input"
                invalid-feedback="Name is required"
                :state="modal_state.nameState"
                >
                <b-form-input
                    id="name-input"
                    v-model="temp_company.name"
                    :state="modal_state.nameState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="address"
                label-for="address-input"
                invalid-feedback="address is required"
                :state="modal_state.addressState"
                >
                <b-form-input
                    id="address-input"
                    v-model="temp_company.address"
                    :state="modal_state.addressState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="city"
                label-for="city-input"
                invalid-feedback="city is required"
                :state="modal_state.cityState"
                >
                <b-form-input
                    id="city-input"
                    v-model="temp_company.city"
                    :state="modal_state.cityState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="profession"
                label-for="profession-input"
                invalid-feedback="profession is required"
                :state="modal_state.professionState"
                >
                <b-form-input
                    id="profession-input"
                    v-model="temp_company.profession"
                    :state="modal_state.professionState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="vat"
                label-for="vat-input"
                invalid-feedback="vat is required"
                :state="modal_state.vatState"
                >
                <b-form-input
                    id="vat-input"
                    v-model="temp_company.vat"
                    :state="modal_state.vatState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="irs"
                label-for="irs-input"
                invalid-feedback="irs is required"
                :state="modal_state.irsState"
                >
                <b-form-input
                    id="irs-input"
                    v-model="temp_company.irs"
                    :state="modal_state.irsState"
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
            Navbar // register component
        },

        data() {
            return {
                companies: {},
                company: {},
                temp_company: {
                    name: "",
                    address: "",
                    city: "",
                    profession: "",
                    vat: "",
                    irs: "",
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
                cu: "",
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
            getCompanies(){
                const axios = require('axios');
                axios.get('api/v1/companies').then((response) => {
                    this.items = response.data.data
                    // console.log(response.data.data)
                }).catch((errors) => {
                    console.log(errors)
                });
            },

            SelectedCompany(){
                if(!this.selected[0]) {
                    Swal.fire(
                            'First Select Company',
                            'No Company Has been selected',
                            'error'
                    )
                }
                else {
                    this.cu = 'update'
                    this.$bvModal.show('modal-prevent-closing')
                    this.temp_company = this.selected[0];
                }
            },

            NewCompany(){
                Object.keys(this.temp_company).forEach(key => {
                    this.temp_company[key] = null;
                })
                this.cu = 'create'
            },

            createCompany(){
                axios.post('api/v1/company/', this.company).then((response) => {
                        this.getCompanies()
                        // console.log(response)
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
            updateCompany(){
                axios.put('api/v1/companies/' + this.selected[0].id, this.company).then((response) => {
                        this.getCompanies()
                        // console.log(response)
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
            deleteCompany(){
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
                        axios.delete('api/v1/companies/' + this.selected[0].id).then((response) => {
                            this.getCompanies()
                            // console.log(response)
                        }).catch((errors) => {
                            console.log(errors)
                            this.errors.push(errors)
                            Swal.fire(
                            'error!',
                            'You have added customers for this company',
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
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.modal_state.nameState = valid
                this.modal_state.addressState = valid
                this.modal_state.cityState = valid
                this.modal_state.professionState = valid
                this.modal_state.vatState = valid
                this.modal_state.irsState = valid
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
                console.log('>><<>><<> from ok \n', this.company)
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    this.getCompanies()
                    return
                }
                else {
                    this.company = this.temp_company;
                    console.log('>><<>><<> from submit \n', this.company)
                    if(this.cu == 'create'){
                        this.createCompany();
                    }
                    else if(this.cu == 'update'){
                        this.updateCompany();
                    }
                }
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
                this.getCompanies()
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
            this.getCompanies()
        }
    }
</script>