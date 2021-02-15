<template>
	<q-layout view="hHr lpr fFr">
		<q-header elevated>
			<q-toolbar>
				<q-btn flat dense round icon="fal fa-chevron-left" @click="$router.replace({ name: 'home' })" :disable="$route.name === 'home'" />

				<q-toolbar-title class="text-center">
					{{ $t('solidary_reading') }}
				</q-toolbar-title>

				<q-btn flat dense round icon="fal fa-bars" @click="changeDrawerState()" v-if="$q.platform.is.mobile" />
			</q-toolbar>
		</q-header>

		<c-sidebar />

		<q-page-container class="bg-grey-3">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import Sidebar from 'components/Sidebar'
import { mapGetters } from 'vuex'

export default {
	name: 'MainLayout',

	data () {
		return {
			left_drawer_open: false
        }
	},

	components: {
		'c-sidebar': Sidebar
	},

	computed: {
        ...mapGetters({
            drawer_open: 'common/drawer_open'
		}),
	},

	methods: {
		changeLanguage(language) {
			this.$i18n.locale = language
		},

		changeDrawerState() {
			this.$store.dispatch('common/SET_DRAWER_STATE', [!this.drawer_open])
		}
	}
}
</script>
