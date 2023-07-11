export type SidebarMenuReturnApi = {
  id: number
  menuurl: string
  menuName: string
  orderNum: number
  menuclass: string
  childmenuItems: childmenuItems[]
}
export type childmenuItems = {
  id: number
  menuUrl: string
  menuName: string
  orderNum: number
  menuClass: string
}
export type ValidationError = number | null
export type SidebarMenu = {
  menuItems: SidebarMenuReturnApi[]
  error: ValidationError
  isLoading: boolean
}
