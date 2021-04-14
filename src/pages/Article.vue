<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-lg">
            <div class="col-12 text-h6 text-dark text-weight-bold">
                {{ $t('articles') }}
            </div>
        </div>

        <q-form class="row q-col-gutter-lg">
            <div class="col-12">
                <q-input outlined dense bg-color="white" v-model="article.title" :label="$t('title')" />
            </div>

            <div class="col-12">
                <q-select outlined dense bg-color="white" v-model="article.partner" :options="partners" :label="$t('partner')" />
            </div>

            <div class="col-12">
                <q-input outlined dense bg-color="white" v-model="article.points" :label="$t('points')" />
            </div>

            <div class="col-12">
                <q-input outlined dense bg-color="white" v-model="article.minutes" :label="$t('minutes_of_reading')" />
            </div>

            <div class="col-12">
                <q-input outlined dense counter autogrow type="textarea" maxlength="300" bg-color="white" v-model="article.article_summary" :label="$t('article_summary')" />
            </div>

            <div class="col-12">
                <span class="text-body1 text-grey-7">{{ $t('article') }}</span>
                <vue-simplemde v-model="article.full_article" :configs="configs" />
            </div>

            <div class="col-12">
                <q-uploader hide-upload-btn auto-upload inverted no-thumbnails :label="$t('article_image')" url="http://localhost:4444/upload" accept=".jpg, image/*" class="full-width" />
            </div>

            <div class="col-12">
                <div class="row q-col-gutter-sm justify-end">
                    <div class="col-xs-12 col-sm-3" :class="$q.platform.is.mobile ? 'order-last' : ''">
                        <q-btn dense no-caps color="negative" :label="$t('cancel')" @click="$router.push({ name: 'articles' })" class="full-width" />
                    </div>

                    <div class="col-xs-12 col-sm-3">
                        <q-btn dense no-caps color="positive" :label="$t('save')" @click="saveArticle()" class="full-width" />
                    </div>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import partners_list from '../json/partners.json'
import articles_list from '../json/articles.json'

export default {
    name: 'Pagepartner',

    components: {
        VueSimplemde
    },

    data() {
        return {
            article: {
                title: '',
                image: '',
                article_summary: '',
                full_article: '',
                partner: '',
                points: 0,
                minutes: 0
            },
            configs: {
                promptURLs: true,
                hideIcons: ['guide', 'fullscreen', 'side-by-side'],
                spellChecker: false,
                status: false
            },
            partners: partners_list.map(e => ({ label: e.name, value: e.id }))
        }
    },

    methods: {
        saveArticle() {
            this.$q.notify({
                message:this.$route.params.id === 0 ? this.$t('article_created_successfully') : this.$t('article_updated_successfully'),
                type: 'positive',
                icon: 'fal fa-save'
            })

            this.$router.push({ name: 'articles' })
        }
    },

    created() {
        if (this.$route.params.id !== 0) {
            let article = articles_list.find(e => e.id === this.$route.params.id)
            if (article) {
                this.article = Object.assign({}, article)
            } 
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~simplemde/dist/simplemde.min.css'
</style>