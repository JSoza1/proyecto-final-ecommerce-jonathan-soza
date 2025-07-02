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

    // Mostramos los datos obtenidos en la consola
    console.log("Datos completos obtenidos:", datos);

    const productos = datos.products

    console.log("a ver ", datos.products)

    // (Codigo que se ejecuta si falla el try)
  } catch (error) {

    // Mostramos cualquier error que ocurra
    console.error("Error:", error);
  }
}

// Llamado a la función para que haga la petición
obtenerLentes();






});