import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from 'src/i18n'

Vue.use(VueI18n)

const dateTimeFormats = {
    'pt-br': {
        short: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
        }
    },
    'en-us': {
        short: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric'
        }
    },
}

const i18n = new VueI18n({
    locale: 'pt-br',
    fallbackLocale: 'pt-br',
    dateTimeFormats,
    messages
})

export default ({ app }) => {
    app.i18n = i18n
}

export { i18n }