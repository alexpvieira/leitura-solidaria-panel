<template>
    <q-page class="q-pa-md">
        <q-table :title="$t('articles')" :data="articles" :columns="columns" :pagination="pagination" row-key="id" :grid="$q.platform.is.mobile" :rows-per-page-options="[5, 10]">
            <template v-slot:top-right>
                <q-btn no-caps dense color="primary" :label="$t('new_article')" @click="$router.push({ name: 'article', params: { id: 0 } })" />
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

            <template v-slot:body-cell-partner="props">
                <q-td :props="props">
                    {{ props.value.label }}
                </q-td>
            </template>

            <template v-slot:body-cell-publication_date="props">
                <q-td :props="props">
                    {{ $d(new Date(props.value), 'short') }}
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td auto-width :props="props">
                    <q-btn flat round dense icon="fal fa-trash-alt" color="negative" @click="confirmRemove(props.value)">
                        <q-tooltip>
                            {{ $t('remove') }}
                        </q-tooltip>
                    </q-btn>

                    <q-btn flat round dense icon="fal fa-edit" color="secondary" @click="$router.push({ name: 'article', params: { id: props.value } })">
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

                            <q-item-section side>
                                <q-item-label caption v-if="col.name === 'partner'">
                                    {{ col.value.label }}
                                </q-item-label>

                                <q-item-label caption v-else-if="col.name === 'publication_date'">
                                    {{ $d(new Date(col.value), 'short') }}
                                </q-item-label>

                                <q-item-label caption v-else>
                                    {{ col.value }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item v-for="col in props.cols.filter(col => col.name === 'actions')" :key="col.name">
                            <q-item-section>
                                <div class="row q-col-gutter-sm justify-center">
                                    <div class="col-4">
                                        <q-btn no-caps dense icon="fal fa-trash-alt" color="negative" class="full-width" :label="$t('remove')" @click="confirmRemove(col.value)" />
                                    </div>

                                    <div class="col-4">
                                        <q-btn no-caps dense icon="fal fa-edit" color="secondary" class="full-width" :label="$t('edit')" @click="$router.push({ name: 'article', params: { id: col.value } })" />
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
                    <q-avatar icon="fal fa-newspaper" color="primary" text-color="white" />
                    <span class="q-ml-sm">
                        {{ $t('confirm_to_remove_the_article') }} <strong>{{ selected_article.title }}</strong>
                    </span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn no-caps :label="$t('cancel')" color="positive" v-close-popup />
                    <q-btn no-caps :label="$t('remove')" color="negative" @click="articleRemovedConfirmation()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import articles_list from '../json/articles.json'

export default {
    name: 'PageArticles',

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
                field: 'title',
                label: 'title',
                name: 'title',
                sortable: true
            }, {
                align: 'left',
                field: 'partner',
                label: 'partner',
                name: 'partner',
                sortable: true
            }, {
                align: 'left',
                field: 'points',
                label: 'points',
                name: 'points',
                sortable: true
            }, {
                align: 'left',
                field: 'readings',
                label: 'readings',
                name: 'readings',
                sortable: true
            }, {
                align: 'left',
                field: 'publication_date',
                label: 'publication_date',
                name: 'publication_date',
                sortable: false
            }, {
                align: 'left',
                field: 'actions',
                label: '',
                name: 'actions',
                sortable: false
            }],
            articles: articles_list,
            pagination: {
                descending: false,
                page: 1,
                rowsPerPage: 10,
                sortBy: 'desc'
            },
            selected_article: {},
            show_confirm_remove: false
        }
    },

    methods: {
        confirmRemove(value) {
            this.selected_article = this.articles.find(e => e.id === value)
            this.show_confirm_remove = true
        },

        articleRemovedConfirmation() {
            this.show_confirm_remove = false
            this.selected_user = {}

            this.$q.notify({
                message: this.$t('article_removed_successfully'),
                type: 'positive',
                icon: 'fal fa-newspaper'
            })
        }
    }
}
</script>

<style>

</style>