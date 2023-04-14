import { useRouter } from "next/router";
import { Typography, useTheme, Box } from "@mui/material";
import {getConnectedAutomaton, getConnectedAutomatonMealy, getInitialPartitionMoore, getFinalPartition, getInitialPartitionMealy, mooreJoinPartitionWithTransitionsAndFinishStates} from "../utils/AutomatonMethods";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody
} from "@mui/material";
import MooreConnected from "../utils/MooreConnected";
import MealyConnected from "@/utils/MealyConnected";
import MooreMinimized from "@/utils/MooreMinimized";
import MealyMinimized from "../utils/MealyMinimized";

export default function MinimizeMachine({ connected, minimized }) {

  const router = useRouter();

  let newTransitions = connected.newTransitions
  let reachableStates = connected.reachableStates
  let newFinishStates = connected.newFinishStates


  let valuesConnectedTransitions = []
  connected.newTransitions.map(transition => {
    let values = Object.values(transition)
    valuesConnectedTransitions.push(values)
  })
  console.log(valuesConnectedTransitions.length)

  if (connected.type ===  'moore') {
    let minimizedValuesConnectedTransitions = []
    minimized.newMinimizedTransitions.map(transition => {
      let values = Object.values(transition)
      minimizedValuesConnectedTransitions.push(values)
    })
  }
  

  return (
    <>
    {connected.type === 'moore' ? <MooreConnected newTransitions={newTransitions} reachableStates={reachableStates} newFinishStates={newFinishStates}  valuesConnectedTransitions={valuesConnectedTransitions}/>
    :
    <MealyConnected newTransitions={newTransitions} reachableStates={reachableStates} newFinishStates={newFinishStates} />
    }
    {
      connected.type === 'moore' ? <MooreMinimized newMinimizedTransitions={minimized.newMinimizedTransitions} minimizedStates={minimized.minimizedStates} minimizedFinishStates={minimized.minimizedFinishStates} minimizedValuesConnectedTransitions={minimizedValuesConnectedTransitions}/>
      :
      <MealyMinimized newTransitions={newTransitions} reachableStates={reachableStates} newFinishStates={newFinishStates}/>
    }
    
    </>
  );
}

MinimizeMachine.getInitialProps = async ({ query }) => {
  //const router = useRouter();
  const {
    type,
    transitions: serializedTransitions,
    finishStatesFinal: serializedFinishStatesFinal,
    finishStates,
    states,
  } = query;
  //console.log(transitions)
  console.log(serializedTransitions);
  let transitions = serializedTransitions.map((str) => JSON.parse(str));
  console.log("Heeere transitions")
  console.log(transitions);

  try {
    if (type === 'moore') {
        let { newTransitions, reachableStates, newFinishStates } = getConnectedAutomaton(
          transitions,
          states,
          finishStates
        );
        //newTransitions = newTransitions.map(str => JSON.parse(str))
    
        console.dir("New transitions"); 
        console.dir(newTransitions);
        console.dir("Reachable States");
        console.dir([...reachableStates]);
        console.log(newFinishStates)
        reachableStates = [...reachableStates]
        // console.log("New Transitions\n" + JSON.stringify(newTransitions))
        // console.log("Reachable States\n" + JSON.stringify(Array.from(reachableStates)))
        

        // Initial partition for moore
        let p1 = getInitialPartitionMoore(reachableStates, newFinishStates)
        console.log("Initial Moore Partition:")
        console.log(p1)

        // let p2 = getNextPartition(p1, newTransitions)
        // console.log("SECOND PARTITION!!!")
        // console.log(p2)

        // let p3 = getNextPartition(p1, newTransitions)
        // console.log("THIRD PARTITION!!!")
        // console.log(p3)
        let finalPartition = getFinalPartition(p1, newTransitions)
        console.log("FINAL PARTITIONN!!")
        console.log(finalPartition)

        let {minimizedStates, newMinimizedTransitions, minimizedFinishStates} = mooreJoinPartitionWithTransitionsAndFinishStates(finalPartition, {...newFinishStates}, reachableStates, newTransitions)

        return { connected: { type, newTransitions, reachableStates, newFinishStates }, minimized: {minimizedStates, newMinimizedTransitions, minimizedFinishStates} };
    } else {
      let finishStatesFinal = serializedFinishStatesFinal.map((str) => JSON.parse(str))
        let {newTransitions, reachableStates, newFinishStates} = getConnectedAutomatonMealy(transitions, states, finishStatesFinal)
        console.dir("New transitions 2");
        console.dir(newTransitions);
        console.dir("Reachable States");
        console.dir([...reachableStates]);
        reachableStates = [...reachableStates]

        let p1 = getInitialPartitionMealy(reachableStates, newFinishStates)

        let finalPartition = getFinalPartition(p1, newTransitions)
        console.log("MEALY FINAL PARTITIOOON")
        console.log(finalPartition)

        // console.log("New Transitions\n" + JSON.stringify(newTransitions))
        // console.log("Reachable States\n" + JSON.stringify(Array.from(reachableStates)))
        return { connected: { type, newTransitions, reachableStates, newFinishStates }, minimized: {} };
    }   
  } catch (err) {
    console.error(err);
  }
};
