import { z } from 'zod'


export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.'})
    .min(1, { message: "Email is required."})
    .email({message: "Email must be a valid email address."}),
}) 

export const addCompanySchema = z.object({
  company: z.string({ required_error: 'Company is required.'}).min(1, {message: 'Company is required.'}),
  companyid: z.string({ required_error: 'Company id is required.'}).min(1, {message: 'Company id is required.'})
})