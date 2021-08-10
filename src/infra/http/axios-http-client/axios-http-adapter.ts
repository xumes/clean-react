import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>

    const request = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    try {
      httpResponse = await axios.post(params.url, params.body, request)
    } catch (error) {
      if (error.response) {
        httpResponse = error.response
      } else {
        return {
          statusCode: 500,
          body: { title: 'Unexpected server error', message: error }
        }
      }
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
