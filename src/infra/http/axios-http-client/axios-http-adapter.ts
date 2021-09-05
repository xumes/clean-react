import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any> {
  async post (params: HttpPostParams): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>

    const request = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    try {
      axiosResponse = await axios.post(params.url, params.body, request)
    } catch (error) {
      if (error.response) {
        axiosResponse = error.response
      } else {
        return {
          statusCode: 500,
          body: { title: 'Unexpected server error', message: error }
        }
      }
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get (params: HttpPostParams): Promise<void> {
    await axios.get(params.url)
  }
}
