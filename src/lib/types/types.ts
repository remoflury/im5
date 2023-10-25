export type NavItemsProps = {
  title: string,
  slug: string,
  visibleForRole: UserRoleProps
}

export type UserTableProps = {
  id: number,
  first_name: string,
  last_name: string,
  user_uid: string,
  role: UserRoleProps,
}

export type CompanyProps = {
  id: number,
  company: string,
  company_id: string
}

export type UserRoleProps = "ADMIN" | "USER"

export type NameWithCompanyProps = {
  first_name: string,
  last_name: string,
  user_uid: string,
  company: string
}

export type DashboardProjectProps = {
  name: string,
  description: string
}