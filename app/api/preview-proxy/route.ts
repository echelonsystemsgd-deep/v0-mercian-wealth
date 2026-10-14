import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const targetUrl = searchParams.get('url')

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  try {
    const validUrl = /^https?:\/\//i.test(targetUrl) ? targetUrl : `https://${targetUrl}`
    const res = await fetch(validUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 60 },
    })

    const contentType = res.headers.get('content-type') || 'text/html'
    if (!contentType.includes('text/html')) {
      const blob = await res.blob()
      return new NextResponse(blob, {
        status: res.status,
        headers: { 'Content-Type': contentType },
      })
    }

    let html = await res.text()
    
    // Inject <base href="..."> right after <head> so all relative scripts, styles, and images load correctly
    const baseTag = `<base href="${validUrl}" />`
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${baseTag}`)
    } else if (html.includes('<head ')) {
      html = html.replace(/<head[^>]*>/, `$&${baseTag}`)
    }

    const response = new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
      },
    })

    // Explicitly delete headers that prevent iframe embedding
    response.headers.delete('x-frame-options')
    response.headers.delete('content-security-policy')

    return response
  } catch (err: any) {
    return new NextResponse(`Error proxying preview: ${err.message}`, { status: 502 })
  }
}
