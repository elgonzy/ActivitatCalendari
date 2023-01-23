"use strict"

let weekDaysNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
let monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let date = new Date();
let ActualMonth = date.getMonth()

function createDiv(content, col) {

    let calendarDiv = document.getElementById("calendar");
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    let newContent = document.createTextNode(content);

    newP.appendChild(newContent);
    newDiv.appendChild(newP);

    newDiv.classList.add(col);

    calendarDiv.appendChild(newDiv);

    return newDiv;

}

function printDaysBefore(date) {

    let fristWeekDayActualMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let day = (new Date(date.getFullYear(), date.getMonth(), 0).getDate() - fristWeekDayActualMonth) + 1;

    for (let i = fristWeekDayActualMonth; i > 0; i--) {

        createDiv(day.toString(), "week")
        day++;

    }

}

function printDaysAfter(date) {

    let lastWeekDayActualMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay();
    let day = 1;

    for (let i = 7 - lastWeekDayActualMonth; i > 0; i--) {

        createDiv(day.toString(), "week")
        day++;

    }

}


function printCalendar(date) {

    let calendarDiv = document.getElementById("calendar");
    let fullYear = date.getFullYear();
    let month = date.getMonth();

    calendarDiv.innerHTML = "";

    createDiv(fullYear.toString(), "year");
    createDiv("de " + monthsNames[month], "monthName");

    let monthDays = [];

    for (let i = 0; i < new Date(fullYear, month + 1, 0).getDate(); i++) {
        monthDays[i] = i + 1;
    }

    weekDaysNames.forEach(day => {
        createDiv(day, "weekNames")
    });

    printDaysBefore(date);

    monthDays.forEach(day => {
        if (date.getDate() == day && ActualMonth == month) {
            let div = createDiv(day.toString(), "actualDay");
            div.onclick = console.log("ola");
        } else {
            let div = createDiv(day.toString(), "week");
            div.onclick = console.log("ola");

        }
    });

    printDaysAfter(date);

}

function nextMonth(date) {

    date.setMonth(date.getMonth() + 1);
    printCalendar(date);

}

function previousMonth(date) {

    date.setMonth(date.getMonth() - 1);
    printCalendar(date);

}

printCalendar(date);