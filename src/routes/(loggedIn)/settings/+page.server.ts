import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { editNamesSchema } from "$lib/utils/zodSchemas";
import { ZodError } from "zod";

export const load: PageServerLoad = async ({ locals: {getSession, supabase}}) => {
  const session = await getSession()
  if (!session) throw error(401, 'Not authorized.')

  const userId = session.user.id

  const { data, error: err} = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('user_uid', userId)
    .single()

  if (err) throw error(500, 'Error while fetching user.')

  return {
    data
  }
};

export const actions: Actions = {
  editname: async ({request, locals: {getSession, supabase}}) => {
    const session = await getSession()
    if (!session) return fail(401, {message: 'Not authorized'})
    const userId = session.user.id

    const formData = Object.fromEntries(await request.formData());

		// validation
		try {
			editNamesSchema.parse(formData);
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return {
					data: formData,
					errors
				};
			}
		}

    const { error: err} = await supabase
      .from('profiles')
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name
      })
      .eq('user_uid', userId)

      if (err) return fail(500, {message: 'Error while updating user. Try again later.', success: false} )

      return {
        message: 'Profile successfully updated',
        success: true
      };
  }
};