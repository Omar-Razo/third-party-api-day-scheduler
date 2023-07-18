
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

  // DOM element
  let containerChildren = $("#container .time-block");

  // date element
  let dateEl = $("#currentDay");
  let todaysDate = dayjs().format("dddd, MMMM D, YYYY");
  dateEl.text(`Today is: ${todaysDate}`);

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
  }

  // check time state on load
  checkTimeState()

  // real-time clock
  function updateClock() {
    // clock elements
    let clockEl = $("#clock");
    let todaysTime = dayjs().format("hh:mm:ss A");
    clockEl.text(`It is now: ${todaysTime}`)
  }

  // update clock every second >>> realtime clock/check time to next hour
  setInterval(updateClock, 1000);

  // Local Storage: Display/Saving Events
  function displaySavedEvents() {
    // parse saved events- stored hours array
    let savedEvents = JSON.parse(localStorage.getItem("eventsForDay"));
    if (savedEvents !== null) {
      for (i = 0; i < savedEvents.length; i++) {
        // populate eventText property with saved eventText (on load hours.eventText is reset and must be re-populated with save text)
        hours[i].eventText = savedEvents[i].eventText
        // populate textarea qith saved eventText
        hours[i].hourEl.children("textarea").val(savedEvents[i].eventText)
      }
    }
  }

  // display saved events on load
  displaySavedEvents()

  // eventlistener on click
  containerChildren.on("click", ".btn", function(event) {
    // event.stopPropagation()
    // match event.delegateTarget to corresponding hour object
    let matchingHourEl = hours.find(el => el.hourEl.attr("id") === ($(event.delegateTarget).attr("id")))
    // set that hour's eventtext to textarea value
    matchingHourEl.eventText = $(event.delegateTarget).children("textarea").val().trim();
    // update local storage with new hours array
    localStorage.setItem("eventsForDay", JSON.stringify(hours));
  })
});

// // Kyle's time problem

// // function that updates styles
// // function updateTimeBlockStyles() {
// //   // some code
// // }

// // on load set start of next hour --> hour: 0 mins : 0 secs
// let nextHour = dayjs().add(1, "Hour").startOf("hour")

// // snapshot of current time
// let currentHour = dayjs()

// // store difference (in seconds) between current time and start of next hour
// let millisecondsTillNextHour = nextHour.diff(currentHour)
// console.log(millisecondsTillNextHour)

// setTimeout(function () {
//   // call style change function
//   updateTimeBlockStyles()
//   setInterval (updateTimeBlockStyles, 3600000)
// }, millisecondsTillNextHour)