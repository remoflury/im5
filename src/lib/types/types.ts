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

export type UserRoleProps = "ADMIN" | "USER"