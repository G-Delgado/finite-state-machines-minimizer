import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TableBody,
    Typography,
    Box
  } from "@mui/material";

export default function MealyMinimized({newMinimizedTransitions, minimizedStates, minimizedFinishStates}) {
    let outputValues = {}
    let machineStates = []
    console.log("New transitions")
    console.log(newMinimizedTransitions)
    minimizedStates.sort();
    console.log("New finish states ")
    console.log(minimizedFinishStates)
    console.log("Minimized states")
    console.log(minimizedStates)
    for (let i = 0; i < newMinimizedTransitions.length; i++) {
        let test = {}
        for (let inputKey in newMinimizedTransitions[i]) {
            test[inputKey] = newMinimizedTransitions[i][inputKey] + "," + minimizedFinishStates[i][inputKey]
            // outputValues[inputKey] = test[inputKey]
        }
        machineStates.push(test)
      }


      console.log("LA MAQUINAAAA")
      console.log(machineStates)

      let valuesConnectedTransitions = []
      machineStates.map(state => {
        let values = Object.values(state)
        valuesConnectedTransitions.push(values)
      })

    return (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">Minimized Automaton</Typography>
          </Box>
          <Box sx={{ maxWidth: "70%", margin: "25px auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">States</TableCell>
                    {Array.from(
                      { length: newMinimizedTransitions.length },
                      (_, i) => (
                        <TableCell key={`entry-${i}`} align="center">
                          Input {i}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                {/* connected.reachableStates.map(state => */}
                    {Array.from({length: minimizedStates.length}, (_,i) => (
                        <TableRow>
                            <TableCell align="center" key={minimizedStates[i]}>{minimizedStates[i]}</TableCell>
                            {Array.from({length: valuesConnectedTransitions.length}, (_,j) => (
                                <TableCell align="center" key={`cell-${j}-input0`}>
                                    {valuesConnectedTransitions[j][i]}
                                </TableCell>
                            ))}
                            
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      );
}