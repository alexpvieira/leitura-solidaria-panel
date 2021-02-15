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
                            <q-input outlined dense v-model="email" :label="$t('email')" />
                        </div>

                        <div class="col-12">
                            <q-btn class="full-width" color="primary" :label="$t('submit')" />
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
export default {
    name: 'RecoverPassword',

    data() {
        return {
            email: ''
        }
    }
}
</script>

<style>

</style>