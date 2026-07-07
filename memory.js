/* =========================
🧠 MEMORY MATCH MODE
========================= */

let memoryCards=[]
let memoryFirst=null
let memoryLock=false

function shuffleArray(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

let temp=array[i]
array[i]=array[j]
array[j]=temp

}

return array
}

function renderMemoryMatch(){

el.gameArea.innerHTML=""

/* TIMER MEMORY MODE */

memoryTime=0

if(memoryTimer) clearInterval(memoryTimer)

let timerUI=document.createElement("div")
timerUI.id="memoryTimer"

timerUI.style.fontSize="22px"
timerUI.style.fontWeight="bold"
timerUI.style.color="#e74c3c"
timerUI.style.marginBottom="10px"

timerUI.innerText="⏱️ 0s"

gameArea.appendChild(timerUI)

memoryTimer=setInterval(()=>{

memoryTime++

timerUI.innerText="⏱️ "+memoryTime+"s"

},1000)

/* palabras con imagen */

let words=currentList.filter(w=>hasImage(w.word))

if(!currentList.length){
  el.gameArea.innerHTML="No words loaded"
   return
}

/* mezclar palabras */

words=shuffleArray(words)

let pairCount = parseInt(memoryDifficulty.value)

if(words.length < pairCount){
   el.gameArea.innerHTML="Not enough images for this difficulty"
   return
}

words=words.slice(0,pairCount)

let cards=[]

words.forEach(w=>{

cards.push({
type:"word",
word:w.word
})

cards.push({
type:"image",
word:w.word
})

})

cards=shuffleArray(cards)

memoryCards=cards

let grid=document.createElement("div")
grid.className="memoryGrid"

cards.forEach((c,i)=>{

let d=document.createElement("div")
d.className="memoryCard memoryHidden"

d.innerHTML=`
<div class="memoryInner">

<div class="memoryFront">?</div>

<div class="memoryBack"></div>

</div>
`
d.dataset.index=i

d.onclick=()=>memoryFlip(d,c)

d.style.animationDelay=(i*80)+"ms"

grid.appendChild(d)

})

let counter=document.createElement("div")
counter.id="memoryCounter"
counter.style.fontSize="20px"
counter.style.fontWeight="bold"
counter.style.marginBottom="10px"
counter.style.color="#2c3e50"
counter.innerText="Pairs: 0 / "+words.length

gameArea.appendChild(counter)
gameArea.appendChild(grid)
}

function memoryFlip(card,data){

if(card.classList.contains("flipped")) return

if(memoryLock) return

if(!card.classList.contains("memoryHidden")) return

card.classList.remove("memoryHidden")
card.classList.add("flipped")

let back = card.querySelector(".memoryBack")

if(data.type==="word"){

if(!back.innerHTML){
back.innerHTML =
`<span style="font-size:22px;font-weight:bold">${data.word}</span>`
}

}else{

if(back.innerHTML===""){
let img=document.createElement("img")
img.src=getImagePath(data.word)
back.appendChild(img)
}

}

/* PRIMERA CARTA */

if(!memoryFirst){

memoryFirst={card,data}
return

}

/* SEGUNDA CARTA */

memoryLock=true

let second={card,data}

setTimeout(()=>{

checkMemoryPair(memoryFirst,second)

memoryFirst=null
memoryLock=false

},700)

}

function checkMemoryPair(a,b){

if(a.data.word===b.data.word && a.data.type!==b.data.type){

a.card.classList.remove("memoryHidden")
b.card.classList.remove("memoryHidden")

a.card.classList.add("memoryMatch")
b.card.classList.add("memoryMatch")

speak(a.data.word)

createMatchParticles(a.card)
createMatchParticles(b.card)

showGIF("assets/gifs/sparkle.gif",800)

gameState.correct++

}else{

a.card.classList.remove("flipped")
b.card.classList.remove("flipped")

a.card.classList.add("memoryHidden")
b.card.classList.add("memoryHidden")

a.card.querySelector(".memoryBack").innerHTML=""
b.card.querySelector(".memoryBack").innerHTML=""
gameState.wrong++

}

updateUI()

let matchedCards=document.querySelectorAll(".memoryMatch").length/2

let totalPairs=memoryCards.length/2

let counter=document.getElementById("memoryCounter")

if(counter){
counter.innerText=`Pairs: ${matchedCards} / ${totalPairs}`
}

/* 🏆 TABLERO COMPLETADO */

let matched=document.querySelectorAll(".memoryMatch").length

if(matched===memoryCards.length){

clearInterval(memoryTimer)

/* BEST TIME SYSTEM */

let best = localStorage.getItem("memoryBestTime")

if(!best || memoryTime < best){

localStorage.setItem("memoryBestTime",memoryTime)

let record=document.createElement("div")
record.style.fontSize="18px"
record.style.color="#27ae60"
record.innerText="🏆 New Record: "+memoryTime+"s"

gameArea.appendChild(record)

}else{

let record=document.createElement("div")
record.style.fontSize="18px"
record.innerText="Best Time: "+best+"s"

gameArea.appendChild(record)

}

playSound("win")

speak("Great memory")

let msg=document.createElement("div")
msg.className="memoryWin"
msg.innerText="🧠 MEMORY MASTER!"

gameArea.appendChild(msg)

setTimeout(()=>{
msg.remove()
},2000)

}

}