import { Method, ResponseType } from 'axios'

export const getUnauthenticatedRequestConfig = ({
  url,
  method,
  additionalHeaders,
  tenantKey,
}: {
  url: string
  method: Method
  additionalHeaders: { [key: string]: string | number }
  tenantKey: string
}): {
  url: string
  method: Method
  headers: { tenantKey: string; [key: string]: string | number }
} => {
  return {
    url,
    method,
    headers: {
      tenantKey: tenantKey,
      ...additionalHeaders,
    },
  }
}

export const getAuthenticatedRequestConfig = ({
  url,
  method,
  params,
  data,
  additionalHeaders,
  responseType,
}: {
  url: string
  method: Method
  params?: { [key: string]: string | number | boolean | undefined }
  data?:
    | { [key: string]: string | number | unknown }
    | unknown
    | string
    | number
  additionalHeaders?: { [key: string]: string | number }
  responseType?: ResponseType
}): {
  url: string
  method: Method
  headers: { tenantKey: string; [key: string]: string | number }
  params?: { [key: string]: string | number | boolean | undefined }
  data?:
    | { [key: string]: string | number | unknown }
    | unknown
    | string
    | number
  responseType?: ResponseType
} => {
  const token = localStorage.getItem('token') as string
  const tenantKey = localStorage.getItem('tenantKey') as string
  return {
    url,
    method,
    headers: {
      tenantKey: tenantKey,
      'X-Auth-Token': token,
      ...additionalHeaders,
    },
    params,
    responseType,
    data,
  }
}
