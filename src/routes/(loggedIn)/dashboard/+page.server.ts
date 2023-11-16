import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createDashboardProjectResult } from '$lib/utils/generalUtils';

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (!session) throw error(401, 'Unauthorized');

	const userId = session.user.id;

	// get all project from current user
	const { data: projects, error: err } = await supabase
		.from('users_projects')
		.select(
			`
      projects (
        name,
        description
      )`
		)
		.eq('users_uid', userId);

	if (err) throw error(500, err.message);

	return {
		projects: createDashboardProjectResult(projects)
	};
};
