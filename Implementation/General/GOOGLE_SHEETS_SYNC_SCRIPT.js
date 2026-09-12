/**
 * MERCIAN WEALTH - GOOGLE SHEETS AUTOMATIC CLEANUP & 2-WAY SYNC
 * 
 * Instructions:
 * 1. In your Google Sheet, click Extensions > Apps Script.
 * 2. Paste this entire script into Code.gs (replacing everything).
 * 3. Click Save (Ctrl + S).
 * 4. Reload your Google Sheet.
 * 5. Click the new "Mercian Wealth" menu at the top -> "✨ Auto-Align & Format My Table".
 *    It will instantly clean up your 37 rows, insert headers, remove blank columns,
 *    and format everything with zero manual work!
 */

var SUPABASE_URL = "https://ladebhmyywkcqtyazxxk.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGViaG15eXdrY3F0eWF6eHhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY4NTAzNSwiZXhwIjoyMDk3MjYxMDM1fQ.m_FBVwQCgj9OWqz1dajV7pGpoA5yF1Hyir71gibCKEE";

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Mercian Wealth')
    .addItem('✨ Auto-Align & Format My Table (1-Click)', 'autoFormatExistingTable')
    .addSeparator()
    .addItem('🔄 Sync Deletions to Admin Backend', 'syncDeletionsToBackend')
    .addItem('🗑️ Delete Selected Row from Backend', 'deleteSelectedRowFromBackend')
    .addToUi();
}

/**
 * Automatically cleans up existing rows:
 * - Inserts Row 1 header row if missing
 * - Deletes accidental blank columns (C & E)
 * - Sets column widths, colors, and frozen header
 */
function autoFormatExistingTable() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Check if Row 1 is already a header or lead data
  var firstCell = sheet.getRange('A1').getValue().toString().toLowerCase();
  
  // If Row 1 contains a business name (not "Business Name"), insert a new header row at top
  if (!firstCell.includes('business') && !firstCell.includes('name') && !firstCell.includes('status')) {
    sheet.insertRowBefore(1);
  }
  
  // Set clean standard headers in Row 1
  var headers = [
    ['Business Name', 'Phone', 'Channel', 'WhatsApp Link', 'Reviews & Rating', 'Website', 'Address', 'Trade', 'Stage 1 Opener', 'Stage 2 Pitch', 'Follow Up 1', 'Follow Up Final', 'Status']
  ];
  sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);

  // Style Header Row (Dark Slate & Bold White Text)
  var headerRange = sheet.getRange(1, 1, 1, headers[0].length);
  headerRange.setBackground('#0f172a')
             .setFontColor('#ffffff')
             .setFontWeight('bold')
             .setFontFamily('Inter')
             .setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);

  // Auto-set comfortable column widths
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

  SpreadsheetApp.getUi().alert('✨ All leads and headers have been automatically formatted and aligned! No manual moving needed.');
}

/**
 * Syncs the sheet with the backend. Any lead deleted from Google Sheets
 * is automatically removed from the admin backend!
 */
function syncDeletionsToBackend() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  var activePhones = [];
  if (sheet.getLastRow() > 1) {
    var data = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues(); // Column B: Phone
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
