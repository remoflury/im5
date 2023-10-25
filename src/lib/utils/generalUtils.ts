import type { DashboardProjectProps, NameWithCompanyProps } from '$lib/types/types';

export const createNameWithCompanyResult = (input: any): NameWithCompanyProps[] => {
	const results: NameWithCompanyProps[] = input.map((entry: any) => {
		return {
			first_name: entry.first_name,
			last_name: entry.last_name,
			user_uid: entry.user_uid,
			company: entry.companies.company
		};
	});

	return results;
};

export const createDashboardProjectResult = (input: any): DashboardProjectProps[] => {
	const results: DashboardProjectProps[] = input.map((project: any) => {
		return {
			name: project.projects.name,
			description: project.projects.description
		};
	});

	return results;
};
