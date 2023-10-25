import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createNameWithCompanyResult } from "../../../lib/utils/generalUtils";
import { addNewProjectSchema } from "$lib/utils/zodSchemas";
import { ZodError } from "zod";

export const load: PageServerLoad = async ({locals: {getSession, supabase}}) => {
  const session = await getSession()

  if (!session) throw error(401, 'Unauthorized')
  
  const { data: profiles, error: err } = await supabase
    .from('profiles')
    .select(`
    first_name,
    last_name,
    user_uid,
    companies (
      company
    )
  `)

  if (err) {
    console.error(err)
    throw error(500, err.message)
  }

  return {
    profiles: createNameWithCompanyResult(profiles)
  }
};

export const actions: Actions = {
  addproject: async ({request, locals: {supabase}}) => {
    const formData = Object.fromEntries(await request.formData())
    console.log(formData)

    try {
      addNewProjectSchema.parse(formData)
    } catch(err: unknown) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors} = err.flatten()
        return {
          data: formData,
          errors
        }
      }
    }

    // add project to db (table projects)
    const { data: projectResult, error: err } = await supabase
      .from('projects')
      .insert([
        { name: formData.project_name, description: formData.project_description },
      ])
      .select()

    if (err) throw error(500, err.message)

    // add to many-to-many table users_project
    const { error: err2 } = await supabase
      .from('users_projects')
      .insert([
        { users_uid: formData.person, project_id: projectResult[0].id },
      ])

    if (err2) throw error(500, err2.message)

    return {
      message: 'New Project successfully added.',
      success: true,
    }

  }
};