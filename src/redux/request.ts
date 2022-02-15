import { TResponse } from './types'

export const request = async <T = any>(
  url: string,
  method = 'GET',
  body: string | null = null,
  headers: any = {}
): Promise<TResponse<T>> => {
  try {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
    })

    const data = {
      body: await response.json(),
      status: response.status,
    }

    return data
  } catch (e) {
    throw e
  }
}
