"use strict"

let weekDaysNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
let monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let date = new Date();
let monthDays = [];
let actualMonth = date.getMonth();
let actualYear = date.getFullYear();

for (let i = 1; i < new Date(date.getFullYear(), date.getMonth(), 0).getDate(); i++) {
    monthDays[i - 1] = i;
}

function createDiv(content, col) {

    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    let newContent = document.createTextNode(content);
    let calendarDiv;

    newP.appendChild(newContent);
    newDiv.appendChild(newP);

    newDiv.classList.add(col);

    calendarDiv = document.getElementById("calendar");

    calendarDiv.appendChild(newDiv)

}

createDiv(actualYear.toString(), "year");
createDiv("de " + monthsNames[actualMonth], "monthName");

weekDaysNames.forEach(day => {
    createDiv(day, "weekNames")
});

for (let i = 0; i < new Date(date.getFullYear(), date.getMonth(), 1).getDay(); i++) {
    createDiv(" ", "week");
}
monthDays.forEach(day => {
    if (date.getDate() != day) {
        createDiv(day.toString(), "week");
    } else {
        createDiv(day.toString(), "actualDay");

    }
});