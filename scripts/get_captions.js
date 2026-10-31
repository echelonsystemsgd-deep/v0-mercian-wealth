const https = require('https');
const fs = require('fs');

const html = fs.readFileSync('scripts/yt_data.html', 'utf8');

const captionsMatch = html.match(/"captionTracks":\s*(\[[^\]]+\])/);
if (captionsMatch) {
  try {
    const tracks = JSON.parse(captionsMatch[1]);
    console.log('Captions found:', tracks.map(t => ({ lang: t.languageCode, baseUrl: t.baseUrl ? t.baseUrl.slice(0, 50) : null })));
    const track = tracks.find(t => t.languageCode === 'en' || t.languageCode === 'hi') || tracks[0];
    if (track && track.baseUrl) {
      https.get(track.baseUrl, res => {
        let xml = '';
        res.on('data', c => xml += c);
        res.on('end', () => {
          fs.writeFileSync('scripts/captions.xml', xml);
          console.log('Captions saved, length:', xml.length);
          // extract plain text
          const text = xml.replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ');
          console.log('Sample text:', text.slice(0, 500));
          // search for website / business / site in text
          const matches = text.match(/(?:website|business|brand|store|online|kaam|shop)[^.!?]{0,100}/gi) || [];
          console.log('Keywords found:', matches.slice(0, 10));
        });
      });
    }
  } catch(e) {
    console.log('Error parsing captions:', e.message);
  }
} else {
  console.log('No captionTracks found in yt_data.html');
}
