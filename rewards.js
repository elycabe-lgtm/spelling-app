console.log("rewards.js cargado")

// =========================
// 🏆 RANKING + REWARDS
// =========================


function updateRankingUI(){

   if(!rankingUI) return

   let player = playerData[currentAvatar]

   if(!player) return

   let ranking = player.ranking || {}

   rankingUI.innerHTML = `
      🏆 Best: ${ranking.bestStreak || 0}
      <br>
      ✔ Correct: ${ranking.totalCorrect || 0}
      <br>
      ❌ Wrong: ${ranking.totalWrong || 0}
      <br>
      🎁 Chests: ${player.chests || 0}
   `
}


// =========================
// 🎁 GIVE CHEST
// =========================

function giveChest(amount = 1){

   if(!playerData[currentAvatar]
   .chests){

      playerData[currentAvatar]
      .chests = 0
   }

   playerData[currentAvatar]
   .chests += amount

   updateRankingUI()

   saveData()

   safePlay("level")

   // ✨ mini popup
   let msg =
   document.createElement("div")

   msg.innerHTML =
   `🎁 +${amount} CHEST`

   msg.style.position =
   "fixed"

   msg.style.top = "50%"

   msg.style.left = "50%"

   msg.style.transform =
   "translate(-50%,-50%)"

   msg.style.background =
   "linear-gradient(145deg,#ffe066,#ffd43b)"

   msg.style.padding =
   "18px 28px"

   msg.style.borderRadius =
   "20px"

   msg.style.fontSize =
   "28px"

   msg.style.fontWeight =
   "900"

   msg.style.zIndex =
   "999999"

   msg.style.boxShadow =
   "0 10px 30px rgba(0,0,0,0.25)"

   document.body.appendChild(msg)

   msg.animate([
      {
         transform:
         "translate(-50%,-50%) scale(0.5)",

         opacity:0
      },

      {
         transform:
         "translate(-50%,-50%) scale(1.1)",

         opacity:1
      },

      {
         transform:
         "translate(-50%,-50%) scale(1)",

         opacity:1
      }

   ],{
      duration:600
   })

   setTimeout(()=>{
      msg.remove()
   },1400)
}


function showChestReward(){

 let rewards = [

   // ⚪ COMMON
   {
      rarity:"COMMON",

      color:"#b2bec3",

      text:"❤️ +1 Life",

      action:()=>{

         lives++

         playerData[currentAvatar].lives = lives
      }
   },

   // 🔵 RARE
   {
      rarity:"RARE",

      color:"#74b9ff",

      text:"🛡️ +1 Shield",

      action:()=>{

         shield++

         playerData[currentAvatar].shield = shield
      }
   },

   // 🟣 EPIC
   {
      rarity:"EPIC",

      color:"#a29bfe",

      text:"⭐ +100 XP",

      action:()=>{

   playerData[currentAvatar].xp += 100
}
   },

   // 🟡 LEGENDARY
   {
      rarity:"LEGENDARY",

      color:"#fdcb6e",

      text:"👑 JACKPOT +3 Lives +150 XP",

      action:()=>{

   lives += 3

   playerData[currentAvatar].lives = lives

   playerData[currentAvatar].xp += 150
}
   }
]

// 🎲 weighted rarity
let roll = Math.random() * 100

let reward

if(roll <= 55){

   reward = rewards[0]

}else if(roll <= 83){

   reward = rewards[1]

}else if(roll <= 95){

   reward = rewards[2]

}else{

   reward = rewards[3]
}   


reward.action()

saveData()

updateLivesUI()

updateRankingUI()

if(reward.rarity ===
"LEGENDARY"){

   showConfettiExplosion()

   safePlay("level")
}

   safePlay("level")

   magicSuccessFX()

   setTimeout(()=>{

let overlay =
document.createElement("div")

overlay.className =
"chestOverlay"

overlay.innerHTML = `

<div class="chestAnimation">

<img src="
assets/gifs/Tesoro GIF by Veopositivo.gif
">

</div>

`

document.body.appendChild(
overlay
)


let popup = document.createElement("div")

popup.className = "chestPopup"

popup.style.boxShadow =
`0 0 40px ${reward.color}`

popup.style.border =
`4px solid ${reward.color}`


popup.innerHTML = `

<div style="
font-size:18px;
font-weight:900;
letter-spacing:2px;
margin-bottom:10px;
color:${reward.color};
">

${reward.rarity}

</div>

<h2 style="
font-size:52px;
margin:0;
">
🎁
</h2>

<div style="
font-size:28px;
font-weight:900;
margin-top:12px;
line-height:1.2;
color:#2d3436;
">

${reward.text}

</div>

`

setTimeout(()=>{

   
   document.body.appendChild(
      popup
   )

setTimeout(()=>{

   popup.remove()

   overlay.remove()

},4500)

if(reward.rarity ===
"EPIC"){

   popup.animate([

      {
         transform:"scale(1)"
      },

      {
         transform:"scale(1.06)"
      },

      {
         transform:"scale(1)"
      }

   ],{

      duration:700,

      iterations:2
   })
}


},150)

},50)

}



function updateStats(isCorrect){

   let r = playerData[currentAvatar].ranking

if(!r){
   r = {
      bestStreak:0,
      worstStreak:0,
      totalCorrect:0,
      totalWrong:0
   }

   playerData[currentAvatar].ranking = r   // 🔥 CLAVE
}

   if(isCorrect){
      r.totalCorrect++

if(gameState.streak > r.bestStreak){
   r.bestStreak = gameState.streak
}
      r.worstStreak = 0

   }else{

      r.totalWrong++
      r.worstStreak++
   }

   updateRankingUI()
   saveData()
}




