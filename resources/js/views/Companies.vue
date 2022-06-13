<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h5 class="text-center">Welcome to the SPA in the Laravel & Vue JS</h5>
                <button class="btn btn-danger" @click="logout">Logout</button>
                <router-link class="btn btn-primary float-right" to="/register">Register</router-link>
            </div>
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
            <div class="col-md-10">
                <h5 class="text-center">  </h5>
                <button type="button" @click="clearSelected" class="btn btn-primary">Clear selections</button>
                <button type="button" @click="deleteCompany()" class="btn btn-danger">Delete Selected</button>
                <b-button v-b-modal.modal-prevent-closing @click="NewCompany()">Add New</b-button>
                <b-button @click="SelectedCompany()">Edit Selected</b-button>
                <!-- <b-button v-b-modal.modal-prevent-closing @click="SelectedCompany()">Edit Selected</b-button> -->
            </div>
        </div>
        <br>
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
                :state="company.nameState"
                >
                <b-form-input
                    id="name-input"
                    v-model="company.name"
                    :state="company.nameState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="address"
                label-for="address-input"
                invalid-feedback="address is required"
                :state="company.addressState"
                >
                <b-form-input
                    id="address-input"
                    v-model="company.address"
                    :state="company.addressState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="city"
                label-for="city-input"
                invalid-feedback="city is required"
                :state="company.cityState"
                >
                <b-form-input
                    id="city-input"
                    v-model="company.city"
                    :state="company.cityState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="profession"
                label-for="profession-input"
                invalid-feedback="profession is required"
                :state="company.professionState"
                >
                <b-form-input
                    id="profession-input"
                    v-model="company.profession"
                    :state="company.professionState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="vat"
                label-for="vat-input"
                invalid-feedback="vat is required"
                :state="company.vatState"
                >
                <b-form-input
                    id="vat-input"
                    v-model="company.vat"
                    :state="company.vatState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="irs"
                label-for="irs-input"
                invalid-feedback="irs is required"
                :state="company.irsState"
                >
                <b-form-input
                    id="irs-input"
                    v-model="company.irs"
                    :state="company.irsState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios'
    window.axios = require('axios')
    import swal from 'sweetalert2';
    window.Swal = swal; 

    export default {
        data() {
            return {
                companies: {},
                company: {
                    name: "",
                    address: "",
                    city: "",
                    profession: "",
                    vat: "",
                    irs: "",
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
                    this.companies = response.data.data
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
                    this.$bvModal.show('modal-prevent-closing')
                    this.company = this.selected[0];
                }
            },

            NewCompany(){
                    Object.keys(this.company).forEach(key => {
                        this.company[key] = null;
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
            //TODO Add logout to navbar
            logout(){
                axios.post('api/v1/revoke').then((response) => {
                    localStorage.removeItem('token')
                    this.$router.push('/')
                }).catch((errors) => {
                    console.log(errors)
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
                this.company.nameState = valid
                this.company.addressState = valid
                this.company.cityState = valid
                this.company.professionState = valid
                this.company.vatState = valid
                this.company.irsState = valid
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
                console.log('>><<>><<>>', this.company)
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
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