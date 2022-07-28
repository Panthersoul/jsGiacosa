/*  La idea es crear un menú dinámico para restaurant agregando categorias y a esas categorias 
    platos con su respectivo precio. 
    Y luego realizar las comandas*/

//El producto esta asociado a una categoria
class producto {
    constructor (categoria, nombre, precio){
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
    }

    iva(){
        return this.precio * 1.22;
    }

}

class categoria {
    constructor (nombre, numero){
        this.nombre = nombre;
        this.numero = numero;
    }
}

/*Genero ambas listas*/ 
let listaCategoria = [];
let listaProductos = [];


// AQUI AGREGO CATEGORIAS
let menu = document.getElementById("menu");

let boton = document.getElementById("submitCategoria");
let inputCategoria = document.getElementById("inputCategoria");
let botonListo = document.querySelector("#listoCategoria");
let seleccionCategoria = document.getElementById("selectCategoria");
let divAgregoCat = document.getElementById("agregoCategoria");

let divAgregoProd = document.getElementById("agregoProductos");


/*Escondo Menu*/
menu.style.opacity = 0;
divAgregoProd.style.display = "none";

let listaNombreCat = [];
const agregoCategoria = (e) => {
    let valorCategoria = inputCategoria.value.toUpperCase() 
    listaNombreCat.push(valorCategoria);
    let li = document.createElement("li");
    li.innerHTML = `
        ${valorCategoria} 
    `
/* AQUI AGREGO EL BOTON DE ELIMINAR CATEGORIAS

    let img = document.createElement("img");
    img.src = "../images/delete.png";
    img.classList.add("puntero");
    li.append(img);

    
    img.addEventListener("click", (e)=>{
        e.preventDefault;
        let lista = document.getElementsByClassName(".categoriaListas");
        //console.log(lista);
        //console.log(e.target.parentNode);
        //lista.remove((e.target.parentNode));
        //console.log(e.target.parentNode.innerText);
        let nodo = e.target.parentNode.innerText;
        console.log( listaNombreCat.indexOf(listaNombreCat.filter(el => nodo)));

    })
    //li.addEventListener("click")
    //li.innerText = valorCategoria;
*/


    let divCateg = document.getElementById("listaCateg");
    divCateg.classList.remove("d-none");
    document.querySelector(".categoriaListas").append(li);
    inputCategoria.value = "";
    let nom = document.getElementById("inputNombre");
    nom.disabled = true;
}




inputCategoria.addEventListener("keyup", (e)=>{
    e.preventDefault;    
    if (e.code == "Enter"){
        if (inputCategoria.value != ""){
            agregoCategoria();
        }else{alert("Debe escribir un nombre de categoria.")}
    }
})


/* EVENTOS */
boton.addEventListener("click", agregoCategoria);


/*Aqui cargo la lista de categorias y muestro el Agregar Productos*/
botonListo.addEventListener("click", ()=>{
    divAgregoCat.style.display = "none";
    divAgregoProd.style.display = "flex";
    let nombreRe = document.getElementById("inputNombre").value;
    let nombreResto = document.getElementById("nombreResto");
    nombreResto.innerText = nombreRe;

    /*Aquí cargo la lista de categorias con un ID*/
    for (let i = 0; i < listaNombreCat.length; i++){
        let cat = new categoria;
        cat.nombre = listaNombreCat[i];
        cat.numero = i + 1 ;
        listaCategoria.push(cat);
    }
    //cargo el select 
    
    for (cat of listaCategoria){
        let opion = document.createElement("option");
        opion.value = cat.numero
        opion.innerHTML = cat.nombre;
        seleccionCategoria.appendChild(opion);
    }
})

/** PRODUCTOS  */
let product = document.getElementById("inputProducto");
let precio = document.getElementById("precioProducto");
let botonProd = document.getElementById("botonProducto");
let produ = document.getElementById("checkAgregado");

let addProducto = () => {
    let prod = new producto;
    prod.categoria = seleccionCategoria.value;
    prod.nombre = product.value.toUpperCase();
    if (isNaN(precio.value)){
        alert("El precio debe ser un valor numérico")
    }else{
        prod.precio = precio.value;
        listaProductos.push(prod);
        produ.classList.remove("d-none");
    }
    product.value = "";
    precio.value = "";
}


//botonProd.addEventListener("click", );
botonProd.onclick = addProducto;

product.addEventListener("input", ()=>{
    produ.classList.add("d-none");
})

product.addEventListener("keyup", (e)=>{
    e.preventDefault;
    if (e.code == "Enter"){
        precio.focus()
    }
})

precio.addEventListener("keyup", (e)=>{
    e.preventDefault;
    if (e.code == "Enter"){
        addProducto();
        precio.value = "";
        product.value = "";
        product.focus()
    }
})

let mostrar = document.getElementById("showMenu");
mostrar.addEventListener("click", () => {
    menu.style.opacity = 1;
    divAgregoProd.style.display = "none";
    divAgregoProd.style.display = "none";
    let main = document.querySelector("main");
    main.classList.add("bg-foto")
    cargoCategoriasHTML();
    cargoProductosACategoriasHTML();
    
})




////////////////////////////////////////////////////////////////
/* FUNCIONES PARA FILTRAR Y BUSCAR */
//Recibo Nombre devuelvo id
function categoriaIDporNombre (nombreCategoria){
    let existeCat = listaCategoria.some(catego => catego.nombre == nombreCategoria.toUpperCase());
    if (existeCat){
        let cat = listaCategoria.find(ca => ca.nombre == nombreCategoria.toUpperCase());
        return cat.numero;
    }else{return ("No existe la categoria.")}
}

/*Recido Id Categoria, retorno lista productos*/
function productosPorCategoria (nroCategoria)  {    
    let prods = listaProductos.filter(prod => prod.categoria == nroCategoria);
        if (prods.length > 0){
            return prods
        } else {
            return ("No se encontraron Productos")
        }
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


// Creo los divs con las categorias
function cargoCategoriasHTML(){
    let menu1 = document.getElementById("contenidoMenu");
    let divListaProd = document.createElement("div");
    divListaProd.addClass = "flexcentrado";

    listaCategoria.forEach(element => {
        divListaProd.innerHTML += `
        <div class="p-4">
            <h3><strong>${element.nombre}</strong></h3>
        </div>    
        <div>
            <ul id="${element.nombre}">                
            </ul>
        </div>
        `;
        menu1.append(divListaProd);    
    });
}


/* A cada categoria YA EXISTENTE EN EL HTML le agrego sus productos */
function cargoProductosACategoriasHTML(){
    listaCategoria.forEach(element => {
        let nodo = document.getElementById(element.nombre);
        let nro = categoriaIDporNombre(element.nombre);
        let prodsAcargar = productosPorCategoria(nro);
        prodsAcargar.forEach(elem => {
            let li = document.createElement("li");
            li.addEventListener("click", agregoCarrito);
            li.className = ("articuloMenu carrito");
            li.innerHTML = `
            <p class="nomElemCarr">${elem.nombre}</p><p class="precioElemCarr">$ ${elem.precio}</p>
            `;
            nodo.appendChild(li);
        })

    });

}


let arc = [];

let articulos = document.querySelectorAll(".carrito");
const carrito = [];

const agregoCarrito = (e) => {
    
    let NombreProdCarrito = e.target.querySelector(".nomElemCarr");
    let PrecioProdCarrito = e.target.querySelector(".precioElemCarr");
    
    let nuevoProdNom = document.createElement("p");
    nuevoProdNom.className = "carritoNombre";
    nuevoProdNom.innerHTML = NombreProdCarrito.innerHTML;
    
    let nuevoProdPrecio = document.createElement("p");
    nuevoProdPrecio.className = "carritoPrecio";
    nuevoProdPrecio.innerHTML = PrecioProdCarrito.innerHTML;

    
    let productoCarro = {
        nombre: nuevoProdNom.innerHTML,
        precio: nuevoProdPrecio.innerHTML.substring(1,nuevoProdPrecio.innerHTML.length).trim()
    }
    
    if (localStorage.getItem("carrito") == null){
        carrito.push(productoCarro);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        const listado = JSON.parse(localStorage.getItem("carrito"));
        listado.push(productoCarro);
        localStorage.setItem("carrito", JSON.stringify(listado));
    }
    if (carrito.length != null){
        let carrin = document.querySelector(".carrito");
        carrin.classList.remove("d-none");
    }
}

/* Agrego al boton "VER CARRITO" los eventos que muestran cargan y eleminan*/
let verCarro = document.getElementById("carrito");

const quitarCarrito = (e) => {
    let listado = JSON.parse(localStorage.getItem("carrito"));
    let indice = listado.findIndex(elem => {
        return elem.nombre === e.target.firstChild.innerText
    });
    listado.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(listado));
    cargarCarrito();
}

cargarCarrito = () => {
    let modalCuerpo = document.getElementById("modal-cuerpo");
    let modalTotal = document.getElementById("modal-total");
    modalCuerpo.removeChild(modalCuerpo.firstChild);
    modalTotal.removeChild(modalTotal.firstChild);
    const listado = JSON.parse(localStorage.getItem("carrito"));
    let ul = document.createElement("ul");
    let total = 0;
    listado.forEach( elem => { 
        let li = document.createElement("li");
        total = total + parseInt(elem.precio);
        li.innerHTML = `<p class="nomElemCarr">${elem.nombre}</p><p class="precioElemCarr">$ ${elem.precio}</p>`;
        li.className = "articuloCarro";
        ul.appendChild(li);
    })

    let suma = document.createElement("h4");
    suma.className = "totalCarro";
    suma.innerHTML = `El total del pedido es $<span class="verde margenIZ">${total}</span>`;
    suma.classList.add("p-3");

    modalTotal.appendChild(suma);
    modalCuerpo.appendChild(ul);

    let artiCarrito = document.getElementsByClassName("articuloCarro");
    for (art of artiCarrito){
        art.addEventListener("click", quitarCarrito)
    }

}

verCarro.addEventListener("click", ()=>{
    cargarCarrito();   
})

