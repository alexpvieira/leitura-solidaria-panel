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
		]
	},
	{
		path: '/', component: () => import('layouts/MainLayout.vue'),
		children: [
			{ 
				path: 'home', 
				name: 'home', 
				component: () => import('pages/Home.vue') 
			},
			{ 
				path: 'users', 
				name: 'users', 
				component: () => import('pages/Users.vue') 
			},
			{ 
				path: 'users/:id', 
				name: 'user', 
				component: () => import('pages/User.vue') 
			},
			{ 
				path: 'ngos', 
				name: 'ngos', 
				component: () => import('pages/Ngos.vue') 
			},
			{ 
				path: 'ngos/:id', 
				name: 'ngo', 
				component: () => import('pages/Ngo.vue') 
			},
			{ 
				path: 'partners', 
				name: 'partners', 
				component: () => import('pages/Partners.vue') 
			},
			{ 
				path: 'partners/:id', 
				name: 'partner', 
				component: () => import('pages/Partner.vue') 
			},
			{ 
				path: 'articles', 
				name: 'articles', 
				component: () => import('src/pages/Articles.vue') 
			},
			{ 
				path: 'articles/:id', 
				name: 'article', 
				component: () => import('src/pages/Article.vue') 
			}
		]
	},
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes