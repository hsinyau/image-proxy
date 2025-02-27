export function GetRequestHeaders(targetUrl: string) {
  const parsedUrl = new URL(targetUrl)
  
  return {
    'Referer': `https://${parsedUrl.hostname}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'cross-site',
    'Origin': `${parsedUrl.protocol}//${parsedUrl.host}`,
    'DNT': '1',
    'Connection': 'keep-alive'
  }
}

export function SetResponseHeaders(event: any, headers: Headers) {
  const contentType = headers.get('content-type')
  if (contentType) {
    event.node.res.setHeader('Content-Type', contentType)
  }
} 
