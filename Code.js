/*================================================================================================================*
  Bugrid
  ================================================================================================================
  Version:      1.0.0
  Project Page: https://github.com/Sheetgo/bugrid
  Copyright:    (c) 2018 by Sheetgo
  License:      GNU General Public License, version 3 (GPL-3.0)
                http://www.opensource.org/licenses/gpl-3.0.html
  ----------------------------------------------------------------------------------------------------------------
  Changelog:
  1.0.0  Initial release
 *================================================================================================================*/



var logsTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Script Actions Log");
var bugsTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bugs");
var developersTab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input Developers");


/**
 * This funcion will run when you open the spreadsheet. It creates a Spreadsheet menu option to run the spript
 */
function onOpen() {
    // Adds a custom menu to the spreadsheet.
    SpreadsheetApp.getUi()
        .createMenu('Bugbuster')
        .addItem('Bugrid', 'analyzeBugs')
        .addToUi();
}


function analyzeBugs() {
  // Gets the spreadsheet values matrix
  var values = bugsTab.getDataRange().getValues();
  for (var x = 0; x < values.length; x++) {
    // Ignores header of the spreadsheet
    if (x > 0) {

      // Gets the current row
      var row = values[x];

      // Gets the current row fields
      var bugId = row[alphabet_letter_index('A')];
      var bugDetails = row[alphabet_letter_index('E')];
      var supportEmail = row[alphabet_letter_index('C')];
      var developerName = row[alphabet_letter_index('J')];
      var developer = getDeveloperByName(developerName);
      var userEmail = row[alphabet_letter_index('D')];

      // These two variables are used to determine whether should we notify the
      // support member if the bug is tag as Not a Bug.
      var notifiedAsNotABug = actionPerformed(bugId, "not-a-bug");
      var taggedAsNotABug = row[alphabet_letter_index('H')];

      // Checks: is it tagged as a "Not a Bug" AND NOT already notifyed?
      if (taggedAsNotABug && !notifiedAsNotABug) {
        // In case it's not a bug, send e-mail to the support member
        MailApp.sendEmail(
            supportEmail, developer.email, "Bug #"+bugId+" Is not a Bug",
            "The Developer "+ developerName +" has marked as 'Not a Bug'\n\n"
            + "User email:"+userEmail+"\n\nBug Details:\n\n"+bugDetails
        );

        // Appends a log line in the Script Actions Log tab
        logsTab.appendRow([bugId, "not-a-bug", 1, new Date()])
      }

      // These two variables are used to determine whether should we notify the
      // support member if the bug needs to be tested.
      var sentEmailForTesting = actionPerformed(bugId, "needs-testing");
      var shouldNotifyForTesting = row[alphabet_letter_index('L')];

      // Checks: is it tagged as a "Needs Testing" AND NOT already notifyed?
      if (shouldNotifyForTesting && !sentEmailForTesting) {

        MailApp.sendEmail(
          supportEmail,
          developer.email,
          "Bug Fix #"+bugId+" ready for testing",
          "Our development team has already fixed bug #"+bugId+". It can be"
            + "tested now \n\nBug Details:\n\n"+bugDetails+"\n\nUser email: "
            +userEmail
        );

        // Appends a log line in the Script Actions Log tab
        logsTab.appendRow([bugId, "needs-testing", 1, new Date()])
      }

      // These two variables are used to determine whether should we notify the
      // user if the bug needs to be tested and if should we add the current
      // date on the "Release Date" column.
      var insertedReleaseDate = actionPerformed(bugId, "released");
      var taggedReleaseDate = row[alphabet_letter_index('N')];

       // Checks: is it tagged as a "Released" AND NOT already added the release
       // date to the column "N"?
      if (taggedReleaseDate && !insertedReleaseDate) {
        var bugRowIndex = getBugRow(bugId, "Bugs")

        // Sets the current Date to the column "Release Date"
        bugsTab.getRange(bugRowIndex+1, alphabet_letter_index('O')+1).setValue(new Date());

        // Appends a log line in the Script Actions Log tab
        logsTab.appendRow([bugId, "released", 1, new Date()])

        // Sends the e-mail
        MailApp.sendEmail(userEmail, userEmail, "Bug fixed!", "Our development"
            + "team has already fixed bug #"+bugId+". We would appreciate if "
            + "you\ could give us a feedback"
         );
      }

    }
  }
}


/**
 * Checks the actions performed by the script at the logstab.
 * @param {String} bugId - The bug id from the "Bugs" sheet
 * @param {String} notificationType - The notification type (ex.: 'released')
 * @returns {boolean}
 */
function actionPerformed(bugId, notificationType) {
  var values = logsTab.getDataRange().getValues();
  for (var x = 0; x < values.length; x++) {
    if (x > 0) {
      var row = values[x];
      if (row[0] == bugId && row[1] == notificationType && row[2] == 1) {
        return true
      }
    }
  }
  return false
}


/**
 * Returns the index of the bug row.
 * @param {String} bugId - The bug id from the "Bugs" sheet
 * @returns {integer}
 */
function getBugRow(bugId) {
  var values = bugsTab.getDataRange().getValues();
  for (var x = 0; x < values.length; x++) {
    var row = values[x];
    if (row[0] == bugId) {
      return x
    }
  }
}


/**
 * Returns an object containing the developer's info.
 * @param {String} name - The developer name from column "Assign Developer"
 * @returns {object}
 */
function getDeveloperByName(name) {
  var values = developersTab.getDataRange().getValues();
  for (var x = 0; x < values.length; x++) {
    var row = values[x];
    if (x > 0) { // IGNORES HEADER
      var developerName = row[alphabet_letter_index('C')];
      var developerDescription = row[alphabet_letter_index('D')];
      var developerEmail = row[alphabet_letter_index('E')];
      if (developerDescription == name) {
        return {
          name: developerName,
          email: developerEmail
        }
      }
    }
  }
}


/**
 * Returns the numeric index, on the alphabet, from a given letter.
 * @param {String} stringLetters - The string letter(s) (ex.: 'AB')
 * @returns {integer}
 */
function alphabet_letter_index(stringLetters) {
  var letters = stringLetters.split('')
  var alphabet = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
    "p","q","r","s","t","u","v","w","x","y","z"
  ];
  var alphabet_size = 26
  var index = 0
  var alphabet_layers = range(0, alphabet_size * letters.length, alphabet_size);
  // for loop_index, letter in enumerate(letters):
  letters.forEach(function(letter, loop_index){
  	index = alphabet.indexOf(letter.toLowerCase()) + alphabet_layers[loop_index];
  })
  return index;
}


/**
 * https://stackoverflow.com/questions/8273047/javascript-function-similar-to-python-range
 * Generates an array from the given @start to the given @stop within steps
 * defined in @steps.
 * @param {integer} start - The starting point value of the range.
 * @param {integer} stop - The stopping point value of the range.
 * @param {integer} step - the steps of the range.
 * @returns {array}
 */
function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
};