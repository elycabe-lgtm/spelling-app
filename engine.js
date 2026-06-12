console.log("engine.js cargado")

loadCycle()

function syncGameState(){

   gameState.index = gameIndex

   gameState.list = gameList

   gameState.block = dom.block.value

   gameState.mode = dom.mode.value

   gameState.order = dom.order.value
}

function advanceGame(){

   let block = dom.block.value
   let cycle = randomCycle[block]

   if(order.value === "rand" && cycle){

      // =========================
      // 🔥 FIN DE MAIN → REVIEW
      // =========================
      if(cycle.phase === "main" && cycle.pending.length === 0){

         cycle.phase = "review"

gameState.phase = "review"

         gameIndex = 0

         let arr = window.blocksData[block]

if(!arr || !Array.isArray(arr)){

   console.log(
      "❌ Invalid block:",
      block
   )

   return
}

gameList = cycle.errors
   .map(w => arr.find(x => x.word === w))
   .filter(Boolean)


syncGameState()

gameIndex = 0

saveBlockProgress()

         saveCycle()
         render()
         return
      }

      // =========================
      // 🔥 FIN DE REVIEW → RESET
      // =========================
      if(cycle.phase === "review" && cycle.errors.length === 0){

clearBlockProgress()

 let arr = window.blocksData[block]

   giveChest(1)

   cycle.phase = "main"

gameState.phase = "main"

// 🔄 reset dominio parcial
Object.values(getMastery()).forEach(w=>{
   if(w.mastered){
      w.streak = 2
   }
})
         cycle.pending = shuffleArray(arr.map(w => w.word))
         cycle.errors = []

         gameList = [...arr]
         gameIndex = 0

syncGameState()

         saveCycle()
         render()
         return
      }

   gameIndex++

syncGameState()

saveBlockProgress()

}else{

 gameIndex++

syncGameState()

saveBlockProgress()


}

   render()
}


function getCurrentWord(){

return gameList[gameIndex]
}

function saveData(){
localStorage.setItem("spellingApp", JSON.stringify(playerData))
}

function savePlayerState(){

   if(!playerData[currentAvatar]) return

   playerData[currentAvatar].lives = lives
   playerData[currentAvatar].shield = shield

   saveData()
}


function updateProgress(){
bar.style.width=((progressCount/gameList.length)*100)+"%"

bar.classList.add("progressPop")

setTimeout(()=>{
   bar.classList.remove("progressPop")
},200)

}

function checkAnswer(answer){

if(answered) return
answered = true

let obj = getCurrentWord()
if(!obj) return

let hadError = answer === "error"
let correctWord = obj.word
let userInput = answer.replace(/^\s+|\s+$/g, "")
let isCorrect = !hadError && userInput === correctWord

// =========================
// 🧠 RANDOM CYCLE TRACKING
// =========================

let block = listSelector.value
let cycle = randomCycle[block]

if(order.value === "rand" && cycle){

   let currentWord = getCurrentWord().word

   // 🔥 quitar de pendientes (MAIN)
   cycle.pending = cycle.pending.filter(w => w !== currentWord)

   if(isCorrect){

      // ✅ quitar de errores si ya lo aprendió
      cycle.errors = cycle.errors.filter(w => w !== currentWord)

   }else{

      // ❌ agregar a errores si falla
      if(!cycle.errors.includes(currentWord)){
         cycle.errors.push(currentWord)
      }
   }

   saveCycle()
}


// 🔥 progreso SIEMPRE
progressCount++

updateMastery(correctWord, isCorrect)

if(isCorrect){

   // showCorrectFX()  // 🔥 quitado
   gameState.correct++
gameState.streak++

if(
   gameState.streak > 0 &&
   gameState.streak % 30 === 0
){
   giveChest(1)
}

let data = playerData[currentAvatar]

data.xp += 10

let needed = getXPForNextLevel(data.level)

if(data.xp >= needed){
   data.xp -= needed
   data.level++

   showGIF("assets/gifs/levelup.gif",1500)
   safePlay("level")
}

// 🎉 CONFETTI EN EL MOMENTO CORRECTO
if(gameState.streak >= 5){
   showConfettiExplosion()
}

// 🔥 FIRE MODE
if(gameState.streak >= 8){

   showCombo("🔥 FIRE!", true)
}

// ❤️ VIDA CADA 20
if(gameState.streak % 20 === 0){

   lives++

   updateLivesUI()

   savePlayerState()

   showGIF(
   "assets/gifs/vida.gif",
   1500
   )

   safePlay("level")
}


// 🛡️ ESCUDO CADA 10
if(gameState.streak % 10 === 0){

   shield++

   savePlayerState()

   animateShieldGain()
}

   setAvatar("happy")
   if(hadError){
   safePlay("level")   // sonido suave (corrigió)
}else{
   safePlay("correct") // sonido fuerte (perfecto)
}


// 🧠 LIMPIAR ERRORES SI YA APRENDIÓ

// wrongWords = wrongWords.filter(
//    w => w !== correctWord
// )

// quitar de mistakes (histórico del jugador)
let mistakes = getMistakes()

playerData[currentAvatar].mistakes = mistakes.filter(w => w !== correctWord)

}else{

showErrorFX()

   gameState.wrong++
   gameState.streak = 0

// safePlay("wrong")

   let result = handleError()

   if(result) return
}

updateStats(isCorrect)

// 🎬 GIFS
if(isCorrect){

   if(gameState.streak < 5){
      showGIF("assets/gifs/happy.gif")

   }else if(gameState.streak === 15){
      showGIF("assets/gifs/pocoyo.gif",1500)

   }else if(gameState.streak === 21){
      showGIF("assets/gifs/ganador.gif",2000)
   }
}
// 🔥 SIEMPRE
updateUI()
updateProgress()
saveData()

if(order.value === "rand"){
   saveCycle()
}

// =========================
// 🔥 RANDOM PHASE CONTROL
// =========================

if(order.value === "rand"){

  let block = gameState.block

   let cycle = randomCycle[block]

   // 🔥 TERMINÓ MAIN
   if(
      cycle.phase === "main" &&
      cycle.pending.length === 0
   ){

      // 🔁 ENTRAR A REVIEW
      if(cycle.errors.length > 0){

         cycle.phase = "review"

gameState.phase = "review"

         let arr =
         window.blocksData[block]

         gameList = cycle.errors
   .map(w => arr.find(x => x.word === w))
   .filter(Boolean)

gameState.list = gameList

         saveBlockProgress()

         saveCycle()

         render()

         return
      }

      // ✅ COMPLETÓ PERFECTO
      giveChest(1)

      cycle.completed = true

      saveCycle()
   }

   // 🔥 TERMINÓ REVIEW
   else if(
      cycle.phase === "review" &&
      cycle.errors.length === 0
   ){

      giveChest(1)

      let arr =
      [...(window.blocksData[block] || [])]

      gameList = shuffleArray(arr)

      randomCycle[block] = {

         phase:"main",

        pending:
gameList.map(w => w.word),

         errors:[],

         completed:false,

         date:getToday()
      }

     gameIndex = 0

gameState.index = 0

      clearBlockProgress()

      saveCycle()

      render()

      return
   }
}

}


function saveCycle(){

   localStorage.setItem(
      "randomCycle",
      JSON.stringify(randomCycle)
   )
}

function loadCycle(){

   let data =
   localStorage.getItem(
      "randomCycle"
   )

   if(data){

      randomCycle =
      JSON.parse(data)
   }
}


function applySettings(){

gameState.block = dom.block.value

gameState.mode = dom.mode.value

gameState.order = dom.order.value

// 🔥 SINCRONIZA SELECTORES
if(!dom.block.value || dom.block.value === ""){
   dom.block.value = listSelector.value
}

let arr=[...(window.blocksData[dom.block.value]||[])]
if(imageFilter.value==="images"){
arr = arr.filter(w => hasImage(w.word))
}

if(rangeType.value==="custom"){

let f=parseInt(from.value)
let t=parseInt(to.value)

if(isNaN(f)) f=1
if(isNaN(t)) t=arr.length

arr=arr.filter(w=>w.num>=f && w.num<=t)
}

/* 🔥 ESTA PARTE FALTABA */
if(dom.order.value==="seq"){

   gameList = arr

   gameIndex = 0

syncGameState()

gameState.correct = 0

gameState.wrong = 0

gameState.streak = 0

   updateUI()
}

/* RANDOM (ya lo tienes bien) */
if(dom.order.value==="rand"){

let block = dom.block.value
   let today = getToday()

   if(!randomCycle[block] || randomCycle[block].date !== today){

      randomCycle[block] = {
         phase: "main",
         pending: shuffleArray(arr.map(w=>w.word)),
         errors: [],
         completed: false,
         date: today
      }
   }

   let cycle = randomCycle[block]

   if(cycle.phase === "main"){
      gameList = cycle.pending
         .map(word => arr.find(w => w.word === word))
         .filter(Boolean)
   }

   if(cycle.phase === "review"){
      gameList = cycle.errors
         .map(word => arr.find(w => w.word === word))
         .filter(Boolean)
   }

   gameIndex = 0

syncGameState()

gameState.correct = 0

gameState.wrong = 0

gameState.streak = 0

   saveCycle()
   updateUI()
}
}




