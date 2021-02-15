import Vue from 'vue'

const state = {
    introduction_watched: false
}

const actions = {
    SET_INTRODUCTION_WATCHED(context, [introduction_watched]) {
        context.commit('SAVE_INTRODUCTION_WATCHED', [introduction_watched])
    }
}

const mutations = {
    SAVE_INTRODUCTION_WATCHED: (state, [introduction_watched]) => {
        Vue.set(state, 'introduction_watched', introduction_watched)
    }
}

const getters = {
    introduction_watched: state => {
        return state.introduction_watched
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}