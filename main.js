// PRODUCTOS
const productos = [
    // Cortes de Vacunos
    {
        
        id: "carne-01",
        titulo: "Asado ",

        categoria: {
            nombre: "Carne",
            id: "carne"
        },
        precio: 1250
    },
    {
        id: "carne-02",
        titulo: "Vacio",

        categoria: {
            nombre: "Carne",
            id: "carne"
        },
        precio: 1450
    },
    {
        id: "carne-03",
        titulo: "Bola de Lomo",
        categoria: {
            nombre: "Carne",
            id: "carne"
        },
        precio: 1250
    },
    {
        id: "carne-04",
        titulo: "Cuadrada",
        categoria: {
            nombre: "Carne",
            id: "carne"
        },
        precio: 1250
    },
    {
        id: "carne-05",
        titulo: "Bife de chorizo",
        categoria: {
            nombre: "Carne",
            id: "carne"
        },
        precio: 1450
    },
    // Avicolas
    {
        id: "avicolas-01",
        titulo: "Pollo",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 499
    },
    {
        id: "avicolas-02",
        titulo: "Supremas",
        categoria: {
            nombre: "Avicolas",
            id: "camisetas"
        },
        precio: 990
    },
    {
        id: "avicolas-03",
        titulo: "Milanesas de pollo",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 800
    },
    {
        id: "avicolas-04",
        titulo: "Pata y muslo",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 450
    },
    {
        id: "avicolas-05",
        titulo: "Churrasquito de pollo",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 990
    },
    {
        id: "avicolas-06",
        titulo: "Alitas",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 280
    },
    {
        id: "avicolas-07",
        titulo: "Matambre de pollo",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 1600
    },
    {
        id: "avicolas-08",
        titulo: "Pamplona de pollo",
        categoria: {
            nombre: "Avicolas",
            id: "avicolas"
        },
        precio: 1500
    },
    // Cerdo
    {
        id: "Cerdo-01",
        titulo: "Bondiola",
        categoria: {
            nombre: "Cerdo",
            id: "cerdo"
        },
        precio: 1300
    },
    {
        id: "Cerdo-02",
        titulo: "Pechito de Cerdo",
        categoria: {
            nombre: "Cerdo",
            id: "cerdo"
        },
        precio: 950
    },
    {
        id: "Cerdo-03",
        titulo: "Carre",
        categoria: {
            nombre: "Cerdo",
            id: "cerdo"
        },
        precio: 1250
    },
    {
        id: "Cerdo-04",
        titulo: "Costillitas ",
        categoria: {
            nombre: "Cerdo",
            id: "cerdo"
        },
        precio: 950
    },
    {
        id: "Cerdo-05",
        titulo: "churrasquito de cerdo",
        categoria: {
            nombre: "Cerdo",
            id: "cerdo"
        },
        precio: 1100
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}