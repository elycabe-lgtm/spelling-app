console.log("ui.js cargado")

window.renderUIReset = function(){

   el.output.innerHTML = ""

   el.gameArea.innerHTML = ""

   el.typingContainer.style.display = "none"

   answered = false

   hintCounter = {}
}



window.renderEffects = function(){

   let card = document.querySelector(".card")

   if(card){

      card.classList.remove("fade")

      void card.offsetWidth

      card.classList.add("fade")
   }
}
