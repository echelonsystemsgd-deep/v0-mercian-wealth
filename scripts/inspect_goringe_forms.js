const https = require('https');

https.get('https://goringeaccountants.co.uk/contact/', { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6)' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const forms = d.match(/<form[\s\S]*?<\/form>/gi) || [];
    forms.forEach((f, i) => {
      console.log(`\n--- Goringe Form #${i+1} ---`);
      const action = f.match(/action=["']([^"']*)["']/i);
      console.log('Action:', action ? action[1] : 'none');
      const inputs = f.match(/<input|<textarea|<select/gi) || [];
      console.log('Total input/textarea/select count:', inputs.length);
      const names = Array.from(f.matchAll(/name=["']([^"']+)["']/gi)).map(m => m[1]);
      console.log('Fields:', names.slice(0, 10).join(', '));
    });
  });
});
