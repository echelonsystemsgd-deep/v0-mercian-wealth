const https = require('https');

function follow(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      console.log(url, '->', res.statusCode, 'Location:', res.headers.location);
      if (res.headers.location) {
        follow(res.headers.location).then(resolve);
      } else {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve({ url, data: d }));
      }
    });
  });
}

async function run() {
  const g = await follow('https://goringeaccountants.co.uk/contact-us/');
  console.log('Final Goringe URL:', g.url, 'Length:', g.data.length);
  const forms = g.data.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Forms on final Goringe page:', forms.length);
  forms.forEach((f, i) => {
    const inputs = f.match(/<input|<textarea|<select/gi) || [];
    console.log(`Form #${i+1} inputs: ${inputs.length}`);
  });
}

run();
