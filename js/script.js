let colores = ["#F77737" ,"#1777F2", "#25D366", "#FFDC80", "#833AB4", "#280C49", "#E1306C", "#128C7E", "#00A4EF", "#292F36", "#DADAD9", "#C2AFF0", "#686868", "#0370B7", "#AF9FA5", "#EDE3E4", "#011C27", "#03254E", "#8FC0A9", "#F8C304", "#04558A", "#F4A300", "#CD4450", "#340763"]
let favoritos = ["#C2AFF0", "#280C49", "#686868", "#0370B7", "#EDE3E4", "#011C27", "#03254E", "#8FC0A9"];

document.addEventListener("click", (e) => manejadorDeClicks(e));
document.addEventListener("dblclick", (e) => manejadorDeDobleClick(e));
document.addEventListener("scroll", (e) => manejadorDeScroll(e));
document.addEventListener("DOMContentLoaded", agregarColoresAlDOM);
document.addEventListener("mouseover", (e) => manejadorDeMouseover(e));
document.addEventListener("mouseout", (e) => manejadorDeMouseout(e));

function manejadorDeClicks(e){
    e.preventDefault();

    if(e.target.id === "btn-agregar"){

        let color = document.getElementById("color").value;


        if(color == ""){
            return alert("No escribió ningún código Hexadecimal");
        } 
        else if(color[0] !== "#"){
            return alert("Asi no se inicia un codigo Hexadecimal.");
        }
        else if(colores.includes(color)){
            return alert("Este color ya esta agregado, escribe otro por favor.");
        }
        
        colores.unshift(color);

        localStorage.setItem("colores", JSON.stringify(colores))

        document.querySelector("#color").value = "";

        agregarColor(color, "cargaDeAgregacion");
    }

    if(e.target.matches(".contenedor-btn-top")){
        document.documentElement.scrollTo({
            behavior: "smooth",
            top: 0 
        });
    }


    if(e.target.matches("#favoritos")){
        if(favoritos.length == 0){
            return alert("No tienes colores favoritos")
        }
        activeOverlay();
        mostrarMenu();
    }

    if(e.target.matches("#tecnologias")){
        activeOverlay();
        mostrarVentana(agregarElementosTecnologias);
    }

    if(e.target.dataset.color){
        copiarCodigoHexadecimal(e)
    }

    if(e.target.matches(".btn-cerrar-tecnologias")){

        const img = document.querySelector(".overlay .btn-cerrar-tecnologias");
        const div = document.querySelector(".overlay div");
        const overlay = document.querySelector(".overlay");

        overlay.removeChild(div);
        overlay.removeChild(img);

        document.body.style.overflowY = "scroll";

        overlay.style.display = "none";
    }

    if(e.target.matches(".btn-cerrar")){

        const elementosRemovidos = document.querySelectorAll(".colores-favoritos div");

        elementosRemovidos.forEach(elemento => {
            document.querySelector(".colores-favoritos").removeChild(elemento);
        })

        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".colores-favoritos").style.transform = "translate(-2000px)";
        document.body.style.overflowY = "scroll";
    }

    if(e.target.matches(".btn-favorito")){

        let color = e.target.nextElementSibling.textContent;

        if(favoritos.includes(color)){
            return alert("Este color ya esta agregado");
        }
        favoritos.unshift(color);

        e.target.textContent = `⭐Agregado⭐`;

    }
}

function manejadorDeDobleClick(e){
    
}

function manejadorDeScroll(e){
    let scrollValue = document.documentElement.scrollTop;

    let btn = document.querySelector(".contenedor-btn-top");

    if(scrollValue > 300){
        btn.classList.add("contenedor-btn-top-active");
    }else {
        btn.classList.remove("contenedor-btn-top-active");
    }

    if(scrollValue >= 29){
        document.querySelectorAll(".cambio-activo-scroll").forEach(elemento => {
            elemento.style.transition = ".3s ease-out all";
            elemento.style.backgroundColor = "#111"
            elemento.style.textShadow = "0px 0px 2px #F77737"
        })
    }else {
        document.querySelectorAll(".cambio-activo-scroll").forEach(elemento => {
            elemento.style.textShadow = "none"
            elemento.style.backgroundColor  = "#00000099"
        })
    } 
}

function agregarColoresAlDOM (){

    localStorage.clear()

    if(localStorage.getItem("colores") === null){localStorage.setItem("colores", JSON.stringify(colores))}

    if(localStorage.getItem("favoritos") === null){localStorage.setItem("favoritos", JSON.stringify(favoritos))}
    


    if(localStorage.getItem("colores")){
        let coloresAlmacenados = JSON.parse(localStorage.getItem("colores"));
        coloresAlmacenados.forEach(color => {
            agregarColor(color, "cargaInicial");
        });
    }
}

function manejadorDeMouseover(e){


    if(e.target.matches(".btn-favorito")){
        const elemento = e.target;
        let color = e.target.nextElementSibling.textContent;
        (favoritos.includes(color)) ? elemento.textContent = `⭐Agregado⭐` : elemento.textContent = `⭐Agregar⭐`;
        elemento.style.transition = ".5s ease all";
        elemento.style.boxShadow = "3px 3px 10px #0009 inset";
        elemento.style.zIndex = "100"
        const elementoPadre = e.target.parentElement;
        elementoPadre.style.transform = "scale(1.1)";
    }

    if(e.target.matches(".color")){

        e.target.parentElement.style.boxShadow = "0 0 5px #000";

    }
}

function manejadorDeMouseout(e){
    if(e.target.matches(".btn-favorito")){
        const elemento = e.target;
        elemento.style.transition = ".5s ease all";
        elemento.style.boxShadow = "3px 3px 10px #0004 inset";
        elemento.textContent = ``;
        const elementoPadre = e.target.parentElement;
        elementoPadre.style.transform = "scale(1)";
    }

    if(e.target.matches(".color")){

        e.target.parentElement.style.boxShadow = "none";

    }
}

function agregarColor(color, carga){
    let contenedor = document.createElement("div");
    let contenedorColor = document.createElement("button");
    let strong = document.createElement("h6");
    
    estilosDeContenedor(contenedor);
    estilosDeContenedorDeColor(contenedorColor, color);
    estilosDeCodigo(strong, color);

    if(carga === "cargaInicial"){
        cargaInicial(contenedor);
    }
    else if(carga === "cargaDeAgregacion"){
        cargaDeAgregacion(contenedor);
    }

    contenedor.appendChild(contenedorColor);
    contenedor.appendChild(strong);

    document.querySelector(".contenedor-secundario").insertAdjacentElement("afterbegin", contenedor);

    setTimeout(() => {
        contenedor.style.transform = "scale(1.0)";
        contenedor.style.transform = "translateX(0)"
        contenedor.style.opacity = "1"
    }, 100)


    
}

function mostrarVentana(funcion){
    
    const div = crearContenedor();

    estilosOverlay()

    const botonCerrar = crearBotonCerrar("btn-cerrar-tecnologias");

    document.querySelector(".overlay").appendChild(div);

    setTimeout(() => {
        div.style.transition = ".4s ease all";
        div.style.transform = "scale(1)"
    })

    document.querySelector(".overlay").appendChild(botonCerrar)
    document.body.style.overflowY = "hidden"

    funcion(div)
}


const agregarElementosTecnologias = (div) =>{

    const titulo = crearTitulo();
    const img = crearImagen();
    const parrafo = crearParrafos();

    div.appendChild(img);
    div.appendChild(titulo)
    div.appendChild(parrafo)

}

const crearTitulo = () => {
    const titulo = document.createElement("h2");
    titulo.textContent = "Tecnologias";

    return titulo;
}

const crearImagen = () => {
    const img = document.createElement("img");
    img.setAttribute("src", "./img/tecnologias.jpg");
    img.style.borderTopLeftRadius = "5px";
    img.style.borderTopRightRadius = "5px";
    img.style.width = "100%";

    return img;
}

const crearParrafos = () => {
    const p = document.createElement("p");
    p.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugit eaque dolores autem fuga, odio iste perferendis obcaecati adipisci distinctio! Eaque voluptates animi doloribus cumque impedit eveniet dolorum tenetur consequuntur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugit eaque dolores autem fuga, odio iste perferendis obcaecati adipisci distinctio! Eaque voluptates animi doloribus cumque impedit eveniet dolorum tenetur consequuntur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugit eaque dolores autem fuga, odio iste perferendis obcaecati adipisci distinctio! Eaque voluptates animi doloribus cumque impedit eveniet dolorum tenetur consequuntur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugit eaque dolores autem fuga, odio iste perferendis obcaecati adipisci distinctio! Eaque voluptates animi doloribus cumque impedit eveniet dolorum tenetur consequuntur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugit eaque dolores autem fuga, odio iste perferendis obcaecati adipisci distinctio! Eaque voluptates animi doloribus cumque impedit eveniet dolorum tenetur consequuntur?"
    p.style.width = "90%"
    p.style.textAlign = "justify";
    return p;
}

const cargaInicial = (contenedor) => {
    contenedor.style.transform = "scale(0.8)"
    contenedor.style.opacity = "0"
}

const crearContenedor = () => {
    const div = document.createElement("div"); 
    div.style.width = "80%";
    div.style.left = "absolute";
    div.style.position = "fixed";
    div.style.height = "90vh";
    div.style.backgroundColor = "#F6F7F8";
    div.style.zIndex = "10000";
    div.style.borderRadius = "5px"
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "flex-start";
    div.style.gap = "15px";
    div.style.alignItems = "center";
    div.style.transform = "scale(0.7)";
    div.style.overflowY = "scroll";
    div.style.boxShadow = "0 0 10px 3px #000"

    return div;
}

const cargaDeAgregacion = (contenedor) => {
    contenedor.style.transform = "scale(0.8)";
    contenedor.style.opacity = "0";
    contenedor.style.transform = "translateX(-70px)";
}

const estilosDeContenedor = (contenedor) => {
    contenedor.style.width = "25%";
    contenedor.style.height = "170px";
    contenedor.style.padding = "10px";
    contenedor.style.backgroundColor = "#0002";
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.justifyContent = "space-between";
    contenedor.style.borderRadius = "10px";
    contenedor.style.boxShadow = "2px 2px 6px #68686";
    contenedor.style.transition = ".5s ease all";
}

const estilosDeContenedorDeColor = (contenedorColor, color) => {
    contenedorColor.classList.add("btn-favorito")
    contenedorColor.style.width = "100%";
    contenedorColor.style.height = "150px";
    contenedorColor.style.borderRadius = "3px";
    contenedorColor.style.backgroundColor = color;
    contenedorColor.style.boxShadow = "3px 3px 10px #0004 inset";
    contenedorColor.style.cursor = "pointer";
    contenedorColor.style.border = "none"
    contenedorColor.setAttribute("title", "👉 Hacer doble click para agregar a favoritos ✨");
}

const estilosDeCodigo = (strong , color) => {
    strong.textContent = color;
    strong.style.width = "100% !important";
    strong.style.textAlign = "center";
    strong.style.fontWeight = "bold";
    strong.style.userSelect = "text";
}

const activeOverlay = () => {

    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    overlay.style.position = "absolute";
    overlay.style.width = "100%";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "#0008";
    overlay.style.zIndex = "99"
    overlay.style.position = "fixed"

}


const estilosOverlay = () =>{
    const overlay = document.querySelector(".overlay");
    overlay.style.minHeight = "100%";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
}

const mostrarMenu = () => {
    const menu = document.querySelector(".colores-favoritos");
    menu.style.transform = "translate(0)";
    menu.style.transition = ".3s ease all";

    document.body.style.overflowY = "hidden";

    estilosDelMenu(menu);
}

const estilosDelMenu = (menu) => {

    const botonCerrar = crearBotonCerrar("btn-cerrar");

    menu.appendChild(botonCerrar)
    menu.style.overflowY = "scroll";
    menu.querySelector("h2").style.marginTop = "30px";
    menu.style.display = "flex";
    menu.style.justifyContent = "flex-start";
    menu.style.alignItems = "center";
    menu.style.flexDirection = "column"
    menu.style.gap = "30px";
    menu.style.zIndex = 1001

    favoritos.forEach((valorRGB, i) => {

        let contadorElementos = i;

        const color = document.createElement("div");
        const btnCopiar = document.createElement("button");

        btnCopiar.style.borderRadius = "3px";
        btnCopiar.style.width = "30px";
        btnCopiar.style.height = "30px"
        btnCopiar.style.backgroundImage = "url(./img/copia1.png)";
        btnCopiar.style.backgroundRepeat = "no-repeat"
        btnCopiar.style.backgroundPosition = "center";
        btnCopiar.style.border = "1px solid #000"
        btnCopiar.style.borderColor = "#000"
        btnCopiar.style.cursor = "pointer";

        if(favoritos.length-1 === contadorElementos){
            color.style.marginBottom = "30px";  
        }

        color.classList.add("color");
        color.style.display = "flex";
        color.style.justifyContent = "flex-end";
        color.style.width = "80%"
        color.style.height = "30px";
        color.style.backgroundColor = valorRGB;
        color.style.borderTopLeftRadius = "5px";
        color.style.borderBottomLeftRadius = "5px";

        color.appendChild(btnCopiar);

        btnCopiar.setAttribute("data-color", valorRGB);

        menu.appendChild(color);

    })
}

const copiarCodigoHexadecimal = (e) => {
    const codigo = document.createElement("p");
    const elementoPadreDelBtnCopiar = e.target.parentElement;
    const boton = e.target;
    if(codigo.textContent == ""){
        codigo.style.marginLeft = "5px";
        codigo.textContent = "Copiado";
        navigator.clipboard.writeText(e.target.dataset.color);
        boton.setAttribute("disabled", "true")
    }
    elementoPadreDelBtnCopiar.style.justifyContent = "space-between";
    elementoPadreDelBtnCopiar.style.alignItems = "center"
    elementoPadreDelBtnCopiar.insertAdjacentElement("afterbegin", codigo)


    setTimeout(() => {codigo.textContent = ""; boton.removeAttribute("disabled")}, 3000)
}

const crearBotonCerrar= (clase) =>{
    const botonCerrar = document.createElement("img");
    botonCerrar.src = "./img/boton.png";
    botonCerrar.style.position = "fixed";
    botonCerrar.style.top = "0"
    botonCerrar.style.right = "0"
    botonCerrar.style.margin = "10px";
    botonCerrar.classList.add(clase);
    botonCerrar.style.cursor = "pointer";

    return botonCerrar;
}





