import service from '../request'

/**
 * 测试接口
 */
export const testApi = () => {
  return service.get(`/getData`)
}
