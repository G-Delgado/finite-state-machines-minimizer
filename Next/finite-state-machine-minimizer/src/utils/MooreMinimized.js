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

export default function MooreMinimized({newMinimizedTransitions, minimizedStates, minimizedFinishStates, minimizedValuesConnectedTransitions}) {

    console.log("Sape")

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
                    <TableCell key="finish state" align="center">
                      Finish state
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {/* connected.reachableStates.map(state => */}
                    {Array.from({length: minimizedStates.length}, (_,i) => (
                        <TableRow>
                            <TableCell align="center" key={minimizedStates[i]}>{minimizedStates[i]}</TableCell>
                            {Array.from({length: minimizedValuesConnectedTransitions.length}, (_,j) => (
                                <TableCell align="center" key={`cell-${j}-input0`}>
                                    {minimizedValuesConnectedTransitions[j][i]}
                                </TableCell>
                            ))}
                            <TableCell align="center">
                                {minimizedFinishStates[i]}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      );
}