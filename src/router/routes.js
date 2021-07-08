import store from '../store'

const routes = [
	{
		path: '/', component: () => import('layouts/NotAuthenticatedLayout.vue'),
		children: [
			{ 
				path: '',
				name: 'login',
				component: () => import('pages/Login.vue') 
			},
			{ 
				path: 'recover-password',
				name: 'recover-password',
				component: () => import('pages/RecoverPassword.vue') 
			}
		],
		beforeEnter: (to, from, next) => {
			let access_token = store.getters['persist/access_token']
			let user = store.getters['persist/user']

			if (access_token) {
				if (user?.profiles?.type !== 'USER') next({name: 'home'})
				else {
					store.dispatch('persist/SET_ACCESS_TOKEN', [''])
					store.dispatch('persist/SET_USER', [{}])
				}
			}
			
			next()
		}
	},
	{
		path: '/', component: () => import('layouts/MainLayout.vue'),
		children: [
			{ 
				path: 'home', 
				name: 'home', 
				component: () => import('pages/Home.vue'),
				meta: { acl: [] },
			},
			{ 
				path: 'users', 
				name: 'users', 
				component: () => import('pages/Users.vue'),
				meta: { acl: ['ADMIN'] }
			},
			{ 
				path: 'users/:id', 
				name: 'user', 
				component: () => import('pages/User.vue'),
				meta: { acl: ['ADMIN'] }
			},
			{ 
				path: 'ngos', 
				name: 'ngos', 
				component: () => import('pages/Ngos.vue'),
				meta: { acl: ['ADMIN','ONG'] }
			},
			{ 
				path: 'ngos/:id', 
				name: 'ngo', 
				component: () => import('pages/Ngo.vue'),
				meta: { acl: ['ADMIN','ONG'] }
			},
			{ 
				path: 'partners', 
				name: 'partners', 
				component: () => import('pages/Partners.vue'),
				meta: { acl: ['ADMIN','PARTNER'] }
			},
			{ 
				path: 'partners/:id', 
				name: 'partner', 
				component: () => import('pages/Partner.vue'),
				meta: { acl: ['ADMIN','PARTNER'] }
			},
			{ 
				path: 'articles', 
				name: 'articles', 
				component: () => import('src/pages/Articles.vue'),
				meta: { acl: ['ADMIN','PARTNER'] }
			},
			{ 
				path: 'articles/:id', 
				name: 'article', 
				component: () => import('src/pages/Article.vue'),
				meta: { acl: ['ADMIN','PARTNER'] }
			}
		]
	},
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes