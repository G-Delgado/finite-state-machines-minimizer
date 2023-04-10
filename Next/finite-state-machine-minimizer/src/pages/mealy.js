import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";


export default function Mealy() {
  const router = useRouter();
  let { machineType, entrySymbols, exitSymbols, numStates } = router.query;
  // entrySymbols = "0,1";
  // exitSymbols = "0,1";
  // numStates = 3;
  const theme = useTheme()

  const [states, setStates] = useState([]);

  const [selectedInputValues, setSelectedInputValues] = useState(
    Array(entrySymbols.split(",").length).fill(
      Object.fromEntries([...Array(entrySymbols.split(",").length)].map((_, i) => [`input${i}`, ""]))
    )
  );
  // const [selectedFinishStates, setSelectedFinishStates] = useState(
  //   Array(numStates).fill("")
  // );
  const [selectedFinishStates, setSelectedFinishStates] = useState(
    Array(entrySymbols.split(",").length).fill(
      Object.fromEntries([...Array(entrySymbols.split(",").length)].map((_, i) => [`input${i}`, ""]))
    )
  );
  
  entrySymbols = entrySymbols.split(",");
  //console.log(entrySymbols.length)
  let numEntrySymbols = entrySymbols.length;
  exitSymbols = exitSymbols.split(",");

  useEffect(() => {
    const statesArray = Array.from({ length: parseInt(numStates) }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // generate an array of state labels from A to numStates
  setStates(statesArray)
  }, [])

  // const handleChange = (event, rowIndex) => {
  //   const newSelectedFinishStates = [...selectedFinishStates];
  //   newSelectedFinishStates[rowIndex] = event.target.value;
  //   setSelectedFinishStates(newSelectedFinishStates);
  // };
  const handleChange = (event, rowIndex, colIndex) => {
    const newSelectedFinishStates = [...selectedFinishStates];
    newSelectedFinishStates[rowIndex] = {
      ...newSelectedFinishStates[rowIndex],
      [`input${colIndex}`]: event.target.value
    };
    setSelectedFinishStates(newSelectedFinishStates);
  };

  const handleInputChange = (event, rowIndex, colIndex) => {
    const newSelectedInputValues = [...selectedInputValues];
    newSelectedInputValues[rowIndex] = {
      ...newSelectedInputValues[rowIndex],
      [`input${colIndex}`]: event.target.value
    };
    setSelectedInputValues(newSelectedInputValues);
  };

  const printStuff = () => {
    console.log(selectedInputValues)
    console.log(selectedFinishStates)

    let inputValues = JSON.parse(JSON.stringify(selectedInputValues))
    let finishStates = JSON.parse(JSON.stringify(selectedFinishStates))

    let outputValues = {}
    let transitions = []
    let finishStatesNew = []

    for (let i = 0; i < inputValues.length; i++) {
      for (let inputKey in inputValues[i]) {
        const asciiCode = 65 + parseInt(inputKey.replace("input", ""));
        outputValues[String.fromCharCode(asciiCode)] = inputValues[i][inputKey]
      }
      transitions.push(outputValues)
      outputValues = {}
    }

    for (let i = 0; i < finishStates.length; i++) {
      for (let inputKey in finishStates[i]) {
        const asciiCode = 65 + parseInt(inputKey.replace("input", ""));
        outputValues[String.fromCharCode(asciiCode)] = finishStates[i][inputKey]
      }
      finishStatesNew.push(outputValues)
      outputValues = {}
    }

    // for (let i = 0; i < inputValues.length; i++) {
    //   for (let inputKey in inputValues[i]) {
    //     inputValues[i][inputKey] = inputValues[i][inputKey] + "," + finishStates[i][inputKey]
    //     const asciiCode = 65 + parseInt(inputKey.replace("input", ""));
    //     outputValues[String.fromCharCode(asciiCode)] = inputValues[i][inputKey]
    //   }
    //   machineStates.push(outputValues)
    //   outputValues = {}
    // }

    let serializedTransitions = transitions.map(obj => JSON.stringify(obj));
    let serializedFinishStatesFinal = finishStatesNew.map(obj => JSON.stringify(obj))
    // let serializedMachineStates = machineStates.map(obj => JSON.stringify(obj));

    console.log(transitions)

    router.push({
      pathname: "/minimizeMachine",
      query: {
        type: 'mealy',
        transitions: serializedTransitions,
        finishStatesFinal: serializedFinishStatesFinal,
        states
      }
    })

  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">Mealy machine</Typography>
      </Box>
      <Box sx={{ maxWidth: "70%", margin: "25px auto" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">States</TableCell>
                {Array.from({ length: numEntrySymbols }, (_, i) => (
                  <>
                    <TableCell key={`entry-${i}`} align="center">
                      Inputf {i}
                    </TableCell>
                    <TableCell key={`exit-${i}`} align="center">
                      Inputg {i}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: numStates }, (_, i) => (
                <TableRow key={`state-${i}`}>
                  <TableCell component="th" scope="row">
                    {String.fromCharCode(65 + i)}
                  </TableCell>
                  {Array.from({ length: numEntrySymbols }, (_, j) => (
                    <>
                      <TableCell key={`cell-${i}-${j}`} align="center">
                        {/* replace with your own logic */}
                        {/* Sape {i} {j} */}
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel id={`select-label-${i}-${j}`}>
                            State
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId={`select-label-${i}-${j}`}
                            value={selectedInputValues[j][`input${i}`]}
                            onChange={(event) => handleInputChange(event, j, i)}
                          >
                            {states.map((state) => (
                              <MenuItem
                                key={`menuitem-${i}-${j}-${state}`}
                                value={state}
                              >
                                {state}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell key={`cellg-${i}-${j}`} align="center">
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id={`select-labelg-${i}-${j}`}>
                          Finish
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId={`select-labelg-${i}-${j}`}
                          value={selectedFinishStates[j][`input${i}`]}
                          onChange={(event) => handleChange(event, j,i)}
                        >
                          {exitSymbols.map((symbol) => (
                            <MenuItem
                              key={`menuitem-${i}-${j}-${symbol}`}
                              value={symbol}
                            >
                              {symbol}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button variant="contained" size="large" color="secondary" onClick={printStuff}>Create Machine</Button>
      </Box>
    </>
  );
}
