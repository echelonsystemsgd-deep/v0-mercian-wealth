const https = require('https');
const fs = require('fs');

const html = fs.readFileSync('scripts/yt_data.html', 'utf8');
const captionsMatch = html.match(/"captionTracks":\s*(\[[^\]]+\])/);
const tracks = JSON.parse(captionsMatch[1]);
const track = tracks[0];
console.log('Full track url:', track.baseUrl);

https.get(track.baseUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, res => {
  console.log('Timedtext status:', res.statusCode);
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Length:', d.length);
    fs.writeFileSync('scripts/timedtext.xml', d);
    const plain = d.replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
    console.log('Snippet:', plain.slice(0, 800));
    // search for website / naya kaam / online / website banwani
    const regex = /.{0,50}(?:website|वेबसाइट|business|बिज़नेस|काम|store|shop|online).{0,50}/gi;
    const matches = plain.match(regex) || [];
    console.log('Matches count:', matches.length);
    matches.slice(0, 15).forEach((m, i) => console.log(`${i}: ${m}`));
  });
});
