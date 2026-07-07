let isWriting = false

function showWriting(){

   if(isWriting) return

   isWriting = true

   el.typingInput.style.borderColor = "#6c5ce7"
   el.typingInput.style.boxShadow = "0 0 12px rgba(108,92,231,0.6)"

   el.letterFeedback.innerHTML = `<span style="opacity:0.6">✏️ escribiendo...</span>`
}

function stopWriting(){

   isWriting = false

   el.typingInput.style.borderColor = "#ccc"
   el.typingInput.style.boxShadow = "none"
   el.letterFeedback.innerHTML = ""
}


function updateFeedback(){

   let w = getCurrentWord()

   if(!w) return

   let correctWord = w.word
   let typed = el.typingInput.value

   let html = ""

   for(let i = 0; i < typed.length && i < correctWord.length; i++){

      if(typed[i] === correctWord[i]){

         html += `<span class="correctLetter">${correctWord[i]}</span>`

      }else{

         html += `<span class="wrongLetter">${typed[i]}</span>`
      }
   }

   el.letterFeedback.innerHTML = html
}

function flashError(letter){
      let span = document.createElement("span")
      span.className = "wrongLetter"
      span.innerText = letter
      el.letterFeedback.appendChild(span)

      setTimeout(()=>{
         span.remove()
      },300)
   }

