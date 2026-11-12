const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found at ' + envPath);
  }
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf-8')
      .split('\n')
      .filter(l => l.includes('='))
      .map(l => {
        const idx = l.indexOf('=');
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      })
  );
}

const env = loadEnv();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

function getBrowserExecutable() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  if (fs.existsSync(chromePath)) return chromePath;
  if (fs.existsSync(edgePath)) return edgePath;
  throw new Error('Neither Chrome nor Edge was found at standard locations.');
}

const USER_DATA_DIR = path.resolve(process.cwd(), '.ig_browser_profile');

async function launchBrowser(headless = true) {
  const executablePath = getBrowserExecutable();
  if (!fs.existsSync(USER_DATA_DIR)) {
    fs.mkdirSync(USER_DATA_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: headless ? 'new' : false,
    userDataDir: USER_DATA_DIR,
    defaultViewport: { width: 1280, height: 800 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--start-maximized'
    ]
  });

  return browser;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function checkAuth(browser) {
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  );

  console.log('Navigating to Instagram to check session...');
  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2', timeout: 30000 });

  const url = page.url();
  const content = await page.content();

  // If redirected to login page or login inputs exist
  const isLoginPage = url.includes('/accounts/login') || content.includes('name="username"');
  
  if (isLoginPage) {
    console.log('❌ NOT LOGGED IN: Instagram session requires authentication.');
    console.log('Run `node scripts/instagram-lead-finder/ig_browser_sender.js login` to open a browser window and log in once.');
    await page.close();
    return false;
  }

  console.log('✅ AUTHENTICATED: Active Instagram session found!');
  await page.close();
  return true;
}

async function loginInteractive() {
  console.log('Launching browser for interactive Instagram login...');
  console.log('Your session cookies will be safely saved in `.ig_browser_profile/` for autonomous execution.');
  const browser = await launchBrowser(false);
  const page = (await browser.pages())[0] || (await browser.newPage());

  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });
  console.log('Please log into your Instagram account in the opened Chrome window. Keep the browser open until you are logged into your feed.');
}

async function sendDM(browser, handle, message) {
  const cleanHandle = handle.replace('@', '').trim();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  );

  console.log(`Navigating to profile: https://www.instagram.com/${cleanHandle}/`);
  await page.goto(`https://www.instagram.com/${cleanHandle}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  await delay(2000 + Math.random() * 2000);

  // Look for "Message" button on profile
  const messageButtonSelectors = [
    'button div:has-text("Message")',
    'div[role="button"]:has-text("Message")',
    'button:has-text("Message")',
    'header section div button'
  ];

  let messageBtn = null;
  const buttons = await page.$$('button, div[role="button"]');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.trim().toLowerCase() === 'message') {
      messageBtn = b;
      break;
    }
  }

  if (!messageBtn) {
    console.error(`Could not locate "Message" button for @${cleanHandle}. They may have DMs disabled or require follow first.`);
    await page.close();
    return false;
  }

  console.log(`Clicking "Message" button for @${cleanHandle}...`);
  await messageBtn.click();
  await delay(3000 + Math.random() * 2000);

  // Wait for message input area
  const inputSelector = 'div[aria-label="Message"][contenteditable="true"], div[role="textbox"][contenteditable="true"]';
  await page.waitForSelector(inputSelector, { timeout: 15000 });
  const inputEl = await page.$(inputSelector);

  if (!inputEl) {
    console.error(`Could not focus message textarea for @${cleanHandle}`);
    await page.close();
    return false;
  }

  await inputEl.click();
  await delay(1000);

  // Type message with human-like delays
  console.log(`Typing personalized message to @${cleanHandle}...`);
  for (const char of message) {
    await page.keyboard.sendCharacter(char);
    await delay(15 + Math.random() * 30);
  }

  await delay(1500 + Math.random() * 1000);

  // Press Enter or click send button
  console.log('Sending message...');
  await page.keyboard.press('Enter');
  await delay(3000);

  console.log(`✅ Message successfully dispatched to @${cleanHandle}!`);
  await page.close();
  return true;
}

async function runDailyBatch() {
  console.log('--- Starting Autonomous Daily Batch Outreach ---');
  const browser = await launchBrowser(false);

  const isAuth = await checkAuth(browser);
  if (!isAuth) {
    await browser.close();
    return;
  }

  // Get daily batch from Supabase
  const { data: leads, error } = await supabase
    .from('instagram_leads')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !leads) {
    console.error('Failed to load leads from Supabase');
    await browser.close();
    return;
  }

  const warmupDay = leads[0]?.warmup_day || 1;
  const dailyCap = warmupDay <= 4 ? 3 : warmupDay <= 7 ? 5 : warmupDay <= 14 ? 10 : 30;
  const now = new Date();

  // Due follow-ups first
  const dueFollowups = leads.filter(l => 
    (l.status === 'sent_d1' || l.status === 'sent_d4') && 
    l.next_action_due && 
    new Date(l.next_action_due) <= now
  );

  const batch = [];
  for (const f of dueFollowups) {
    if (batch.length >= dailyCap) break;
    const step = f.status === 'sent_d1' ? 'd4' : 'd7';
    batch.push({
      lead: f,
      step: step,
      message: step === 'd4' ? f.message_d4 : f.message_d7
    });
  }

  // Then new D1 leads
  if (batch.length < dailyCap) {
    const queuedD1 = leads.filter(l => l.status === 'queued_d1');
    for (const d of queuedD1) {
      if (batch.length >= dailyCap) break;
      batch.push({
        lead: d,
        step: 'd1',
        message: d.message_d1
      });
    }
  }

  console.log(`Dispatched batch count: ${batch.length} leads.`);

  for (let i = 0; i < batch.length; i++) {
    const item = batch[i];
    const l = item.lead;
    console.log(`\n[${i + 1}/${batch.length}] Processing @${l.instagram_handle} (Step: ${item.step.toUpperCase()})...`);

    const success = await sendDM(browser, l.instagram_handle, item.message);

    if (success) {
      const updateFields = { updated_at: new Date().toISOString() };
      if (item.step === 'd1') {
        updateFields.status = 'sent_d1';
        updateFields.d1_sent_at = new Date().toISOString();
        updateFields.next_action_due = new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString();
      } else if (item.step === 'd4') {
        updateFields.status = 'sent_d4';
        updateFields.d4_sent_at = new Date().toISOString();
        updateFields.next_action_due = new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString();
      } else if (item.step === 'd7') {
        updateFields.status = 'sent_d7';
        updateFields.d7_sent_at = new Date().toISOString();
        updateFields.next_action_due = null;
      }

      await supabase.from('instagram_leads').update(updateFields).eq('instagram_handle', l.instagram_handle);
      console.log(`Updated Supabase record for @${l.instagram_handle}`);
    }

    // Safety pause between messages (30–60 seconds)
    if (i < batch.length - 1) {
      const waitTime = Math.floor(30000 + Math.random() * 30000);
      console.log(`Waiting ${Math.round(waitTime / 1000)}s before next target to simulate human pacing...`);
      await delay(waitTime);
    }
  }

  await browser.close();
  console.log('--- Batch Run Complete ---');
}

async function main() {
  const cmd = process.argv[2] || 'check-auth';

  switch (cmd) {
    case 'login':
      await loginInteractive();
      break;
    case 'check-auth': {
      const browser = await launchBrowser(true);
      await checkAuth(browser);
      await browser.close();
      break;
    }
    case 'send-batch':
      await runDailyBatch();
      break;
    default:
      console.log('Usage: node ig_browser_sender.js [login | check-auth | send-batch]');
  }
}

main().catch(console.error);
