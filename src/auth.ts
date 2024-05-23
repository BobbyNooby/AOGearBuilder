import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/sveltekit/providers/discord';
import { VITE_DISCORD_CLIENT_ID, VITE_DISCORD_CLIENT_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Discord({
			clientId: VITE_DISCORD_CLIENT_ID,
			clientSecret: VITE_DISCORD_CLIENT_SECRET,
			authorization: 'https://discord.com/api/oauth2/authorize?scope=identify'
		})
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			if (profile) {
				token.id = profile.id;
			}
			return token;
		},
		async session({ session, token, user }) {
			session.user.id = token.id as string;
			return session;
		}
	},
	trustHost: true
});
