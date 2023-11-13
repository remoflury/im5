export type NavItemsProps = {
	title: string;
	slug: string;
	visibleForRole: UserRoleProps;
};

export type UserTableProps = {
	id: number;
	first_name: string;
	last_name: string;
	user_uid: string;
	role: UserRoleProps;
};

export interface CompanyProps extends SearchedCompanyProps {
	id: number;
};

export type UserRoleProps = 'ADMIN' | 'USER';

export type NameWithCompanyProps = {
	first_name: string;
	last_name: string;
	user_uid: string;
	company: string;
};

export type DashboardProjectProps = {
	name: string;
	description: string;
};


export type SearchedCompanyProps = {
	company: string;
	company_id: string;
}

export type SearchedProfileProps = {
	first_name: string,
	last_name: string
}

export type SearchedProjectProps = {
	name: string,
	description:string
}