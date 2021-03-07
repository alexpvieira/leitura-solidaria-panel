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
                                <q-item-label caption>{{ $t(scope.opt.label) }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </div>

            <div class="col-xs-12 col-sm-3">
                <q-btn dense no-caps color="negative" :label="$t('cancel')" @click="$router.push({ name: 'users' })" class="full-width" />
            </div>

            <div class="col-xs-12 col-sm-3">
                <q-btn dense no-caps color="positive" :label="$t('save')" @click="$router.push({ name: 'users' })" class="full-width" />
            </div>
        </q-form>
    </q-page>
</template>

<script>
import users_list from '../json/users.json'

export default {
    name: 'PageUser',

    data() {
        return {
            profiles: [{
                label: 'user',
                value: 'user'
            }, {
                label: 'ngo',
                value: 'ngo'
            }, {
                label: 'partner',
                value: 'partner'
            }],
            user: {
                email: '',
                name: '',
                profile: ''
            }
        }
    },

    created() {
        if (this.$route.params.id !== 0) {
            let user = users_list.find(e => e.id === this.$route.params.id)
            if (user) {
                this.user = Object.assign({}, user)
                this.user.profile = this.profiles.find(e => e.value === user.profile)
            } 
        }
    }
}
</script>

<style>

</style>