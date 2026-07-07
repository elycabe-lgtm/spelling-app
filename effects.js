console.log("effects.js cargado")

function showGIF(src, duration=1200){

   let existing = document.querySelector(".gif-active")
if(existing) existing.remove()

   let gif = document.createElement("img")

   gif.src = src
   gif.classList.add("gif-active")

   gif.style.width = "100%"
   gif.style.height = "100%"
   gif.style.objectFit = "contain"

   let zone = document.getElementById("gifZone")
   if(!zone) return

   zone.innerHTML = ""
   zone.appendChild(gif)

   setTimeout(()=>{
      gif.remove()
   }, duration)
}
