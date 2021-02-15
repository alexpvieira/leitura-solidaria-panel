<template>
    <q-drawer v-model="drawerOpen" show-if-above bordered :side="$q.platform.is.mobile ? 'right' : 'left'">
        <div class="header-menu q-px-md" style="height: 70px" v-if="$q.platform.is.mobile">
            <div class="q-pt-sm">
                <q-img src="logo.png" class="logo-menu" style="width: 50%;" />
            </div>
        </div>

        <q-scroll-area :style="$q.platform.is.mobile ? 'height: calc(100% - 70px);' : 'height:100%;'">
            <q-list padding separator class="text-blue-grey-8">
                <q-item clickable v-ripple :to="{ name: menu_item.to }" exact v-for="(menu_item, index) in menu_items" :key="index">
                    <q-item-section avatar>
                        <q-icon :name="menu_item.icon" />
                    </q-item-section>

                    <q-item-section>
                        {{ $t(menu_item.label) }}
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="signOut()">
                    <q-item-section avatar>
                        <q-icon name="fas fa-sign-out-alt" />
                    </q-item-section>

                    <q-item-section>
                        {{ $t('sign_out') }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>

        <div class="absolute-bottom text-center q-pa-md text-grey text-caption">
            <div class="row q-col-gutter-md">
                <div class="col-12">
                    <q-img src="flags/br.svg" class="flag q-mr-md" @click="changeLanguage('pt-br')" />
                    <q-img src="flags/us.svg" class="flag" @click="changeLanguage('en-us')" />
                </div>

                <div class="col-12">
                    {{ $t('created_by_the_b_group_for_the_software_engeneering_mba') }}
                </div>
            </div>
        </div>
    </q-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Sidebar',

    data() {
        return {
			menu_items: [
                {
                    to: 'home',
                    icon: 'fas fa-home',
                    label: 'home'
                },
                {
                    to: 'users',
                    icon: 'fas fa-users',
                    label: 'users'
                },
                {
                    to: 'ngos',
                    icon: 'fas fa-hands-heart',
                    label: 'ngos'
                },
                {
                    to: 'partners',
                    icon: 'fas fa-handshake-alt',
                    label: 'partners'
                },
                {
                    to: 'news',
                    icon: 'fas fa-newspaper',
                    label: 'news'
                }
            ]
        }
    },

    computed: {
        ...mapGetters({
            drawer_open_store: 'common/drawer_open'
        }),
        
        drawerOpen: {
            get() {
                return this.drawer_open_store
            },
            set(value) {
                this.$store.dispatch('common/SET_DRAWER_STATE', [value])
            }
        }
	},

    methods: {
        changeLanguage(language) {
			this.$i18n.locale = language
        },
        
        signOut() {
            this.$store.dispatch('common/SET_DRAWER_STATE', [false])
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style lang="stylus" scoped>
.header-menu
	background-color $primary

.logo-menu
	filter brightness(0) invert(1)

.flag
	max-width 1.5rem
</style>