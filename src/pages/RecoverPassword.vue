<template>
    <q-page class="q-pa-lg padding-not-authenticated">
        <div class="row justify-center">
            <div class="col-xs-12 col-sm-4">
                <q-form>
                    <div class="row justify-center q-col-gutter-sm">
                        <div class="col-xs-12 col-sm-10">
                            <q-img src="logo.png" />
                        </div>

                        <div class="col-12 q-mt-lg">
                            <q-input outlined dense hide-bottom-space v-model="email" :label="$t('email')" :error="$v.email.$error" @input="$v.email.$touch" />
                        </div>

                        <div class="col-12">
                            <q-btn no-caps class="full-width" color="primary" :label="$t('submit')" @click="recoverPassword()" />
                        </div>

                        <div class="col-12 q-mt-md text-center text-caption">
                            <router-link :to="{ name: 'login' }">{{ $t('back') }}</router-link>
                        </div>
                    </div>
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'RecoverPassword',

    data() {
        return {
            email: ''
        }
    },

    methods: {
        recoverPassword() {
            this.$v.$touch()

            if (!this.$v.$error) {
                this.$q.loading.show()

                let data = {
                    mail: this.email
                }

                this.$axios.post(`/v1/auth/forgot/`, data)
                .then(response => {
                    this.$q.notify({
                        message: this.$t('a_new_password_has_been_sent_to_your_email'),
                        type: 'positive',
                        icon: 'fal fa-check'
                    })
                    
                    this.$router.replace({ name: 'login' })
                })
                .catch(e => {
                    console.log(e)

                    this.$q.notify({
                        message: this.$t('email_not_found'),
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

    validations() {
        return {
            email: { required, email }
        }
    }
}
</script>

<style>

</style>