
// 定义 HTTP 方法类型
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

// 定义请求配置接口
interface HttpRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  [key: string]: any;
}

// 定义响应结果接口
interface HttpResponse<T = any> {
  status: number;
  msg: string;
  data: T;
}

class Http {
  private baseUrl = '';
  private accessToken = '';
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request(url: string,config?: HttpRequestConfig): Promise<Response> {
    const token = localStorage.getItem('access_token');  
    config = {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }  
    const response = await fetch(this.baseUrl+url,config);
    const responseData = await response.json();
    return new Promise<Response>((resolve, reject) => {
      if (response.status === 200 || response.status === 201) {
        resolve(responseData);
      }else{
        reject({
            status: response.status,
            statusText: response.statusText,
            data: responseData,
            originalResponse: response
        });
      }
    })

 }

  async get(url: string, query?: object, config?: HttpRequestConfig): Promise<Response> {
    if(query){
        const params = new URLSearchParams({
            ...query
        });
        url = url + '?' + params.toString();
    }  
    return this.request(url, {method: 'GET', ...config});
  }

  async post(url: string,data: any, config?: HttpRequestConfig): Promise<Response> {
    return this.request(url, {method: 'POST', ...config, body: JSON.stringify(data)});
  }

}


export const http_local = new Http('http://localhost:3000/');
export const http = new Http('http://localhost:3002/');
