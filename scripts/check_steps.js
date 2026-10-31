const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/Deepg/.gemini/antigravity/brain/81c6f975-dda4-4336-9aa2-9c3e8afa2762/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');

for (let i = 0; i < transcript.length; i++) {
  try {
    const obj = JSON.parse(transcript[i]);
    if (obj.step_index >= 2680 && obj.step_index <= 2690) {
      console.log('STEP', obj.step_index, obj.source, obj.content ? obj.content.substring(0, 300) : '');
    }
  } catch (e) {}
}
