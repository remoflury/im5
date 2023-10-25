import { error, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { checkIfAuthorized } from '$lib/utils/authUtils';
import { addCompanySchema } from '$lib/utils/zodSchemas';
import { ZodError } from 'zod';

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (!session) {
		// the user is not signed in
		throw error(401, { message: 'Unauthorized' });
	}

	// authorization
	await checkIfAuthorized(supabase, session.user.id, ['ADMIN']);
};

export const actions: Actions = {
	addcompany: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		// validation
		try {
			addCompanySchema.parse(formData);
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return {
					data: formData,
					errors
				};
			}
		}

		// write to db
		const { error } = await supabase
			.from('companies')
			.upsert([{ company: formData.company, company_id: formData.companyid }]);

		if (error) return fail(500, { message: error.message, success: false });

		return {
			message: 'Company successfully added',
			success: true
		};
	}
};
