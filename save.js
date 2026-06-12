function ensureProgressData(){

   if(!playerData[currentAvatar].progress){

      playerData[currentAvatar].progress = {}
   }
}

function getProgressKey(){

   return currentAvatar + "_" + gameState.block
}

function saveBlockProgress(){

   if(!currentAvatar) return

   ensureProgressData()

   let key = getProgressKey()

   let cycle =
   randomCycle[gameState.block] || {}

   playerData[currentAvatar]
   .progress[key] = {

      index:gameIndex,

      phase:
      cycle.phase || "main",

      pending:
      cycle.pending || [],

      errors:
      cycle.errors || []
   }

   saveData()
}

function loadBlockProgress(){

   if(!currentAvatar) return

   ensureProgressData()

   let key = getProgressKey()

   let save =
   playerData[currentAvatar]
   .progress[key]

   if(!save) return

   gameIndex =
save.index || 0

syncGameState()

   // 🔥 RANDOM MODE
   let cycle =
   randomCycle[gameState.block]

   if(cycle){

      cycle.phase =
      save.phase || "main"

      cycle.pending =
      save.pending || []

      cycle.errors =
      save.errors || []
   }
}

function clearBlockProgress(){

   if(!currentAvatar) return

   ensureProgressData()

   let key = getProgressKey()

   delete
   playerData[currentAvatar]
   .progress[key]

   saveData()
}




