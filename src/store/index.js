import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

// Modules
import common from './modules/common'
import persist from './modules/persist'

const ls = new SecureLS({ isCompression: false })
const dataState = createPersistedState({
    key: `leitura-solidaria-panel`,
    storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
    },
    paths: ['persist']
})

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        persist
    },
    plugins: [dataState]
})
