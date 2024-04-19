document.addEventListener("DOMContentLoaded", function() {
    var agregarGustoButton = document.getElementById("agregarGusto");
    agregarGustoButton.addEventListener("click", add);

    var aceptarButton = document.getElementById("actualizar");
    aceptarButton.addEventListener("click", guardarCambios);

    var cancelarButton = document.getElementById("cancelar");
    cancelarButton.addEventListener("click", cancelarCambios);
  });
  
  var datosUsuario = {
    nombre: "",
    email: "",
    telefono: "",
    gustos: [],
};

  function add(event) {
    event.preventDefault();
        var gusto = document.getElementById("gustos").value;
        if (gusto.trim() === "") {
          alert("Ingresa un gusto válido.");
          return;
        }
        var table = document.getElementById("tablaGustos");
    
        var row = table.insertRow(-1);
        var cellGusto = row.insertCell(0);
        var cellPorcentaje = row.insertCell(1);
        var cellEditar = row.insertCell(2);
    
        cellGusto.innerHTML = gusto;
        cellPorcentaje.innerHTML = "0";
        cellEditar.innerHTML = '<button onclick="editarFila(this)">Editar</button>';
        document.getElementById("gustos").value = "";

  }
  function editarFila(button) {
    var row = button.parentElement.parentElement;
    var cellGusto = row.cells[0];
    var cellPorcentaje = row.cells[1];
    var cellEditar = row.cells[2];

    cellEditar.innerHTML = '<button class="aceptar" onclick="aceptarEdicion(this)">Aceptar</button>' +
        '<button class="cancelar" onclick="cancelarEdicion(this)">Cancelar</button>';
    var gustoOriginal = cellGusto.textContent;
    var porcentajeOriginal = cellPorcentaje.textContent;
    cellGusto.innerHTML = '<input type="text" value="' + gustoOriginal + '" class="editable">';
    cellPorcentaje.innerHTML = '<input type="text" value="' + porcentajeOriginal + '" class="editable">';
}
function aceptarEdicion(button) {
    var row = button.parentElement.parentElement;
    var cellGusto = row.cells[0];
    var cellPorcentaje = row.cells[1];
    var cellEditar = row.cells[2];
    var nuevoGusto = row.querySelector('input[type="text"]').value;
    var nuevoPorcentaje = row.querySelectorAll('input[type="text"]')[1].value;
    cellGusto.textContent = nuevoGusto;
    cellPorcentaje.textContent = nuevoPorcentaje;
    cellEditar.innerHTML = '<button class="editar" onclick="editarFila(this)">Editar</button>';
}

function cancelarEdicion(button) {
    var row = button.parentElement.parentElement;
    var cellGusto = row.cells[0];
    var cellPorcentaje = row.cells[1];
    var cellEditar = row.cells[2];
    var gustoOriginal = cellGusto.querySelector('input[type="text"]').defaultValue;
    var porcentajeOriginal = cellPorcentaje.querySelector('input[type="text"]').defaultValue;
    cellGusto.textContent = gustoOriginal;
    cellPorcentaje.textContent = porcentajeOriginal;
    cellEditar.innerHTML = '<button class="editar" onclick="editarFila(this)">Editar</button>';
}

function guardarCambios() {
    var nombre = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("tel").value;
    
    var gustosPorcentajes = [];
    var table = document.getElementById("tablaGustos");
    for (var i = 1; i < table.rows.length; i++) {
        var gusto = table.rows[i].cells[0].textContent;
        var porcentaje = table.rows[i].cells[1].textContent;
        gustosPorcentajes.push({ gusto: gusto, porcentaje: porcentaje });
    }
    
    var gustosPorcentajesStr = encodeURIComponent(JSON.stringify(gustosPorcentajes));
    
    var queryString = `?nombre=${nombre}&email=${email}&telefono=${telefono}&gustos=${gustosPorcentajesStr}`;
    
    window.location.href = `./salida.html${queryString}`;
}

function cancelarCambios() {
    var table = document.getElementById("tablaGustos");
    var numRows = table.rows.length;
    
    for (var i = numRows - 1; i >= 1; i--) {
        table.deleteRow(i);
    }
}