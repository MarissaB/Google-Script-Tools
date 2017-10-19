function updateQuestionList() {

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var dataSheet = ss.getSheetByName("Sheet of Names");
    var namecount = dataSheet.getRange("H2").getValue(); //total names checked in for today

    var firstform = FormApp.openById('LONG_FORM_ID_HERE');
    var secondform = FormApp.openById('OTHER_LONG_FORM_ID_HERE');

    // Uncomment the small section below to get a list of IDs for each question in your forms.
    // You can then fill in the correct ID of each question that you want to have synced answer options.
    // View the Logger under View > Logger or Ctrl-Enter when in Google Scripts.
    // Once you have your IDs, you can comment this section again.

    /*  var choices = firstform.getChoices();
      for (var i = 0; i < choices.length; i++) {
      Logger.log("Form 1, question " + i + ": " + choices[i].getValue());
      }

      var choices = secondform.getChoices();
      for (var i = 0; i < choices.length; i++) {
      Logger.log("Form 2, question " + i + ": " + choices[i].getValue());
      }
    */

    var firstquestionID = 1111111111;
    var secondquestionID = 2222222222;

    var firstquestion = firstform.getItemById(firstquestionID).asMultipleChoiceItem();
    var secondquestion = secondform.getItemById(secondquestionID).asMultipleChoiceItem();

    if (dmcount > 0) {

        // This assumes the names start at row 2 in column D. Adjust as needed.
        var namelist = dataSheet.getRange(2, 4, namecount, 1).getValues();
    }
    else {
        var namelist = [""];
    }

    firstquestion.setChoiceValues(namelist);
    secondquestion.setChoiceValues(namelist);
}

function triggerset() {

    // After confirming your questions will update their answer options properly,
    // run this function to set the question answers to update each time either form
    // is submitted by a user. This keeps them in sync!

    var employeeform = FormApp.openById('1XUHHnLkqO7Y9dqcXHzpcdAVFthiiCzPrOp_EiSlP70g');
      ScriptApp.newTrigger('updateQuestionList').forForm(firstform).onFormSubmit().create();

    var checkinform = FormApp.openById('1snHpNxUP1rvt-SDM4K4zWm8zKlPWTHOiTvx3ib2fPOI');
      ScriptApp.newTrigger('updateQuestionList').forForm(secondform).onFormSubmit().create();
}
