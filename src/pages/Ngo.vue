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
                        <q-input outlined dense hide-bottom-space bg-color="white" v-model="ngo.name" :label="$t('name')" :error="$v.ngo.name.$error" @input="$v.ngo.name.$touch" />
                    </div>

                    <div class="col-12">
                        <q-input outlined dense hide-bottom-space bg-color="white" v-model="ngo.email" :label="$t('email')" type="email" :error="$v.ngo.email.$error" @input="$v.ngo.email.$touch" @blur="checkEmail()">
                            <template v-slot:error>
                                <span slot="error-label" v-if="email_in_use">
                                    {{ $t('email_already_used') }}
                                </span>
                            </template>
                        </q-input>
                    </div>

                    <div class="col-12">
                        <q-input outlined dense hide-bottom-space bg-color="white" v-model="ngo.cnpj" :label="$t('cnpj')" :error="$v.ngo.cnpj.$error" @input="$v.ngo.cnpj.$touch" @blur="checkCnpj()">
                            <template v-slot:error>
                                <span slot="error-label" v-if="cnpj_in_use">
                                    {{ $t('cnpj_already_used') }}
                                </span>
                            </template>
                        </q-input>
                    </div>

                    <div :class="ngo.image ? 'col-xs-10 col-sm-11' : 'col-12'">
                        <q-file outlined dense clearable bg-color="white" v-model="ngo.logo" :label="$t('ngo_logo')" accept=".jpg, image/*" max-file-size="1048576" @rejected="rejectFile" @input="pickedFile" :error="$v.ngo.image.$error">
                            <template v-slot:prepend>
                                <q-icon name="fal fa-image" />
                            </template>
                        </q-file>
                    </div>

                    <div class="col-xs-2 col-sm-1" v-if="ngo.image">
                        <q-btn no-caps color="primary" icon="fal fa-image" class="full-width" @click="show_image = true" />
                    </div>

                    <div class="col-12">
                        <span class="text-body2 text-grey-7">{{ $t('ngo_description') }}</span>
                        <vue-simplemde v-model="ngo.description" :configs="configs" @input="$v.ngo.description.$touch" :class="$v.ngo.description.$error ? 'error' : ''" />
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
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="phone.number" :label="$t('phone')" :error="$v.ngo.phones.$each[index].number.$error" @input="$v.ngo.phones.$each[index].number.$touch">
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
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.street" :label="$t('street')" :error="$v.ngo.addresses.$each[index].street.$error" @input="$v.ngo.addresses.$each[index].street.$touch">
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
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.number" :label="$t('number')" type="number" :error="$v.ngo.addresses.$each[index].number.$error" @input="$v.ngo.addresses.$each[index].number.$touch" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.complement" :label="$t('complement')" />
                            </div>

                            <div class="col-12">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.district" :label="$t('district')" :error="$v.ngo.addresses.$each[index].district.$error" @input="$v.ngo.addresses.$each[index].district.$touch" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.state" :label="$t('state')" :error="$v.ngo.addresses.$each[index].state.$error" @input="$v.ngo.addresses.$each[index].state.$touch" />
                            </div>

                            <div class="col-xs-12 col-sm-6">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.city" :label="$t('city')" :error="$v.ngo.addresses.$each[index].city.$error" @input="$v.ngo.addresses.$each[index].city.$touch" />
                            </div>

                            <div class="col-12">
                                <q-input outlined dense hide-bottom-space bg-color="white" v-model="address.zip_code" :label="$t('zip_code')" :error="$v.ngo.addresses.$each[index].zip_code.$error" @input="$v.ngo.addresses.$each[index].zip_code.$touch" />
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

        <q-dialog v-model="show_image">
            <image-modal :src="ngo.image" />
        </q-dialog>
    </q-page>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import ImageModal from 'components/ImageModal'
import { required, requiredIf, email } from 'vuelidate/lib/validators'

export default {
    name: 'PageNgo',

    components: {
        VueSimplemde,
        ImageModal
    },

    data() {
        return {
            cnpj_in_use: null,
            configs: {
                hideIcons: ['guide', 'fullscreen', 'side-by-side'],
                promptURLs: true,
                spellChecker: false,
                status: false
            },
            email_in_use: null,
            ngo: {
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
                description: '',
                email: '',
                id: 0,
                image: null,
                logo: null,
                name: '',
                phones: [{
                    number: ''
                }]
            },
            ngo_id: null,
            show_image: false
        }
    },

    methods: {
        getNgo() {
            this.$q.loading.show()

            this.$axios.get(`/v1/ongs/${this.ngo_id}/`)
            .then(response => {
                let d = response.data

                this.ngo.name = d.name
                this.ngo.email = d.mail
                this.ngo.cnpj = d.num_cnpj
                this.ngo.image = d.image
                this.ngo.description = d.description ? d.description : ''
                
                if (d.phones.length > 0) {
                    this.ngo.phones = d.phones.map(e => ({ number: e} ))
                }

                if (d.address.length > 0) {
                    this.ngo.addresses = d.address.map(e => ({ ...e, 
                        city: e.city,
                        complement: e.complement,
                        district: e.district,
                        number: e.number,
                        state: e.state,
                        street: e.street,
                        zip_code: e.zip_code
                    }))
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.$q.loading.hide()
            })
        },

        saveNgo() {
            this.$v.$touch()

            if (!this.$v.$error) {
                this.$q.loading.show()

                let data = {
                    name: this.ngo.name,
                    mail: this.ngo.email,
                    image: this.ngo.image,
                    description: this.ngo.description,
                    num_cnpj: this.ngo.cnpj,
                    address: this.ngo.addresses.map(e => ({...e})),
                    phones: this.ngo.phones.map(e => e.number)
                }

                if (this.ngo_id === 0) {
                    this.$axios.post(`/v1/ongs`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('ngo_created_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'ngos' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_creating_ngo'),
                            type: 'negative',
                            icon: 'fal fa-ban'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
                }
                else {
                    this.$axios.put(`/v1/ongs/${this.ngo_id}`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('ngo_updated_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'ngos' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_updating_ngo'),
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

        async pickedFile(value) {
            if (!value) this.ngo.image = null
            else this.ngo.image = await this.$imageBase64(value)
            this.$v.ngo.image.$touch
        },

        rejectFile() {
            this.$q.notify({
                type: 'negative',
                icon: 'fal fa-ban',
                message: this.$t('invalid_file_size_or_type')
            })
        },

        checkEmail() {
            if (this.ngo.email) {
                let data = {
                    cod_ong: this.ngo_id,
                    mail: this.ngo.email
                }

                this.$axios.post(`/v1/ongs/check_mail`, data)
                .then(response => {
                    this.email_in_use = response.data.in_use
                })
                .catch(e => {
                    console.log(e)
                })
            }
            else this.email_in_use = null
        },

        checkCnpj() {
            if (this.ngo.cnpj) {
                let data = {
                    cod_ong: this.ngo_id,
                    num_cnpj: this.ngo.cnpj
                }

                this.$axios.post(`/v1/ongs/check_cnpj`, data)
                .then(response => {
                    this.cnpj_in_use = response.data.in_use
                })
                .catch(e => {
                    console.log(e)
                })
            }
            else this.cnpj_in_use = null
        }
    },

    created() {
        this.ngo_id = parseInt(this.$route.params.id)
        if (this.ngo_id !== 0) this.getNgo()
    },

    validations() {
        return {
            ngo: {
                name: { required },
                email: { required, email, 
                    emailUnique() {
                        if (!this.email_in_use) return true
                        else return false
                    }
                },
                description: { required },
                image: { required },
                cnpj: {
                    required,
                    isValid() {
                        return this.$validateCnpj(this.ngo.cnpj)
                    },
                    cnpjUnique() {
                        if (!this.cnpj_in_use) return true
                        else return false
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

<style lang="stylus" scoped>
@import '~simplemde/dist/simplemde.min.css'
</style>