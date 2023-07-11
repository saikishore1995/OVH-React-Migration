import {
  AccessModifier,
  ChildFeaturesArrayProps,
  UserRoleFeaturesExpandableTableProps,
  UtilsChildFeatures,
  UtilsSubFeatures,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CLink,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import {
  mapFeaturesToSubFeatures,
  renderPermissionSwitch,
} from '../../../utils/rolesAndPermissionsUtils'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import UserRoleSubFeaturesTable from './UserRoleSubFeaturesTable'
import { reduxServices } from '../../../reducers/reduxServices'

const UserRoleFeaturesExpandableTable: React.FC<UserRoleFeaturesExpandableTableProps> =
  ({ selectedRoleId }: UserRoleFeaturesExpandableTableProps): JSX.Element => {
    const [mappedFeatures, setMappedFeatures] = useState<UtilsSubFeatures[]>([])
    const [childFeaturesModalVisibility, setChildFeaturesModalVisibility] =
      useState(false)
    const [childFeaturesArray, setChildFeaturesArray] =
      useState<ChildFeaturesArrayProps>({
        childFeatures: [],
        index: 0,
        subFeatureItemIndex: 0,
      })

    const dispatch = useAppDispatch()

    const subFeatures = useTypedSelector(
      reduxServices.userRolesAndPermissions.selectors.userRoleSubFeatures,
    )

    const features = useTypedSelector(
      reduxServices.userRolesAndPermissions.selectors.userFeaturesUnderRole,
    )

    // on every selected role change doFetchFeaturesUnderRole will dispatch
    useEffect(() => {
      if (selectedRoleId) {
        dispatch(
          reduxServices.userRolesAndPermissions.getUserFeaturesUnderRole(
            selectedRoleId as string,
          ),
        )
      }
    }, [dispatch, selectedRoleId])

    useEffect(() => {
      if (features) {
        const mappedResult = mapFeaturesToSubFeatures(features, subFeatures)
        setMappedFeatures(mappedResult as UtilsSubFeatures[])
      }
    }, [features, subFeatures])

    // if sub feature having child features we have to show modal and also target the child features
    const handleChildModal = (
      index: number,
      subFeatureItemIndex: number,
      childFeatures: UtilsChildFeatures[],
    ) => {
      setChildFeaturesModalVisibility(true)
      setChildFeaturesArray({
        childFeatures: childFeatures,
        index: index,
        subFeatureItemIndex: subFeatureItemIndex,
      })
    }

    // post assign permission object to database
    const checkBoxHandleChange = async (
      target: EventTarget & HTMLInputElement,
      subFeatureItemIndex: number,
      index: number,
      accessModifier: AccessModifier,
      childFeatureItemIndex?: number,
      isChildFeature = false,
    ) => {
      const mappedFeaturesCopy = [...mappedFeatures]
      let toEdit = null
      if (isChildFeature) {
        toEdit =
          mappedFeaturesCopy[index].features[subFeatureItemIndex].childFeatures[
            childFeatureItemIndex as number
          ]
        toEdit[accessModifier] = target.checked
      } else {
        toEdit = mappedFeaturesCopy[index].features[subFeatureItemIndex]
        toEdit[accessModifier] = target.checked
      }
      setMappedFeatures(mappedFeaturesCopy)
      const prepareObject = renderPermissionSwitch(
        accessModifier,
        toEdit,
        selectedRoleId as number,
      )
      const assignPermissionResultAction = await dispatch(
        reduxServices.userRolesAndPermissions.updateAssignPermission(
          prepareObject,
        ),
      )
      if (
        reduxServices.userRolesAndPermissions.updateAssignPermission.fulfilled.match(
          assignPermissionResultAction,
        )
      ) {
        const oToastMessage = `Successfully you have ${
          prepareObject.permission ? 'assigned' : 'removed'
        } '${prepareObject.type}' permission to '${target.name}'`
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast toastColor="success" toastMessage={oToastMessage} />,
          ),
        )
        dispatch(
          reduxServices.userRolesAndPermissions.getUserFeaturesUnderRole(
            selectedRoleId as string,
          ),
        )
        dispatch(reduxServices.app.actions.setReRenderMenu(true))
      }
    }
    return (
      <>
        <div className="expandable-table-headwrap mt-4">
          <span>Action</span>
          <span>Menu Items</span>
        </div>
        {selectedRoleId ? (
          <>
            <CAccordion flush className="expandable-table mb-3">
              {mappedFeatures.map((featureItem, index) => {
                featureItem.features.sort((featureTeam1, featureTeam2) =>
                  featureTeam1.name.localeCompare(featureTeam2.name),
                )
                return (
                  <React.Fragment key={index}>
                    <CAccordionItem>
                      <CAccordionHeader>
                        <span
                          className="title-sm expandable-table-title"
                          data-testid="accordion-header-span"
                        >
                          {featureItem.name}
                        </span>
                      </CAccordionHeader>
                      <CAccordionBody>
                        <CTable responsive striped>
                          <CTableHead color="info">
                            <CTableRow>
                              <CTableHeaderCell>Feature Name</CTableHeaderCell>
                              <CTableHeaderCell>View</CTableHeaderCell>
                              <CTableHeaderCell>Create</CTableHeaderCell>
                              <CTableHeaderCell>Edit</CTableHeaderCell>
                              <CTableHeaderCell>Delete</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {featureItem.features.map(
                              (subFeatureItem, subFeatureItemIndex) => {
                                return (
                                  <CTableRow key={subFeatureItemIndex}>
                                    {subFeatureItem.childFeatures &&
                                    subFeatureItem.childFeatures.length > 0 ? (
                                      <CTableDataCell>
                                        <CLink
                                          className="cursor-pointer text-decoration-none text-primary"
                                          onClick={() =>
                                            handleChildModal(
                                              index,
                                              subFeatureItemIndex,
                                              subFeatureItem.childFeatures,
                                            )
                                          }
                                        >
                                          {subFeatureItem.name}
                                        </CLink>
                                      </CTableDataCell>
                                    ) : (
                                      <CTableDataCell>
                                        {subFeatureItem.name}
                                      </CTableDataCell>
                                    )}
                                    <CTableDataCell>
                                      {subFeatureItem.viewaccess && (
                                        <CFormCheck
                                          data-testid="form-features-checkbox"
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.viewaccessChecked
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'viewaccessChecked',
                                            )
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {subFeatureItem.createaccess && (
                                        <CFormCheck
                                          data-testid="form-features-checkbox"
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.createaccessChecked
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'createaccessChecked',
                                            )
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {subFeatureItem.updateaccess && (
                                        <CFormCheck
                                          data-testid="form-features-checkbox"
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.updateaccessChecked
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'updateaccessChecked',
                                            )
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {subFeatureItem.deleteaccess && (
                                        <CFormCheck
                                          data-testid="form-features-checkbox"
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.deleteaccessChecked
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'deleteaccessChecked',
                                            )
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              },
                            )}
                          </CTableBody>
                        </CTable>
                      </CAccordionBody>
                    </CAccordionItem>
                  </React.Fragment>
                )
              })}
            </CAccordion>
          </>
        ) : (
          <></>
        )}
        <OModal
          alignment="center"
          visible={childFeaturesModalVisibility}
          setVisible={setChildFeaturesModalVisibility}
          confirmButtonText="Yes"
          cancelButtonText="No"
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
        >
          <UserRoleSubFeaturesTable
            childFeaturesArray={childFeaturesArray}
            checkBoxHandleChange={checkBoxHandleChange}
          />
        </OModal>
      </>
    )
  }

export default UserRoleFeaturesExpandableTable
