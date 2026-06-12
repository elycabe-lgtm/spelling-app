console.log("worlds.js cargado")

let worldParticlesInterval = null

function startWorldParticles(){

   clearInterval(worldParticlesInterval)

   let world =
   document.body.getAttribute("data-world")

   let symbols = ["✨"]

   if(world === "forest"){
      symbols = ["🍃","🌿"]
   }

   else if(world === "ice"){
      symbols = ["❄️","💎"]
   }

   else if(world === "space"){
      symbols = ["⭐","✨","🌟"]
   }

   else if(world === "dino"){
      symbols = ["🦴","🦖"]
   }

   else if(world === "pirate"){
      symbols = ["🪙","✨"]
   }

else if(world === "volcano"){
   symbols = ["🔥","☄️","🌋"]
}

else if(world === "sky"){
   symbols = ["☁️","💨","🕊️"]
}

else if(world === "candy"){
   symbols = ["🍭","🍬","🧁"]
}

else if(world === "castle"){
   symbols = ["✨","👑","🏰"]
}


   worldParticlesInterval = setInterval(()=>{

      let p = document.createElement("div")

      p.className = "worldParticle"

      p.innerText =
      symbols[Math.floor(Math.random()*symbols.length)]

      p.style.left =
      Math.random()*100 + "vw"

      p.style.fontSize =
      (18 + Math.random()*20) + "px"

      p.style.animationDuration =
      (5 + Math.random()*6) + "s"

      document.body.appendChild(p)

      setTimeout(()=>{
         p.remove()
      },12000)

   },700)
}


let worldMusic = new Audio()

let musicEnabled = true

let musicVolume = 0.03

let voiceVolume = 1

worldMusic.loop = true

// 🔥 volumen bajo educativo
worldMusic.volume = 0.03


function playWorldMusic(world){

   let musicMap = {

      forest:"assets/music/forest.mp3",
      ice:"assets/music/ice.mp3",
      space:"assets/music/space.mp3",
      dino:"assets/music/dino.mp3",
      pirate:"assets/music/pirate.mp3",

      volcano:"assets/music/volcano.mp3",
      sky:"assets/music/sky.mp3",
      candy:"assets/music/candy.mp3",
      castle:"assets/music/castle.mp3"
   }

   let src = musicMap[world]

   if(!src) return

   // 🔥 evitar reinicio innecesario
   if(worldMusic.src.includes(src)) return

   worldMusic.pause()

   worldMusic.src = src

worldMusic.volume = musicVolume

  if(musicEnabled){

   worldMusic.play().catch(()=>{})

}

}


function toggleMusic(){

   musicEnabled = !musicEnabled

   playerData[currentAvatar]
   .musicEnabled = musicEnabled

   saveData()

   let btn =
   document.getElementById(
      "musicToggle"
   )

   if(musicEnabled){

      btn.innerHTML =
      "🔊 Music"

      worldMusic.volume = musicVolume

      worldMusic.play().catch(()=>{})

   }else{

      btn.innerHTML =
      "🔇 Music"

      worldMusic.pause()
   }
}

window.toggleMusic = toggleMusic