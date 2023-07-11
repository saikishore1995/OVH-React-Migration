import { AllowedHttpMethods, certificateListApiConfig } from '../../apiList'
import {
  CertificateListApiProps,
  EmployeeCertificateResponse,
} from '../../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeesCertificates = async (
  props: CertificateListApiProps,
): Promise<EmployeeCertificateResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateListApiConfig.getAllEmployeeCertificates,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      multipleSearch: props.multipleSearch ?? '',
      selectedCertificate: props.selectedCertificate ?? '',
      selectionTechnology: props.selectionTechnology ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const exportCertificatesData = async (
  props: CertificateListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificateListApiConfig.exportCertificateList,
    method: AllowedHttpMethods.get,
    params: {
      selectionTechnology: props.selectionTechnology ?? '',
      selectedCertificate: props.selectedCertificate ?? '',
      multipleSearch: props.multipleSearch ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await axios(requestConfig)
  return response.data
}

const certificatesApi = {
  getEmployeesCertificates,
  exportCertificatesData,
}

export default certificatesApi
