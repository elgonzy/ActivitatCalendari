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
    let newContent = document.createTextNode(content);

    newDiv.appendChild(newContent);

    newDiv.classList.add(col);

    calendarDiv = document.getElementById("calendar");

    document.body.insertBefore(newDiv, calendarDiv);

}