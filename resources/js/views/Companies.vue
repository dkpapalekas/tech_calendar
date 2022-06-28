<template>
    <div class="container">
        <div>
            <Navbar></Navbar>
        </div>
        <div class="row justify-content-center" id='cont'>
            <!-- title and login,logout-->
            <div class="col-md-10 title">
                <h5 class="text-center">Εταιρείες</h5>
            </div>

            <!-- filter -->
            <div class="col-md-10 sf">
                
                    <b-form-group
                    label="Filter"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    >
                        <b-input-group size="sm" class='filter-class'>
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
                
                    <b-form-group
                    label="Sort"
                    label-for="sort-by-select"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                    >
                        <b-input-group size="sm">
                            <b-form-select
                            id="sort-by-select"
                            v-model="sortBy"
                            :options="sortOptions"
                            :aria-describedby="ariaDescribedby"
                            class="w-75"
                            >
                            </b-form-select>
                        </b-input-group>
                    </b-form-group>
                
            </div>
        </div>
        <!-- crud opts -->
        <div class='stickies'>
            <div class='crud'>
                <button type="button" @click="clearSelected" class="btn btn-primary">C</button>
                <button type="button" @click="deleteCRUD()" class="btn btn-danger">D</button>
                <b-button variant="success" v-b-modal.modal-prevent-closing @click="NewEntry()">+</b-button>
                <b-button @click="Selected_modal()">E</b-button> 
            </div>
            <div class='query'>
                <b-button @click="SelectedChildren()">Custs</b-button>
            </div>
        </div>

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
                    responsive
                    stacked = "md"
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
                    v-model="temp_page_table.name"
                    :state="modal_state.nameState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Διεύθυνση"
                label-for="address-input"
                invalid-feedback="address is required"
                :state="modal_state.addressState"
                >
                <b-form-input
                    id="address-input"
                    v-model="temp_page_table.address"
                    :state="modal_state.addressState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Πόλη"
                label-for="city-input"
                invalid-feedback="city is required"
                :state="modal_state.cityState"
                >
                <b-form-input
                    id="city-input"
                    v-model="temp_page_table.city"
                    :state="modal_state.cityState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Εξειδίκευση"
                label-for="profession-input"
                invalid-feedback="profession is required"
                :state="modal_state.professionState"
                >
                <b-form-input
                    id="profession-input"
                    v-model="temp_page_table.profession"
                    :state="modal_state.professionState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="ΑΦΜ"
                label-for="vat-input"
                invalid-feedback="vat is required"
                :state="modal_state.vatState"
                >
                <b-form-input
                    id="vat-input"
                    v-model="temp_page_table.vat"
                    :state="modal_state.vatState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="ΔΟΥ"
                label-for="irs-input"
                invalid-feedback="irs is required"
                :state="modal_state.irsState"
                >
                <b-form-input
                    id="irs-input"
                    v-model="temp_page_table.irs"
                    :state="modal_state.irsState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<style scoped>
    .col-md-10.title { height:10px }
    .col-md-10.sf { display: flex; }
    .col-md-10.sf > * { 
        flex: 1; 
        margin: 10px;
        height: 100px;
    }
    .stickies {
        /* margin-left: auto; */
        margin-right: 20%;
        position: sticky;
        width: 75%;
        top: 0;
        overflow: auto;
    }
    .stickies > * {
        margin: 1px;
        flex: 1;
    }

    @media screen and (min-width: 768px) {
        .stickies {
            margin-left: 7.5%;
        }
    }
</style>

<script>
    import axios from 'axios'
    window.axios = require('axios')
    import swal from 'sweetalert2';
    window.Swal = swal; 

    import Navbar from './Navbar.vue'

    export default {
        components:{
            Navbar
        },

        data() {
            return {
                companies: {},
                page_table: {},
                temp_page_table: {
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
                path_url: "",
                parent_id: "",
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
            getCRUD(){
                const axios = require('axios');

                if (this.parent_id) {
                    // this.items = []
                    // axios.get('api/v1/companies/customers/' + this.parent_id).then((response) => {
                    //     this.items = response.data.data
                    // }).catch((errors) => {
                    //     console.log(errors)
                    // });
                }
                else {
                    this.items = []
                    axios.get('api/v1' + this.path_url).then((response) => {
                        this.items = response.data.data
                    }).catch((errors) => {
                        console.log(errors)
                    });
                } 
            },

            Selected_modal(){
                if(!this.selected[0]) {
                    Swal.fire(
                            'First Select entry',
                            'No entry Has been selected',
                            'error'
                    )
                }
                else {
                    this.cu = 'update'
                    this.$bvModal.show('modal-prevent-closing')
                    this.temp_page_table = this.selected[0];
                }
            },

            SelectedChildren(){
                if(!this.selected[0]) {
                    Swal.fire(
                            'First Select entry',
                            'No entry Has been selected',
                            'error'
                    )
                }
                else {
                    this.$router.push('/customers/' + this.selected[0].id)
                }
            },

            NewEntry(){
                Object.keys(this.temp_page_table).forEach(key => {
                    this.temp_page_table[key] = null;
                })
                this.cu = 'create'
            },

            createCRUD(){
                axios.post('api/v1' + this.path_url, this.page_table).then((response) => {
                        this.getCRUD()
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

            updateCRUD(){
                axios.put('api/v1' + this.path_url + '/' + this.selected[0].id, this.page_table).then((response) => {
                        this.getCRUD()
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

            deleteCRUD(){
                if(!this.selected[0]) {
                    Swal.fire(
                            'First Select entry',
                            'No entry Has been selected',
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
                            axios.delete('api/v1' + this.path_url + '/' + this.selected[0].id).then((response) => {
                                this.getCRUD()
                            }).catch((errors) => {
                                console.log(errors)
                                this.errors.push(errors)
                                Swal.fire(
                                'error!',
                                'You have added children for this entry',
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
                console.log('>><<>><<> from ok \n', this.page_table)
            },

            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    this.getCRUD()
                    return
                }
                else {
                    this.page_table = this.temp_page_table;
                    console.log('>><<>><<> from submit \n', this.page_table)
                    if(this.cu == 'create'){
                        this.createCRUD();
                    }
                    else if(this.cu == 'update'){
                        this.updateCRUD();
                    }
                }
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
                this.getCRUD()
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
            this.path_url = this.$route.path
            console.log('mounted', this.path_url)
            this.getCRUD()
        }
    }
</script>