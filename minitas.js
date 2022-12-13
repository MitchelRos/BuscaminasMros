let matrix = [];
let resultGame;
// ----------------------------------------------
//                "Control" FUNCTION
// ----------------------------------------------
function CONTROL(level) {
    // Hace mas pequeño la letra del titulo
    document.getElementById("title").innerHTML = "<p><b>BUSCAMINAS</b> Choose your world</p>";
    //Elige la dificultad
    Difficulty(level)
    // Preparativos para ejecutar y modificar los styles
    document.getElementById("tabla").style.display = 'block';
    document.getElementById("Init").style.margin = "5px auto";
    document.getElementById("BgVideo").style.filter = "blur(90px) grayscale(100%)";
    document.getElementById("midle-show").innerHTML = "😃";
}

// ----------------------------------------------
//               DIFFICULTY & GAME
// ----------------------------------------------
function Difficulty(level) {
    let ColumTable;
    let FilaTable;
    let Mines;
    switch (level) {
        case "DF-Beginner":
            ColumTable = 8;
            FilaTable = 8;
            Mines = 10;
            // Start Timer
            start()
            break;
        case "DF-Intermediate":
            ColumTable = 16;
            FilaTable = 16;
            Mines = 40;
            // Start Timer
            start()
            break;
        case "DF-Expert":
            ColumTable = 30;
            FilaTable = 16;
            Mines = 99;
            // Start Timer
            start()
            break;
        case "DF-Custom":
            ColumTable = document.getElementById("inputCol").valueAsNumber;
            FilaTable = document.getElementById("inputFil").valueAsNumber;
            Mines = document.getElementById("inputMine").valueAsNumber;
            Time = document.getElementById("CheckTime");
            // Start Timer si esta activo o no
            if (Time == true) {
                start()
            } else {
                infinito()
            }
            break;
    }
    // otra manera de hacer esto anterior
    // if (level == "DF-Beginner") {
    //     ColumTable = 8;
    //     FilaTable = 8;
    //     Mines = 10;
    //     // Start Timer
    //     start()
    // }
    // if (level == "DF-Intermediate") {
    //     ColumTable = 16;
    //     FilaTable = 16;
    //     Mines = 40;
    //     // Start Timer
    //     start()
    // }
    // if (level == "DF-Expert") {
    //     ColumTable = 30;
    //     FilaTable = 16;
    //     Mines = 99;
    //     // Start Timer
    //     start()
    // }
    // if (level == "DF-Custom") {
    //     ColumTable = document.getElementById("inputCol").valueAsNumber;
    //     FilaTable = document.getElementById("inputFil").valueAsNumber;
    //     Mines = document.getElementById("inputMine").valueAsNumber;
    //     Time = document.getElementById("CheckTime");
    //     // Start Timer six esta activo o no
    //     if (Time == true) {
    //         start()
    //     } else {
    //         infinito()
    //     }
    // }
    // Llama a la funcion de crear tabla(columnas que tendra, filas que tendra)
    CreaTabla(ColumTable, FilaTable);
    // Llama a la funcion que coloca las minas(minas que habra, columnas hay, filas hay)
    MineCoords(Mines, ColumTable, FilaTable);
    document.getElementById("mines-show").innerHTML = Mines;
}

// ----------------------------------------------
//            INFLUENCERS FOR PROYECT
// ----------------------------------------------
// Escanea la tabla
function ScanTable() {
    matrix = [];
    let filas = document.getElementById("tbody").children;
    for (let l = 0; l < filas.length; l++) {
        matrix.push(filas[l].children)
    }
}
// Flood fill algorithm implemented recursively
function fillMatrix1(row, col) {
    if (!(validCoordinates(row, col))) {
        return;
    }
    if (!(matrix[row][col].querySelector("span").innerHTML == "0")) {
        matrix[row][col].style.border = "inset 2px grey";
        return;
    }
    // Que hace cuando encuentra
    matrix[row][col].querySelector("span").innerHTML = " ";
    matrix[row][col].style.border = "inset 2px grey";
    matrix[row][col].style.width = "30px";
    matrix[row][col].style.height = "30px";

    // recursive
    fillMatrix1((row + 1), col);
    fillMatrix1((row - 1), col);
    fillMatrix1(row, (col + 1));
    fillMatrix1(row, (col - 1));
}
function validCoordinates(row, col) {
    return (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length);
}
function HaciendaEnMinas(inputX, inputY) {
    // let rows = document.getElementById("tbody").children;
    for (let i = inputX - 1; i <= inputX + 1; i++) {       // input= 6       i =   5, 6, 7
        for (let j = inputY - 1; j <= inputY + 1; j++) {  // input= 3        j =  2, 3, 4
            if ((!(i == inputX && j == inputY)) && ((i < matrix.length && j < matrix[0].length) && (i >= 0 && j >= 0))) {
                // matrix[i][j].style.backgroundColor = "#ff0000";
                let stringNum = matrix[i][j].querySelector("span").innerHTML;
                let num = parseInt(stringNum)+1;
                matrix[i][j].querySelector("span").innerHTML= num.toString();
            }
        }
    }
    TextPaint();
}
function TextPaint() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            let number = matrix[i][j].querySelector("span").innerHTML;
            switch (number) {
                case "0":
                    matrix[i][j].querySelector("span").style.color = "";
                    break;
                case "1":
                    matrix[i][j].querySelector("span").style.color = "blue";
                    break;
                case "2":
                    matrix[i][j].querySelector("span").style.color = "green";
                    break;
                case "3":
                    matrix[i][j].querySelector("span").style.color = "red";
                    break;
                case "4":
                    matrix[i][j].querySelector("span").style.color = "darkblue";
                    break;
                case "5":
                    matrix[i][j].querySelector("span").style.color = "brown";
                    break;
                case "6":
                    matrix[i][j].querySelector("span").style.color = "cyan";
                    break;
                case "7":
                    matrix[i][j].querySelector("span").style.color = "black";
                    break;
                case "8":
                    matrix[i][j].querySelector("span").style.color = "darkslategray";
                    break;
            }
        }
    }

}
// Esta funcion esparcira las minas en el mapa
function MineCoords(Mines, columnaMax, filaMax) {
    for (let MinesC = 0; MinesC < Mines; MinesC++) {
        let coordsX;
        let coordsY;
        do {
            coordsX = random(filaMax);
            coordsY = random(columnaMax);
        } while (matrix[coordsX][coordsY].querySelector("span").innerHTML != "0" && (coordsX != undefined || coordsY != undefined));
        HaciendaEnMinas(coordsX, coordsY);
        matrix[coordsX][coordsY].innerHTML = "<span>💣</span>";
        matrix[coordsX][coordsY].style.color = "";
    }
}
// Funcion random
function random(max) {
    // retorna un random integer entre 0 y max-1
    return Math.floor(Math.random() * max);
}
// CREAR LA TABLA (Se podria crear una funcion que creara segun (elemento))
function CreaTabla(ColumTable, FilaTable) {
    //Borrar la Tabla del typo que has puesto(id o class),(mas el monbre del id)
    remove("id", "minesT");
    //Pilla el elemento padre
    let padre = document.getElementById("tabla");
    // Var que crea los elementos
    let tabla = document.createElement("table");
    let tbody = document.createElement("tbody");
    //Añade la tabla al div
    padre.appendChild(tabla).id = "minesT";
    tabla.appendChild(tbody).id = "tbody";

    for (let i = 0; i < FilaTable; i++) {
        //Por cada fila se crea un tr
        let tr = document.createElement("tr");
        for (let j = 0; j < ColumTable; j++) {
            //Por cada columna se crea un td
            let td = document.createElement("td");
            //El td se añade dentro del tr
            tr.appendChild(td).innerHTML = "<span>0</span>";
            td.onclick = pinta.bind(this, i, j);
        }
        //A la tabla se añade todos los tr
        tbody.appendChild(tr);
    }
    ScanTable();
}
function pinta(x, y) {
    if (matrix[x][y].innerHTML == "<span>💣</span>") {
        resultGame="loose";
        stop(resultGame);
        return;
    }
    if (document.getElementById("midle-show").innerHTML == "☠️" || document.getElementById("midle-show").innerHTML == "🥳") {
        return;
    }
    fillMatrix1(x, y)
    matrix[x][y].querySelector("span").style.display = "block";
    matrix[x][y].style.border = "inset 2px grey";
    matrix[x][y].style.width = "30px";
    matrix[x][y].style.height = "30px";
    console.log("x= " + x + " : " + "y= " + y)
}
// REMOVE ELEMENT
function remove(type, name) {
    //ESTO SIRVE PARA BORRAR UN ELEMENTO ID
    if (type == "id") {
        let TablaCreada = document.getElementById(name);
        if (TablaCreada != null) {
            TablaCreada.remove();
        } else {
            console.log("ERROR AL ENCONTRAR: Elemento a borrar no econtrado");
        }
    } else {
        //ESTO SIRVE PARA BORRAR UN ELEMENTO CLASS
        if (type == "class") {
            let TablaCreada = document.getElementsByClassName(name);
            if (TablaCreada != null) {
                TablaCreada.remove();
            } else {
                console.log("ERROR AL ENCONTRAR: Elemento a borrar no econtrado");
            }
        } else {
            console.log("ERROR AL ENCONTRAR: Tipo de elemento a borrar no econtrado");
        }
    }

    //ESTO ES PARA BORRAR LOS HIJOS DE DIV (TABLA)
    // while (padre.firstChild) {
    //     padre.removeChild(padre.firstChild)
    // }
    // document.getElementById("tabla").style.display = 'none';
}

// This was one to make a drop down (exemple)
// function dropdownMenu() {
//     document.getElementById("dropdown-selector").classList.toggle("show");
//   }

//   // Close the dropdown if we clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('#selector')) {
//       let dropdowns = document.getElementsByClassName("not-show");
//       let i;
//       for (i = 0; i < dropdowns.length; i++) {
//         let openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }

//FORMAT TIME
function pad(n, length) {
    // Esta funcion le añadira numeros (0) a lo que le entres
    let len = length - ('' + n).length;
    return (len > 0 ? new Array(++len).join('0') : '') + n;
}
// ----------------------------------------------
//              TIMER MINES & OTHER
// ----------------------------------------------

// TIME VAR
let velocity = 1000;
let seconds = 1;
let Interval;
let BotonCont = 0;

function start() {
    BotonCont++;
    clearInterval(Interval);
    if (BotonCont > 1) {
        reset();
        document.getElementById("time-show").innerHTML = "XXX";
        BotonCont = 1;
    }
    Interval = window.setInterval(startTimer, velocity);
}
function infinito() {
    document.getElementById("time-show").innerHTML = "XXX";
}

function stop() {
    clearInterval(Interval);
    if (resultGame == "win") {
        document.getElementById("midle-show").innerHTML = "🥳";
    } else if(resultGame == "loose"){
        document.getElementById("midle-show").innerHTML = "☠️";
    }
}

function reset() {
    seconds = 0;
    document.getElementById("time-show").innerHTML = pad(seconds, 3);
}

function startTimer() {
    if (seconds >= 9999) {
        //llama a la funcion explosion de minas cuando se acaba el tiempo
        stop();
    }
    document.getElementById("time-show").innerHTML = pad(seconds, 3);
    seconds++;
}

// ----------------------------------------------
//                 MOUSE EVENTS
// ----------------------------------------------

// EVENTO DE ESCUCHAR RATON
window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

// Listen for mousedown A
window.addEventListener("mousedown", function (e) {
    Escucha(e, true);
}, false);

// Listen for mouseup B
window.addEventListener("mouseup", function (e) {
    Escucha(e, false);
}, false);


// Esto manupula los datos que salen
function Escucha(e, down) {
    let id;
    switch (e.button) {
        case 0: // Primary button ("left")
            id = "midle-show";
            break;
        case 2: // Secondary button ("right")
            id = "midle-show";
            break;
    }
    let clickedElem = e.target;
    //esto verifica si clicas en un elemento en concreto
    do {
        if (clickedElem == document.getElementById("minesT")) {
            //esto es para verificar aunque se puede quitar en este caso
            if (document.getElementById(id).innerHTML != "☠️" && document.getElementById(id).innerHTML != "🥳") {
                document.getElementById(id).innerHTML = down ? "😱" : "😃";
            }
            return;
        }
        clickedElem = clickedElem.parentNode;
    } while (clickedElem);
    // alert(`Click is Outside The Element`);

}


