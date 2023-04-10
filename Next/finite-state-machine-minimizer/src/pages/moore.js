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

export default function moore({ machineType, entrySymbols, exitSymbols, numStates }) {
  const router = useRouter();

  // This should have const
  // let { machineType, entrySymbols, exitSymbols, numStates } = router.query;
  // entrySymbols = "0,1";
  // exitSymbols = "0,1";
  // numStates = 3;
  const [states, setStates] = useState([]);
  const numEntrySymbols = entrySymbols.split(",").length;
  //let entrySymbolsList = entrySymbols.split(",");
  //const numFinishSymbols = exitSymbols.split(",").length;
  let finishSymbolsList = exitSymbols.split(",");
  const [selectedFinishStates, setSelectedFinishStates] = useState(
    Array(numStates).fill("")
    );
  //setArrStates(states)

  useEffect(() => {
    const statesArray = Array.from({ length: parseInt(numStates) }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // generate an array of state labels from A to numStates
  setStates(statesArray)
  }, [])


  const printStuff = () => {
    console.log(selectedInputValues)
    console.log(selectedFinishStates)

    let inputValues = JSON.parse(JSON.stringify(selectedInputValues))
    let finishStates = JSON.parse(JSON.stringify(selectedFinishStates))

    console.log(inputValues)
    console.log(finishStates)
    //console.log(inputValues[0])

    let outputValues = {}

    let transitions = []

    for (let i = 0; i < inputValues.length; i++) {
      for (let inputKey in inputValues[i]) {
        const asciiCode = 65 + parseInt(inputKey.replace("input", ""));
        outputValues[String.fromCharCode(asciiCode)] = inputValues[i][inputKey]
      }
      transitions.push(outputValues)
      outputValues = {}
    }

  
    console.log(transitions)
    let serializedTransitions = transitions.map(obj => JSON.stringify(obj)); // convert each object to a string

    console.log(serializedTransitions)

    router.push({
      pathname: '/minimizeMachine',
      query: {
        type: 'moore',
        transitions: serializedTransitions,
        finishStates,
        states
      }
    })

  }

  
  const [selectedInputValues, setSelectedInputValues] = useState(
    Array(numEntrySymbols).fill(
      Object.fromEntries([...Array(numEntrySymbols)].map((_, i) => [`input${i}`, ""]))
    )
  );

  
  const handleInputChange = (event, rowIndex, colIndex) => {
    const newSelectedInputValues = [...selectedInputValues];
    newSelectedInputValues[rowIndex] = {
      ...newSelectedInputValues[rowIndex],
      [`input${colIndex}`]: event.target.value
    };
    setSelectedInputValues(newSelectedInputValues);
  };

  const handleChange = (event, rowIndex) => {
    const newSelectedFinishStates = [...selectedFinishStates];
    newSelectedFinishStates[rowIndex] = event.target.value;
    setSelectedFinishStates(newSelectedFinishStates);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" sx={{}}>
          Moore machine
        </Typography>
      </Box>
      <Box sx={{ maxWidth: "70%", margin: "25px auto" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">States</TableCell>
                {Array.from({ length: numEntrySymbols }, (_, i) => (
                  <TableCell key={`entry-${i}`} align="center">
                    Input {i}
                  </TableCell>
                ))}
                <TableCell key="finish state" align="center">
                  Finish state
                </TableCell>
                {/* {Array.from({ length: numFinishSymbols }, (_, i) => (
          <TableCell key={`finish-${i}`} align="center">
            Finish {i}
          </TableCell>
        ))} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: numStates }, (_, i) => (
                <TableRow key={`state-${i}`}>
                  <TableCell component="th" scope="row">
                    {String.fromCharCode(65 + i)}
                  </TableCell>
                  {Array.from({ length: numEntrySymbols }, (_, j) => (
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
                          onChange={(event) => handleInputChange(event, j, i )}
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
                  ))}
                  <TableCell>
                    <Select
                      fullWidth
                      value={selectedFinishStates[i]}
                      onChange={(event) => handleChange(event, i)}
                    >
                      {finishSymbolsList.map((symbol) => (
                        <MenuItem key={symbol} value={symbol}>
                          {symbol}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  {/*{Array.from({ length: numFinishSymbols }, (_, j) => (
            <TableCell key={`finish-${i}-${j}`} align="center">
              {/* replace with your own logic /*}
            </TableCell>
          ))}*/}
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

moore.getInitialProps = async ({ query }) => {
  let { machineType, entrySymbols, exitSymbols, numStates } = query;
  return { machineType, entrySymbols, exitSymbols, numStates }
}