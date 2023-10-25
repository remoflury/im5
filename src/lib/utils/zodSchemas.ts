import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required.' })
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Email must be a valid email address.' })
});

export const addCompanySchema = z.object({
	company: z
		.string({ required_error: 'Company is required.' })
		.min(1, { message: 'Company is required.' }),
	companyid: z
		.string({ required_error: 'Company id is required.' })
		.min(1, { message: 'Company id is required.' })
});

export const addProfileSchema = z.object({
	first_name: z
		.string({ required_error: 'First Name is required.' })
		.min(1, { message: 'First Name is required.' }),
	last_name: z
		.string({ required_error: 'Last Name is required.' })
		.min(1, { message: 'Last Name is required.' }),
	email: z
		.string({ required_error: 'Email is required.' })
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Email must be a valid email address.' }),
	company: z
		.string({ required_error: 'Company is required.' })
		.min(1, { message: 'Company is required.' })
});

export const addNewProjectSchema = z.object({
	project_name: z
		.string({ required_error: 'A Projectname is required.' })
		.min(1, { message: 'A Projectname is required.' })
		.max(20, { message: "Projectname can't be longer than 20 characters." })
		.trim(),
	project_description: z
		.string({ required_error: 'A description is required.' })
		.min(1, { message: 'A description is required.' })
		.max(300, { message: "Description can't be longer than 300 characters." })
		.trim(),
	person: z
		.string({ required_error: 'Person is required.' })
		.min(1, { message: 'Person is required.' })
});
