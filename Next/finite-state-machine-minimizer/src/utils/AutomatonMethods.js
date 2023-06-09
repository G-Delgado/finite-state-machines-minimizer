export function getConnectedAutomaton(
  transitions,
  initialStates,
  finishStates
) {
  // Define the variables we'll be using
  let allStates = new Set(initialStates);
  let statesQueue = initialStates.slice();
  let reachableStates = new Set(statesQueue[0]);
  let finishStatesQueue = finishStates.slice();
  //let newFinishStates = [finishStatesQueue[0]];
  let newFinishStates = []

  let newFinishDict = {}
  for (let i = 0; i < initialStates.length; i++) {
    newFinishDict[initialStates[i]] = finishStates[i]
  }

  while (statesQueue.length > 0) {  
    let actualState = statesQueue.shift();
    let actualFinishState = finishStatesQueue.shift();

    for (let i = 0; i < transitions.length; i++) {
      let nextState = transitions[i][actualState];

      if (
        nextState &&
        allStates.has(nextState) &&
        reachableStates.has(actualState) &&
        !reachableStates.has(nextState)
      ) {
        reachableStates.add(nextState);
        //newFinishStates.push(finishStates[initialStates.indexOf(nextState)]);
      }
    }
  }

  for (let key in newFinishDict) {
    if (reachableStates.has(key)) {
      newFinishStates.push(newFinishDict[key])
    }
  }

  // A:0 , B:0, C:1, D:1, E:1, F:0
  // A? 0
  // B? 0
  // C? 1
  // D? 1
  // E? 1
  // F  0
  
  // A C B 0 -> A,C,B (0,1,0)
  // B C D 0 -> A,C,B,D (0,1,0,1)
  // C F E 1 -> A,C,B,D,F,E (0,1,0,1,0,1)
  // D F E 1  X
  // E F E 1  X
  // F F F 9  X

  // Filter transitions for reachableStates only

  let newTransitions = [];

  for (let i = 0; i < transitions.length; i++) {
    let currentTransition = transitions[i];
    let newTransition = {};

    for (let key in currentTransition) {
      if (reachableStates.has(key)) {
        newTransition[key] = currentTransition[key];
      }
    }
    console.log(newTransition)

    newTransitions.push(newTransition);
  }

  return { newTransitions, reachableStates, newFinishStates };
}

export function getConnectedAutomatonMealy(
  transitions,
  initialStates,
  finishStates
) {
  // Define the variables we'll be using
  let allStates = new Set(initialStates);
  let statesQueue = initialStates.slice();
  let reachableStates = new Set(statesQueue[0]);

  while (statesQueue.length > 0) {
    let actualState = statesQueue.shift();

    for (let i = 0; i < transitions.length; i++) {
      let nextState = transitions[i][actualState];

      if (
        nextState &&
        allStates.has(nextState) &&
        reachableStates.has(actualState) &&
        !reachableStates.has(nextState)
      ) {
        reachableStates.add(nextState);
      }
    }
  }

  // Filter transitions for reachableStates only

  console.log("Test on transitions");
  console.log(transitions);
  console.log("Reachable States");
  console.log(reachableStates);

  let newTransitions = [];
  let newFinishStates = [];

  for (let i = 0; i < transitions.length; i++) {
    let currentTransition = transitions[i];
    let currentFinishState = finishStates[i];
    let newTransition = {};
    let newFinishState = {};


    console.log("Transición pruebaaa")
    console.log(currentTransition)

    for (let inputKey in currentTransition) {
      if (reachableStates.has(inputKey)) {
        console.log("Current");
        console.log(currentTransition[inputKey]);
        let presentValue = currentTransition[inputKey];
        newTransition[inputKey] = presentValue

        console.log("Checking again!");
        console.log(newTransition);
        console.log(newTransition[inputKey]);
      }
    }
    console.log("Adding: ");
    console.log(newTransition);
    newTransitions.push(newTransition);

    for (let inputKey in currentFinishState) {
      if (reachableStates.has(inputKey)) {
        newFinishState[inputKey] = currentFinishState[inputKey];
      }
    }

    newFinishStates.push(newFinishState);
  }

  reachableStates = new Set([...reachableStates].sort())

  return { newTransitions, reachableStates, newFinishStates };
}

export function getInitialPartitionMoore(states, finishStates) {
  console.log("These are the states:")
  console.log(states)
  console.log("These are its finish values:")
  console.log(finishStates)
  let partition = {}
  let finishStatesUnique = new Set(finishStates)

  console.log(finishStatesUnique)

  // for (let i = 0; i < finishStatesUnique.size; i++) {
  //   partition[finishStatesUnique[i]] = []
  // }
  // {0: [], 1:[]}
  for (let finishState of finishStatesUnique) {
    partition[finishState] = []
  }

  console.log("The partition before:")
  console.log(partition)

  for (let i = 0; i < states.length; i++) {
    partition[finishStates[i]].push(states[i])
  }
  console.log("The partition:")
  console.log(partition)

  let p1 = []
  for (let val in partition) {
    p1.push(partition[val])
  }


  return p1
}

export function getInitialPartitionMealy(states, exitStates) {
  let partition = []
  let noPartition = [...states]

  for (let i = 0; i < noPartition.length; i++) {

    let actualState = noPartition[i]
    let tempGroup = partition.find(group => group.includes(actualState))
    console.log(`${tempGroup} es el valor para ${actualState}`)
    console.log("Aquí es:")
    console.log(`${actualState}`)
    if (tempGroup === undefined) {
      partition.push([actualState])
      for (let j = i+1; j < noPartition.length; j++ ){
        let nextState = noPartition[j]
        let sameGroup = true
        for (let k = 0; k < exitStates.length && sameGroup; k++) {
  
          let actualExitState = exitStates[k]
          console.log("Estado 1:")
          console.log(actualState)
          console.log("Estado 2")
          console.log(nextState)
          console.log(`Values: ${actualExitState[actualState]}-${actualExitState[nextState]}`)
          if (actualExitState[actualState] != actualExitState[nextState]) {
            sameGroup = false
          }
        }
        if (sameGroup) {
          let tempGroup = partition.find(group => group.includes(actualState))

          console.log("Grupo Encontrado")
          console.log(tempGroup)
          if (tempGroup === undefined) {
            partition.push([nextState])
          } else {
            tempGroup.push(nextState)
          }
        }
      }
      
    }
  }
  console.log("Partición Inicial de Mealy:")
  console.log(partition)
  return partition
}

function getNextPartition(actualPartition, transitions) {
  let newPartition = []
  for (let i = 0; i < actualPartition.length; i++) {

    let actualGroup = actualPartition[i]
    if (actualGroup.length > 1) {
      let newGroups = []

      for (let j = 0; j < actualGroup.length; j++) {
        console.log(`Iteración ${j}////////////`)
        let actualState = actualGroup[j]
        let tempGroup = newGroups.find(group => group.includes(actualState))
        console.log(`El grupo al que pertenece es ${tempGroup}`)
        console.log(`ITERACIÓN ${i} PARA NEW GROUPS`)
        console.log(newGroups)

        if (tempGroup == undefined) {
          newGroups.push([actualState])
          console.log(`Grupos actuales: ${newGroups}`)
          console.log(newGroups)
          console.log("Tumama")
          console.log([newGroups])

          for (let k = j + 1; k < actualGroup.length; k++) {

            if (k != j) {
              //let actualState = actualGroup[j]
              let nextState = actualGroup[k]
              let sameGroup = true
              for (let l = 0; l < transitions.length && sameGroup; l++) {

                let actualTransition = transitions[l]
                if (!checkIfInTheSameGroup(actualTransition[actualState], actualTransition[nextState], actualPartition)) {
                  console.log("Group Checking!")
                  console.log(actualState)
                  console.log(nextState)
                  sameGroup = false
                  //newGroups.push([nextState])
                }
              }
              if (sameGroup) {
                let tempGroup = newGroups.find(group => group.includes(actualState))
                if (tempGroup == undefined) {
                  newGroups.push([nextState])
                } else {
                  tempGroup.push(nextState)
                }
              }
            }
          }
        }
      }
      for (let j = 0; j < newGroups.length; j++) {
        newPartition.push(newGroups[j])
      }
    } else {
      newPartition.push(actualPartition[i])
    }
  }
  return newPartition
}

const checkIfInTheSameGroup = (state1, state2, groups) => {
  let inTheSameGroup = false
  for (let i = 0; i < groups.length && !inTheSameGroup; i++) {
    let arr = groups[i]
    if (arr.includes(state1) && arr.includes(state2)) {
      inTheSameGroup = true
    }
  }

  return inTheSameGroup
}

export function getFinalPartition(initialPartition, transitions) {
  let nextPartition = getNextPartition(initialPartition, transitions)
  let prevPartition = null
  //let maxTimes = 0
  while (JSON.stringify(nextPartition) != JSON.stringify(prevPartition)/* && maxTimes < 10*/) {
    prevPartition = nextPartition
    nextPartition = getNextPartition(prevPartition, transitions)
    //maxTimes++
  }
  return nextPartition
}

export function mooreJoinPartitionWithTransitionsAndFinishStates(finalPartition, finishStates, states, transitions) {
  // Transform the finalPartition to join the states into one. ie. [['CF'],['B','D']] -> ['CF','BD']
  let minimizedStates = []
  for (let i = 0; i < finalPartition.length; i++) {
    let actualState = finalPartition[i].join('')
    minimizedStates.push(actualState)
  }

  // Transform the transitions
  let newMinimizedTransitions = []
  for (let i = 0; i < transitions.length; i++) {
    let transition = transitions[i];
    newMinimizedTransitions.push({})
    for (let key in transition) {
      let value = transition[key];
      let minimizedValue = '';
      let minimizedKey = '';
      for (let j = 0; j < minimizedStates.length; j++) {
        if (minimizedStates[j].includes(value)) {
          minimizedValue = minimizedStates[j];
        }
        if (minimizedStates[j].includes(key)) {
          minimizedKey = minimizedStates[j]
        }
      }
      newMinimizedTransitions[i][minimizedKey] = minimizedValue
    }
  }


  // Assign the finishStates
  // ['A','B','C','D','E','F','G','H','I','J','K']
  // [0,0,0,0,0,0,0,0,1,0,1]
  // ['A','BD','CF','EH','GJ','IK']
  let minimizedFinishStates = []
  for (let i = 0; i < minimizedStates.length; i++) {
    let actualMinimizedState = minimizedStates[i]
    let actualMinimizedFinishedState = returnFinishStateOfMinimizedState(actualMinimizedState, finishStates, states)
    minimizedFinishStates.push(actualMinimizedFinishedState)
  }
  
  console.log("Estados minimizados:")
  console.log(minimizedStates)

  console.log("Nuevas transiciones:")
  console.log(newMinimizedTransitions)

  console.log("Nuevos estados finanles:")
  console.log(minimizedFinishStates)

  return {minimizedStates, newMinimizedTransitions, minimizedFinishStates}
}

export function mealyJoinPartitionWithTransitionsAndExitStates(finalPartition, finishStates, states, transitions) {
  // Transform the finalPartition to join the states into one. ie. [['CF'],['B','D']] -> ['CF','BD']
  let minimizedStates = []
  for (let i = 0; i < finalPartition.length; i++) {
    let actualState = finalPartition[i].join('')
    minimizedStates.push(actualState)
  }

  // Transform the transitions
  let newMinimizedTransitions = []
  for (let i = 0; i < transitions.length; i++) {
    let transition = transitions[i];
    newMinimizedTransitions.push({})
    for (let key in transition) {
      let value = transition[key];
      let minimizedValue = '';
      let minimizedKey = '';
      for (let j = 0; j < minimizedStates.length; j++) {
        if (minimizedStates[j].includes(value)) {
          minimizedValue = minimizedStates[j];
        }
        if (minimizedStates[j].includes(key)) {
          minimizedKey = minimizedStates[j]
        }
      }
      newMinimizedTransitions[i][minimizedKey] = minimizedValue
    }
  }


  // Assign the finishStates
  // ['A','B','C','D','E','F','G']
  /* [
    {"A":0, "B":1, "C":0, "D":1, "E":1, "F":0, "G":1},
    {"A":0, "B":1, "C":0, "D":1,"E":1,"F":0,"G":1}
]*/
  // ['A','F,'C','BD','EG']
  console.log("Los estados finales")
  console.log(finishStates)
  let minimizedFinishStates = []
  for (let i = 0; i < finishStates.length; i++) {
    let finishState = finishStates[i];
    minimizedFinishStates.push({})
    for (let key in finishState) {
      let value = finishState[key];
      let minimizedValue = '';
      let minimizedKey = '';
      for (let j = 0; j < minimizedStates.length; j++) {
        if (minimizedStates[j].includes(value)) {
          minimizedValue = minimizedStates[j];
        }
        if (minimizedStates[j].includes(key)) {
          minimizedKey = minimizedStates[j]
        }
      }
      minimizedFinishStates[i][minimizedKey] = value
    }
  }
  
  console.log("Estados minimizados:")
  console.log(minimizedStates)

  console.log("Nuevas transiciones:")
  console.log(newMinimizedTransitions)

  console.log("Nuevos estados finanles:")
  console.log(minimizedFinishStates)

  return {minimizedStates, newMinimizedTransitions, minimizedFinishStates}
}

const returnFinishStateOfMinimizedState = (minimizedState, finishStates, states) => {
  let foundFinishState = false
  let finishState = ""
  for (let i = 0; i  < states.length && !foundFinishState; i++) {
    let actualState = states[i]
    if (minimizedState.includes(actualState)) {
      finishState = finishStates[i]
      foundFinishState = true
    }
  }

  return finishState
} 

