export type BasicInformationState = {
  isLoading: boolean
}

export type DownloadCVInterface = {
  className?: string
  fileName?: string
  tenantKey?: string
  token?: string
}

export type ImageCropperProps = {
  file: string | undefined
  empId: number
  onUploadImage: (croppedImageData: UploadImageInterface) => void
}

export type UploadImageInterface = {
  empId: number
  data: FormData
}

export type UploadCVInterface = {
  personId: number
  file: FormData
}
