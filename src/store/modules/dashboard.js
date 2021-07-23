import Vue from 'vue'

const state = {
    articles: 0,
    loaded: false,
    ngos: 0,
    partners: 0,
    users: 0
}

const actions = {
    SET_DASHBOARD_DATA(context, [articles, loaded, ngos, partners, users]) {
        context.commit('SAVE_DASHBOARD_DATA', [articles, loaded, ngos, partners, users])
    }
}

const mutations = {
    SAVE_DASHBOARD_DATA: (state, [articles, loaded, ngos, partners, users]) => {
        Vue.set(state, 'articles', articles)
        Vue.set(state, 'loaded', loaded)
        Vue.set(state, 'ngos', ngos)
        Vue.set(state, 'partners', partners)
        Vue.set(state, 'users', users)
    }
}

const getters = {
    articles: state => {
        return state.articles
    },

    loaded: state => {
        return state.loaded
    },

    ngos: state => {
        return state.ngos
    },

    partners: state => {
        return state.partners
    },

    users: state => {
        return state.users
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}