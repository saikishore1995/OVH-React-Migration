import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { ImageCropperProps } from '../../../types/MyProfile/BasicInfoTab/basicInformationTypes'

const BasicInfoTabImageCropper = (props: ImageCropperProps): JSX.Element => {
  const [image, setImage] = useState<string | undefined>()
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [cropper, setCropper] = useState<Cropper>()
  const [fileTypeError, setFileTypeError] = useState<string>('')
  const { onUploadImage } = props
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    const acceptedFileTypes = ['png', 'jpeg', 'jpg', 'PNG', 'JPEG', 'JPG']
    let extension = '' as string
    if (!file) return
    if (file) {
      extension = file[0].name.split('.').pop() as string
    }
    if (!acceptedFileTypes.includes(extension)) {
      setFileTypeError(
        'Wrong file format chosen. Please choose either png, jpeg, or jpg.',
      )
      setImage(undefined)
      setImageUploaded(false)
      setCropper(undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
      setImageUploaded(true)
      setFileTypeError('')
    }
    reader.readAsDataURL(file[0])
  }

  const getCropData = useCallback(async () => {
    if (typeof cropper !== 'undefined' && typeof cropper !== null) {
      cropper.getCroppedCanvas().toBlob(async (blob: unknown | Blob) => {
        const imageFile = new File([blob as Blob], 'profilePicture', {
          type: 'image/jpeg',
        })
        const formData = new FormData()
        formData.append('file', imageFile)
        const prepareFile = {
          data: formData,
          empId: props.empId,
        }
        setTimeout(() => {
          onUploadImage(prepareFile)
        }, 500)
      }, 'image/jpeg')
    }
  }, [cropper, props.empId, onUploadImage])

  useEffect(() => {
    if (typeof cropper !== 'undefined')
      setTimeout(() => {
        getCropData()
      }, 500)
  }, [cropper, getCropData, image])

  return (
    <div>
      {imageUploaded ? (
        <div className="basic-info-box mt-2">
          <div id="uploadedImage" className="basic-info-img-preview" />
        </div>
      ) : (
        <div id="profilePicture" className="profile-avatar mt-2">
          <img className="basic-info-img" src={props.file} alt="User Profile" />
        </div>
      )}
      <div className="mt-2">
        <input
          type="file"
          id="fileUpload"
          onChange={onChange}
          accept=".png, .jpg, .jpeg"
        />
        {fileTypeError && (
          <div>
            <strong className="text-danger mt-3">{fileTypeError}</strong>
          </div>
        )}
        {imageUploaded && (
          <span
            onMouseLeave={getCropData}
            className="basic-info-cropper-span mt-2"
          >
            <Cropper
              id="cropper"
              zoomTo={0}
              className="basic-info-cropper-span"
              aspectRatio={1}
              preview=".basic-info-img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={30}
              minCropBoxWidth={30}
              background={false}
              responsive={true}
              autoCropArea={1}
              scalable={false}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance)
                getCropData()
              }}
              guides={true}
            />
          </span>
        )}
      </div>
    </div>
  )
}

export default BasicInfoTabImageCropper
