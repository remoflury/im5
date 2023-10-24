import { error, type Actions} from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { CompanyProps } from "$lib/types/types";
import { addProfileSchema } from "$lib/utils/zodSchemas";
import { ZodError } from "zod";

export const load: PageServerLoad = async ({ locals: { supabase}}) => {
  

  // get all companies for selection
  const { data: companies, error: err } = await supabase
    .from('companies')
    .select('*')

  if (err) throw error(500, "Error loading the companies.")

  return {
    companies: companies as CompanyProps[]
  }
};

export const actions: Actions = {
  addprofile: async ({ request, locals: {supabase}}) => {
    const formData =Object.fromEntries(await request.formData())

    // validation 
    try {
      addProfileSchema.parse(formData)
    } catch(err: unknown) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors} = err.flatten()
        return {
          data: formData,
          errors
        }
      }
    }

    console.log(formData)

    // add user
    const { data, error: err } = await supabase.auth.signUp({
      email: formData.email.toString(),
      password: '12345678',
    })

    if (err) throw error(500, 'Error creating user.')

    console.log(data)

    return {
      message: 'Company successfully added',
      success: true,
    }
  }
};
