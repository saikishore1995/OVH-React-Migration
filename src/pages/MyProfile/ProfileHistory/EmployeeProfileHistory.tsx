import { CCardHeader, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { profileHistoryService } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { reduxServices } from '../../../reducers/reduxServices'
import { useDispatch } from 'react-redux'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { useTypedSelector } from '../../../stateStore'

const EmployeeProfileHistory = (): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const authenticatedToken = useTypedSelector(
    reduxServices.authentication.selectors.selectToken,
  )
  const employeeProfileHistory = useTypedSelector(
    profileHistoryService.selectors.profileHistoryData,
  )
  const dispatch = useDispatch()
  const isLoading = useTypedSelector(
    reduxServices.profileHistory.selectors.isLoading,
  )

  useEffect(() => {
    if (authenticatedToken) {
      dispatch(
        reduxServices.profileHistory.getProfileHistory(
          isViewingAnotherEmployee ? selectedEmployeeId : employeeId,
        ),
      )
    }
  }, [
    authenticatedToken,
    dispatch,
    employeeId,
    isViewingAnotherEmployee,
    selectedEmployeeId,
  ])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Employee Profile History</h4>
      </CCardHeader>

      {isLoading !== ApiLoadingState.loading ? (
        <>
          <ProfileHistoryTimeLine
            employeeProfileHistory={employeeProfileHistory}
          />
        </>
      ) : (
        <>
          <CSpinner />
        </>
      )}
    </>
  )
}

export default EmployeeProfileHistory
