<template>
    <q-page class="q-pa-md">
        <q-table :title="$t('partners')" :data="partners" :columns="columns" :pagination="pagination" row-key="name" :grid="$q.platform.is.mobile" :rows-per-page-options="[5, 10]">
            <template v-slot:top-right>
                <q-btn no-caps dense color="primary" :label="$t('new_partner')" @click="$router.push({ name: 'partner', params: { id: 0 } })" />
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
                    <q-btn flat round dense icon="fal fa-trash-alt" color="negative" @click="confirmRemove(props.value)">
                        <q-tooltip>
                            {{ $t('remove') }}
                        </q-tooltip>
                    </q-btn>

                    <q-btn flat round dense icon="fal fa-edit" color="secondary" @click="$router.push({ name: 'partner', params: { id: props.value } })">
                        <q-tooltip>
                            {{ $t('edit') }}
                        </q-tooltip>
                    </q-btn>
                </q-td>
            </template>

            <template v-slot:item="props">
                <q-card class="full-width q-mb-md q-pt-md">
                    <q-list dense>
                        <q-item v-for="col in props.cols.filter(col => col.name !== 'actions')" :key="col.name">
                            <q-item-section>
                                <q-item-label>{{ $t(col.label) }}</q-item-label>
                            </q-item-section>

                            <q-item-section side>
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
                                        <q-btn no-caps dense icon="fal fa-edit" color="secondary" class="full-width" :label="$t('edit')" @click="$router.push({ name: 'partner', params: { id: col.value } })" />
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
                    <q-avatar icon="fal fa-handshake-alt" color="primary" text-color="white" />
                    <span class="q-ml-sm">
                        {{ $t('confirm_to_remove_the_partner') }} <strong>{{ selected_partner.name }}</strong>
                    </span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn no-caps :label="$t('cancel')" color="positive" v-close-popup />
                    <q-btn no-caps :label="$t('remove')" color="negative" @click="partnerRemovedConfirmation()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import partners_list from '../json/partners.json'

export default {
    name: 'PagePartners',

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
                field: 'actions',
                label: '',
                name: 'actions',
                sortable: false
            }],
            pagination: {
                descending: false,
                page: 1,
                rowsPerPage: 10,
                sortBy: 'desc'
            },
            selected_partner: {},
            show_confirm_remove: false,
            partners: partners_list
        }
    },

    methods: {
        confirmRemove(value) {
            this.selected_partner = this.partners.find(e => e.id === value)
            this.show_confirm_remove = true
        },

        partnerRemovedConfirmation() {
            this.show_confirm_remove = false
            this.selected_partner = {}

            this.$q.notify({
                message: this.$t('partner_removed_successfully'),
                type: 'positive',
                icon: 'fal fa-handshake-alt'
            })
        }
    }
}
</script>

<style>

</style>