import type { UserRoleProps } from '$lib/types/types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { error as pageError } from '@sveltejs/kit';

export const getUserRole = async (
	supabaseClient: SupabaseClient,
	userId: string
): Promise<UserRoleProps> => {
	const { data, error } = await supabaseClient
		.from('profiles')
		.select('role')
		.eq('user_uid', userId)
		.single();

	if (error) throw new Error('There was an error loading the user. Please try again later');
	if (!data) throw new Error('User not found');

	const role: UserRoleProps = data.role;

	return role;
};

export const checkIfAuthorized = async (
	supabase: SupabaseClient,
	userId: string,
	authorizedRoles: UserRoleProps[]
) => {
	let role: UserRoleProps;
	try {
		role = await getUserRole(supabase, userId);
	} catch (err) {
		throw pageError(500, { message: err.message });
	}
	if (!authorizedRoles.includes(role)) throw pageError(401, 'Unauthorized');
};
