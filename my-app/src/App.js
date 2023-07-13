import React, {useState, useEffect} from "react";
import {
  Container,
  Table,
  TableContainer, 
  TableHead,
  TableRow,
  TableCell, 
  TableBody,
  Paper,
  Typography,
  AppBar,
  Box,
  Toolbar,
  Stack,
  Button
} from "@mui/material"
import {ethers} from "ethers"
import contractConfig from "./contract.json";
import Candidates from "./Candidates.js";

function App() {
  const [candidates, setcandidates] = useState([])
  const [address, SetAddress] = useState("Connect Wallet")
  
      const walletConnect = async() =>{
          try{
              if(typeof window.ethereum){
                  await window.ethereum.request({method:"eth_requestAccounts"}).then((res) =>{
                      console.log(res)
                      const value = res[0].slice(0,4)+"..."+res[0].slice(38, 42);
                      SetAddress(value)
                  })
              }
              else{
                  console.log("Please install metamask");
              }
          }
          catch(err){
              console.error(err)
          }
      }

   
      const getData = async() =>{
            try{
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS,contractConfig,provider);
              const CandidateLength = await contract.getCandidate();
              const candidateData = [];
                    for(var i = 0; i < CandidateLength; i++){
                      await contract.Candidates(i)
                      .then(candidate =>{
                          console.log(ethers.utils.parseBytes32String(candidate.name))
                          candidateData.push({name:ethers.utils.parseBytes32String(candidate.name), votes:ethers.BigNumber.from(candidate.votes).toString()})
                      });

                    }

                    setcandidates(candidateData)
            }
            catch(err){
              console.error(err)
            }

      }
    
  useEffect(() =>{
    walletConnect();
    getData();
  }, [])


  console.log(candidates)
  return (
    <Box>
      <AppBar
        style={{ background: "black"}}
      > 
        <Toolbar>
        <Stack direction="row" spacing={150}>
          <Typography
            variant="h4"
            sx={{ml: 4 }}
          >
            Voting Dapp
          </Typography>

            <Button
              sx={{
                mr: 5,
                bgcolor: "white",
                color: "black",
                borderRadius: "5px",
                width: "180px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white" },
              }}
              onClick={() => {
                walletConnect();
              }}
            >
              <Typography>
                {address}
              </Typography>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    <Container sx={{mt:"10%"}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography sx={{fontWeight:"bold"}}>Candidate Name</Typography></TableCell>
            <TableCell align="center">
              <Typography sx={{fontWeight:"bold"}}>Candidate Votes</Typography></TableCell>
            <TableCell align="center">
              <Typography sx={{fontWeight:"bold"}}>Action</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {
           candidates.map((candidate, index)=>{
            return <Candidates key={index} name={candidate.name} votes={candidate.votes} id={index}/>
           }) 
         }
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  </Box>
  );
}

export default App;
