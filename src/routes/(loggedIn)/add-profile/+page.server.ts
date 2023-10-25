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
  
  if (err) {
    console.log(err)
    throw error(500, err.message)
  }

  return {
    companies: companies as CompanyProps[]
  }
};

export const actions: Actions = {
  addprofile: async ({ request, locals: {adminSupabase, supabase}}) => {
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

    // add user, use supabase auth admin
    const { data: user, error: err } = await adminSupabase.auth.admin.createUser({
        email: formData.email.toString(),
        password: '12345678',
        email_confirm: true
    })
    // error handling
    if (err) {
      if (err.message == 'A user with this email address has already been registered') return {
        message: 'User already exists',
        success: false
      }
      throw error(500, err.message)
    } 

    const userId = user.user.id

    // add user to profiles table
    const {  error: err2 } = await supabase
      .from('profiles')
      .insert([
        { 
          user_uid: userId,
          company: formData.company,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role: formData.is_admin ? 'ADMIN' : 'USER'
        }
      ])
      .select()

    if (err2) throw error(500, err2.message)
    
    return {
      message: 'User successfully added',
      success: true,
    }
  }
};
