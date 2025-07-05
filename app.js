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
    const productosCompletos = datos.products

    // Mostramos solo los datos de los productos en consola
    console.log("Datos de los productos", productosCompletos)

    // Recorremos el array, y generamos uno nuevo ( Template Strings / Template Literals )
    const productos = productosCompletos.map(producto => {

      return  `

                <article>
                <h3>${producto.title}</h3>
                <figure>
                    <img src="${producto.images[0]}" alt="${producto.title}">
                    <figcaption>$${producto.price}</figcaption>
                </figure>
                <p>
                ${producto.description}
                </p>
                <button>Agregar al Carrito</button>
                </article>
            
              `;

    });

    // Agregamos los elementos del array al contenedor Productos del html
    document.getElementById("Productos").innerHTML = productos.join("");

    // (Codigo que se ejecuta si falla el try)
  } catch (error) {

    // Mostramos cualquier error que ocurra
    console.error("Error:", error);
  }
}

// Llamado a la función para que haga la petición
obtenerLentes();

});