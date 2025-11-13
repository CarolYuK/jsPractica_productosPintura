let productos =  [];

async function cargarProductos() {
    try {
        const respuesta = await fetch("data/productos.json");
        productos = await respuesta.json();
        render();
    } catch (error) {
        console.error("Error al cargar los productos de pintura: ", error)
    }
}

function pintarProductos(lista, contenedorId) {
    //contenedorId?
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML="";

    if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
    }

    lista.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("producto");

        card.innerHTML = `
            <img src="${producto.image || 'https://via.placeholder.com/200x150?text=Sin+imagen'}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>Precio: $${producto.price}</p>
            <p>Stock: ${producto.stock}</p>
            <button class="btn-destacado">${producto.featured_product ? "★ Destacado" : "☆ Destacar"}</button>
        `;

        const boton = card.querySelector(".btn-destacado");
        boton.addEventListener("click", () => {
        producto.featured_product = !producto.featured_product;
        render();
        });

        contenedor.appendChild(card);
    });
}

//no lo modifiqué
function render() {
  const destacados = productos.filter(p => p.featured_product);
  const noDestacados = productos.filter(p => !p.featured_product);
  pintarProductos(destacados, "listaDestacados");
  pintarProductos(noDestacados, "listaProductos");
}

const form = document.querySelector(".formulario_filtrar");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.querySelector(".buscarNombre").value.toLowerCase();
  const precio = parseFloat(document.querySelector(".buscarPrecio").value);

  const resultado = productos.filter(p => {
    const coincideNombre = p.name.toLowerCase().includes(nombre);
    const coincidePrecio = isNaN(precio) || p.price <= precio;
    return coincideNombre && coincidePrecio;
  });

  pintarProductos(resultado, "listaProductos");
});

cargarProductos();