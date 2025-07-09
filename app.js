//API Usada https://dummyjson.com/docs/products

// Funcion que se activa despues de que este toda la web cargada
document.addEventListener('DOMContentLoaded', () => {

  // Definimos una función asíncrona para obtener lentes
  async function obtenerLentes() {

    // try en ingles es "intentar / probar" (este codigo puede fallar)
    try {

      // Hacemos la petición HTTP a la API
      const respuesta = await fetch('https://dummyjson.com/products/category/sunglasses');

      // Convertimos la respuesta a JSON
      const datos = await respuesta.json();

      // Mostramos los datos completos de la API
      console.log("Datos completos obtenidos:", datos);

      // Almacenamos el array de los productos en una variable
      const productosCompletos = datos.products;

      // Mostramos solo los datos de los productos en consola
      console.log("Datos de los productos", productosCompletos);

      // Recorremos el array, y generamos uno nuevo ( Template Strings / Template Literals )
      const productos = productosCompletos.map(producto => {
        return `
          <article>
            <h3>${producto.title}</h3>
            <figure>
              <img src="${producto.images[0]}" alt="${producto.title}">
              <figcaption>$${producto.price}</figcaption>
            </figure>
            <p>
              ${producto.description}
            </p>
            <button class="btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
          </article>
        `;
      });

      // Agregamos los elementos del array al contenedor Productos del html
      document.getElementById("Productos").innerHTML = productos.join("");

      // Buscamos todos los botones con la clase btn-agregar y los almacenamos en variable para usarlos despues
      const botonesAgregar = document.querySelectorAll(".btn-agregar");

      // Recorremos todos los botones
      botonesAgregar.forEach(boton => {
      // A cada boton recorrido se le agrega el evento click
      boton.addEventListener("click", () => {
      // Pasamos el id del producto clickeado a una variable | ademas es convertido a un entero con parseInt
      const idProducto = parseInt(boton.dataset.id);
      // Buscamos el producto completo en el array productosCompletos
      const productoSeleccionado = productosCompletos.find(producto => producto.id === idProducto);
      // Recuperamos el carrito del LocalStorage o iniciamos vacío
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      // Agregamos el producto seleccionado al carrito
      carrito.push(productoSeleccionado);
      // Guardamos el carrito actualizado en LocalStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`Se agregó "${productoSeleccionado.title}" al carrito.`);
      
      actualizarContador();
      });
    });

      // (Codigo que se ejecuta si falla el try)
    } catch (error) {

      // Mostramos cualquier error que ocurra
      console.error("Error:", error);
    }
  }

  // Llamado a la función para que haga la petición
  obtenerLentes();

  // Boton hamburguesa
  const btnMenu = document.getElementById('btnMenu');
  const menu = document.getElementById('menu');

  btnMenu.addEventListener('click', () => {
    // Alternar clase "show" al menú responsive
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
    } else {
      menu.classList.add('show');
    }
  });

  // Hacer que el menú responsive se oculte al hacer clic en cualquier enlace del menú
  const enlacesMenu = document.querySelectorAll('.menu-responsive nav ul li a');

  enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  });

  // Contador
  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("contador").textContent = carrito.length;
  }
  actualizarContador();

});