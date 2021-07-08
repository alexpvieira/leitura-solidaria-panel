<template>
    <q-page class="q-pa-lg padding-not-authenticated">
        <div class="row justify-center">
            <div class="col-xs-12 col-sm-4">
                <q-form @submit.prevent="login()">
                    <div class="row justify-center q-col-gutter-sm">
                        <div class="col-xs-12 col-sm-10">
                            <q-img src="logo.png" />
                        </div>

                        <div class="col-12 q-mt-lg">
                            <q-input outlined dense hide-bottom-space v-model="email" :label="$t('email')" :error="$v.email.$error" @input="$v.email.$touch" />
                        </div>

                        <div class="col-12">
                            <q-input outlined dense hide-bottom-space v-model="password" type="password" :label="$t('password')" :error="$v.password.$error" @input="$v.password.$touch" />
                        </div>

                        <div class="col-12">
                            <q-btn no-caps type="submit" class="full-width" color="primary" :label="$t('sign_in')" />
                        </div>

                        <div class="col-12 text-center text-caption">
                            <q-btn no-caps flat dense no-caps color="primary" :label="$t('recover_password')" @click="$router.push({ name: 'recover-password' })" />
                        </div>
                    </div>
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    computed: {
        ...mapGetters({
            user: 'persist/user'
        })
    },

    methods: {
        login() {
            this.$v.$touch()

            if (!this.$v.$error) {
                this.$q.loading.show()

                let data = {
                    mail: this.email,
                    password: this.password
                }

                this.$axios.post(`/login`, data)
                .then(response => {
                    this.$store.dispatch('persist/SET_ACCESS_TOKEN', [response.data.Authorization])
                    this.getUserData()
                })
                .catch(e => {
                    console.log(e)

                    this.$q.loading.hide()

                    this.$q.notify({
                        message: this.$t('invalid_email_or_password'),
                        type: 'negative',
                        icon: 'fal fa-ban'
                    })
                })
            }
        },

        getUserData() {
            this.$axios.get(`/v1/users/mail?mail=${this.$jwtDecode()}`)
            .then(response => {
                this.$store.dispatch('persist/SET_USER', [response.data])

                if (this.user?.profiles?.type !== 'USER') {
                    this.$router.replace({ name: 'home' })
                }
                else {
                    this.$q.notify({
                        message: this.$t('this_user_does_not_have_access_to_the_control_panel'),
                        type: 'negative',
                        icon: 'fal fa-ban'
                    })
                }
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.$q.loading.hide()
            })
        }
    },

    validations() {
        return {
            email: { required },
            password: { required }
        }
    }
}
</script>

<style>

</style>