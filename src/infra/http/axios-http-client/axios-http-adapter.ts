import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
