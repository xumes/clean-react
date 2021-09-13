import { HttpGetClient, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any>, HttpGetClient {
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
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }

  async get (params: HttpPostParams): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>

    try {
      axiosResponse = await axios.get(params.url)
    } catch (error) {
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }

  private adapt (axiosResponse: AxiosResponse): HttpResponse<any> {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
