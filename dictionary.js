console.log("dictionary.js cargado")

const dictInput = document.getElementById("dictInput")
const autocomplete = document.getElementById("autocomplete")
const dictResult = document.getElementById("dictResult")


dictInput.oninput=()=>{

let v=dictInput.value.toLowerCase().trim()

if(!v){
autocomplete.innerHTML=""
return
}

let mastery = getMastery()
let mistakes = getMistakes()

let matches = wordDB
   .filter(w => w.word.toLowerCase().includes(v))
   .sort((a,b)=>{

      // 🔥 errores primero
      let aMistake = mistakes.includes(a.word) ? 1 : 0
      let bMistake = mistakes.includes(b.word) ? 1 : 0

      if(aMistake !== bMistake) return bMistake - aMistake

      // 🧠 dificultad después
      let aScore = mastery[a.word]?.score || 0
      let bScore = mastery[b.word]?.score || 0

      return aScore - bScore
   })
   .map(w => w.word)
   .slice(0,6)

   autocomplete.innerHTML = matches.map(w=>`
   <div class="autoItem" data-word="${w}">
      ${w}
   </div>
   `).join("")

   // 👇 ESTE BLOQUE VA AQUÍ
   document.querySelectorAll(".autoItem").forEach(el=>{
      el.onclick = () => {
         selectWord(el.dataset.word)
      }
   })

} 

dictInput.addEventListener("keydown",e=>{
if(e.key==="Enter"){
selectWord(dictInput.value)
}
})

function searchWord(v){

   let w = wordDB.find(x => x.word.toLowerCase() === v.toLowerCase())

   if(!w) return

   let path = hasImage(w.word) ? getImagePath(w.word) : ""

   dictResult.innerHTML = `
   <div class="dictCard">

      <img class="dictImage"
     src="${path}"
     style="${path ? '' : 'display:none'}"
     onerror="this.style.display='none'">

      <div class="dictWord">${w.word}</div>
      <div class="dictPhon">/${w.phon || ""}/</div>

      <div class="label def" id="btnDef">🔊 Definition</div>
      <div>${w.def || ""}</div>

      <div class="label mean" id="btnMean">🔊 Meaning</div>
      <div>${w.mean || ""}</div>

      <div class="label sent" id="btnSent">🔊 Sentence</div>
      <div>${w.sent || ""}</div>
 </div>
`

let card = document.querySelector(".dictCard")

if(card){
   card.classList.remove("cardAnim")
void card.offsetWidth
card.classList.add("cardAnim")
}

   let btnDef = document.getElementById("btnDef")
   let btnMean = document.getElementById("btnMean")
   let btnSent = document.getElementById("btnSent")

   if(btnDef){
   btnDef.onclick = (e) => {
      e.stopPropagation()
      speechSynthesis.cancel()
      animateSpeak(btnDef)

      // ✨ animar palabra
      let dictWord = document.querySelector(".dictWord")
      if(dictWord){
         dictWord.classList.add("wordSpeaking")
         setTimeout(()=>dictWord.classList.remove("wordSpeaking"),1200)
      }

      speak(w.def, 0.75)
   }
}

   if(btnMean){
   btnMean.onclick = (e) => {
      e.stopPropagation()
      speechSynthesis.cancel()
      animateSpeak(btnMean)

      let dictWord = document.querySelector(".dictWord")
      if(dictWord){
         dictWord.classList.add("wordSpeaking")
         setTimeout(()=>dictWord.classList.remove("wordSpeaking"),500)
      }

      speakSpanishFemale(w.mean)
   }
}

   if(btnSent){
   btnSent.onclick = (e) => {
      e.stopPropagation()
      speechSynthesis.cancel()
      animateSpeak(btnSent)

      let dictWord = document.querySelector(".dictWord")
      if(dictWord){
         dictWord.classList.add("wordSpeaking")
         setTimeout(()=>dictWord.classList.remove("wordSpeaking"),500)
      }

      speak(w.sent, 0.75)
   }
}

   let dictWord = document.querySelector(".dictWord")

if(dictWord){

   // 🔊 limpiar audio previo
   speechSynthesis.cancel()

   // ✨ animación
   dictWord.classList.add("wordSpeaking")

   // 🔊 reproducir palabra UNA VEZ
   speak(w.word)

   setTimeout(()=>{
      dictWord.classList.remove("wordSpeaking")
   }, 500)
}}

// 👇 SOLO UNA VEZ
function selectWord(word){

   if(!word) return

   dictInput.value = word
   autocomplete.innerHTML = ""

   searchWord(word)
}


/* CLEAR */
function clearDictionary(){
dictInput.value=""
autocomplete.innerHTML=""
dictResult.innerHTML=""
}

// =========================
// ✨ ANIMATE SPEAKING BUTTON
// =========================

function animateSpeak(el){

   if(!el) return

   el.classList.add("active")

   setTimeout(()=>{
      el.classList.remove("active")
   }, 1200)
}

speechSynthesis.onvoiceschanged = () => {}


window.addEventListener(

   "beforeunload",

   ()=>{

      saveBlockProgress()
   }
)
