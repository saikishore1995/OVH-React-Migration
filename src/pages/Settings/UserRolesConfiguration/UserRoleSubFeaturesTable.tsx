import {
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import React from 'react'
import { UserRoleSubFeaturesTableProps } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'

const UserRoleSubFeaturesTable: React.FC<UserRoleSubFeaturesTableProps> = ({
  childFeaturesArray,
  checkBoxHandleChange,
}: UserRoleSubFeaturesTableProps): JSX.Element => {
  const { childFeatures, index, subFeatureItemIndex } = childFeaturesArray
  childFeatures.sort((childFeatureItem1, childFeatureItem2) =>
    childFeatureItem1.name.localeCompare(childFeatureItem2.name),
  )
  return (
    <>
      <CTable striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Feature Name</CTableHeaderCell>
            <CTableHeaderCell>View</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {childFeatures?.map((childFeatureItem, childFeatureItemIndex) => (
            <CTableRow key={childFeatureItemIndex}>
              <CTableDataCell>{childFeatureItem.name}</CTableDataCell>
              <CTableDataCell>
                {childFeatureItem.viewaccess && (
                  <CFormCheck
                    data-testid="form-checkbox"
                    className="infocheckbox"
                    name={childFeatureItem.name}
                    checked={childFeatureItem.viewaccessChecked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      checkBoxHandleChange(
                        e.target,
                        subFeatureItemIndex,
                        index,
                        'viewaccessChecked',
                        childFeatureItemIndex,
                        true,
                      )
                    }
                  />
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default UserRoleSubFeaturesTable
