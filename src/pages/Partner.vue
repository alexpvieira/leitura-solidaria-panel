<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-lg">
            <div class="col-12 text-h6 text-dark text-weight-bold">
                {{ $t('partners') }}
            </div>
        </div>

        <q-form class="row q-col-gutter-lg">
            <div class="col-12">
                <div class="row q-col-gutter-sm">
                    <div class="col-12">
                        <q-input outlined dense hide-bottom-space bg-color="white" v-model="partner.name" :label="$t('name')" :error="$v.partner.name.$error" @input="$v.partner.name.$touch" />
                    </div>

                    <div class="col-12">
                        <q-input outlined dense hide-bottom-space bg-color="white" v-model="partner.email" :label="$t('email')" type="email" :error="$v.partner.email.$error" @input="$v.partner.email.$touch" />
                    </div>

                    <div class="col-12">
                        <q-input outlined dense hide-bottom-space bg-color="white" v-model="partner.cnpj" :label="$t('cnpj')" :error="$v.partner.cnpj.$error" @input="$v.partner.cnpj.$touch" />
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
            
                    <div class="col-12" v-for="(phone, index) in partner.phones" :key="index">
                        <div class="row">
                            <div class="col-12">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="phone.number" :label="$t('phone')" :error="$v.partner.phones.$each[index].number.$error" @input="$v.partner.phones.$each[index].number.$touch">
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

                    <div class="col-12" v-for="(address, index) in partner.addresses" :key="index">
                        <div class="row q-col-gutter-sm">
                            <div class="col-12 q-my-md" v-if="index > 0">
                                <q-separator />
                            </div>

                            <div class="col-12">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.street" :label="$t('street')" :error="$v.partner.addresses.$each[index].street.$error" @input="$v.partner.addresses.$each[index].street.$touch">
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
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.number" :label="$t('number')" type="number" :error="$v.partner.addresses.$each[index].number.$error" @input="$v.partner.addresses.$each[index].number.$touch" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.complement" :label="$t('complement')" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.state" :label="$t('state')" :error="$v.partner.addresses.$each[index].state.$error" @input="$v.partner.addresses.$each[index].state.$touch" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.city" :label="$t('city')" :error="$v.partner.addresses.$each[index].city.$error" @input="$v.partner.addresses.$each[index].city.$touch" />
                            </div>

                            <div class="col-12">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.zip_code" :label="$t('zip_code')" :error="$v.partner.addresses.$each[index].zip_code.$error" @input="$v.partner.addresses.$each[index].zip_code.$touch" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="row q-col-gutter-sm justify-end">
                    <div class="col-xs-12 col-sm-3" :class="$q.platform.is.mobile ? 'order-last' : ''">
                        <q-btn dense no-caps color="negative" :label="$t('cancel')" @click="$router.push({ name: 'partners' })" class="full-width" />
                    </div>

                    <div class="col-xs-12 col-sm-3">
                        <q-btn dense no-caps color="positive" :label="$t('save')" @click="savePartner()" class="full-width" />
                    </div>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { required, requiredIf, email } from 'vuelidate/lib/validators'

export default {
    name: 'Pagepartner',

    data() {
        return {
            partner: {
                addresses: [{
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
            },
            partner_id: null
        }
    },

    methods: {
        getPartner() {
            this.$q.loading.show()

            this.$axios.get(`/v1/partner/${this.partner_id}/`)
            .then(response => {
                let d = response.data

                this.partner.name = d.name
                this.partner.email = d.mail
                this.partner.cnpj = d.num_cnpj
                this.partner.phones = d.phones.map(e => ({ number: e} ))
                this.partner.addresses = d.address.map(e => ({ ...e, 
                    city: e.city,
                    complement: e.complement,
                    district: e.district,
                    number: e.number,
                    state: e.state,
                    street: e.street,
                    zip_code: e.zip_code
                }))
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.$q.loading.hide()
            })
        },

        savePartner() {
            this.$v.$touch()

            if (!this.$v.$error) {
                let data = {
                    name: this.partner.name,
                    mail: this.partner.email,
                    num_cnpj: this.partner.cnpj,
                    address: this.partner.addresses.map(e => ({...e})),
                    phones: this.partner.phones.map(e => e.number)
                }

                if (this.partner_id === 0) {
                    this.$axios.post(`/v1/partner`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('partner_created_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'partners' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_creating_partner'),
                            type: 'negative',
                            icon: 'fal fa-ban'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
                }
                else {
                    this.$axios.put(`/v1/partner/${this.partner_id}`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('partner_updated_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'partners' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_updating_partner'),
                            type: 'negative',
                            icon: 'fal fa-ban'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
                }
            }
        },

        addPhone() {
            this.partner.phones.push({
                number: ''
            })
        },

        removePhone(index) {
            this.partner.phones.splice(index, 1)
        },

        addAddress() {
            this.partner.addresses.push({
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
            this.partner.addresses.splice(index, 1)
        }
    },

    created() {
        this.partner_id = parseInt(this.$route.params.id)
        if (this.partner_id !== 0) this.getPartner()
    },

    validations() {
        return {
            partner: {
                name: { required },
                email: { required, email },
                cnpj: {
                    required,
                    isValid() {
                        return this.$validateCnpj(this.partner.cnpj)
                    }
                },
                phones: {
                    $each: {
                        number: { required }
                    }
                },
                addresses: {
                    $each: {
                        city: { required },
                        district: { required },
                        number: { required },
                        state: { required },
                        street: { required },
                        zip_code: { required }
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>