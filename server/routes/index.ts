export default defineEventHandler(async (event) => {
  const TIMEOUT = 30000 // 30 seconds
  // 获取查询参数中的 url
  const query = getQuery(event)
  const targetUrl = query.url as string

  if (!targetUrl) {
    throw createError({
      statusCode: 400,
      message: "Missing 'url' query parameter"
    })
  }

  try {
    // 验证 URL
    new URL(targetUrl)

    // 设置请求头
    const headers = GetRequestHeaders(targetUrl)
    
    try {
      // 尝试直接获取图片
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

      const response = await fetch(targetUrl, {
        headers,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get('content-type') || ''
      
      // 检查返回的内容是否为图片
      if (!contentType.includes('image')) {
        throw createError({
          statusCode: 400,
          message: `This is not an image!`
        })
      }

      // 设置响应头
      SetResponseHeaders(event, response.headers)
      
      return response

    } catch (error) {
      throw createError({
        statusCode: 502,
        message: error.message
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: error.message
    })
  }
})
