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
  let newFinishStates = [finishStatesQueue[0]];

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
        newFinishStates.push(finishStates[initialStates.indexOf(nextState)]);
      }
    }
  }

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
