const colores = ["#F77737" ,"#1777F2", "#25D366", "#FFDC80", "#833AB4", "#280C49", "#E1306C", "#128C7E", "#00A4EF", "#292F36", "#DADAD9", "#C2AFF0", "#686868", "#0370B7"]

document.addEventListener("click", (e) => {

    e.preventDefault();

    console.log(e.target)

    if(e.target.id === "btn-agregar"){

        let color = document.getElementById("color").value;

        if(color == ""){
            return alert("No escribió ningún código Hexadecimal");
        }

        document.querySelector("#color").value = "";

        agregarColor(color);
    }

    if(e.target.matches(".contenedor-btn-top")){
        document.documentElement.scrollTo({
            behavior: "smooth",
            top: 0 
        });
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
        agregarColor(color);
    });
})


function agregarColor(color, carga){
    let contenedor = document.createElement("div");
    let contenedorColor = document.createElement("div");
    let strong = document.createElement("h6");


    contenedor.style.width = "25%";
    contenedor.style.height = "170px";
    contenedor.style.padding = "10px";
    contenedor.style.backgroundColor = "#0002";
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.justifyContent = "space-between";
    contenedor.style.borderRadius = "10px";
    contenedor.style.boxShadow = "2px 2px 6px #68686";
    
    if(carga == "inicial"){
        contenedor.style.transform = "scale(0.8)"
        contenedor.style.transform = "translateX(-100px)"
        contenedor.style.opacity = "0"
    }
    contenedor.style.transition = ".3s ease all";
    

    contenedorColor.style.width = "100%";
    contenedorColor.style.height = "150px";
    contenedorColor.style.borderRadius = "3px";
    contenedorColor.style.backgroundColor = color;
    contenedorColor.style.boxShadow = "3px 3px 10px #0004 inset";

    strong.textContent = color;
    strong.style.width = "100% !important";
    strong.style.textAlign = "center";
    strong.style.fontWeight = "bold";

    contenedor.appendChild(contenedorColor);
    contenedor.appendChild(strong);

    document.querySelector(".contenedor-secundario").insertAdjacentElement("afterbegin", contenedor);

    setTimeout(() => {
        contenedor.style.transform = "scale(1.0)";
        contenedor.style.transform = "translateX(0)"
        contenedor.style.opacity = "1"
    }, 100)


    
}