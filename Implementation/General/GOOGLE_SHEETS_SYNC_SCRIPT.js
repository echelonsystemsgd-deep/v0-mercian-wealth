/**
 * MERCIAN WEALTH - GOOGLE SHEETS AUTOMATIC CLEANUP & 2-WAY SYNC
 * 
 * Instructions:
 * 1. In your Google Sheet, click Extensions > Apps Script.
 * 2. Paste this entire script into Code.gs (replacing everything).
 * 3. Click Save (Ctrl + S).
 * 4. Reload your Google Sheet.
 * 5. Click the new "Mercian Wealth" menu at the top -> "🚀 Sync All Leads to Admin Dashboard (1-Click)".
 *    It will instantly push all 224 leads to your Supabase backend and Admin Dashboard!
 */

var SUPABASE_URL = "https://ladebhmyywkcqtyazxxk.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGViaG15eXdrY3F0eWF6eHhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY4NTAzNSwiZXhwIjoyMDk3MjYxMDM1fQ.m_FBVwQCgj9OWqz1dajV7pGpoA5yF1Hyir71gibCKEE";

/**
 * Webhook endpoint for n8n: Receives incoming scraped lead objects and appends to Sheet
 */
function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(30000);
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);
    
    // Action 1: Delete Row by Phone or Business Name (triggered from Admin Dashboard)
    if (data.action === 'delete_row' || data.action === 'delete') {
      var targetPhone = String(data.phone || '').replace(/[^0-9]/g, '');
      var targetName = String(data.business_name || '').trim().toLowerCase();
      var deletedRows = 0;
      
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        // Iterate backwards so deleting rows does not alter subsequent indices
        for (var r = lastRow; r >= 2; r--) {
          var rowName = String(sheet.getRange(r, 1).getValue() || '').trim().toLowerCase();
          var rowPhone = String(sheet.getRange(r, 2).getValue() || '').replace(/[^0-9]/g, '');
          
          var matchPhone = (targetPhone && rowPhone && (rowPhone.indexOf(targetPhone) !== -1 || targetPhone.indexOf(rowPhone) !== -1));
          var matchName = (targetName && rowName && (rowName === targetName || rowName.indexOf(targetName) !== -1 || targetName.indexOf(rowName) !== -1));
          
          if (matchPhone || matchName) {
            sheet.deleteRow(r);
            deletedRows++;
          }
        }
      }
      lock.releaseLock();
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', deleted: deletedRows }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Auto-create header row if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Business Name', 'Phone', 'Channel', 'WhatsApp Link', 'Reviews',
        'Rating', 'Website', 'Address', 'Trade', 'Classification',
        'Stage 1 Opener', 'Stage 2 Pitch', 'Follow Up 1', 'Follow Up Final', 'Status'
      ]);
    }
    
    // Deduplication Protection: Collect all existing phones and names from the sheet
    var existingPhones = {};
    var existingNames = {};
    var lastRow = sheet.getLastRow();
    
    if (lastRow > 1) {
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var nameColIdx = -1;
      var phoneColIdx = -1;
      
      for (var h = 0; h < headers.length; h++) {
        var headerStr = String(headers[h]).toLowerCase().trim();
        if (headerStr.indexOf('phone') !== -1) phoneColIdx = h;
        if (headerStr.indexOf('business') !== -1 || headerStr === 'name') nameColIdx = h;
      }
      
      if (nameColIdx === -1) nameColIdx = 0;
      if (phoneColIdx === -1) phoneColIdx = 1;
      
      var existingData = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
      for (var r = 0; r < existingData.length; r++) {
        var rawExistingPhone = String(existingData[r][phoneColIdx] || '').replace(/[^0-9]/g, '');
        var rawExistingName = String(existingData[r][nameColIdx] || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (rawExistingPhone) existingPhones[rawExistingPhone] = true;
        if (rawExistingName) existingNames[rawExistingName] = true;
      }
    }
    
    var itemsToInsert = Array.isArray(data) ? data : (data.leads && Array.isArray(data.leads) ? data.leads : [data]);
    var rows = [];
    var skippedDuplicates = 0;
    
    for (var i = 0; i < itemsToInsert.length; i++) {
      var item = itemsToInsert[i];
      var itemPhone = String(item['Phone'] || item.phone || '').replace(/[^0-9]/g, '');
      var itemName = String(item['Business Name'] || item.business_name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // STRICT SKIP: If phone or business name already exists in the sheet, do not re-add or overwrite!
      if ((itemPhone && existingPhones[itemPhone]) || (itemName && existingNames[itemName])) {
        skippedDuplicates++;
        continue;
      }
      
      // Register so duplicates in the same payload are also filtered
      if (itemPhone) existingPhones[itemPhone] = true;
      if (itemName) existingNames[itemName] = true;
      
      rows.push([
        item['Business Name'] || item.business_name || '',
        item['Phone'] || item.phone || '',
        item['Channel'] || '',
        item['WhatsApp Link'] || item.whatsapp_direct_url || '',
        item['Reviews'] || item.reviews || 0,
        item['Rating'] || item.rating || 5.0,
        item['Website'] || item.website || 'None',
        item['Address'] || item.address || '',
        item['Trade'] || item.trade || '',
        item['Classification'] || item.classification || '',
        item['Stage 1 Opener'] || '',
        item['Stage 2 Pitch'] || '',
        item['Follow Up 1'] || '',
        item['Follow Up Final'] || '',
        item['Status'] || 'New'
      ]);
    }
    
    if (rows.length > 0) {
      sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    }
    
    lock.releaseLock();
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      inserted: rows.length, 
      skipped_duplicates: skippedDuplicates,
      total_rows: sheet.getLastRow() 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', service: 'Mercian Wealth Lead Sync' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Mercian Wealth')
    .addItem('🚀 Sync All Leads to Admin Dashboard (1-Click)', 'syncAllLeadsToAdminBackend')
    .addItem('⚡ Fresh Sync (Wipe Old Scraper Leads & Import Fresh)', 'freshSyncToAdminBackend')
    .addSeparator()
    .addItem('✨ Auto-Align & Format My Table (1-Click)', 'autoFormatExistingTable')
    .addItem('🔄 Sync Deletions to Admin Backend', 'syncDeletionsToBackend')
    .addItem('🗑️ Delete Selected Row from Backend', 'deleteSelectedRowFromBackend')
    .addToUi();
}

/**
 * Helper: Find column index by checking header names flexibly
 */
function findColIndex(headers, keywords) {
  for (var i = 0; i < headers.length; i++) {
    var h = String(headers[i] || '').trim().toLowerCase();
    for (var k = 0; k < keywords.length; k++) {
      if (h.indexOf(keywords[k]) !== -1) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Extracts and prepares lead objects from the current active sheet
 */
function extractLeadsFromSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    return [];
  }

  var headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // Dynamic header matching
  var colName = findColIndex(headerRow, ['business name', 'company', 'business', 'name']);
  var colPhone = findColIndex(headerRow, ['phone', 'tel', 'mobile', 'telephone']);
  var colWebsite = findColIndex(headerRow, ['website', 'site', 'url']);
  var colReviewsRating = findColIndex(headerRow, ['reviews & rating', 'rating & reviews', 'reviews and rating']);
  var colRating = findColIndex(headerRow, ['google rating', 'rating', 'star']);
  var colReviews = findColIndex(headerRow, ['reviews count', 'reviews', 'review']);
  var colAddress = findColIndex(headerRow, ['address', 'location', 'street']);
  var colTrade = findColIndex(headerRow, ['trade', 'category', 'niche']);
  var colStatus = findColIndex(headerRow, ['status']);
  var colWhatsApp = findColIndex(headerRow, ['whatsapp link', 'whatsapp', 'wa link']);
  var colStage1 = findColIndex(headerRow, ['stage 1 opener', 'stage 1', 'opener']);
  var colStage2 = findColIndex(headerRow, ['stage 2 pitch', 'stage 2', 'pitch']);
  var colFollowUp1 = findColIndex(headerRow, ['follow up 1', 'followup 1']);
  var colFollowUpFinal = findColIndex(headerRow, ['follow up final', 'followup final']);

  // Fallback defaults if headers were standard 13-column format
  if (colName === -1) colName = 0;
  if (colPhone === -1) colPhone = 1;
  if (colReviewsRating === -1) colReviewsRating = 4;
  if (colWebsite === -1) colWebsite = 5;
  if (colAddress === -1) colAddress = 6;
  if (colTrade === -1) colTrade = 7;
  if (colStage1 === -1) colStage1 = 8;
  if (colStage2 === -1) colStage2 = 9;
  if (colFollowUp1 === -1) colFollowUp1 = 10;
  if (colFollowUpFinal === -1) colFollowUpFinal = 11;
  if (colStatus === -1) colStatus = 12;

  var allData = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  var prepared = [];

  for (var r = 0; r < allData.length; r++) {
    var row = allData[r];
    var businessName = String(row[colName] || '').trim();
    var rawPhone = String(row[colPhone] || '').trim();

    // Skip empty dummy rows
    if (!businessName && !rawPhone) continue;
    if (businessName.toLowerCase() === 'business name') continue;

    // Phone standardisation
    var digits = rawPhone.replace(/[^0-9]/g, '');
    var formattedPhone = rawPhone;
    if (digits.startsWith('07') && digits.length === 11) {
      formattedPhone = '+44' + digits.substring(1);
    } else if (digits.startsWith('447')) {
      formattedPhone = '+' + digits;
    } else if ((digits.startsWith('01') || digits.startsWith('02') || digits.startsWith('08')) && digits.length >= 10) {
      formattedPhone = '+44' + digits.substring(1);
    } else if (digits.startsWith('44')) {
      formattedPhone = '+' + digits;
    }

    var isMobile = digits.startsWith('447') || digits.startsWith('07');
    var waDigits = digits.startsWith('07') ? ('44' + digits.substring(1)) : (digits.startsWith('447') ? digits : digits);
    var waUrl = isMobile ? ('https://wa.me/' + waDigits) : null;

    // Address cleaning (strip corrupt review fragments like '· 57 (★4.9)')
    var rawAddress = colAddress !== -1 ? String(row[colAddress] || '').trim() : '';
    var cleanAddress = rawAddress
      .replace(/·\s*\d+(\s*\(★[\d\.]+\))?/g, '')
      .replace(/\(\s*★[\d\.]+\s*\)/g, '')
      .replace(/·\s*★[\d\.]+/g, '')
      .trim();

    // Rating & Reviews count extraction
    var rating = 5.0;
    var reviewsCount = 0;
    var rawRatingReviews = colReviewsRating !== -1 ? String(row[colReviewsRating] || '') : '';
    if (rawRatingReviews) {
      var rMatch = rawRatingReviews.match(/([0-5]\.[0-9]|[0-5])/);
      if (rMatch) rating = parseFloat(rMatch[1]);
      var revMatch = rawRatingReviews.match(/(\d+)\s*reviews?/i) || rawRatingReviews.match(/^(\d+)/);
      if (revMatch) reviewsCount = parseInt(revMatch[1], 10);
    } else {
      if (colRating !== -1) {
        var rSingle = parseFloat(row[colRating]);
        if (!isNaN(rSingle)) rating = rSingle;
      }
      if (colReviews !== -1) {
        var revSingle = parseInt(row[colReviews], 10);
        if (!isNaN(revSingle)) reviewsCount = revSingle;
      }
    }

    // Website sanitisation
    var rawWeb = colWebsite !== -1 ? String(row[colWebsite] || '').trim() : '';
    var website = (rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && rawWeb !== 'null' && rawWeb !== 'undefined') ? rawWeb : null;

    var trade = (colTrade !== -1 ? String(row[colTrade] || '') : '').trim();
    var nameLower = businessName.toLowerCase();
    if (!trade || trade.toLowerCase() === 'tradesperson' || trade.toLowerCase() === 'local business' || nameLower.includes('jewel') || nameLower.includes('gold') || nameLower.includes('diamond') || nameLower.includes('silver') || nameLower.includes('ring') || nameLower.includes('watch') || nameLower.includes('gem')) {
      if (nameLower.includes('jewel') || nameLower.includes('gold') || nameLower.includes('diamond') || nameLower.includes('silver') || nameLower.includes('ring') || nameLower.includes('watch') || nameLower.includes('gem')) {
        trade = 'Jeweller';
      } else {
        trade = trade || 'Local Business';
      }
    }
    var rawStatus = colStatus !== -1 ? String(row[colStatus] || '').trim() : '';
    var status = rawStatus || 'New';

    var stage1 = colStage1 !== -1 ? String(row[colStage1] || '').trim() : 'Hi 👋';
    var stage2 = colStage2 !== -1 ? String(row[colStage2] || '').trim() : '';
    var f1 = colFollowUp1 !== -1 ? String(row[colFollowUp1] || '').trim() : '';
    var fFinal = colFollowUpFinal !== -1 ? String(row[colFollowUpFinal] || '').trim() : '';

    var notes = (cleanAddress || '') + (rating ? ' · ★' + rating : '') + (reviewsCount ? ' (' + reviewsCount + ' reviews)' : '');

    prepared.push({
      name: 'Owner / Director',
      business_name: businessName,
      phone: formattedPhone || null,
      website: website,
      service_interested: 'Digital Storefront & Speed-to-Lead Automation',
      notes: notes,
      status: status,
      source: 'google_maps_outreach',
      lead_type: 'local',
      local_business_niche: trade,
      outreach_category: !website ? 'no_website' : 'has_website',
      outreach_stage: status === 'Contacted' ? 'contacted' : 'uncontacted',
      whatsapp_direct_url: waUrl,
      scraped_metadata: {
        address: cleanAddress,
        rating: rating,
        reviews_count: reviewsCount,
        rating_reviews: rating + ' (' + reviewsCount + ' reviews)',
        trade: trade,
        stage_1_opener: stage1 || 'Hi 👋',
        stage_2_pitch: stage2,
        follow_up_1: f1,
        follow_up_final: fFinal
      }
    });
  }

  return prepared;
}

/**
 * 🚀 Sync All Leads to Admin Dashboard (1-Click)
 * Pushes/Upserts all leads from Google Sheets directly to Supabase
 */
function syncAllLeadsToAdminBackend() {
  var ui = SpreadsheetApp.getUi();
  var leads = extractLeadsFromSheet();

  if (leads.length === 0) {
    ui.alert('⚠️ No leads found in the current sheet to sync.');
    return;
  }

  // 1. Fetch existing leads from Supabase to prevent duplicates
  var fetchUrl = SUPABASE_URL + '/rest/v1/leads?select=id,phone,business_name&source=eq.google_maps_outreach';
  var fetchRes = UrlFetchApp.fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    },
    muteHttpExceptions: true
  });

  if (fetchRes.getResponseCode() !== 200) {
    ui.alert('Error checking backend: ' + fetchRes.getContentText());
    return;
  }

  var existing = JSON.parse(fetchRes.getContentText()) || [];
  var existingPhoneMap = {};
  var existingNameMap = {};

  existing.forEach(function(item) {
    if (item.phone) {
      var d = String(item.phone).replace(/[^0-9]/g, '');
      if (d) existingPhoneMap[d] = item.id;
    }
    if (item.business_name) {
      existingNameMap[String(item.business_name).trim().toLowerCase()] = item.id;
    }
  });

  var toInsert = [];
  var updatedCount = 0;
  var seenBatchPhones = {};
  var seenBatchNames = {};

  leads.forEach(function(lead) {
    var digits = lead.phone ? String(lead.phone).replace(/[^0-9]/g, '') : '';
    var nameKey = String(lead.business_name).trim().toLowerCase();
    var existingId = (digits && existingPhoneMap[digits]) || existingNameMap[nameKey];

    if (existingId) {
      // Update existing lead record
      var updateUrl = SUPABASE_URL + '/rest/v1/leads?id=eq.' + existingId;
      UrlFetchApp.fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify({
          website: lead.website,
          notes: lead.notes,
          local_business_niche: lead.local_business_niche,
          outreach_category: lead.outreach_category,
          scraped_metadata: lead.scraped_metadata
        }),
        muteHttpExceptions: true
      });
      updatedCount++;
    } else {
      // Deduplicate within the batch itself so unique constraint is never violated
      if (digits && seenBatchPhones[digits]) return;
      if (nameKey && seenBatchNames[nameKey]) return;
      if (digits) seenBatchPhones[digits] = true;
      if (nameKey) seenBatchNames[nameKey] = true;
      toInsert.push(lead);
    }
  });

  // Batch insert new leads in chunks of 50
  var insertedCount = 0;
  var CHUNK_SIZE = 50;
  for (var i = 0; i < toInsert.length; i += CHUNK_SIZE) {
    var chunk = toInsert.slice(i, i + CHUNK_SIZE);
    var insertRes = UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      payload: JSON.stringify(chunk),
      muteHttpExceptions: true
    });

    if (insertRes.getResponseCode() === 201 || insertRes.getResponseCode() === 200) {
      insertedCount += chunk.length;
    } else {
      ui.alert('Warning on batch insert: ' + insertRes.getContentText());
      break;
    }
  }

  ui.alert('🚀 Sync Complete!\n\n' +
           '• Total leads in sheet: ' + leads.length + '\n' +
           '• New leads inserted: ' + insertedCount + '\n' +
           '• Existing leads updated: ' + updatedCount + '\n\n' +
           'All leads are now live in your Admin Dashboard (/admin/leads)!');
}

/**
 * ⚡ Fresh Sync: Wipes existing scraper leads and imports clean
 */
function freshSyncToAdminBackend() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    '⚠️ Confirm Fresh Sync',
    'This will clear existing outreach leads and replace them with all leads currently in this sheet. Manual/booking leads are preserved. Continue?',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  var leads = extractLeadsFromSheet();
  if (leads.length === 0) {
    ui.alert('No leads found in sheet.');
    return;
  }

  // Delete previous outreach leads
  var delRes = UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/leads?source=eq.google_maps_outreach', {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    },
    muteHttpExceptions: true
  });

  // Batch insert in chunks of 50
  var insertedCount = 0;
  var CHUNK_SIZE = 50;
  for (var i = 0; i < leads.length; i += CHUNK_SIZE) {
    var chunk = leads.slice(i, i + CHUNK_SIZE);
    var insertRes = UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      payload: JSON.stringify(chunk),
      muteHttpExceptions: true
    });

    if (insertRes.getResponseCode() === 201 || insertRes.getResponseCode() === 200) {
      insertedCount += chunk.length;
    } else {
      ui.alert('Error on batch insert: ' + insertRes.getContentText());
      return;
    }
  }

  ui.alert('⚡ Fresh Sync Complete!\n\nImported ' + insertedCount + ' clean leads to your Admin Dashboard. Refresh /admin/leads to view them.');
}

/**
 * Automatically cleans up existing rows:
 * - Inserts Row 1 header row if missing
 * - Sets column widths, colors, and frozen header
 */
function autoFormatExistingTable() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var firstCell = sheet.getRange('A1').getValue().toString().toLowerCase();
  
  if (!firstCell.includes('business') && !firstCell.includes('name') && !firstCell.includes('status')) {
    sheet.insertRowBefore(1);
  }
  
  var headers = [
    ['Business Name', 'Phone', 'Channel', 'WhatsApp Link', 'Reviews & Rating', 'Website', 'Address', 'Trade', 'Stage 1 Opener', 'Stage 2 Pitch', 'Follow Up 1', 'Follow Up Final', 'Status']
  ];
  sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers[0].length);
  headerRange.setBackground('#0f172a')
             .setFontColor('#ffffff')
             .setFontWeight('bold')
             .setFontFamily('Inter')
             .setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 230); // Business Name
  sheet.setColumnWidth(2, 140); // Phone
  sheet.setColumnWidth(3, 140); // Channel
  sheet.setColumnWidth(4, 250); // WhatsApp Link
  sheet.setColumnWidth(5, 120); // Reviews
  sheet.setColumnWidth(6, 180); // Website
  sheet.setColumnWidth(7, 260); // Address
  sheet.setColumnWidth(8, 120); // Trade
  sheet.setColumnWidth(9, 90);  // Stage 1
  sheet.setColumnWidth(10, 360); // Stage 2 Pitch
  sheet.setColumnWidth(11, 260); // Follow Up 1
  sheet.setColumnWidth(12, 260); // Follow Up Final
  sheet.setColumnWidth(13, 100); // Status

  SpreadsheetApp.getUi().alert('✨ Table layout formatted and aligned!');
}

/**
 * Syncs deletions: any lead removed from Google Sheets is removed from backend
 */
function syncDeletionsToBackend() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  var activePhones = [];
  if (sheet.getLastRow() > 1) {
    var data = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
    data.forEach(function(row) {
      if (row[0]) activePhones.push(String(row[0]).trim());
    });
  }

  var url = SUPABASE_URL + '/rest/v1/leads?select=id,phone,business_name&source=eq.google_maps_outreach';
  var response = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    },
    muteHttpExceptions: true
  });
  
  if (response.getResponseCode() !== 200) {
    SpreadsheetApp.getUi().alert('Error connecting to backend: ' + response.getContentText());
    return;
  }
  
  var backendLeads = JSON.parse(response.getContentText());
  var deletedCount = 0;
  
  backendLeads.forEach(function(lead) {
    var phone = lead.phone ? String(lead.phone).trim() : '';
    if (phone && activePhones.indexOf(phone) === -1) {
      var delUrl = SUPABASE_URL + '/rest/v1/leads?id=eq.' + lead.id;
      UrlFetchApp.fetch(delUrl, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        },
        muteHttpExceptions: true
      });
      deletedCount++;
    }
  });
  
  SpreadsheetApp.getUi().alert('✅ Sync Complete! Removed ' + deletedCount + ' deleted lead(s) from the Admin Backend.');
}

function deleteSelectedRowFromBackend() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  
  if (row <= 1) {
    SpreadsheetApp.getUi().alert('Please select a lead row (not the header).');
    return;
  }
  
  var phone = sheet.getRange(row, 2).getValue();
  var name = sheet.getRange(row, 1).getValue();
  
  if (!phone && !name) {
    SpreadsheetApp.getUi().alert('Selected row does not contain a business name or phone.');
    return;
  }
  
  var delUrl = SUPABASE_URL + '/rest/v1/leads?phone=eq.' + encodeURIComponent(phone);
  UrlFetchApp.fetch(delUrl, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    },
    muteHttpExceptions: true
  });
  
  sheet.deleteRow(row);
  SpreadsheetApp.getUi().alert('🗑️ Deleted "' + name + '" from Google Sheets and the Admin Backend!');
}
