<template>
    <q-page class="q-pa-md">
        <div class="row q-col-gutter-md" v-if="loaded">
            <div class="col-xs-12 col-sm-4 col-lg-3" v-for="(card, index) in cards" :key="index">
                <q-card class="text-center q-py-lg bg-secondary text-white">
                    <q-card-section class="text-h3 text-weight-bold">
                        <i-count-up :start="0" :endVal="getCardValue(card.origin)" :duration="5" :options="options"></i-count-up>
                    </q-card-section>

                    <q-card-section class="text-h6">
                        {{ $t(card.text) }}
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import { mapGetters } from 'vuex'

export default {
    name: 'PageHome',

    data() {
        return {
            cards: [
                {
                    text: 'published_articles',
                    origin: 'articles'
                },
                {
                    text: 'users_active',
                    origin: 'users'
                },
                {
                    text: 'assisted_ngos',
                    origin: 'ngos'
                },
                {
                    text: 'partners',
                    origin: 'partners'
                },
            ],
            options: {
                useEasing: true,
                useGrouping: true,
                separator: '.',
                decimal: '',
                prefix: '',
                suffix: ''
            }
        }
    },

    components: {
        ICountUp
    },

    computed: {
        ...mapGetters({
            articles: 'dashboard/articles',
            loaded: 'dashboard/loaded',
            ngos: 'dashboard/ngos',
            partners: 'dashboard/partners',
            users: 'dashboard/users'
        })
    },

    methods: {
        getAll() {
            this.$q.loading.show()

            this.$axios.all([this.getArticles(), this.getPartners(), this.getNgos(), this.getUsers()])
            .then(this.$axios.spread((articles, partners, ngos, users) => {
                this.$store.dispatch('dashboard/SET_DASHBOARD_DATA', [articles.data.total_elements, true, ngos.data.total_elements, partners.data.total_elements, users.data.total_elements, ])
            }))
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.$q.loading.hide()
            })
        },

        getArticles() {
            return this.$axios.get(`/v1/article/page?page=1&linesPerPage=1`)
        },

        getPartners() {
            return this.$axios.get(`/v1/partner/page?page=1&linesPerPage=1`)
        },

        getNgos() {
            return this.$axios.get(`/v1/ongs/page?page=1&linesPerPage=1`)
        },

        getUsers() {
            return this.$axios.get(`/v1/users/page?page=1&linesPerPage=1`)
        },

        getCardValue(origin) {
            switch(origin) {
                case 'articles': return this.articles
                break
                case 'partners': return this.partners
                break
                case 'ngos': return this.ngos
                break
                case 'users': return this.users
                break
            }
        }
    },

    created() {
        if (!this.loaded) this.getAll()
    }
}
</script>

<style lang="stylus" scoped>

</style>