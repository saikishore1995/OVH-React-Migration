import React from 'react'
import basicInfoApi from '../../../middleware/api/MyProfile/BasicInfoTab/basicInfoApi'
import { DownloadCVInterface } from '../../../types/MyProfile/BasicInfoTab/basicInformationTypes'

const DownloadCVButton = (props: DownloadCVInterface): JSX.Element => {
  const defaultFileName = 'RBT CV_ Sample.doc'
  const downloadFileName: string = props.fileName
    ? props.fileName
    : defaultFileName

  const downloadEmployeeCVHandler = async () => {
    if (props.fileName && props.tenantKey && props.token) {
      const prepareObject = {
        fileName: props.fileName,
        token: props.token,
        tenantKey: props.tenantKey,
      }
      const cvDownload = await basicInfoApi.downloadEmployeeCV(prepareObject)
      downloadFile(cvDownload)
    }
  }

  const downloadSampleCVHandler = async () => {
    const cvDownload = await basicInfoApi.downloadSampleCV(defaultFileName)
    downloadFile(cvDownload)
  }

  const downloadFile = (cvDownload: Blob | undefined) => {
    if (cvDownload) {
      const url = window.URL.createObjectURL(
        new Blob([cvDownload], {
          type: cvDownload.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${downloadFileName}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }
  return (
    <>
      <ins
        className={props.className}
        onClick={
          props.fileName ? downloadEmployeeCVHandler : downloadSampleCVHandler
        }
      >
        <i className="fa fa-paperclip me-1"></i>
        {props.fileName ? props.fileName : 'Download Sample CV File'}
      </ins>
    </>
  )
}

export default DownloadCVButton
