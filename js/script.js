let colores = ["#F77737" ,"#1777F2", "#25D366", "#FFDC80", "#833AB4", "#280C49", "#E1306C", "#128C7E", "#00A4EF", "#292F36", "#DADAD9", "#C2AFF0", "#686868", "#0370B7", "#AF9FA5", "#EDE3E4", "#011C27", "#03254E", "#8FC0A9", "#F8C304", "#04558A", "#F4A300", "#CD4450", "#340763", "#1A5C6C", "#0A3B47", "#1F8384", "#59EBCB", "#34495E", "#212040", "#008080", "#B4D9F3"]
let favoritos = ["#C2AFF0", "#280C49", "#686868", "#0370B7", "#EDE3E4", "#011C27", "#03254E", "#8FC0A9"];

document.addEventListener("click", (e) => manejadorDeClicks(e));
document.addEventListener("dblclick", (e) => manejadorDeDobleClick(e));
document.addEventListener("scroll", (e) => manejadorDeScroll(e));
document.addEventListener("DOMContentLoaded", agregarColoresAlDOM);
document.addEventListener("mouseover", (e) => manejadorDeMouseover(e));
document.addEventListener("mouseout", (e) => manejadorDeMouseout(e));

function manejadorDeClicks(e){

    if(e.target.matches(".link")){
        return;
    }

    e.preventDefault();

    if(e.target.id === "acerca"){
        moverVentana("overlay-about");
        
    }

    if(e.target.matches(".btn-cerrar-about")){
        ocularVentana("overlay-about")
    }
    
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
        moverVentana("overlay-tecnologias")
    }

    if(e.target.dataset.color){
        copiarCodigoHexadecimal(e)
    }

    if(e.target.matches(".btn-cerrar-tecnologias")){

        ocularVentana("overlay-tecnologias")
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
    crearVentanaSegundoPlano(agregarElementosAbout, "overlay-about", "btn-cerrar-about");
    crearVentanaSegundoPlano(agregarElementosTecnologias, "overlay-tecnologias", "btn-cerrar-tecnologias")

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

/**
 * FUNCION QUE AGREGA EL COLOR AL DOM, DE ACUERDO A SI ES CARGA INICIAL DEL DOCUMENTO O ES POR UN EVENTO CLICK
 * @param {string} color 
 * @param {string} carga 
 */
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

/**
 * FUNCION QUE CREA LA VENTANA U OVERLAY EN UNA POSICION EN LA QUE EL USUARIO NO LA VEA
 * @param {function} funcion RECIBE UNA FUNCION PARA AGREGAR LOS ELEMENTOS AL CONTENEDOR DEL OVERLAY.
 * @param {string} idOverlay RECIBE EL ID DEL OVERLAY QUE SE VA CREAR
 * @param {string} idBtnCerrar RECIBE EL ID DEL BTN-CERRAR
 */
function crearVentanaSegundoPlano(funcion, idOverlay, idBtnCerrar){

    
    const div = crearContenedor();

    const overlay = crearOverlay(idOverlay);

    const botonCerrar = crearBotonCerrar(idBtnCerrar);

    overlay.appendChild(div);

    overlay.appendChild(botonCerrar)

    funcion(div)

    document.body.appendChild(overlay)
}

const agregarElementosAbout = (div) => {
    const img = crearImagen("./img/about1.png");
    const titulo = crearTitulo("h2", "Acerca de", "left");
    const parrafo1 = crearParrafo(`
        Este proyecto se creo con el fin de agilizar el proceso de desarrollo de otros proyectos
        personales, esto debido a que muchas veces se realizan proyectos de desarrollo y no se tiene muy claro que colores 
        se pueden usar en la interfaz de usuario, por lo que este sitio permite agregar colores, pueden ser de prueba, y si algun color 
        es de uso frecuente se puede añadir al menu de favotios, en donde se puede copiar el codigo Hexadecimal de color seleccionado al 
        portapapeles. 
    `);

    const titulo2 = crearTitulo("h2", "Datos Importantes", "left");

    const datos = [
        {valor1: "Autor", valor2: "Nelson Muñoz"},
        {valor1: "Cargo o profesión:", valor2: "Estudiante de Ingenieria de Sistemas"},   
        {valor1: "Pais", valor2: "Colombia"},
        {valor1: "Ciudad", valor2: "Bogotá D.C"},
        {valor1: "Youtube", valor2: "GustoPorLaProgramación"},
        {valor1: "GitHub", valor2: "Ginto11"},
        {valor1: "TikTok", valor2: "nelsonmunoz11"},
        {valor1: "Repositorio", valor2: "https://github.com/Ginto11/Colors"}
    ]

    const listaDatosImportantes = crearListaDeElementos(datos);

    const titulo3 = crearTitulo("h2", "Actualizaciones", "left");

    const parrafo3 = crearParrafo(`
        Este sitio es mejorable en muchos sentidos por ejemplo, desarrollar el Backend, ya sea una API REST, o una base de datos,
        tambien del lado del Fronted desarrollarlo todo con un Framework en especifico, añadir mas interacciones de usuarios.
        Entre muchas cosas mas que van incluidas en la imaginación.
    `);

    parrafo3.style.marginBottom = "30px";                   


    div.appendChild(img);
    div.appendChild(titulo);
    div.appendChild(parrafo1);
    div.appendChild(titulo2);
    div.appendChild(listaDatosImportantes);
    div.appendChild(titulo3);
    div.appendChild(parrafo3);
}

/**
 * FUNCION QUE AGREGA LOS ELEMENTOS A LA VENTANA QUE ESTA EN EL OVERLAY Y RECIBE COMO PARAMETRO
 * @param {elemento} div CONTENEDOR DE LA VENTANA
 */
const agregarElementosTecnologias = (div) =>{

    
    const img = crearImagen("./img/tecnologias.jpg");
    const titulo = crearTitulo("h2", "Frontend", "left");
    const parrafo1 = crearParrafo(`
        Existen diferentes tecnologías del Frontend, que permiten el diseño de un sitio web como lo pueden ser HTML5, CSS3, JavaScript y
        PHP que sirve para el Frontend y el Backend. Por otro lado también hay Frameworks, los cuales facilitan el 
        desarrollo de ciertas formas. Pero en este sitio no se utilizó ningún Framework ni PHP, se utilizaron las tecnologías básicas
        que son HTML5, CSS3 y JavaScript. La idea era generar más dinamismo por medio de la utilización del DOM (Document Object Model)
        lo que la gran mayoría de elementos que se visualizan en el sitio son creados a partir de código puro de JavaScript.
    `);

    const parrafo2 = crearParrafo(`
        Fue realizada como una SPA (Single Page Aplication), esta es una aplicación de una sola página, o en su defecto de que tiene un 
        solo documento HTML, el HTML faltante de se construye con JavaScript en tiempo real. Lo que mejora aún más la experiencia de usuario.
    `);

    const contenedorLogos = crearContenedorImagen("space-around");
    const logoHTML = crearLogo("./img/logo_html.png");
    const logoCSS = crearLogo("./img/logo_css.png");
    const logoJavascript = crearLogo("./img/js-logo.png");

    contenedorLogos.appendChild(logoHTML);
    contenedorLogos.appendChild(logoCSS);
    contenedorLogos.appendChild(logoJavascript);

    const titulo2 = crearTitulo("h2", "Sistema de Control de Versiones", "left");

    const parrafo3 = crearParrafo(`
        Todo proyecto de desarrollo debe tener o usar un sistema de control de versiones, uno de los mas utilizados es Git, este nos 
        permite ir actualizando nuestro proyecto en su respectivo repositorio el cual estaria en  GitHub. Tambien nos lleva un registro
        de los commits que se han realizado hasta el momento y si en algun momento se necesita que el proyecto este en una version anterior
        a la actual, con Git es muy sencillo hacerlo. Para utilizar Git se tiene que usar en conjunto con GitHub, ya que este ultimo es 
        una plataforma para alojar proyectos de Desarrollo, con el fin de gestionar y controlar las versiones.
    `);

    const parrafo4 = crearParrafo(`
        Existen muchisimos comandos en Git, primero nos centraremos en los comandos de configuracion estos son aquellos que se hacen despues de 
        la instalacion de Git, esto configura el usuario y la contraseña para poder trabajar con los repositorios de GitHub.
    `);

    const comandosConfig = [
        {valor1: "git config --global user.name 'Nombre usuario'", valor2: "Se usa para configurar el nombre de usuario de acuerdo al usuario de GitHub."},
        {valor1: "git config --global user.email 'Email usuario'", valor2: "Se usa para configurar el email del usuario de acuerdo al email de GitHub."}

    ]

    const comandosNuevoRepositorio = [
        {valor1: "echo '# Prueba' >> README.md", valor2: "En este archivo, se documenta nuestro proyecto."},
        {valor1: "git init", valor2: "Inicializa un repositorio."},
        {valor1: "git remote add origin 'Link del repositorio'", valor2: "Este repositorio va estar vinculado al repositorio de Github."},
        {valor1: "git add README.md", valor2: "Se añade el archivo al repositorio."},
        {valor1: "git commit -m 'Primer commit'", valor2: "Se usa para agregarle una descripción de lo que se realizó en el proyecto."},
        {valor1: "git branch -M main", valor2: "Se usa para cambiar a la rama principal (main)."},
        {valor1: "git push -u origin main", valor2: "Se usa para empujar los archivos al repositorio."}
    ]

    const comandosActualizacionRepositorio = [
        {valor1: "git status", valor2: "Sirve para ver el estado de los archivos, si estan modificados, si se han agregado nuevos archivos y si se han eliminado archivos."},
        {valor1: "git add *", valor2: "Se usa para añadir los elementos para posteriormente empujarlos."},
        {valor1: "git commit -m 'Descripción'", valor2: "Se describe los cambios que se hicieron."},
        {valor1: "git push", valor2: "Se usa cuando para subir o empujar los archivos al repositorio de GitHub."}
    ]

    const titulo3 = crearTitulo("h3", "Comandos de Configuración", "left");

    const listaComandosConfiguracion = crearListaDeElementos(comandosConfig);

    const titulo4 = crearTitulo("h3", "Como crear nuevo repositorio", "left");

    const listaComandosRepositorioNuevo = crearListaDeElementos(comandosNuevoRepositorio);

    const titulo5 = crearTitulo("h3", "Actualizando el repositorio después de cambios", "left");

    const listaComandosActualizarRepositorio = crearListaDeElementos(comandosActualizacionRepositorio);
    
    const contenedorLogosControlDeVersiones = crearContenedorImagen("space-around");

    contenedorLogosControlDeVersiones.appendChild(crearLogo("./img/logo-git.png"));
    contenedorLogosControlDeVersiones.appendChild(crearLogo("./img/logo-github.png"));
    
    const titulo6 = crearTitulo("h2", "Entorno de desarrollo o editor de texto", "left");

    const parrafo5 = crearParrafo(`
        El entorno de desarrollo utilizado en este proyecto fue Visual Studio Code, este es un editor de texto, el cual nos permite la instalacion
        de extensiones, estas ofrecen muchas funcionalidades como por ejemplo: La organizacion de codigo, hay extensiones que nos permiten
        trabajar con snippets de ciertos lenguages, e instalar herramientas que funcionan con ciertos lenguages, solo nos tocaria instalarlas y ya, 
        tambien por otro lado facilita la organizacion de un proyecto.
    `);

    const contenedorImagenVSC = crearContenedorImagen("flex-start");
    contenedorImagenVSC.appendChild(crearImagenSection("./img/vsc.png"));
    contenedorImagenVSC.style.marginBottom = "30px";

    div.appendChild(img);
    div.appendChild(titulo);
    div.appendChild(parrafo1);
    div.appendChild(parrafo2);
    div.appendChild(contenedorLogos);
    div.appendChild(titulo2);
    div.appendChild(parrafo3);
    div.appendChild(parrafo4);
    div.appendChild(titulo3);
    div.appendChild(listaComandosConfiguracion);
    div.appendChild(titulo4);
    div.appendChild(listaComandosRepositorioNuevo);
    div.appendChild(titulo5);
    div.appendChild(listaComandosActualizarRepositorio);
    div.appendChild(contenedorLogosControlDeVersiones);
    div.appendChild(titulo6);
    div.appendChild(parrafo5);
    div.appendChild(contenedorImagenVSC);

}

/**
 * FUNCION QUE MUEVE EL OVERLAY PARA SER MOSTRADO AL USUARIO
 * @param {string} id ESTE ID ES EL DEL OVERLAY CREADO
 */
const moverVentana = (id) =>{
    document.body.style.overflowY = "hidden";
    console.log(document.querySelector(`#${id}`))
    document.querySelector(`#${id}`).style.transform = "translateY(0)";
    document.querySelector(`#${id}`).style.transition = ".8s ease all";
    document.querySelector(`#${id}`).style.zIndex = "9999";
}


/**
 * FUNCION QUE ME OCULTA LA VENTANA PARA QUE NO SEA VISTA POR EL USUARIO
 * @param {string} id RECIBE EL ID DEL OVERLAY
 */
const ocularVentana = (id) => {
    document.querySelector(`#${id}`).style.transform = "translateY(-10000px)";
    document.body.style.overflowY = "scroll";
}


/**
 * FUNCION QUE CREA UNA IMAGEN DE ACUERDO AL PARAMETRO QUE SE LE PASE
 * @param {string} ruta RUTA DE DONDE SE ENCUENTRA LA IMAGEN
 * @returns Imagen
 */
const crearImagenSection = (ruta) => {
    const img = document.createElement("img");
    img.alt = "Imagen no encontrada"
    img.src = ruta;
    img.style.width = "90%"
    img.style.borderRadius = "10px";

    return img;
}

/**
 * FUNCION QUE CREA UNA LISTA DE ELEMENTOS LI
 * @param {array} arreglo RECIBE ARREGLO PARA SER CREADO
 * @returns CONTENEDOR LISTA, Y ADENTRO ESTA LA LISTA
 */
const crearListaDeElementos = (arreglo) => {
    const contenedorLista = document.createElement("p");
    contenedorLista.style.width = "85%"
    const listaComandos = document.createElement("ul");
    arreglo.forEach(el => {
        const li = document.createElement("li");
        li.innerHTML = `<i style="background-color: #03254E; padding: 3px 5px; color: #F77737; border-radius: 8px; margin-right: 4px;"> ${el.valor1} : </i> ${el.valor2}`

        listaComandos.appendChild(li);
    })
    contenedorLista.appendChild(listaComandos);
    return contenedorLista;
}

/**
 * FUNCION QUE CREA EL LOGO
 * @param {string} ruta SE LE PASA LA RUTA DEL LOGO
 * @returns CONTENEDOR LOGO Y ADENTRO ESTA EL LOGO
 */
const crearLogo = (ruta) => {

    const contenedorLogo = document.createElement("div");
    contenedorLogo.style.width = "130px";

    const logo = document.createElement("img");
    logo.src = ruta
    logo.style.width = "100%";
    logo.style.height = "130px"
    logo.style.filter = "drop-shadow(0 0 3px #000)";

    contenedorLogo.appendChild(logo);

    return contenedorLogo;
}

/**
 * FUNCION QUE CREA EL CONTENEDOR DE LA IMAGEN
 * @param {string} alineacion RECIBE LA ALINEACION DE LA IMAGEN
 * @returns CONTENEDOR Y ADENTRO ESTA LA IMAGEN
 */
const crearContenedorImagen = (alineacion) => {
    const contenedor = document.createElement("div");
    contenedor.style.display = "flex";
    contenedor.style.justifyContent = alineacion;
    contenedor.style.width = "90%";

    return contenedor;
}

/**
 * FUNCION QUE CREA EL TITULO
 * @param {string} etiqueta RECIBE EL ELEMENTO O LA ETIQUETA 
 * @param {string} texto RECIBE EL TEXTO QUE VA ADENTRO DE LA ETIQUETA
 * @param {string} alineacion RECIBE LA ALINEACION DEL TEXTO DE LA ETIQUETA
 * @returns TITULO
 */
const crearTitulo = (etiqueta, texto, alineacion) => {
    const titulo = document.createElement(etiqueta);
    titulo.style.width = "90%"
    titulo.textContent = texto;
    titulo.style.textAlign = alineacion;

    return titulo;
}

/**
 * FUNCION QUE CREA LA IMAGEN DEL ENCABEZADO DE LA VENTANA
 * @param {string} ruta RECIBE LA RUTA DE LA IMAGEN
 * @returns IMAGEN
 */
function crearImagen(ruta){
    const img = document.createElement("img");
    img.setAttribute("src", ruta);
    img.setAttribute("alt", "Imagen no encontrada");
    img.style.borderTopLeftRadius = "5px";
    img.style.width = "100%";

    return img;
}

/**
 * FUNCION QUE CREA UN PARRAFO
 * @param {string} texto RECIBE EL TEXTO COMO PARAMETRO 
 * @returns ELEMENTO P
 */
const crearParrafo = (texto) => {
    const p = document.createElement("p");
    p.textContent = texto;
    p.style.textAlign = "justify"
    p.style.width = "90%"
    return p;
}


/**
 * FUNCION QUE ME CARGA LOS COLORES AL DOM
 * @param {elemento} contenedor RCIBE EL CONTENEDOR DE COLORES
 */
const cargaInicial = (contenedor) => {
    contenedor.style.transform = "scale(0.8)"
    contenedor.style.opacity = "0"
}

/**
 * FUNCION QUE ME CREA UN CONTENEDOR, EL CUAL VA EN LA VENTANA
 * @returns ELEMENTO DIV
 */
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
    div.style.overflowY = "scroll";
    div.style.boxShadow = "0 0 10px 3px #000"

    return div;
}

/**
 * FUNCION QUE ME AGREGA LOS COLORES DE ACUERDO AL EVENTO CLICK
 * @param {elemento} contenedor RECIBE EL CONTENEDOR COMO PARAMETRO
 */
const cargaDeAgregacion = (contenedor) => {
    contenedor.style.transform = "scale(0.8)";
    contenedor.style.opacity = "0";
    contenedor.style.transform = "translateX(-70px)";
}

/**
 * FUNCION QUE AGREGA ESTILOS AL CONTENEDOR
 * @param {elemento} contenedor RECIBE EL CONTENEDOR DE LA VENTANA
 */
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


/**
 * FUNCION QUE ME AGREGA LOS ESTILOS AL CONTENEDOR DE COLOR
 * @param {elemento} contenedorColor RECIBE EL CONTENEDOR DE COLOR
 * @param {string} color RECIBE EL COLOR
 */
const estilosDeContenedorDeColor = (contenedorColor, color) => {
    contenedorColor.classList.add("btn-favorito")
    contenedorColor.style.width = "100%";
    contenedorColor.style.height = "150px";
    contenedorColor.style.borderRadius = "3px";
    contenedorColor.style.backgroundColor = color;
    contenedorColor.style.boxShadow = "3px 3px 10px #0004 inset";
    contenedorColor.style.cursor = "pointer";
    contenedorColor.style.border = "none"
    contenedorColor.setAttribute("title", "👉 Hacer click para agregar a favoritos ✨");
}

/**
 * FUNCION QUE AGREGA LOS ESTILOS DEL CODIGO, DEL CONTENEDOR DE COLOR 
 * @param {elemento} strong RECIBE ELEMENTO DONDE SE AGREGA EL CODIGO 
 * @param {string} color RECIBE EL CODIGO DEL COLOR
 */
const estilosDeCodigo = (strong , color) => {
    strong.textContent = color;
    strong.style.width = "100% !important";
    strong.style.textAlign = "center";
    strong.style.fontWeight = "bold";
    strong.style.userSelect = "text";
}

/**
 * FUNCION QUE ACTIVA EL OVERLAY DE COLORES FAVORITOS
 */
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

/**
 * FUNCION QUE AGREGA ESTILOS AL OVERLAY DE COLORES FAVORITOS
 */
const estilosOverlay = () =>{
    const overlay = document.querySelector(".overlay");
    overlay.style.minHeight = "100%";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
}

/**
 * FUNCION QUE MUESTRA EL MENU DE COLORES FAVORITOS
 */
const mostrarMenu = () => {
    const menu = document.querySelector(".colores-favoritos");
    menu.style.transform = "translate(0)";
    menu.style.transition = ".3s ease all";

    document.body.style.overflowY = "hidden";

    estilosDelMenu(menu);
}

/**
 * FUNCION QUE AGREGA ESTILOS AL MENU DE COLORES FAVORITOS
 * @param {elemento} menu RECIBE EL MENU 
 */
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

/**
 * FUNCION QUE COPIA EL CODIGO DEL COLOR AL PORTAPAPELES
 * @param {object} e RECIBE EL EVENTO CLICK Y DE AHI SE SACA EL ELEMENTO
 */
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

/**
 * FUNCION QUE CREA EL BOTON CERRAR DEL OVERLAY
 * @param {string} clase RECIBE LA CLASE QUE VA TENER EL BOTON
 * @returns ELEMEMTO IMG
 */
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

/**
 * FUNCION QUE CREA OVERLAY 
 * @param {string} id RECIBE EL ID QUE VA TENER EL OVERLAY
 * @returns OVERLAY
 */
const crearOverlay = (id) => {
    const overlay = document.createElement("div");
    overlay.setAttribute("id", id);              
    overlay.style.width = "100%";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column"
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "#0008";
    overlay.style.position = "fixed";
    overlay.style.zIndex = "-1"
    overlay.style.transform = "translateY(-1000px)";

    return overlay;
}




