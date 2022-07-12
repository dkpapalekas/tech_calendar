<template>
    <div class="container">
        <div>
            <Navbar></Navbar>
        </div>
        <div class="row justify-content-center" id='cont'>
            <!-- title and login,logout-->
            <div class="col-md-10 title">
                <h5 class="text-center">Εργασίες</h5>
            </div>

            <!-- filter -->
            <div class="col-md-10 sf">
                
                    <b-form-group
                    label="Φίλτρο"
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

                            <!--   -->
                        </b-input-group>
                    </b-form-group>
                
                    <b-form-group
                    label="Ταξινόμηση"
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

                            <b-form-select
                                v-model="sortDesc"
                                :disabled="!sortBy"
                                :aria-describedby="ariaDescribedby"
                                size="sm"
                                class="w-25"
                                >
                                <option :value="false">Asc</option>
                                <option :value="true">Desc</option>
                            </b-form-select>
                        </b-input-group>
                    </b-form-group>
                
            </div>
        </div>
        <!-- crud opts -->
        <div class='stickies'>
             
             <button type="button" @click="deleteCRUD()" class="btn btn-danger">del</button>
            <b-button variant="success" v-b-modal.modal-prevent-closing @click="NewEntry()">+</b-button>
            <b-button @click="Selected_modal()">edit</b-button> 
            <b-button @click="SelectedChildren()">Υλικά</b-button>
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
                label="Διεύθυνση"
                label-for="address_id-input"
                >
                <b-form-select 
                    v-model="temp_page_table.address_id" 
                    :options="addresses"
                    value-field="id"
                    text-field="fullname">
                </b-form-select>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Συσκευή"
                label-for="appliance_id-input"
                >
                <b-form-select 
                    v-model="temp_page_table.appliance_id" 
                    :options="appliances"
                    value-field="id"
                    text-field="fullname">
                </b-form-select>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Κατάσταση Πελάτη"
                label-for="client_status-input"
                >
                <b-form-select 
                    v-model="temp_page_table.client_status" 
                    :options="client_statuses">
                </b-form-select>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Ημ/νία"
                label-for="date-input"
                invalid-feedback="date is required"
                :state="modal_state.dateState"
                >
                <b-form-datepicker 
                    id="example-datepicker" 
                    locale="el"
                    v-model="temp_date" 
                    class="mb-2">
                </b-form-datepicker>
                <b-form-timepicker 
                    v-model="temp_time" 
                    locale="en">
                </b-form-timepicker>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Τιμή"
                label-for="agreed_price-input"
                invalid-feedback="agreed_price is required"
                :state="modal_state.agreed_priceState"
                >
                <b-form-input
                    id="agreed_price-input"
                    v-model="temp_page_table.agreed_price"
                    :state="modal_state.agreed_priceState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Κατάσταση Εργασίας"
                label-for="is_completed-input"
                >
                <b-form-select 
                    v-model="temp_page_table.is_completed" 
                    :options="job_statuses">
                </b-form-select>
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
        top: 2em;
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
                    client_status: "",
                    date: "",
                    agreed_price: 0,
                    is_completed: 0,
                },
                modal_state: {
                    client_statusState: null,
                    dateState: null,
                    agreed_priceState: null,
                    is_completedState: null,
                },
                currentUser: {},
                token: localStorage.getItem('token'),
                errors: [],
                fields: [
                    {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc', },
                    {key: 'date', label: 'Ημερομηνία', sortable: true, sortDirection: 'desc', },
                    {key: 'customer_name', label: 'Ονομα', sortable: true, sortDirection: 'desc', },
                    {key: 'customer_surname', label: 'Επώνυμο', sortable: true, sortDirection: 'desc', },
                    {key: 'client_status_format', label: 'Κατάσταση Πελάτη', sortable: true, sortDirection: 'desc', },
                    {key: 'materials_status', label: 'Κατάσταση Υλικών', sortable: true, sortDirection: 'desc', },
                    // {key: 'agreed_price', label: 'Τιμή', sortable: true, sortDirection: 'desc', visible: false},
                    {key: 'address_name', label: 'Διεύθυνση', sortable: true, sortDirection: 'desc', },
                    {key: 'is_completed_format', label: 'Κατάσταση Εργασίας', sortable: true, sortDirection: 'desc', },
                    // {key: 'appliance_name', label: 'Συσκευή', sortable: true, sortDirection: 'desc', },
                    
                ],
                items: [],
                selected: [],
                //table options
                selectMode: 'single',
                sortBy: 'date',
                sortDesc: true,
                sortDirection: 'desc',
                filter: null,
                filterOn: [],
                //GET options
                cu: "",
                parent_id: 0,
                client_statuses : [
                    { value: 'pending', text: 'Αναμονή Πελάτη' },
                    { value: 'OK', text: 'Συμφωνία Πελάτη' },
                ],
                job_statuses : [
                    { value: 0, text: 'Εκρεμμεί' },
                    { value: 1, text: 'Ολοκληρωμένη' },
                ],
                temp_date: "",              
                temp_time: "",              
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
                this.getCRUD()
                this.getAddresses()
                this.getJobLines()
                this.getAppliances()
            },

            formatTableFields() {
                this.items.forEach(obj => {
                    obj.is_completed_format = obj.is_completed === 1 ? "Ολοκληρωμένη" : "Εκρεμμεί"
                    obj.client_status_format = obj.client_status=== "OK" ? "Συμφωνία Πελάτη" : "Αναμονή Πελάτη"
                })
            },

            getAddresses(){
                const axios = require('axios');
                axios.get('api/v1/addresses').then((response) => {
                    this.addresses = response.data.data

                    //address fullname creation
                    this.addresses.forEach(address => {
                        address.fullname = address.name + ' ' + address.city
                    })
                    
                    //for each child add the name of the parent
                    this.items.forEach(child => {
                        var parent = this.addresses.find(obj => {
                            return obj.id === child.address_id
                        })
                        child.address_name = parent.name + ' ' + parent.city;
                    })
                }).catch((errors) => {
                    console.log(errors)
                });
            },

            getAppliances(){
                const axios = require('axios');
                axios.get('api/v1/appliances').then((response) => {
                    this.appliances = response.data.data

                    //custome fullname creation
                    this.appliances.forEach(appliance => {
                        appliance.fullname = appliance.name + ' ' + appliance.model + ' ' + appliance.brand 
                    })
                    
                    //for each child add the name of the parent
                    this.items.forEach(child => {
                        var parent = this.appliances.find(obj => {
                            return obj.id === child.appliance_id
                        })
                        child.appliance_name = parent.name + ' ' + parent.brand + ' ' + parent.model;
                    })

                    this.formatTableFields()
                        }).catch((errors) => {
                            console.log(errors)
                        });
            },

            getJobLines(){
                const axios = require('axios');
                axios.get('api/v1/job_lines').then((response) => {
                    this.job_lines = response.data.data
                    
                    //for each child add the name of the parent
                    this.items.forEach(job => {
                        var pending_jobs = this.job_lines.filter(job_line => {
                            return job_line.job_id === job.id && job_line.status === "pending"
                        })
                        console.log(pending_jobs, pending_jobs.length === 0)
                        job.materials_status = pending_jobs.length === 0 ? 'OK' : 'Εκκρεμεί'
                    })

                    this.formatTableFields()
                        }).catch((errors) => {
                            console.log(errors)
                        });
            },

            getCRUD(){
                const axios = require('axios');

                this.items = []
                axios.get('api/v1/' + this.page_table_name).then((response) => {
                    this.items = response.data.data

                if(this.parent_id) {
                    console.log(this.items, 'inside filter')
                    this.items = this.items.filter(item => {
                        return item.address_id == this.parent_id
                    })
                }
                
                this.formatTableFields();
                
                }).catch((errors) => {
                    console.log(errors)
                });
                
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
                    this.temp_date = this.selected[0].date.split(' ')[0]
                    this.temp_time = this.selected[0].date.split(' ')[1]
                    console.log(this.selected[0], '<<<')
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
                    this.$router.push('/job_lines/' + this.selected[0].id)
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
            updateCRUD(){
                axios.put('api/v1' + this.path_url + '/' + this.selected[0].id, this.page_table).then((response) => {
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
                                this.init()
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
                }

            },
            clearSelected() {
                this.$refs.selectableTable.clearSelected()
            },
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.modal_state.client_statusState = valid
                this.modal_state.dateState = valid
                this.modal_state.agreed_priceState = valid
                this.modal_state.is_completedState = valid
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
                }
                else {
                    this.page_table = this.temp_page_table;
                    this.page_table.date = this.temp_date + ' ' + this.temp_time
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
            this.path_url = this.$route.path
            var tokens = this.path_url.split('/').slice(1)
            this.path_url = '/'+tokens[0]
            console.log('param', this.path_url)
            this.init();
        },
    }
</script>