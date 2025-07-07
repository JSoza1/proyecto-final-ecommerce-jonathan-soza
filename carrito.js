// Esperamos a que se cargue todo el DOM antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos el contenedor donde se mostrarán los productos del carrito
  const contenedor = document.getElementById("carrito");

  // Creamos una función que renderiza todo el carrito en la página
  function renderizarCarrito() {
    // Obtenemos el array de productos guardado en localStorage (si no hay, será un array vacío)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Si el carrito está vacío, mostramos un mensaje y cortamos la ejecución
    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
      return; // detenemos la función
    }

    // Generamos el HTML para todos los productos del carrito
    const productosEnCarrito = carrito.map(producto => 
        `
            <div class="item-carrito">
            <h3>${producto.title}</h3>
            <img src="${producto.images[0]}" alt="${producto.title}" width="100">
            <p>Precio: $${producto.price}</p>
            <p>${producto.description}</p>
            <button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>
            <hr>
            </div>
        `
    );

    // Unimos todos los bloques en un solo string
    const productos = productosEnCarrito.join("");

    // Insertamos el HTML generado dentro del contenedor en la página
    contenedor.innerHTML = productos;

    // Buscamos todos los botones "Eliminar" que acabamos de insertar
    const botonesEliminar = document.querySelectorAll(".eliminar-btn");

    // Recorremos cada botón y le asignamos un evento click
    botonesEliminar.forEach(boton => {
      // Ademas de asignar el evento click, se define la funcion que dispara el evento click
      boton.addEventListener("click", () => {
        // Al hacer click, Obtenemos el ID del producto a eliminar desde el atributo data-id
        const id = parseInt(boton.dataset.id);

        // Al hacer click, se usa filter(), que recorre el array "carrito", crea uno nuevo y se almacena en una variable
        // teniendo en cuenta la condicion !== (todo lo que sea distinto del id se guarda)
        // en este caso evitamos guardar el id que pertenece al boton del producto seleccionado
        const nuevoCarrito = carrito.filter(producto => producto.id !== id);

        // Guardamos el nuevo array en el localStorage
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

        // Volvemos a llamar a la función para renderizar los productos actualizados
        renderizarCarrito();
      });
    });
  }

  // Ejecutamos la función por primera vez para mostrar los productos al cargar la página
  renderizarCarrito();
});
