import Vue from 'vue'

const state = {
    access_token: '',
    introduction_watched: false,
    user: {}
}

const actions = {
    SET_INTRODUCTION_WATCHED(context, [introduction_watched]) {
        context.commit('SAVE_INTRODUCTION_WATCHED', [introduction_watched])
    },

    SET_ACCESS_TOKEN(context, [access_token]) {
        context.commit('SAVE_ACCESS_TOKEN', [access_token])
    },

    SET_USER(context, [user]) {
        context.commit('SAVE_USER', [user])
    }
}

const mutations = {
    SAVE_INTRODUCTION_WATCHED: (state, [introduction_watched]) => {
        Vue.set(state, 'introduction_watched', introduction_watched)
    },

    SAVE_ACCESS_TOKEN: (state, [access_token]) => {
        Vue.set(state, 'access_token', access_token)
    },

    SAVE_USER: (state, [user]) => {
        Vue.set(state, 'user', user)
    }
}

const getters = {
    access_token: state => {
        return state.access_token
    },

    introduction_watched: state => {
        return state.introduction_watched
    },

    user: state => {
        return state.user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}