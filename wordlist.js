console.log("wordlist.js cargado")

function renderWordList(){

   let container =
   document.getElementById(
      "wordList"
   )

   if(!container) return

   container.innerHTML = ""

   if(!wordListData.length) return

   wordListData.forEach(w=>{

      let item =
      document.createElement("div")

      item.className = "column"

      item.innerHTML = `
         ${w.num}. ${w.word}
      `

      container.appendChild(item)
   })
}


listSelector.onchange=()=>{

if(listSelector.value==="none"){
wordList.innerHTML=""
return
}

let arr=window.blocksData[listSelector.value]

let perCol=15
let cols=[]

for(let i=0;i<arr.length;i+=perCol){
cols.push(arr.slice(i,i+perCol))
}

wordList.innerHTML=cols.map(col=>`
   <div class="column">
   ${col.map(w=>`
   <div onclick="selectWord('${w.word}'); speak('${w.word}')">
   ${w.num}. ${w.word}
   </div>
   `).join("")}
   </div>
   `).join("")

}