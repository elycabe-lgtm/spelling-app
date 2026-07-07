// =========================
// 🧠 RANDOM PROGRESS SYSTEM
// =========================

let randomProgress = JSON.parse(
   localStorage.getItem("randomProgress") || "{}"
)

randomCycle = JSON.parse(
   localStorage.getItem("randomCycle") || "{}"
)
let saveTimeout

function saveCycle(){

   clearTimeout(saveTimeout)

   saveTimeout = setTimeout(()=>{
      localStorage.setItem("randomCycle", JSON.stringify(randomCycle))
   },300)
}

let today = new Date().toDateString()

let lastDay = localStorage.getItem("lastDay")

function getToday(){
   return new Date().toDateString()
}

let levelPlayed={
50:false,
100:false,
150:false,
200:false
}


