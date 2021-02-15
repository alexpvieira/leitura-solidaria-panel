<template>
    <q-page class="q-pa-md">
        <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-4 col-lg-3" v-for="(card, index) in cards" :key="index">
                <q-card class="text-center q-py-lg bg-secondary text-white">
                    <q-card-section class="text-h2 text-weight-bold">
                        <i-count-up :start="0" :endVal="card.number" :duration="5" :options="options"></i-count-up>
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

export default {
    name: 'PageHome',

    data() {
        return {
            cards: [
                {
                    number: 127,
                    text: 'news_published'
                },
                {
                    number: 441706,
                    text: 'news_read'
                },
                {
                    number: 1347,
                    text: 'money_raised'
                },
                {
                    number: 3478,
                    text: 'users_active'
                },
                {
                    number: 4,
                    text: 'assisted_ngos'
                },
                {
                    number: 8,
                    text: 'partners'
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
    }
}
</script>

<style lang="stylus" scoped>

</style>