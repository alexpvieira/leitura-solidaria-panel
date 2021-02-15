import Vue from 'vue'

const state = {
    drawer_open: false
}

const actions = {
    SET_DRAWER_STATE(context, [drawer_open]) {
        context.commit('SAVE_DRAWER_STATE', [drawer_open])
    }
}

const mutations = {
    SAVE_DRAWER_STATE: (state, [drawer_open]) => {
        Vue.set(state, 'drawer_open', drawer_open)
    }
}

const getters = {
    drawer_open: state => {
        return state.drawer_open
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}