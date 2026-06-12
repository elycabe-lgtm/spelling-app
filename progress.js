console.log("progress.js cargado")

function getMistakes(){
return playerData[currentAvatar].mistakes
}

function getMastery(){
return playerData[currentAvatar].mastery
}

function getDifficulty(word){

let data = getMastery()[word] || {score:0}

if(!data) return "hard"

if(data.score >= 7) return "easy"
if(data.score >= 3) return "medium"

return "hard"
}

function updateMastery(word, correctAnswer){

   let mastery = getMastery()

   if(!mastery[word]){
      mastery[word] = {
         score: 0,
         streak: 0,
         fails: 0,
         lastSeen: Date.now(),
         nextReview: Date.now()
      }
   }

   let data = mastery[word]

   // ✅ RESPUESTA CORRECTA
   if(correctAnswer){

      data.score += 2
      data.streak++
      data.fails = 0

// 🏆 DOMINIO (3 aciertos consecutivos)
if(data.streak >= 3){
   data.mastered = true
}

   }else{

      data.score -= 1
      data.streak = 0
      data.fails++
   }

   // 🔒 límites
   data.score = Math.max(0, Math.min(10, data.score))

   // =========================
   // 🧠 SRS (AQUÍ DEBE IR)
   // =========================

   let now = Date.now()

   let interval = 0

   if(data.score >= 8){
      interval = 1000 * 60 * 60 * 24 * 3
   }
   else if(data.score >= 5){
      interval = 1000 * 60 * 60 * 12
   }
   else if(data.score >= 3){
      interval = 1000 * 60 * 30
   }
   else{
      interval = 1000 * 60 * 2
   }

   data.lastSeen = now
   data.nextReview = now + interval

   saveData()
}

// 🧩 FILL GAP HELPER
function hideLetters(word){

   if(!word || typeof word !== "string"){
      console.error("🚨 hideLetters recibió:", word)
      return ""
   }

   const vowels = "aeiouAEIOU"
   let arr = word.split("")

   let mistakes = getMistakes()
   let difficulty = Math.min(0.8, 0.4 + (mistakes.length * 0.07))

   let hiddenIndexes = []

   // vocales
   for(let i=0;i<arr.length;i++){
      if(vowels.includes(arr[i]) && Math.random() < difficulty){
         hiddenIndexes.push(i)
      }
   }

   // asegurar al menos 1
   if(hiddenIndexes.length === 0){
      let possible = arr
         .map((l,i)=> l !== " " ? i : null)
         .filter(i=>i!==null)

      let randomIndex = possible[Math.floor(Math.random()*possible.length)]
      hiddenIndexes.push(randomIndex)
   }

   // extra dificultad
   for(let i=0;i<arr.length;i++){
      if(!hiddenIndexes.includes(i) && Math.random() < difficulty*0.5){
         if(arr[i] !== " ") hiddenIndexes.push(i)
      }
   }

   // 🚨 FIX CLAVE
   if(hiddenIndexes.length >= arr.length){
      hiddenIndexes = hiddenIndexes.slice(0, arr.length-1)
   }

   return arr.map((l,i)=> hiddenIndexes.includes(i) ? "_" : l).join("")
}

function validatePlayerData(){

  ["eithan","ian"].forEach(p=>{

   if(!playerData[p]){
      playerData[p] = {}
   }

   if(!playerData[p].mistakes){
      playerData[p].mistakes = []
   }

   if(!playerData[p].mastery){
      playerData[p].mastery = {}
   }

   if(!playerData[p].ranking){
      playerData[p].ranking = {
         bestStreak:0,
         worstStreak:0,
         totalCorrect:0,
         totalWrong:0
      }
   }

   // 🔥 AQUÍ VA (FUERA)
   if(playerData[p].lives === undefined){
      playerData[p].lives = 5
   }

   if(playerData[p].shield === undefined){
      playerData[p].shield = 0
   }

if(playerData[p].xp === undefined){
   playerData[p].xp = 0
}

if(playerData[p].level === undefined){
   playerData[p].level = 1
}

if(playerData[p].chests === undefined){
   playerData[p].chests = 0
}

if(playerData[p].musicEnabled === undefined){

   playerData[p].musicEnabled = true
}


})

}
