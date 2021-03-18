<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-lg">
            <div class="col-12 text-h6 text-dark text-weight-bold">
                {{ $t('ngos') }}
            </div>
        </div>

        <q-form class="row q-col-gutter-lg">
            <div class="col-12">
                <div class="row q-col-gutter-sm">
                    <div class="col-12">
                        <q-input outlined dense bg-color="white" v-model="ngo.name" :label="$t('name')" />
                    </div>

                    <div class="col-12">
                        <q-input outlined dense bg-color="white" v-model="ngo.email" :label="$t('email')" type="email" />
                    </div>

                    <div class="col-12">
                        <q-input outlined dense bg-color="white" v-model="ngo.cnpj" :label="$t('cnpj')" />
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row q-col-gutter-sm">
                    <div class="col-12 text-subtitle1">
                        <q-btn dense icon="fal fa-plus" color="primary" size="sm" @click="addPhone()">
                            <q-tooltip>
                                {{ $t('add_phone_number') }}
                            </q-tooltip>
                        </q-btn> 
                        {{ $t('phones') }}
                    </div>
            
                    <div class="col-12" v-for="(phone, index) in ngo.phones" :key="index">
                        <div class="row">
                            <div class="col-12">
                                <q-input outlined dense bg-color="white" v-model="phone.number" :label="$t('phone')">
                                    <template v-slot:append v-if="index > 0">
                                        <q-btn flat dense icon="fal fa-times" color="negative" @click="removePhone(index)">
                                            <q-tooltip anchor="bottom left" self="top left">
                                                {{ $t('remove_phone_number') }}
                                            </q-tooltip>
                                        </q-btn>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row q-col-gutter-sm">
                     <div class="col-12 text-subtitle1">
                        <q-btn dense icon="fal fa-plus" color="primary" size="sm" @click="addAddress()">
                            <q-tooltip>
                                {{ $t('add_address') }}
                            </q-tooltip>
                        </q-btn> 
                        {{ $t('addresses') }}
                    </div>

                    <div class="col-12" v-for="(address, index) in ngo.addresses" :key="index">
                        <div class="row q-col-gutter-sm">
                            <div class="col-12 q-my-md" v-if="index > 0">
                                <q-separator />
                            </div>

                            <div class="col-12">
                                <q-input outlined dense bg-color="white" v-model="address.street" :label="$t('street')">
                                    <template v-slot:append v-if="index > 0">
                                        <q-btn flat dense icon="fal fa-times" color="negative" @click="removeAddress(index)">
                                            <q-tooltip anchor="bottom left" self="top left">
                                                {{ $t('remove_address') }}
                                            </q-tooltip>
                                        </q-btn>
                                    </template>
                                </q-input>
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense bg-color="white" v-model="address.number" :label="$t('number')" type="number" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense bg-color="white" v-model="address.complement" :label="$t('complement')" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-select outlined dense bg-color="white" v-model="address.state" :options="states" :label="$t('state')" @input="clearCity(address.state, index)" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-select outlined dense bg-color="white" v-model="address.city" :options="address.cities" :label="$t('city')" />
                            </div>

                            <div class="col-12">
                                <q-input outlined dense bg-color="white" v-model="address.zip_code" :label="$t('zip_code')" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row q-col-gutter-sm justify-end">
                    <div class="col-xs-12 col-sm-3" :class="$q.platform.is.mobile ? 'order-last' : ''">
                        <q-btn dense no-caps color="negative" :label="$t('cancel')" @click="$router.push({ name: 'ngos' })" class="full-width" />
                    </div>

                    <div class="col-xs-12 col-sm-3">
                        <q-btn dense no-caps color="positive" :label="$t('save')" @click="saveNgo()" class="full-width" />
                    </div>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import ngos_list from '../json/ngos.json'
import states_list from '../json/states.json'
import cities_list from '../json/cities.json'

export default {
    name: 'PageNgo',

    data() {
        return {
            ngo: {
                addresses: [{
                    cities: [],
                    city: null,
                    complement: '',
                    district: '',
                    number: null,
                    state: null,
                    street: '',
                    zip_code: ''
                }],
                cnpj: '',
                email: '',
                id: 0,
                name: '',
                phones: [{
                    number: ''
                }]
            }
        }
    },

    computed: {
        states() {
            return states_list
        }
    },

    methods: {
        saveNgo() {
            this.$q.notify({
                message:this.$route.params.id === 0 ? this.$t('ngo_created_successfully') : this.$t('ngo_updated_successfully'),
                type: 'positive',
                icon: 'fal fa-save'
            })

            this.$router.push({ name: 'ngos' })
        },

        addPhone() {
            this.ngo.phones.push({
                number: ''
            })
        },

        removePhone(index) {
            this.ngo.phones.splice(index, 1)
        },

        addAddress() {
            this.ngo.addresses.push({
                city: null,
                complement: '',
                district: '',
                number: null,
                state: null,
                street: '',
                zip_code: ''
            })
        },

        removeAddress(index) {
            this.ngo.addresses.splice(index, 1)
        },

        clearCity(state, index) {
            this.ngo.addresses[index].city = null
            this.getCities(state, index)
        },

        getCities(state, index) {
            this.ngo.addresses[index].cities = cities_list.filter(e => e.state_id === state.value)
        }
    },

    created() {
        if (this.$route.params.id !== 0) {
            let ngo = ngos_list.find(e => e.id === this.$route.params.id)
            if (ngo) {
                this.ngo = Object.assign({}, ngo)

                this.ngo.addresses.forEach((address, index) => {
                    this.getCities(address.state, index)
                })
            } 
        }
    }
}
</script>

<style>

</style>