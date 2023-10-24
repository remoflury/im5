import { loginSchema } from "$lib/utils/zodSchemas";
import { fail, type Actions } from "@sveltejs/kit";
import { ZodError } from "zod";

export const actions: Actions = {
  login: async ({request, url, locals: { supabase }}) => {
    const formData =Object.fromEntries(await request.formData())

    // validation
    try {
      const result = loginSchema.parse(formData)
      console.log(result)
    } catch(err: unknown) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors} = err.flatten()
        // const {  ...rest } = formData
        return {
          data: formData,
          errors
        }
      }
      console.error(err)
    }


    // supabase login
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email.toString(),
        options: {
          emailRedirectTo: `${url.origin}/auth/callback`
        }
      })

    if (error) {
      console.error(error)
      return fail(500, { message: error.message, success: false })
    }

    return {
      message: 'Please check your email for a magic link to log into the website.',
      success: true,
    }
  }
};