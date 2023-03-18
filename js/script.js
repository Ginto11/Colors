const colores = ["#F77737" ,"#1777F2", "#25D366", "#FFDC80", "#833AB4", "#280C49", "#E1306C", "#128C7E", "#00A4EF", "#292F36", "#DADAD9", "#C2AFF0", "#686868", "#0370B7"]
const favoritos = [];
document.addEventListener("click", (e) => {

    e.preventDefault();

    if(e.target.id === "btn-agregar"){

        let color = document.getElementById("color").value;

        if(color == ""){
            return alert("No escribió ningún código Hexadecimal");
        }

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
        console.log(favoritos)
    }
})

document.addEventListener("dblclick", (e) => {
    if(e.target.matches(".btn-favorito")){

        let color = e.target.style.backgroundColor;
        favoritos.push(color);
        alert("Color agregado a favoritos");
    }
})


document.addEventListener("scroll", (e) => {
    
    let scrollValue = document.documentElement.scrollTop;

    let btn = document.querySelector(".contenedor-btn-top");

    if(scrollValue > 300){
        btn.classList.add("contenedor-btn-top-active");
    } else {
        btn.classList.remove("contenedor-btn-top-active");
    }

})

document.addEventListener("DOMContentLoaded", () => {
    colores.forEach(color => {
        agregarColor(color, "cargaInicial");
    });
})


function agregarColor(color, carga){
    let contenedor = document.createElement("div");
    let contenedorColor = document.createElement("div");
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

const cargaInicial = (contenedor) => {
    contenedor.style.transform = "scale(0.8)"
    contenedor.style.opacity = "0"
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
    contenedorColor.setAttribute("title", "👉 Hacer doble click para agregar a favoritos ✨");
}

const estilosDeCodigo = (strong , color) => {
    strong.textContent = color;
    strong.style.width = "100% !important";
    strong.style.textAlign = "center";
    strong.style.fontWeight = "bold";
}