import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

axiosInstance.interceptors.request.use(
  ($config: AxiosRequestConfig): AxiosRequestConfig => {
    if ($config.headers) {
      if ($config.method === "get") {
        $config.params = { ...$config.params, locale: "vi" }
      }
      $config.headers["Content-Type"] = "application/json"
      $config.headers.Accept = "application/json"
    }
    return $config
  },
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(
      error.response?.data ? (error.response?.data as Record<string, unknown> & { errors?: unknown })?.errors : error,
    ),
)
export default axiosInstance
