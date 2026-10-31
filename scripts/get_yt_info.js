const https = require('https');
const fs = require('fs');

const url = 'https://www.youtube.com/watch?v=vflgEKE-qvE';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/yt_data.html', data);
    console.log('Saved data, length:', data.length);

    const titleMatch = data.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

    const channelMatch = data.match(/"channelId":"([^"]+)"/);
    console.log('Channel ID:', channelMatch ? channelMatch[1] : 'NONE');

    const authorMatch = data.match(/"author":"([^"]+)"/);
    console.log('Author:', authorMatch ? authorMatch[1] : 'NONE');

    const ownerNameMatch = data.match(/"ownerChannelName":"([^"]+)"/);
    console.log('Owner Channel Name:', ownerNameMatch ? ownerNameMatch[1] : 'NONE');

    const canonicalBaseUrl = data.match(/"canonicalBaseUrl":"([^"]+)"/);
    console.log('Canonical Base URL:', canonicalBaseUrl ? canonicalBaseUrl[1] : 'NONE');

    const descMatch = data.match(/"shortDescription":"([^"]+)"/);
    console.log('Short Description:', descMatch ? descMatch[1].slice(0, 500) : 'NONE');
  });
}).on('error', e => console.error(e));
