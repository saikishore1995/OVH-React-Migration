export type EmployeeSkills = {
  categoryType: string
  skillType: string
  competency: string
  expMonth: string
  expYear: string
  skillId: number
}

export interface EmployeeSkillInfo {
  striped: boolean
  bordered: boolean
  tableClassName: string
  isFieldDisabled: boolean
  editSkillButtonHandler?: (skillId: number) => void
}

export type EmployeeSkillState = {
  skillDetails: EmployeeSkills[]
  selectedEmployeeSkills: EmployeeSkills[]
  AddEditSkill: EditEmployeeSkills
  CategorySkillList: CategorySkillListItem[]
  isLoading: boolean
}

export type EditEmployeeSkills = {
  categoryType: number
  competency: string
  comments: string
  expMonth: string
  expYear: string
  skillType: string | number
  categoryId?: number
  categoryTypeId?: null
  skillId?: number
  employee: { id: string | number }
}
export type AddUpdateEmployeeSkill = {
  categoryType: number | string
  skillType: string | number
  expMonth: string
  expYear: string
  competency: string
  comments: string
  employee: { id: string | number }
  categoryId?: string | number
}
export type AddEditEmployeeSkillsProps = {
  isEditSkillsDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
  addButtonHandler?: () => void
}
export type CategorySkillListItem = {
  skillId: number
  skill: string
  skillType: string | number
}
