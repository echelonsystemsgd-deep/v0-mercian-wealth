const fs = require('fs');

console.log('--- Inspecting App Architecture ---');
const inspectDir = (dir, depth = 1) => {
  if (depth > 2) return;
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(i => {
      if (i.name === 'node_modules' || i.name === '.next' || i.name === '.git') return;
      console.log(' '.repeat(depth * 2) + (i.isDirectory() ? '[DIR] ' : '      ') + i.name);
      if (i.isDirectory()) inspectDir(dir + '/' + i.name, depth + 1);
    });
  } catch(e) {}
};

console.log('Directory tree:');
inspectDir('.');

// Check package.json scripts and dependencies
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('\nPackage scripts:', pkg.scripts);
console.log('\nCore dependencies:');
Object.keys(pkg.dependencies || {}).slice(0, 25).forEach(k => console.log(' -', k, pkg.dependencies[k]));
