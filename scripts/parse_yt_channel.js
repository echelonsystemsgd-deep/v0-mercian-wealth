const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('scripts/yt_data.html', 'utf8');

// Full description extraction
const descMatch = html.match(/"shortDescription":"([\s\S]*?)","isCrawlable"/);
if (descMatch) {
  console.log('=== FULL DESCRIPTION ===');
  console.log(JSON.parse(`"${descMatch[1]}"`));
}

// Fetch channel about / channel main page
const channelUrl = 'https://www.youtube.com/@indianyoutuberneelamvlogs/about';
https.get(channelUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
  }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/channel_data.html', data);
    console.log('\n=== CHANNEL ABOUT PAGE FETCHED ===, length:', data.length);
    // Find emails
    const emails = data.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    console.log('Emails in channel HTML:', [...new Set(emails)]);
    
    // Find instagram or external links
    const links = data.match(/https?:\/\/(?:www\.)?(?:instagram\.com|facebook\.com|twitter\.com|t\.me)[^\s"']+/gi) || [];
    console.log('Social Links found:', [...new Set(links)]);
  });
});
