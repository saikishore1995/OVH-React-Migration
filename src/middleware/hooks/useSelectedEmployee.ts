import { useParams } from 'react-router-dom'

export const useSelectedEmployee = (): [boolean, string | undefined] => {
  const { employeeId } = useParams<{ employeeId?: string }>()

  let isViewingAnotherEmployee = false

  if (employeeId) {
    isViewingAnotherEmployee = true
  }

  return [isViewingAnotherEmployee, employeeId]
}
