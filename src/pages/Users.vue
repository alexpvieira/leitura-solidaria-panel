<template>
    <q-page class="q-pa-md">
        <q-table :title="$t('users')" :data="users" :columns="columns" :pagination.sync="pagination" :loading="loading" @request="getUsers" row-key="id" :grid="$q.platform.is.mobile" :rows-per-page-options="[5, 10]">
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

            <template v-slot:body-cell-id="props">
                <q-td auto-width :props="props">
                    {{ props.value }}
                </q-td>
            </template>

            <template v-slot:body-cell-profiles="props">
                <q-td :props="props">
                    {{ $t(props.value.type.toLowerCase()) }}
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td auto-width :props="props">
                    <q-btn flat round dense icon="fal fa-trash-alt" color="negative" @click="confirmRemove(props.value)">
                        <q-tooltip>
                            {{ $t('remove') }}
                        </q-tooltip>
                    </q-btn>

                    <q-btn flat round dense icon="fal fa-edit" color="secondary" @click="$router.push({ name: 'user', params: { id: props.value } })">
                        <q-tooltip>
                            {{ $t('edit') }}
                        </q-tooltip>
                    </q-btn>
                </q-td>
            </template>

            <template v-slot:item="props">
                <q-card class="full-width q-mb-md q-pt-md">
                    <q-list dense>
                        <q-item v-for="col in props.cols.filter(col => col.name !== 'actions' && col.name !== 'id')" :key="col.name">
                            <q-item-section>
                                <q-item-label>{{ $t(col.label) }}</q-item-label>
                            </q-item-section>

                            <q-item-label caption v-if="col.name === 'profile'">
                                {{ $t(col.value.label) }}
                            </q-item-label>

                            <q-item-section side v-else>
                                <q-item-label caption>{{ col.value }}</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item v-for="col in props.cols.filter(col => col.name === 'actions')" :key="col.name">
                            <q-item-section>
                                <div class="row q-col-gutter-sm justify-center">
                                    <div class="col-4">
                                        <q-btn no-caps dense icon="fal fa-trash-alt" color="negative" class="full-width" :label="$t('remove')" @click="confirmRemove(col.value)" />
                                    </div>

                                    <div class="col-4">
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
                    <q-btn no-caps :label="$t('cancel')" color="positive" v-close-popup />
                    <q-btn no-caps :label="$t('remove')" color="negative" @click="userRemovedConfirmation()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import profiles_list from '../json/profiles.json'

export default {
    name: 'PageUsers',

    data() {
        return {
            columns: [{
                align: 'left',
                field: 'id',
                label: '',
                name: 'id',
                sortable: false
            }, {
                align: 'left',
                field: 'name',
                label: 'name',
                name: 'name',
                sortable: true
            }, {
                align: 'left',
                field: 'mail',
                label: 'email',
                name: 'mail',
                sortable: true
            }, {
                align: 'left',
                field: 'profiles',
                label: 'profile',
                name: 'profiles',
                sortable: true
            }, {
                align: 'left',
                field: 'actions',
                label: '',
                name: 'actions',
                sortable: false
            }],
            pagination: {
                sortBy: 'desc',
                descending: false,
                page: 1,
                rowsPerPage: 10,
                rowsNumber: 10
            },
            selected_user: {},
            show_confirm_remove: false,
            users: [],
            loading: false
        }
    },

    methods: {
        getUsers({ pagination }) {
            this.loading = true
            this.pagination = pagination

            let order = pagination.descending ? '-' : ''
            let order_by = pagination.sortBy ? order + pagination.sortBy : ''

            let data = {
                'linesPerPage': this.pagination.rowsPerPage,
                'page': this.pagination.page,
                'ordering': order_by
            }

            this.$axios.get(`/v1/users/page?${this.$qs.stringify(data)}`)
            .then(response => {
                this.pagination.rowsNumber = response.data.total_elements
                this.users = response.data.results.map(e => ({...e, actions: e.id}))
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.loading = false
            })
        },

        confirmRemove(value) {
            this.selected_user = this.users.find(e => e.id === value)
            this.show_confirm_remove = true
        },

        userRemovedConfirmation() {
            this.$q.loading.show()

            this.$axios.delete(`/v1/users/${this.selected_user.id}`)
            .then(response => {
                this.getUsers({ pagination: {
                        sortBy: 'desc',
                        descending: false,
                        page: 1,
                        rowsPerPage: 10,
                        rowsNumber: 10
                    } 
                })
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.show_confirm_remove = false
                this.selected_user = {}
                this.$q.loading.hide()

                this.$q.notify({
                    message: this.$t('user_removed_successfully'),
                    type: 'positive',
                    icon: 'fal fa-user'
                })
            })
        }
    },

    created() {
        this.getUsers({ pagination: this.pagination })
    }
}
</script>

<style>

</style>