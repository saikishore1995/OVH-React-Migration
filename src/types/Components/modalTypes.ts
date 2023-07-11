export type ModalPropsType = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  alignment?: 'center' | 'top'
  modalTitle?: string
  modalSize?: 'sm' | 'lg' | 'xl' | undefined
  children: JSX.Element | string
  modalHeaderClass?: string
  modalFooterClass?: string
  modalBodyClass?: string
  closeButtonClass?: string
  isConfirmButtonDisabled?: boolean
  isCancelButtonDisabled?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonAction?: () => Promise<void>
}
