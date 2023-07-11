import { CBadge, CFormLabel } from '@coreui/react-pro'

import { EmployeeProfileHistoryProps } from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import React from 'react'

const ProfileHistoryTimeLine = ({
  employeeProfileHistory,
}: EmployeeProfileHistoryProps): JSX.Element => {
  return (
    <>
      <div className="sh-timeline-container">
        {employeeProfileHistory?.map((curItem, id) => {
          return (
            <div key={id} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {curItem.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">{curItem.modifiedBy} -</h4>
                  <span className="sh-timeline-status">
                    {curItem.persistType === 'UPDATED' ? (
                      <>
                        <CBadge className="rounded-pill" color="info">
                          Updated
                        </CBadge>
                      </>
                    ) : (
                      <></>
                    )}
                    {curItem.persistType === 'CREATED' ? (
                      <CBadge className="rounded-pill" color="success">
                        Created
                      </CBadge>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    {/* Checking Person Name */}
                    {/* Checking Current Location */}
                    {curItem.currentLocation ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Current Location
                          </CFormLabel>
                          {curItem.oldCurrentLocation ? (
                            <>
                              &nbsp;Changed from {curItem.oldCurrentLocation}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.currentLocation}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Base Location */}
                    {curItem.baseLocation ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Base Location
                          </CFormLabel>
                          {curItem.oldBaseLocation ? (
                            <>
                              &nbsp;Changed from {curItem.oldBaseLocation}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.baseLocation}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Gender*/}
                    {curItem.gender ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Gender
                          </CFormLabel>
                          {curItem.oldgender ? (
                            <>
                              &nbsp;Changed from {curItem.oldgender}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.gender}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Blood Group*/}
                    {curItem.bloodgroup ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Blood Group
                          </CFormLabel>
                          {curItem.oldbloodGroup ? (
                            <>
                              &nbsp;Changed from {curItem.oldbloodGroup}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.bloodgroup}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Official Birthday*/}
                    {curItem.officialBirthday ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Official Birthday
                          </CFormLabel>
                          {curItem.oldOfficalBirthday ? (
                            <>
                              &nbsp;Changed from {curItem.oldOfficalBirthday}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.officialBirthday}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Real Birthday*/}
                    {curItem.realBirthday ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Real Birthday
                          </CFormLabel>
                          {curItem.oldRealBirthday ? (
                            <>
                              &nbsp;Changed from {curItem.oldRealBirthday}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.realBirthday}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Marital Status*/}
                    {curItem.maritalStatus ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Marital Status
                          </CFormLabel>
                          {curItem.oldMartialStatus ? (
                            <>
                              &nbsp;Changed from {curItem.oldMartialStatus}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.maritalStatus}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Marriage Date */}
                    {curItem.marriageDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Marital Date
                          </CFormLabel>
                          {curItem.oldMarriageDate ? (
                            <>
                              &nbsp;Changed from {curItem.oldMarriageDate}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.marriageDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Skype Id */}
                    {curItem.skypeId ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Skype Id
                          </CFormLabel>
                          {curItem.oldMarriageDate ? (
                            <>
                              &nbsp;Changed from {curItem.oldSkypeId}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.skypeId}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking aboutMe */}
                    {curItem.aboutMe ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            About Me
                          </CFormLabel>
                          {curItem.oldAboutMe ? (
                            <>
                              &nbsp;Changed from {curItem.oldAboutMe}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.aboutMe}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking phone */}
                    {curItem.phone ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Mobile
                          </CFormLabel>
                          {curItem.oldPhone ? (
                            <>
                              &nbsp;Changed from {curItem.oldPhone}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.phone}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking alternativeMobile */}
                    {curItem.alternativeMobile ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Alternative Mobile
                          </CFormLabel>
                          {curItem.oldAlternativeMobile ? (
                            <>
                              &nbsp;Changed from {curItem.oldAlternativeMobile}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.alternativeMobile}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking alternativeMobile */}
                    {curItem.alternativeMobile ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Alternative Mobile
                          </CFormLabel>
                          {curItem.oldAlternativeMobile ? (
                            <>
                              &nbsp;Changed from {curItem.oldAlternativeMobile}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.alternativeMobile}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Home Code */}
                    {curItem.homeCode ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Home Code
                          </CFormLabel>
                          {curItem.oldHomeCode ? (
                            <>
                              &nbsp;Changed from {curItem.oldHomeCode}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.homeCode}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Home Number */}
                    {curItem.homeNumber ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Home Number
                          </CFormLabel>
                          {curItem.oldHomeNumber ? (
                            <>
                              &nbsp;Changed from {curItem.oldHomeNumber}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.homeNumber}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Work Code */}
                    {curItem.workCode ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Work Code
                          </CFormLabel>
                          {curItem.oldWorkCode ? (
                            <>
                              &nbsp;Changed from {curItem.oldWorkCode}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;{curItem.workCode}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Work Number */}
                    {curItem.workNumber ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Work Number
                          </CFormLabel>
                          {curItem.oldWorkNumber ? (
                            <>
                              &nbsp;Changed from {curItem.oldWorkNumber}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.workNumber}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Emergency Contact Name */}
                    {curItem.emergencyContactName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Emergency Contact Name
                          </CFormLabel>
                          {curItem.oldEmergencyContactName ? (
                            <>
                              &nbsp;Changed from{' '}
                              {curItem.oldEmergencyContactName}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.emergencyContactName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Emergency Phone */}
                    {curItem.emergencyPhone ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Emergency Phone
                          </CFormLabel>
                          {curItem.oldEmergencyPhone ? (
                            <>
                              &nbsp;Changed from {curItem.oldEmergencyPhone}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.emergencyPhone}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Emergency Relation Ship */}
                    {curItem.emergencyRelationShip ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Emergency Relation Ship
                          </CFormLabel>
                          {curItem.oldEmergencyRelationShip ? (
                            <>
                              &nbsp;Changed from{' '}
                              {curItem.oldEmergencyRelationShip}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.emergencyRelationShip}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* Checking Present Address */}
                    {curItem.presentAddress ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Present Address
                          </CFormLabel>
                          {curItem.oldPresentAddress ? (
                            <>
                              &nbsp;Changed from {curItem.oldPresentAddress}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.presentAddress}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Present City */}
                    {curItem.presentCity ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Present City
                          </CFormLabel>
                          {curItem.oldPresentCity ? (
                            <>
                              &nbsp;Changed from {curItem.oldPresentCity}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.presentCity}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Present Zip */}
                    {curItem.presentZip ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Present Zip
                          </CFormLabel>
                          {curItem.oldPresentZip ? (
                            <>
                              &nbsp;Changed from {curItem.oldPresentZip}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.presentZip}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking present LandMark */}
                    {curItem.presentLandMark ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Present LandMark
                          </CFormLabel>
                          {curItem.oldPresentLandMark ? (
                            <>
                              &nbsp;Changed from {curItem.oldPresentLandMark}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.presentLandMark}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Permanent Address */}
                    {curItem.permanentLandMark ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Permanent Address
                          </CFormLabel>
                          {curItem.oldPermanentAddress ? (
                            <>
                              &nbsp;Changed from {curItem.oldPermanentAddress}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.permanentLandMark}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Permanent City */}
                    {curItem.permanentCity ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Permanent City
                          </CFormLabel>
                          {curItem.oldPermanentCity ? (
                            <>
                              &nbsp;Changed from {curItem.oldPermanentCity}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.permanentCity}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Permanent Zip */}
                    {curItem.permanentZip ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Permanent Zip
                          </CFormLabel>
                          {curItem.oldPermanentZip ? (
                            <>
                              &nbsp;Changed from {curItem.oldPermanentZip}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.permanentZip}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking permanent LandMark */}
                    {curItem.permanentLandMark ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Permanent LandMark
                          </CFormLabel>
                          {curItem.oldPermanentLandMark ? (
                            <>
                              &nbsp;Changed from {curItem.oldPermanentLandMark}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.permanentLandMark}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Passport Number */}
                    {curItem.passportNumber ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Passport Number
                          </CFormLabel>
                          {curItem.oldPassportNumber ? (
                            <>
                              &nbsp;Changed from {curItem.oldPassportNumber}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.passportNumber}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Passport Expiry Date */}
                    {curItem.passportExpDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Passport Expiry Date
                          </CFormLabel>
                          {curItem.oldPassportExpDate ? (
                            <>
                              &nbsp;Changed from {curItem.oldPassportExpDate}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.passportExpDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Passport Issued Place */}
                    {curItem.passportIssuedPlace ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Passport Issued Place
                          </CFormLabel>
                          {curItem.oldPassportIssuedPlace ? (
                            <>
                              &nbsp;Changed from{' '}
                              {curItem.oldPassportIssuedPlace}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.passportIssuedPlace}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Passport Issued Date */}
                    {curItem.passportIssuedDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Passport Issued Date
                          </CFormLabel>
                          {curItem.oldPassportIssuedDate ? (
                            <>
                              &nbsp;Changed from {curItem.oldPassportIssuedDate}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.passportIssuedDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Person Name */}
                    {curItem.personName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Person Name
                          </CFormLabel>
                          {curItem.oldPersonName ? (
                            <>
                              &nbsp;Changed from {curItem.oldPersonName}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.personName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Relation Ship */}
                    {curItem.relationShip ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Relation Ship
                          </CFormLabel>
                          {curItem.oldRelationShip ? (
                            <>
                              &nbsp;Changed from {curItem.oldRelationShip}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.relationShip}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Contact Number */}
                    {curItem.contactNumber ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Contact Number
                          </CFormLabel>
                          {curItem.oldContactNumber ? (
                            <>
                              &nbsp;Changed from {curItem.oldContactNumber}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.contactNumber}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Date Of Birth */}
                    {curItem.dateOfBirth ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Date Of Birth
                          </CFormLabel>
                          {curItem.oldDateOfBirth ? (
                            <>
                              &nbsp;Changed from {curItem.oldDateOfBirth}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.dateOfBirth}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Employment Type Name */}
                    {curItem.employmentTypeName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Employment Type
                          </CFormLabel>
                          {curItem.oldEmergencyContactName ? (
                            <>
                              &nbsp;Changed from{' '}
                              {curItem.oldEmergencyContactName}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.employmentTypeName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Time Slot */}
                    {curItem.timeSlot ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Time Slot
                          </CFormLabel>
                          {curItem.oldtimeSlot ? (
                            <>
                              &nbsp;Changed from {curItem.oldtimeSlot}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.timeSlot}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Under Notice */}
                    {curItem.underNotice ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Under Notice
                          </CFormLabel>
                          {curItem.oldunderNotice ? (
                            <>
                              &nbsp;Changed from {curItem.oldunderNotice}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.underNotice}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Employee Role */}
                    {curItem.empRole ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Employee Role
                          </CFormLabel>
                          {curItem.oldempRole ? (
                            <>
                              &nbsp;Changed from {curItem.oldempRole}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.empRole}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Designation */}
                    {curItem.designation ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Designation
                          </CFormLabel>
                          {curItem.olddesignation ? (
                            <>
                              &nbsp;Changed from {curItem.olddesignation}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.designation}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Department Name */}
                    {curItem.departmentName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Department Name
                          </CFormLabel>
                          {curItem.oldDepartmentName ? (
                            <>
                              &nbsp;Changed from {curItem.oldDepartmentName}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.departmentName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Job Type Name */}
                    {curItem.jobTypeName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Job Type
                          </CFormLabel>
                          {curItem.oldJobTypeName ? (
                            <>
                              &nbsp;Changed from {curItem.oldJobTypeName}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.jobTypeName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking manager */}
                    {curItem.manager ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Manager
                          </CFormLabel>
                          {curItem.oldmanager ? (
                            <>
                              &nbsp;Changed from {curItem.oldmanager}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.manager}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Under Notice Date */}
                    {curItem.underNoticeDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Under Notice Date
                          </CFormLabel>
                          {curItem.oldunderNoticeDate ? (
                            <>
                              &nbsp;Changed from {curItem.oldunderNoticeDate}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.underNoticeDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Releaving Date */}
                    {curItem.releavingDate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Releaving Date
                          </CFormLabel>
                          {curItem.oldreleavingDate ? (
                            <>
                              &nbsp;Changed from {curItem.oldreleavingDate}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.releavingDate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking Status Name */}
                    {curItem.statusName ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Status
                          </CFormLabel>
                          {curItem.oldstatusName ? (
                            <>
                              &nbsp;Changed from {curItem.oldstatusName}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.statusName}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Checking hrAssociate */}
                    {curItem.hrAssociate ? (
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Hr Associate
                          </CFormLabel>
                          {curItem.oldHrAssociate ? (
                            <>
                              &nbsp;Changed from {curItem.oldHrAssociate}
                              <strong> to</strong>
                            </>
                          ) : (
                            <></>
                          )}
                          &nbsp;
                          {curItem.hrAssociate}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ProfileHistoryTimeLine
