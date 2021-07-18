<template>
    <q-page class="q-pa-md">
        <div class="row q-mb-lg">
            <div class="col-12 text-h6 text-dark text-weight-bold">
                {{ $t('articles') }}
            </div>
        </div>

        <q-form class="row q-col-gutter-sm">
            <div class="col-12">
                <q-input outlined dense hide-bottom-space bg-color="white" v-model="article.title" :label="$t('title')" :error="$v.article.title.$error" @input="$v.article.title.$touch" />
            </div>

            <div class="col-12">
                <q-select outlined dense hide-bottom-space bg-color="white" v-model="article.partner" :options="partners" :label="$t('partner')" :error="$v.article.partner.$error" @input="$v.article.partner.$touch" />
            </div>

            <div class="col-12">
                <q-input outlined dense hide-bottom-space bg-color="white" v-model="article.points" :label="$t('points')" :error="$v.article.points.$error" @input="$v.article.points.$touch" />
            </div>

            <div class="col-12">
                <q-input outlined dense hide-bottom-space bg-color="white" v-model="article.minutes" :label="$t('minutes_of_reading')" :error="$v.article.minutes.$error" @input="$v.article.minutes.$touch" />
            </div>

            <div :class="article.image ? 'col-11' : 'col-12'">
                <q-file outlined dense hide-bottom-space clearable bg-color="white" v-model="article.logo" :label="$t('article_image')" accept=".jpg, image/*" max-file-size="1048576" @rejected="rejectFile" @input="pickedFile" :error="$v.article.image.$error">
                    <template v-slot:prepend>
                        <q-icon name="fal fa-image" />
                    </template>
                </q-file>
            </div>

            <div class="col-1" v-if="article.image">
                <q-btn no-caps color="primary" icon="fal fa-image" class="full-width" @click="show_image = true" />
            </div>

            <div class="col-12">
                <q-input outlined dense hide-bottom-space counter autogrow type="textarea" maxlength="300" bg-color="white" v-model="article.article_summary" :label="$t('article_summary')" :error="$v.article.article_summary.$error" @input="$v.article.article_summary.$touch" />
            </div>

            <div class="col-12">
                <span class="text-body2 text-grey-7">{{ $t('article') }}</span>
                <vue-simplemde v-model="article.full_article" :configs="configs" @input="$v.article.full_article.$touch" :class="$v.article.full_article.$error ? 'error' : ''" />
            </div>

            <div class="col-12">
                <div class="row q-col-gutter-sm justify-end">
                    <div class="col-xs-12 col-sm-3" :class="$q.platform.is.mobile ? 'order-last' : ''">
                        <q-btn dense hide-bottom-space no-caps color="negative" :label="$t('cancel')" @click="$router.push({ name: 'articles' })" class="full-width" />
                    </div>

                    <div class="col-xs-12 col-sm-3">
                        <q-btn dense hide-bottom-space no-caps color="positive" :label="$t('save')" @click="saveArticle()" class="full-width" />
                    </div>
                </div>
            </div>
        </q-form>

        <q-dialog v-model="show_image">
            <image-modal :src="article.image" />
        </q-dialog>
    </q-page>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import ImageModal from 'components/ImageModal'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
    name: 'Pagepartner',

    components: {
        VueSimplemde,
        ImageModal
    },

    data() {
        return {
            article: {
                article_summary: '',
                full_article: '',
                image: null,
                logo: null,
                minutes: 0,
                partner: null,
                points: 0,
                title: ''
            },
            article_id: null,
            configs: {
                hideIcons: ['guide', 'fullscreen', 'side-by-side'],
                promptURLs: true,
                spellChecker: false,
                status: false
            },
            partners: [],
            show_image: false
        }
    },

    methods: {
        getLists() {
            this.$q.loading.show()

            this.$axios.all([this.getPartners()])
            .then(this.$axios.spread((partners) => {
                this.partners = partners.data.map(e => ({...e, label: e.name, value: e.cod_partner}))
            }))
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                if (this.article_id !== 0) this.getArticle()
                else this.$q.loading.hide()
            })
        },

        getPartners() {
            return this.$axios.get(`/v1/partner/partial`)
        },

        getArticle() {
            this.$axios.get(`/v1/article/${this.article_id}/`)
            .then(response => {
                let d = response.data

                this.article.title = d.title
                this.article.image = d.image
                this.article.article_summary = d.article_summary
                this.article.full_article = d.full_article ? d.full_article : ''
                this.article.partner = {
                    label: d.partner.name,
                    value: d.partner.cod_partner
                }
                this.article.points = d.points
                this.article.minutes = d.minutes
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                this.$q.loading.hide()
            })
        },

        saveArticle() {
            this.$v.$touch()

            if (!this.$v.$error) {
                this.$q.loading.show()

                let data = {
                    title: this.article.title,
                    image: this.article.image,
                    article_summary: this.article.article_summary,
                    full_article: this.article.full_article,
                    cod_partner: this.article.partner.value,
                    points: this.article.points,
                    minutes: this.article.minutes
                }

                if (this.article_id === 0) {
                    this.$axios.post(`/v1/article`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('article_created_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'articles' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_creating_article'),
                            type: 'negative',
                            icon: 'fal fa-ban'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
                }
                else {
                    this.$axios.put(`/v1/article/${this.article_id}`, data)
                    .then(response => {
                        this.$q.notify({
                            message: this.$t('article_updated_successfully'),
                            type: 'positive',
                            icon: 'fal fa-save'
                        })

                        this.$router.push({ name: 'articles' })
                    })
                    .catch(e => {
                        console.log(e)

                        this.$q.loading.hide()

                        this.$q.notify({
                            message: this.$t('error_updating_article'),
                            type: 'negative',
                            icon: 'fal fa-ban'
                        })
                    })
                    .finally(() => {
                        this.$q.loading.hide()
                    })
                }

            }
        },

        async pickedFile(value) {
            if (!value) this.article.image = null
            else this.article.image = await this.$imageBase64(value)
            this.$v.article.image.$touch
        },

        rejectFile() {
            this.$q.notify({
                type: 'negative',
                icon: 'fal fa-ban',
                message: this.$t('invalid_file_size_or_type')
            })
        }
    },

    created() {
        this.article_id = parseInt(this.$route.params.id)
        this.getLists()
    },

    validations() {
        return {
            article: {
                title: { required },
                image: { required },
                article_summary: { required },
                full_article: { required },
                partner: { required },
                points: { required, minValue: minValue(1) },
                minutes: { required, minValue: minValue(1) }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~simplemde/dist/simplemde.min.css'
</style>