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
import { useState } from "react";

export default function moore() {
  const router = useRouter();

  // This should have const
  let { machineType, entrySymbols, exitSymbols, numStates } = router.query;
  // entrySymbols = "0,1";
  // exitSymbols = "0,1";
  // numStates = 3;
  const numEntrySymbols = entrySymbols.split(",").length;
  let entrySymbolsList = entrySymbols.split(",");
  const numFinishSymbols = exitSymbols.split(",").length;
  let fiishSymbolsList = exitSymbols.split(",");
  const states = Array.from({ length: parseInt(numStates) }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // generate an array of state labels from A to numStates
  const [selectedFinishStates, setSelectedFinishStates] = useState(
    Array(numStates).fill("")
  );

  const printStuff = () => {
    console.log(selectedInputValues)
    console.log(selectedFinishStates)
  }

  //   const [inputValues, setInputValues] = useState(
  //     Array.from({ length: numEntrySymbols }, () =>
  //       Array.from({ length: numStates }, () => "")
  //     )
  //   );

  //   const handleInputChange = (event, rowIndex, colIndex) => {
  //     const newInputValues = [...inputValues];
  //     newInputValues[colIndex][rowIndex] = event.target.value;
  //     setInputValues(newInputValues);
  //   };
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
                      {fiishSymbolsList.map((symbol) => (
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
