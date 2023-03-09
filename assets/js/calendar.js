"use strict";

$(document).ready(function() {
    let weekDaysNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let date = new Date();
    let actualMonth = date.getMonth();

    function createDiv(content, col) {
        return $("<div>")
            .addClass(col)
            .html(content)
            .appendTo($("#calendar"));
    }

    function printDaysBefore(date) {
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let firstWeekDayActualMonth = firstDay.getDay();
        let lastDayPrevMonth = new Date(firstDay.getFullYear(), firstDay.getMonth(), 0).getDate();

        for (let i = 1; i <= firstWeekDayActualMonth; i++) {
            createDiv(lastDayPrevMonth - firstWeekDayActualMonth + i, "week");
        }
    }

    function printDaysAfter(date) {
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let lastWeekDayActualMonth = lastDay.getDay();

        for (let i = 1; i <= 7 - lastWeekDayActualMonth - 1; i++) {
            createDiv(i, "week");
        }
    }

    function printCalendar(date) {
        $("#calendar").empty();

        let fullYear = date.getFullYear();
        let month = date.getMonth();

        createDiv(fullYear.toString(), "year");
        createDiv("de " + monthsNames[month], "monthName");

        $.each(weekDaysNames, function(index, day) {
            createDiv(day, "weekNames");
        });

        printDaysBefore(date);

        let startDate = new Date(fullYear, month, 1);
        let endDate = new Date(fullYear, month + 1, 0);

        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            let dateObj = new Date(fullYear, month, i);
            let key = dateObj.getTime();
            let $div = (dateObj.getDate() === date.getDate() && dateObj.getMonth() === actualMonth) ?
                createDiv(i, "actualDay") :
                createDiv(i, "week");

            let comment = localStorage.getItem(key);
            if (comment) {
                $div.addClass("hasComent")
                    .html(`${i}<p>${comment}</p>`)
                    .on("click", function() {
                        let comment = localStorage.getItem(key);
                        $(this).html(`${i}<p>${comment}</p>`).addClass("hasComent");
                    });
            } else {
                $div.on("click", function() {
                    let comment = prompt("Introduce tu comentario:");
                    if (comment) {
                        localStorage.setItem(key, comment);
                        $(this).html(`${i}<p>${comment}</p>`).addClass("hasComent");
                    }
                });
            }
        }

        printDaysAfter(date);
    }

    function nextMonth() {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        printCalendar(date);
    }

    function previousMonth() {
        date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        printCalendar(date);
    }

    printCalendar(date);

    $("#nextButton").click(nextMonth);
    $("#previousButton").click(previousMonth);
});