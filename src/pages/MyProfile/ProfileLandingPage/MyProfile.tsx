import { CButton, CCol, CRow } from '@coreui/react-pro'

import { Link } from 'react-router-dom'
import MyProfileTabs from './MyProfileTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import ProfileDetails from './ProfileDetails'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { useTypedSelector } from '../../../stateStore'

const MyProfile = (): JSX.Element => {
  const [isViewingAnotherEmployee] = useSelectedEmployee()
  const employeeGeneralInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Profile Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isViewingAnotherEmployee ? (
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-pencil-square-o  me-1"></i>Edit
              </CButton>
              <Link to={'/employeeList'}>
                <CButton color="info" className="btn-ovh me-1">
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </Link>
            </CCol>
          </CRow>
        ) : (
          <></>
        )}
        <ProfileDetails
          employeeGeneralInformation={employeeGeneralInformation}
        />
        <MyProfileTabs />
      </OCard>
    </>
  )
}

export default MyProfile
