function renderUIReset(){

   el.output.innerHTML = ""

   el.gameArea.innerHTML = ""

   el.typingContainer.style.display = "none"

   answered = false

   hintCounter = {}
}

function initStreakUI(){

   if(streakUI) return

   streakUI = document.createElement("div")

   streakUI.style.position = "absolute"
   streakUI.style.top = "10px"
   streakUI.style.left = "50%"
   streakUI.style.transform = "translateX(-50%)"
   streakUI.style.fontSize = "22px"
   streakUI.style.fontWeight = "bold"
   streakUI.style.color = "#e67e22"
   streakUI.style.zIndex = "50"

   document
      .querySelector(".card")
      .appendChild(streakUI)
}


function renderEffects(){

   let card = document.querySelector(".card")

   if(card){

      card.classList.remove("fade")

      void card.offsetWidth

      card.classList.add("fade")
   }
}


