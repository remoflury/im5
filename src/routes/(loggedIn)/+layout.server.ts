import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	// error handling
	if (!session) throw error(401, { message: 'Unauthorized' });
	const userId = session.user.id;

	// get user profile
	const { data: user, error: err } = await supabase
		.from('profiles')
		.select('*')
		.eq('user_uid', userId);

	if (err) {
		console.error(err);
		throw error(500, { message: 'There was an error loading the user. Please try again later' });
	}

	return {
		user: user[0]
	};
};
