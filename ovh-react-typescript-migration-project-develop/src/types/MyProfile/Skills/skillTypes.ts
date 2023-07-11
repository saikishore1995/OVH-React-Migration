import { LoadingState } from '../../commonTypes'

export type Skill = {
  skillId: number
  skill: string
}

export type SkillSliceState = {
  skills: Skill[]
  refreshList: boolean
  isLoading: LoadingState
  currentPage: number
  pageSize: number
}
