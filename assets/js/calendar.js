"use strict";

$(document).ready(function() {
    // Arrays to hold names of weekdays and months
    let weekDaysNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Var to hold the current date
    let date = new Date();
    // Var to hold the current month
    let actualMonth = date.getMonth();

    // Function to create and style a div
    function createDiv(content, col) {
        return $("<div>")
            .addClass(col)
            .html(content)
            .appendTo($("#calendar"));
    }

    // Function to print the days of the previous month before the actual month
    function printDaysBefore(date) {
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let firstWeekDayActualMonth = firstDay.getDay();
        let lastDayPrevMonth = new Date(firstDay.getFullYear(), firstDay.getMonth(), 0).getDate();

        for (let i = 1; i <= firstWeekDayActualMonth; i++) {
            createDiv(lastDayPrevMonth - firstWeekDayActualMonth + i, "week");
        }
    }

    // Function to print the days of the next month after the actual month
    function printDaysAfter(date) {
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let lastWeekDayActualMonth = lastDay.getDay();

        for (let i = 1; i <= 7 - lastWeekDayActualMonth - 1; i++) {
            createDiv(i, "week");
        }
    }

    // Function to print the actual month on the calendar
    function printCalendar(date) {
        $("#calendar").empty();

        let fullYear = date.getFullYear();
        let month = date.getMonth();

        // Print the year and month name above the calendar
        createDiv(fullYear.toString(), "year");
        createDiv("of " + monthsNames[month], "monthName");

        // Print the names of the weekdays above the calendar
        $.each(weekDaysNames, function(index, day) {
            createDiv(day, "weekNames");
        });

        // Print the days from the previous month
        printDaysBefore(date);

        // Get dates for the actual month
        let startDate = new Date(fullYear, month, 1);
        let endDate = new Date(fullYear, month + 1, 0);

        // Print and style the dates in the calendar
        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            let dateObj = new Date(fullYear, month, i);
            let key = dateObj.getTime();

            let $div = (dateObj.getDate() === date.getDate() && dateObj.getMonth() === actualMonth) ?
                createDiv(i, "actualDay") :
                createDiv(i, "week");

            // Check if the date has a comment and add the comment if available
            let comment = localStorage.getItem(key);
            if (comment) {
                $div.addClass("hasComent")
                    .html(`${i}<p>${comment}</p>`)
                    .on("click", function() {
                        let comment = localStorage.getItem(key);
                        $(this).html(`${i}<p>${comment}</p>`).addClass("hasComent");
                    });
            } else {
                // If the date does not have a comment, add the ability to add one by clicking on the date
                $div.on("click", function() {
                    let comment = prompt("Add your comment:");
                    if (comment) {
                        localStorage.setItem(key, comment);
                        $(this).html(`${i}<p>${comment}</p>`).addClass("hasComent");
                    }
                });
            }
        }

        // Print the days from the next month
        printDaysAfter(date);
    }

    // Helper function that switches to the next month when the Next button is clicked
    function nextMonth() {
        date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
        printCalendar(date);
    }

    // Helper function that switches to the previous month when the Previous button is clicked
    function previousMonth() {
        date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        printCalendar(date);
    }

    // Print the calendar for the current month
    printCalendar(date);

    // Event listeners for the Next and Previous buttons
    $("#nextButton").click(nextMonth);
    $("#previousButton").click(previousMonth);
});