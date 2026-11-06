// Biografia

const campoBio = document.getElementById("campoTextoBio");
const textoBio = document.getElementById("textoExibidoBio");

campoBio.addEventListener("input", function() {
    textoBio.textContent = campoBio.value;
});

// Nome

const campoNome = document.getElementById("campoTextoNome");
const textoNome = document.getElementById("textoExibidoNome");

campoNome.addEventListener("input", function() {
    textoNome.textContent = campoNome.value;
});

// Botão "Lendo"

const campoLendo = document.getElementById("campoTextoLendo");
const textoLendo = document.getElementById("textoExibidoLendo");

campoLendo.addEventListener("input", function() {
    textoLendo.textContent = campoLendo.value;
});