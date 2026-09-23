
//    usando addEventListener
window.addEventListener('load', () => {
  cargarProductos();
});

// 2) Función asíncrona que usa fetch para traer el JSON en segundo plano.
async function cargarProductos() {
  const mensajeCarga = document.querySelector('#mensaje-carga');

  try {
    const respuesta = await fetch('productos.json');

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const productos = await respuesta.json();

    mensajeCarga.remove(); // ya no hace falta el "Cargando..."
    mostrarProductos(productos);

  } catch (error) {
    console.error('Hubo un problema al obtener los productos:', error);
    mensajeCarga.textContent = 'No se pudieron cargar los productos. Intentá más tarde.';
    mensajeCarga.classList.add('error');
  }
}

// 3) Genera dinámicamente una tarjeta (card) por cada producto del JSON.
function mostrarProductos(productos) {
  const contenedor = document.querySelector('#contenedor-productos');

  productos.forEach(producto => {
    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="card-body">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="precio">$${producto.precio.toLocaleString('es-AR')}</span>
        <button class="btn-comprar" data-id="${producto.id}">
          Agregar al carrito
        </button>
      </div>
    `;

    contenedor.appendChild(card);
  });

  // un único addEventListener para todos los botones
  
  contenedor.addEventListener('click', (evento) => {
    if (evento.target.matches('.btn-comprar')) {
      const boton = evento.target;
      boton.textContent = 'Agregado ✔';
      boton.classList.add('agregado');
      boton.disabled = true;
    }
  });
}
