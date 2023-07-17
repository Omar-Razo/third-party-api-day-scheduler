// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


// date element
let dateEl = $("#currentDay");
let todaysDate = dayjs().format("dddd, MMMM D, YYYY");

dateEl.text(`Today is: ${todaysDate}`);

// update clock
function updateClock() {
  let clockEl = $("#clock");
  let todaysTime = dayjs().format("hh:mm:ss A");

  clockEl.text(`It is now: ${todaysTime}`)
}

setInterval(updateClock, 1000);


/* on page load (after html load):

  display current date and time

  load any saved events from local storage

  update hour blocks:
  - remove past,present,future
  - compare set time to current time
  - apply appropriate time class

  on save:
  - set/update local storage

*/

let dayContainer = $("#container")
let containerChildren = dayContainer.children(".time-block");

// hour object
let hour09 = {
  hourEl: $("#hour-09"),
  timeId: dayjs().hour(9),
  eventText: "",
}

let hour10 = {
  hourEl: $("#hour-10"),
  timeId: dayjs().hour(10),
  eventText: "",
}

let hour11 = {
  hourEl: $("#hour-11"),
  timeId: dayjs().hour(11),
  eventText: "",
}

let hour12 = {
  hourEl: $("#hour-12"),
  timeId: dayjs().hour(12),
  eventText: "",
}

let hour13 = {
  hourEl: $("#hour-13"),
  timeId: dayjs().hour(13),
  eventText: "",
}

let hour14 = {
  hourEl: $("#hour-14"),
  timeId: dayjs().hour(14),
  eventText: "",
}

let hour15 = {
  hourEl: $("#hour-15"),
  timeId: dayjs().hour(15),
  eventText: "",
}

let hour16 = {
  hourEl: $("#hour-16"),
  timeId: dayjs().hour(16),
  eventText: "",
}

let hour17 = {
  hourEl: $("#hour-17"),
  timeId: dayjs().hour(17),
  eventText: "",
}

let hours = [hour09, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17]

// function to check state
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

checkTimeState()

// Local Storage/Saving Events
let eventsForDay = localStorage.getItem("eventsForDay")

containerChildren.on("click", function() {
  // console.log("current target", $(this))

  for (hour of hours) {
    if (hour.hourEl.attr("id") === $(this).attr("id")) {
      hour.eventText = $(this).children("textarea").val();
      console.log(hour.eventText);
      console.log("I'm in");
    }
    else {
      console.log("didn't work");
    }
  }

  // on click of save btn area
})

// populating text on load
// parse saved json (array?)
// for object in array
// set textarea = eventtext