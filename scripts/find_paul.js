const fs = require('fs');

const teamHtml = fs.readFileSync('armstrong_team.html', 'utf8');
const dicksonMatch = teamHtml.indexOf('Dickson');
console.log('Dickson index:', dicksonMatch);
if (dicksonMatch !== -1) {
  console.log(teamHtml.slice(dicksonMatch - 200, dicksonMatch + 300));
} else {
  // Let's search for Paul
  const paulIdx = teamHtml.indexOf('Paul');
  console.log('Paul index:', paulIdx);
  if (paulIdx !== -1) {
    console.log(teamHtml.slice(paulIdx - 100, paulIdx + 200));
  }
}
