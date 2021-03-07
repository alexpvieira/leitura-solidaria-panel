<template>
    <q-page class="q-pa-md">
        <q-table :title="$t('users')" :data="users" :columns="columns" :pagination="pagination" row-key="name" :grid="$q.platform.is.mobile">
            <template v-slot:top-right>
                <q-btn no-caps dense color="primary" :label="$t('new_user')" @click="$router.push({ name: 'user', params: { id: 0 } })" />
            </template>
            
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ $t(col.label) }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body-cell-profile="props">
                <q-td :props="props">
                    {{ $t(props.value) }}
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td auto-width :props="props">
                    <q-btn flat round dense icon="fal fa-trash-alt" color="negative" @click="confirmRemove(props.value)" />
                    <q-btn flat round dense icon="fal fa-edit" color="secondary" @click="$router.push({ name: 'user', params: { id: props.value } })" />
                </q-td>
            </template>

            <template v-slot:item="props">
                <q-card class="full-width q-mb-md q-pt-md">
                    <q-list dense>
                        <q-item v-for="col in props.cols.filter(col => col.name !== 'actions' && col.name !== 'profile')" :key="col.name">
                            <q-item-section>
                                <q-item-label>{{ $t(col.label) }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                                <q-item-label caption>{{ col.value }}</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item v-for="col in props.cols.filter(col => col.name === 'profile')" :key="col.name">
                            <q-item-section>
                                <q-item-label>{{ $t(col.label) }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
                                <q-item-label caption>{{ $t(col.value) }}</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item v-for="col in props.cols.filter(col => col.name === 'actions')" :key="col.name">
                            <q-item-section>
                                <div class="row q-col-gutter-sm">
                                    <div class="col-6">
                                        <q-btn no-caps dense icon="fal fa-trash-alt" color="negative" class="full-width" :label="$t('remove')" @click="confirmRemove(col.value)" />
                                    </div>

                                    <div class="col-6">
                                        <q-btn no-caps dense icon="fal fa-edit" color="secondary" class="full-width" :label="$t('edit')" @click="$router.push({ name: 'user', params: { id: col.value } })" />
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>
            </template>
        </q-table>

        <q-dialog v-model="show_confirm_remove" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="fal fa-user" color="primary" text-color="white" />
                    <span class="q-ml-sm">
                        {{ $t('confirm_to_remove_the_user') }} <strong>{{ selected_user.name }}</strong>
                    </span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn no-caps :label="$t('remove')" color="negative" @click="userRemovedConfirmation()" />
                    <q-btn no-caps :label="$t('cancel')" color="positive" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import users_list from '../json/users.json'

export default {
    name: 'PageUsers',

    data() {
        return {
            columns: [{
                align: 'left',
                field: 'name',
                label: 'name',
                name: 'name',
                sortable: true
            }, {
                align: 'left',
                field: 'email',
                label: 'email',
                name: 'email',
                sortable: true
            }, {
                align: 'left',
                field: 'profile',
                label: 'profile',
                name: 'profile',
                sortable: true
            }, {
                align: 'left',
                field: 'actions',
                label: '',
                name: 'actions',
                sortable: false
            }],
            pagination: {
                descending: false,
                page: 1,
                rowsPerPage: 5,
                sortBy: 'desc'
            },
            selected_user: {},
            show_confirm_remove: false,
            users: users_list
        }
    },

    methods: {
        confirmRemove(value) {
            this.selected_user = this.users.find(e => e.id === value)
            this.show_confirm_remove = true
        },

        userRemovedConfirmation() {
            this.show_confirm_remove = false
            this.selected_user = {}

            this.$q.notify({
                message: this.$t('user_removed_successfully'),
                type: 'positive',
                icon: 'fal fa-user'
            })
        }
    }
}
</script>

<style>

</style>