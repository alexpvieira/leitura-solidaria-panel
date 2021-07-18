<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-lg">
            <div class="col-12 text-h6 text-dark text-weight-bold">
                {{ $t('users') }}
            </div>
        </div>

        <q-form class="row justify-end q-col-gutter-sm">
            <div class="col-12">
                <q-input outlined dense hide-bottom-space bg-color="white" v-model="user.name" :label="$t('name')" :error="$v.user.name.$error" @input="$v.user.name.$touch" />
            </div>

            <div class="col-12">
                <q-input outlined dense hide-bottom-space bg-color="white" v-model="user.email" :label="$t('email')" type="email" :error="$v.user.email.$error" @input="$v.user.email.$touch" @blur="checkEmail()">
                    <template v-slot:error>
                        <span slot="error-label" v-if="email_in_use">
                            {{ $t('email_already_used') }}
                        </span>
                    </template>
                </q-input>
            </div>

            <div class="col-12">
                <q-select outlined dense hide-bottom-space bg-color="white" v-model="user.profile" :options="profiles" :label="$t('profile')" :display-value="$t(user.profile.label)" :error="$v.user.profile.$error" @input="$v.user.profile.$touch">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                            <q-item-section>
                                <q-item-label>{{ $t(scope.opt.label) }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>

             <div class="col-12" v-if="user.profile.value === 1">
                <q-select outlined dense hide-bottom-space bg-color="white" v-model="user.ngo" :options="ngos" :label="$t('ngo')" :error="$v.user.ngo.$error" @input="$v.user.ngo.$touch" />
            </div>

            <div class="col-12" v-if="user.profile.value === 3">
                <q-select outlined dense hide-bottom-space bg-color="white" v-model="user.partner" :options="partners" :label="$t('partner')" :error="$v.user.partner.$error" @input="$v.user.partner.$touch" />
            </div>

            <div class="col-12 q-mt-md">
                <div class="row q-col-gutter-sm justify-end">
                    <div class="col-xs-12 col-sm-3" :class="$q.platform.is.mobile ? 'order-last' : ''">
                        <q-btn dense no-caps color="negative" :label="$t('cancel')" @click="$router.push({ name: 'users' })" class="full-width" />
                    </div>

                    <div class="col-xs-12 col-sm-3">
                        <q-btn dense no-caps color="positive" :label="$t('save')" @click="saveUser()" class="full-width" />
                    </div>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { required, requiredIf, email } from 'vuelidate/lib/validators'

export default {
    name: 'PageUser',

    data() {
        return {
            email_in_use: null,
            ngos: [],
            partners: [],
            profiles: [],
            user: {
                avatar: '',
                email: '',
                name: '',
                ngo: null,
                partner: null,
                profile: {}
            },
            user_id: null
        }
    },

    methods: {
        getLists() {
            this.$q.loading.show()

            this.$axios.all([this.getProfiles(), this.getNgos(), this.getPartners()])
            .then(this.$axios.spread((profiles, ngos, partners) => {
                this.profiles = profiles.data.map(e => ({...e, label: e.type.toLowerCase(), value: e.cod_profile}))
                this.ngos = ngos.data.map(e => ({...e, label: e.name, value: e.cod_ongs}))
                this.partners = partners.data.map(e => ({...e, label: e.name, value: e.cod_partner}))
            }))
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                if (this.user_id !== 0) this.getUser()
                else this.$q.loading.hide()
            })
        },

        getProfiles() {
            return this.$axios.get(`/v1/profiles`)
        },

        getNgos() {
            return this.$axios.get(`/v1/ongs/partial`)
        },

        getPartners() {
            return this.$axios.get(`/v1/partner/partial`)
        },

        getUser() {
            this.$axios.get(`/v1/users/${this.user_id}/`)
            .then(response => {
                let d = response.data

                this.user.email = d.mail
                this.user.name = d.name
                this.user.avatar = d.url_img
                this.user.profile.label = d.profiles.type.toLowerCase()
                this.user.profile.value = d.profiles.cod_profile

                if (d.ong) {
                    this.user.ngo = {
                        label: d.ong.name,
                        value: d.ong.cod_ongs
                    }
                }

                if (d.partner) {
                    this.user.partner = {
                        label: d.partner.name,
                        value: d.partner.cod_partner
                    }
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.$q.loading.hide()
            })
        },

        saveUser() {
            this.$v.$touch()

            if (!this.$v.$error) {
                this.$q.loading.show()

                let data = {
                    full_name: this.user.name,
                    mail: this.user.email,
                    url_image: this.user.avatar,
                    cod_profile: this.user.profile.value,
                    cod_ongs: this.user.profile.value === 1 ? this.user.ngo.value : null,
                    cod_partner: this.user.profile.value === 3 ? this.user.partner.value : null
                }

                if (this.user_id === 0) {
                    this.$axios.post(`/v1/users`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('user_created_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'users' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_creating_user'),
                            type: 'negative',
                            icon: 'fal fa-ban'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
                }
                else {
                    this.$axios.put(`/v1/users/${this.user_id}`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('user_updated_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'users' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_updating_user'),
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

        checkEmail() {
            if (this.user.email) {
                let data = {
                    cod_user: this.user_id,
                    mail: this.user.email
                }

                this.$axios.post(`/v1/users/check_mail`, data)
                .then(response => {
                    this.email_in_use = response.data.in_use
                })
                .catch(e => {
                    console.log(e)
                })
            }
            else this.email_in_use = null
        }
    },

    created() {
        this.user_id = parseInt(this.$route.params.id)
        this.getLists()
    },

    validations() {
        return {
            user: {
                name: { required },
                email: { required, email, 
                    emailUnique() {
                        if (!this.email_in_use) return true
                        else return false
                    }
                },
                profile: { required },
                ngo: {
                    requiredIf: requiredIf(() => {
                        return this.user.profile?.value === 1
                    })
                },
                partner: {
                    requiredIf: requiredIf(() => {
                        return this.user.profile?.value === 3
                    })
                }
            }
        }
    }
}
</script>

<style>

</style>