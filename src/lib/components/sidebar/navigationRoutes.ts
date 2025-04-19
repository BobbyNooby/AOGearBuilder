import { Bug, CircleGauge, Cog, House, Info, NotebookTabs, Sailboat } from 'lucide-svelte';

export type navigationRoute = {
	title: string;
	url: string;
	icon: any;
};

export const navigationRoutes: Record<'public' | 'admin' | 'developer', navigationRoute[]> = {
	public: [
		{
			title: 'Home',
			url: '/',
			icon: House
		},
		{
			title: 'Gear Builder',
			url: '/gearBuilder',
			icon: Cog
		},
		{
			title: 'Ship Builder',
			url: '/shipBuilder',
			icon: Sailboat
		},
		{
			title: 'Report',
			url: '/report',
			icon: Bug
		},
		{
			title: 'Info',
			url: '/info',
			icon: Info
		}
	],
	developer: [
		{
			title: '/items',
			url: '/api/items',
			icon: NotebookTabs
		}
	],
	admin: [
		{
			title: 'Dashboard',
			url: '/admin',
			icon: CircleGauge
		}
	]
};
