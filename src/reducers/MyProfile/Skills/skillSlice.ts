import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Skill,
  SkillSliceState,
} from '../../../types/MyProfile/Skills/skillTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import skillApi from '../../../middleware/api/MyProfile/Skills/skillApi'

const getAllSkills = createAsyncThunk(
  'skill/getAllSkills',
  async (categoryId: number, thunkApi) => {
    try {
      return await skillApi.getAllSkills(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const createSkill = createAsyncThunk(
  'skill/createSkill',
  async (
    {
      categoryId,
      toAddSkillName,
    }: { categoryId: number; toAddSkillName: string },
    thunkApi,
  ) => {
    try {
      return await skillApi.createSkill(categoryId, toAddSkillName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const deleteSkill = createAsyncThunk(
  'skill/deleteSkill',
  async (skillId: number, thunkApi) => {
    try {
      return await skillApi.deleteSkill(skillId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialSkillState: SkillSliceState = {
  skills: [],
  refreshList: false,
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const skillSlice = createSlice({
  name: 'skill',
  initialState: initialSkillState,
  reducers: {
    clearSkillList: (state) => {
      state.skills = []
    },
    toRefreshList: (state) => {
      state.refreshList = true
    },
    doneRefreshList: (state) => {
      state.refreshList = false
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSkill.fulfilled, (state) => {
      state.refreshList = true
    })
    builder
      .addMatcher(
        isAnyOf(getAllSkills.pending, createSkill.pending, deleteSkill.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getAllSkills.fulfilled, createSkill.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.skills = action.payload
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.skill.isLoading
const refreshList = (state: RootState): boolean => state.skill.refreshList
const skills = (state: RootState): Skill[] => state.skill.skills
const pageFromState = (state: RootState): number => state.skill.currentPage
const pageSizeFromState = (state: RootState): number => state.skill.pageSize

const skillThunk = {
  getAllSkills,
  createSkill,
  deleteSkill,
}

const skillSelectors = {
  isLoading,
  refreshList,
  skills,
  pageFromState,
  pageSizeFromState,
}

export const skillService = {
  ...skillThunk,
  actions: skillSlice.actions,
  selectors: skillSelectors,
}

export default skillSlice.reducer
