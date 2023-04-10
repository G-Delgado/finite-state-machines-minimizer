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

export default function MealyConnected({newTransitions, reachableStates, newFinishStates}) {
    let outputValues = {}
    let machineStates = []
    console.log("New transitions")
    console.log(newTransitions)
    console.log("New finish states")
    console.log(newFinishStates)
    for (let i = 0; i < newTransitions.length; i++) {
        let test = {}
        for (let inputKey in newTransitions[i]) {
            test[inputKey] = newTransitions[i][inputKey] + "," + newFinishStates[i][inputKey]
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
            <Typography variant="h4">Connected Automaton</Typography>
          </Box>
          <Box sx={{ maxWidth: "70%", margin: "25px auto" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">States</TableCell>
                    {Array.from(
                      { length: newTransitions.length },
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
                    {Array.from({length: reachableStates.length}, (_,i) => (
                        <TableRow>
                            <TableCell align="center" key={reachableStates[i]}>{reachableStates[i]}</TableCell>
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