
$(function () {
  // hours object
  hours = [
    {
      hourEl: $("#hour-09"),
      timeId: dayjs().hour(9),
      eventText: "",
    },

    {
      hourEl: $("#hour-10"),
      timeId: dayjs().hour(10),
      eventText: "",
    },

    {
      hourEl: $("#hour-11"),
      timeId: dayjs().hour(11),
      eventText: "",
    },

    {
      hourEl: $("#hour-12"),
      timeId: dayjs().hour(12),
      eventText: "",
    },

    {
      hourEl: $("#hour-13"),
      timeId: dayjs().hour(13),
      eventText: "",
    },

    {
      hourEl: $("#hour-14"),
      timeId: dayjs().hour(14),
      eventText: "",
    },

    {
      hourEl: $("#hour-15"),
      timeId: dayjs().hour(15),
      eventText: "",
    },

    {
      hourEl: $("#hour-16"),
      timeId: dayjs().hour(16),
      eventText: "",
    },

    {
      hourEl: $("#hour-17"),
      timeId: dayjs().hour(17),
      eventText: "",
    },
  ]

  // date element
  let dateEl = $("#currentDay");
  let todaysDate = dayjs().format("dddd, MMMM D, YYYY");
  dateEl.text(`Today is: ${todaysDate}`);

  // create variable/marker for constant style update
  let nextHour;

  // DOM element
  let containerChildren = $("#container .time-block");

  // update style to reflect current time
  function checkTimeState() {
    containerChildren.removeClass(["past", "present", "future"])
    
    for (i = 0; i < hours.length; i++) {
      if (hours[i].timeId.isBefore(dayjs(), "hour")) {
        hours[i].hourEl.addClass("past");
      }
      if (hours[i].timeId.isSame(dayjs(), "hour")) {
        hours[i].hourEl.addClass("present");
      }
      if (hours[i].timeId.isAfter(dayjs(), "hour")) {
        hours[i].hourEl.addClass("future");
      }
    }
    // updates nextHour to reflect change in new hour
    nextHour = dayjs().add(1, "hour")
  }

  // check time state on load
  checkTimeState()

  // real-time clock
  function updateClock() {
    // clock elements
    let clockEl = $("#clock");
    let todaysTime = dayjs().format("hh:mm:ss A");
    clockEl.text(`It is now: ${todaysTime}`);

    // snapshot of current time/hour
    let currentHour = dayjs();
    // checks to see if snapshot has caught up to next hour
    if (currentHour.isSame(nextHour, "hour")) {
      // update styles and update nextHour to new "next" hour
      checkTimeState()
    }
  }

  // update clock every second >>> realtime clock/check time to next hour
  setInterval(updateClock, 1000);

  // Local Storage: Display/Saving Events
  function displaySavedEvents() {
    // parse saved events- stored hours array
    let savedEvents = JSON.parse(localStorage.getItem("eventsForDay"));
    if (savedEvents !== null) {
      for (i = 0; i < savedEvents.length; i++) {
        // populate eventText property with saved eventText (on load, hours array is reset and .eventText must be re-populated with saved text)
        hours[i].eventText = savedEvents[i].eventText
        // populate textarea with saved eventText
        hours[i].hourEl.children("textarea").val(savedEvents[i].eventText)
      }
    }
  }

  // display saved events on load
  displaySavedEvents()

  // eventlistener on click
  containerChildren.on("click", ".btn", function(event) {
    // match event.delegateTarget to corresponding hour object
    let matchingHourEl = hours.find(el => el.hourEl.attr("id") === ($(event.delegateTarget).attr("id")))
    // set that hour's eventtext to textarea value
    matchingHourEl.eventText = $(event.delegateTarget).children("textarea").val().trim();
    // update local storage with new hours array
    localStorage.setItem("eventsForDay", JSON.stringify(hours));
  })
});




// // Kyle's time problem:
// // "I want to update the styling at some interval starting with the next hour (whenever that may be)"
// // --------------------------------------------------------------------------------------

// // function that updates styles (which you probably already have created)
// function updateTimeBlockStyles() {
//   // code updates hour blocks styles to reflect time change
// }

// on load set start of next hour --> (current hour + 1): 0 mins : 0 secs (if only .add is used, the dayjs objects will always be one hour's worth of units apart)
// let nextHour = dayjs().add(1, "Hour").startOf("hour")

// // snapshot of current time on load
// let currentHour = dayjs()

// // store difference (in milliseconds) between current time and start of next hour (.diff(obj, "unit") defaults to milliseconds so 2nd param not needed)
// let millisecondsTillNextHour = nextHour.diff(currentHour)

// // below is confirmed to work w/o error (best as i can tell)

// // set first timeout using calc'd millisecond difference
// setTimeout(function () {
//   // call style change function
//   updateTimeBlockStyles()
//   // set interval to update time blocks every hour from here on
//   setInterval (updateTimeBlockStyles, 3600000)
// }, millisecondsTillNextHour)

// // or if we want to avoid setInterval:

// ----- This solution is currently having an issue with recursion error (too many calls made) ------

// // create a function that calls style function and sets new timeout (with a func arg)
// function styleAndNewTimeout(func) {
//   //variable and if statement created to prevent rangeError (too many calls)
//   let hoursPast = 0 
//   if (hoursPast < 8) {
//   hoursPast++
//   // call style function
//   checkTimeState()
//   logTime = dayjs().format("hh:mm:ss")
//   console.log(`The first timeout done at ${logTime}`)
//   // set new timeout to call new timeout in one hour
//   setTimeout(styleAndNewTimeout(func), 3600000)
//   }
// } 

// // mostly same as above - this is the first timeout - once executed, repeating timeout should start
// setTimeout(function () {
//   // call style change function
//   checkTimeState()
//   nextlogtime = dayjs().format("hh:mm:ss")
//   console.log(`This timeout done at ${nextlogtime}`)
//   // set new time out to run new timeout function in one hour
//   setTimeout(styleAndNewTimeout(checkTimeState), 3600000)
// }, millisecondsTillNextHour)