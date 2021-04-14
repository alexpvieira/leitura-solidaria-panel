<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-lg">
            <div class="col-12 text-h6 text-dark text-weight-bold">
                {{ $t('users') }}
            </div>
        </div>

        <q-form class="row justify-end q-col-gutter-sm">
            <div class="col-12">
                <q-input outlined dense bg-color="white" v-model="user.name" :label="$t('name')" />
            </div>

            <div class="col-12">
                <q-input outlined dense bg-color="white" v-model="user.email" :label="$t('email')" type="email" />
            </div>

            <div class="col-12">
                <q-select outlined dense bg-color="white" v-model="user.profile" :options="profiles" :label="$t('profile')" :display-value="$t(user.profile.label)">
                    <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                            <q-item-section>
                                <q-item-label>{{ $t(scope.opt.label) }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>

             <div class="col-12" v-if="user.profile.value === 2">
                <q-select outlined dense bg-color="white" v-model="user.ngo" :options="ngos" :label="$t('ngo')" />
            </div>

            <div class="col-12" v-if="user.profile.value === 3">
                <q-select outlined dense bg-color="white" v-model="user.partner" :options="partners" :label="$t('partner')" />
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
import users_list from '../json/users.json'
import profiles_list from '../json/profiles.json'
import partners_list from '../json/partners.json'
import ngos_list from '../json/ngos.json'

export default {
    name: 'PageUser',

    data() {
        return {
            profiles: profiles_list,
            user: {
                email: '',
                name: '',
                profile: {
                    
                }
            },
            ngos: ngos_list.map(e => ({ label: e.name, value: e.id })),
            partners: partners_list.map(e => ({ label: e.name, value: e.id }))
        }
    },

    methods: {
        saveUser() {
            this.$q.notify({
                message:this.$route.params.id === 0 ? this.$t('user_created_successfully') : this.$t('user_updated_successfully'),
                type: 'positive',
                icon: 'fal fa-save'
            })

            this.$router.push({ name: 'users' })
        }
    },

    created() {
        if (this.$route.params.id !== 0) {
            let user = users_list.find(e => e.id === this.$route.params.id)
            if (user) {
                this.user = Object.assign({}, user)
            } 
        }
    }
}
</script>

<style>

</style>