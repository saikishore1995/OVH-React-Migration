import { CCol, CRow } from '@coreui/react-pro'

import { ProfileDetailsProps } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import React from 'react'

const ProfileDetails = ({
  employeeGeneralInformation,
}: ProfileDetailsProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <div className="profile-avatar">
            <img
              width="120px"
              height="120px;"
              src={employeeGeneralInformation?.profilePicPath}
              alt={employeeGeneralInformation?.fullName}
            />
          </div>
        </CCol>
        <CCol sm={2}>
          <div className="profile-name">
            <h4>{employeeGeneralInformation?.fullName}</h4>
            <p className="job-title">
              {employeeGeneralInformation?.designation}
            </p>
          </div>
        </CCol>
        <CCol sm={2}>
          <dl>
            <dt>Employee Id</dt>
            <dd className="mb-0">{employeeGeneralInformation?.id}</dd>
            <dt>Blood Group</dt>
            <dd className="mb-0">{employeeGeneralInformation?.bloodgroup}</dd>
          </dl>
        </CCol>
        <CCol sm={2}>
          <dl>
            {employeeGeneralInformation?.homeNumber && (
              <>
                <dt>Home</dt>
                <dd className="mb-0">
                  {employeeGeneralInformation?.homeNumber}
                </dd>
              </>
            )}
            {employeeGeneralInformation?.mobile && (
              <>
                <dt>Mobile</dt>
                <dd className="mb-0">{employeeGeneralInformation?.mobile}</dd>
              </>
            )}
            {employeeGeneralInformation?.alternativeMobile && (
              <>
                <dt>Alternative Mobile</dt>
                <dd className="mb-0">
                  {employeeGeneralInformation?.alternativeMobile}
                </dd>
              </>
            )}
            {employeeGeneralInformation?.workNumber && (
              <>
                <dt>Work</dt>
                <dd className="mb-0">
                  {employeeGeneralInformation?.workNumber}
                </dd>
              </>
            )}
          </dl>
        </CCol>
        <CCol sm={3}>
          <dl>
            <dt>Email ID</dt>
            <dd>{employeeGeneralInformation?.emailId}</dd>
            <dt>Experience</dt>
            <dd>{employeeGeneralInformation?.updatedExperience}</dd>
            <dt>Skype</dt>
            <dd>{employeeGeneralInformation?.skypeId}</dd>
          </dl>
        </CCol>
      </CRow>
    </>
  )
}

export default ProfileDetails
