import {
  Country,
  VisaType,
} from '../../types/EmployeeDirectory/VisaList/visaListTypes'

export const mockCountries: Country[] = [
  {
    id: 1,
    name: 'AUSTRALIA',
  },
  {
    id: 2,
    name: 'INDIA',
  },
  {
    id: 3,
    name: 'USA',
  },
  {
    id: 4,
    name: 'CANADA',
  },
  {
    id: 5,
    name: 'PHILIPPINES',
  },
]

export const mockVisaTypes: VisaType[] = [
  {
    visaTypeId: 6,
    visaType: 'Business Visa',
    countryId: 1,
    countryName: 'AUSTRALIA',
  },
  {
    visaTypeId: 7,
    visaType: 'Short Term Work Permit',
    countryId: 1,
    countryName: 'AUSTRALIA',
  },
  {
    visaTypeId: 8,
    visaType: 'Permanent Resident',
    countryId: 1,
    countryName: 'AUSTRALIA',
  },
]
