<template>
    <div class="container">
        <div>
            <Navbar></Navbar>
        </div>
        <div class="row justify-content-center" id='cont'>
            <!-- title and login,logout-->
            <div class="col-md-10 title">
                <h5 class="text-center">Ανάγκες Εργασιών</h5>
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
                        </b-input-group>
                    </b-form-group>
                
            </div>
        </div>
        <!-- crud opts -->
        <div class='stickies'>
            <b-button variant="success" v-b-modal.modal-prevent-closing @click="NewEntry()">+</b-button>
            <button type="button" @click="deleteCRUD()" class="btn btn-danger">del</button>
            <b-button @click="Selected_modal()">edit</b-button>
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
                label="Εργασία"
                label-for="job_id-input"
                >
                <b-form-select 
                    v-model="temp_page_table.job_id" 
                    :options="jobs"
                    value-field="id"
                    text-field="fullname">
                </b-form-select>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Υλικό"
                label-for="material_id-input"
                >
                <b-form-select 
                    v-model="temp_page_table.material_id" 
                    :options="materials"
                    value-field="id"
                    text-field="name">
                </b-form-select>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Ποσότητα"
                label-for="quantity-input"
                invalid-feedback="quantity is required"
                :state="modal_state.quantityState"
                >
                <b-form-input
                    id="quantity-input"
                    v-model="temp_page_table.quantity"
                    :state="modal_state.quantityState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Τιμή"
                label-for="price-input"
                invalid-feedback="price is required"
                :state="modal_state.priceState"
                >
                <b-form-input
                    id="price-input"
                    v-model="temp_page_table.price"
                    :state="modal_state.priceState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Κατάσταση Υλικού"
                label-for="status-input"
                >
                <b-form-select 
                    v-model="temp_page_table.status" 
                    :options="material_statuses">
                </b-form-select>
                </b-form-group>
            </form> 
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                label="Σχόλια"
                label-for="remarks-input"
                invalid-feedback="remarks is required"
                :state="modal_state.remarksState"
                >
                <b-form-input
                    id="remarks-input"
                    v-model="temp_page_table.remarks"
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
                jobs: [],
                materials: [],
                page_table: {},
                temp_page_table: {
                    job_id: null,
                    material_id: null,
                    price: 0,
                    quantity: 0,
                    status: "",
                    remarks: "",
                },
                modal_state: {
                    priceState: null,
                    quantityState: null,
                    statusState: null,
                    remarksState: null, 
                },
                currentUser: {},
                token: localStorage.getItem('token'),
                errors: [],
                fields: [
                    {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc', },
                    {key: 'material_name', label: 'Υλικό', sortable: true, sortDirection: 'desc', },
                    {key: 'quantity', label: 'Ποσότητα', sortable: true, sortDirection: 'desc', },
                    {key: 'price', label: 'Τιμή', sortable: true, sortDirection: 'desc', },
                    {key: 'job_name', label: 'Ημ/νια', sortable: true, sortDirection: 'desc', },
                    {key: 'material_status_format', label: 'Κατάσταση', sortable: true, sortDirection: 'desc', },
                    {key: 'remarks', label: 'Σχόλια', sortable: true, sortDirection: 'desc',},
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
                material_statuses : [
                    { value: 'OK', text: 'Διατίθεται' },
                    { value: 'pending', text: 'Εκρεμμεί' },
                ],             
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
                this.getJobs()
                this.getMaterials()   
            },

            formatItems() {
                this.items.forEach(obj => {
                    obj.material_status_format = obj.status === 'OK' ? "Διατίθεται" : "Εκρεμμεί"
                })
            },

            getJobs(){
                const axios = require('axios');
                axios.get('api/v1/jobs').then((response) => {
                    this.jobs = response.data.data

                    //custome fullname creation
                    this.jobs.forEach(job => {
                        job.fullname = job.address_name + ', ' + job.customer_surname + ', ' + job.appliance_name
                    })

                    console.log('jobs', this.jobs)
                    
                    //for each child add the name of the parent
                    this.items.forEach(child => {
                        var parent = this.jobs.find(obj => {
                            return obj.id === child.job_id
                        })
                        child.job_name = parent.date;
                    })
                }).catch((errors) => {
                    console.log(errors)
                });
            },

            getMaterials(){
                const axios = require('axios');
                axios.get('api/v1/materials').then((response) => {
                    this.materials = response.data.data

                    // //custome fullname creation
                    // this.materials.forEach(material => {
                    //     material.fullname = material.name + ' ' + material.model + ' ' + material.brand 
                    // })
                    
                    //for each child add the name of the parent
                    this.items.forEach(child => {
                        var parent = this.materials.find(obj => {
                            return obj.id === child.material_id
                        })
                        child.material_name = parent.name;
                    })

                    this.formatItems()
                }).catch((errors) => {
                    console.log(errors)
                });
            },

            getCRUD(){
                const axios = require('axios');

                if (this.parent_id) {
                    this.items = []
                    axios.get('api/v1/jobs/job_lines/' + this.parent_id).then((response) => {
                        this.items = response.data.data
                    }).catch((errors) => {
                        console.log(errors)
                    });
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

            NewEntry(){
                Object.keys(this.temp_page_table).forEach(key => {
                    this.temp_page_table[key] = null;
                })
                if(this.parent_id) {
                    this.temp_page_table.job_id = this.parent_id
                    console.log('temp job id',this.temp_page_table.job_id)
                }
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
                this.modal_state.priceState = valid
                this.modal_state.quantityState = valid
                this.modal_state.statusState = valid
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
            this.init();
        },
    }
</script>