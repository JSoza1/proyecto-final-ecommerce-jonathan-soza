// Esperamos a que se cargue todo el DOM antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  // Elementos que se van a utilizar
  const contenedor = document.getElementById("carrito");
  const totalCarritoElem = document.getElementById("total-carrito");
  const vaciarBtn = document.getElementById("vaciar-carrito");
  const finalizarBtn = document.getElementById("finalizar-compra");
  const resumenDiv = document.getElementById("resumen-carrito");
  const accionesDiv = document.getElementById("acciones-carrito");

  // Función que actualiza el total y muestra u oculta resumen y botones según haya productos
  function actualizarResumenYBotones(carrito) {
    // Calculamos suma total
    const total = carrito.reduce((acc, producto) => acc + producto.price, 0);
    totalCarritoElem.textContent = total.toFixed(2);

    // Mostrar u ocultar divs según haya productos
    if (carrito.length === 0) {
      resumenDiv.style.display = "none";
      accionesDiv.style.display = "none";
    } else {
      resumenDiv.style.display = "flex";
      accionesDiv.style.display = "flex";
    }
  }

  // Creamos una función que renderiza todo el carrito en la página
  function renderizarCarrito() {
    // Obtenemos el array de productos guardado en localStorage (si no hay, será un array vacío)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Si el carrito está vacío, mostramos un mensaje y cortamos la ejecución
    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
      // Generamos el HTML para todos los productos del carrito
      const productosEnCarrito = carrito.map(producto => 
          `
              <div class="item-carrito">
                <div class="imagen-carrito">
                  <img src="${producto.images[0]}" alt="${producto.title}">
                </div>
                <div class="titulo-eliminar-carrito">
                  <div class="titulo-carrito">
                    <h3>${producto.title}</h3>
                  </div>
                  <div class="eliminar-carrito">
                    <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
                  </div>
                </div>
                <div class="precio-carrito">
                  <p>Precio: $${producto.price}</p>
                </div>
              </div>
          `
      );

      // Unimos todos los bloques en un solo string
      const productos = productosEnCarrito.join("");

      // Insertamos el HTML generado dentro del contenedor en la página
      contenedor.innerHTML = productos;
    }

    // Buscamos todos los botones "Eliminar" que acabamos de insertar
    const botonesEliminar = document.querySelectorAll(".eliminar-btn");

    // Recorremos cada botón y le asignamos un evento click
    botonesEliminar.forEach(boton => {
      // Además de asignar el evento click, se define la función que dispara el evento click
      boton.addEventListener("click", () => {
        // Al hacer click, obtenemos el ID del producto a eliminar desde el atributo data-id
        const id = parseInt(boton.dataset.id);

        // Buscamos el índice del primer producto que tenga ese id
        const indexAEliminar = carrito.findIndex(producto => producto.id === id);

        // Si lo encontramos, lo eliminamos con splice()
        if (indexAEliminar !== -1) {
          carrito.splice(indexAEliminar, 1);
        }

        // Guardamos el nuevo array en el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Volvemos a llamar a la función para renderizar los productos actualizados
        renderizarCarrito();

        // Actualizamos total y botones
        actualizarResumenYBotones(carrito);
      });
    });

    // Actualizamos total y botones al renderizar
    actualizarResumenYBotones(carrito);
  }

  // Evento para vaciar el carrito al hacer click en el botón correspondiente
  vaciarBtn.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    renderizarCarrito();
    actualizarResumenYBotones([]);
  });

  // El botón finalizar compra no tiene funcionalidad por ahora, pero está listo para usarse
  finalizarBtn.addEventListener("click", () => {
    // Proximamente pasarela de pagos
    alert("Funcionalidad de finalizar compra no implementada todavía.");
  });

  // Ejecutamos la función por primera vez para mostrar los productos al cargar la página
  renderizarCarrito();
});