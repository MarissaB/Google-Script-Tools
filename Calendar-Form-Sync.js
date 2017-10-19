function checkCalendar() {

    // Open the form X minutes before the actual calendar event.
    // Must be > 0. If no delay, put 1. Example is 60 minutes.
    var timeadjust = 60; 

    var calendarname = "YOUR_CALENDAR_NAME_HERE"
    var eventscalendar = CalendarApp.getCalendarById(calendarname);
    var today = new Date();

    // The script checks for any calendar event with "EVENT" in the title.
    // You can change it to whatever keyword or phrase you want.
    var listofevents = eventscalendar.getEventsForDay(today, { search: 'EVENT' });

    if (listofevents.length > 0) {
        for (var i = 0; i < listofevents.length; ++i) {
            var event = listofevents[i];
            var eventtime = new Date(event.getStartTime());

            // open check-in form before event starts
            var startingtime = new Date(eventtime.getTime() - 60000 * timeadjust);
            var endingtime = new Date(event.getEndTime());

            // create triggers for opening and closing for each event found
            ScriptApp.newTrigger('startAcceptingResponses').timeBased().at(startingtime).create();
            ScriptApp.newTrigger('stopAcceptingResponses').timeBased().at(endingtime).create();
        }
    }
}

function startAcceptingResponses() {

    var yourformID = 'LONG_FORM_ID_HERE';
    var thisform = FormApp.openById(yourformID);

    thisform.setAcceptingResponses(true);
}

function stopAcceptingResponses() {

    var yourformID = 'LONG_FORM_ID_HERE';
    var thisform = FormApp.openById(yourformID);

    thisform.setAcceptingResponses(false);
}
