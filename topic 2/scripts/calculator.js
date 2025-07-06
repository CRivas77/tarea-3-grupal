document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const costoPorPagina = 200;
    const input = document.getElementById("num-to-print").value;
    const cantidades = input
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p));

    if (cantidades.length === 0) {
      alert("Por favor, ingresá al menos un número válido.");
      return;
    }

    const totalPaginas = cantidades.reduce((a, b) => a + b, 0);
    const costoTotal = totalPaginas * costoPorPagina;

    const totalPaginasDobleCara = cantidades
      .map((n) => Math.ceil(n / 2))
      .reduce((a, b) => a + b, 0);

    const costoDobleCara = totalPaginasDobleCara * costoPorPagina;
    const ahorro = costoTotal - costoDobleCara;

    document.getElementById(
      "res-costo-simple"
    ).textContent = `₲${costoTotal.toLocaleString()}`;
    document.getElementById(
      "res-costo-doble"
    ).textContent = `₲${costoDobleCara.toLocaleString()}`;
    document.getElementById(
      "res-ahorro"
    ).textContent = `₲${ahorro.toLocaleString()}`;
  });

  fetch("../components/cost-summary.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("summary-container").innerHTML = html;
    });
});
