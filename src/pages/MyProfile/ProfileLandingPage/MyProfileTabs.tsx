import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import BasicInfoTab from '../BasicInfoTab/BasicInfoTab'
import EmployeeProfileHistory from '../../MyProfile/ProfileHistory/EmployeeProfileHistory'
import GeneralTab from '../GeneralTab/GeneralTab'
import PersonalInfoTab from '../../../pages/MyProfile/PersonalInfoTab/PersonalInfoTab'
import EmployeeReportees from '../ReporteesTab/EmployeeReportees'
import QualificationDetails from '../QualificationsTab/QualificationDetails'
import EmployeeReviews from '../ReviewsTab/EmployeeReviews'
import TabsLabels from '../../../middleware/TabsLabels'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../stateStore'
import EmployeeProjects from '../ProjectsTab/EmployeeProjects'

import EmployeeAssets from '../MyAssetsTab/EmployeeAssets'
interface ShowTabContentType<TValue> {
  [id: number]: TValue
}
const MyProfileTabs = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )
  const { employeeId } = useParams<{ employeeId?: string }>()

  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

  useEffect(() => {
    if (employeeId) {
      dispatch(
        reduxServices.generalInformation.getSelectedEmployeeInformation(
          employeeId,
        ),
      )
    }
  }, [dispatch, employeeId])

  useEffect(() => {
    if (
      employeeRole !== 'admin' &&
      employeeRole !== 'HR' &&
      activeTabsKey === 9
    ) {
      setActiveTabsKey(0)
    }
    //Loading different components that comes in My Profile Tabs section
    //First add the item in 'TabsLabel.js' in 'middleware' folder
    //And add the key-value in below object
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <GeneralTab />,
        2: <BasicInfoTab />,
        3: <PersonalInfoTab handleActiveTab={handleActiveTab} />,
        4: <QualificationDetails />,
        5: <EmployeeReviews />,
        6: <EmployeeProjects />,
        7: <EmployeeReportees />,
        8: <EmployeeAssets />,
        9: <EmployeeProfileHistory />,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }

    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey, employeeRole])

  return (
    <>
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {TabsLabels.map((item, _i) => (
          <CNavItem key={item.id}>
            {employeeRole !== 'admin' &&
            employeeRole !== 'HR' &&
            item.id === 9 ? (
              <></>
            ) : (
              <>
                <CNavLink
                  active={activeTabsKey === item.id}
                  onClick={() => handleActiveTab(item.id)}
                >
                  {item.name}
                </CNavLink>
              </>
            )}
          </CNavItem>
        ))}
      </CNav>
      <CTabContent className="inline-tabs-content">
        <CTabPane
          role="tabpanel"
          aria-labelledby="home-tab"
          visible={!!activeTabsKey}
        >
          {activeTabsContent}
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default MyProfileTabs
