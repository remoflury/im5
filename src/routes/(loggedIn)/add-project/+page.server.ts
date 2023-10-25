import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createNameWithCompanyResult } from "../../../lib/utils/generalUtils";

export const load: PageServerLoad = async ({locals: {getSession, supabase}}) => {
  const session = await getSession()

  if (!session) throw error(401, 'Unauthorized')
  

  const { data: profiles, error: err } = await supabase
    .from('profiles')
    .select(`
    first_name,
    last_name,
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