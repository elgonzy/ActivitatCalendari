"use strict"

let weekDaysNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
let monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let date = new Date();

function createDiv(content, col) {

    let calendarDiv = document.getElementById("calendar");
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    let newContent = document.createTextNode(content);

    newP.appendChild(newContent);
    newDiv.appendChild(newP);

    newDiv.classList.add(col);

    calendarDiv.appendChild(newDiv)

}

function printAdjacentDays(date, preOrNext) {

    //al ultimo dia del mes anterior restarle el dia de la semana del ultimo dia del mes anterior luego le sumas uno a cada dia de ese valor.
    if (preOrNext) {
        let previousMonthDay = new Date(date.getFullYear(), date.getMonth() - 1, new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate()).getDay() - 1;


        for (let i = 0; i < new Date(date.getFullYear(), date.getMonth(), 0).getDay(); i++) {
            createDiv(previousMonthDay.toString(), "week");
            previousMonthDay++;

        }

    }
    // else {



    //     let nextMontDay = 1;

    //     for (let i = new Date(date.getFullYear, date.monthDays()); i < 6; i++) {

    //         createDiv(nextMontDay.toString(), "week");
    //         nextMontDay++;
    //     }
    // }
}

function printCalendar(date) {

    let calendarDiv = document.getElementById("calendar");

    calendarDiv.innerHTML = "";

    createDiv(date.getFullYear().toString(), "year");
    createDiv("de " + monthsNames[date.getMonth()], "monthName");

    let monthDays = [];

    for (let i = 0; i < new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
        monthDays[i] = i + 1;
    }

    weekDaysNames.forEach(day => {
        createDiv(day, "weekNames")
    });

    printAdjacentDays(date, true);

    monthDays.forEach(day => {
        if (date.getDate() != day) {
            createDiv(day.toString(), "week");
        } else {
            createDiv(day.toString(), "actualDay");

        }
    });
    printAdjacentDays(date, false);
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