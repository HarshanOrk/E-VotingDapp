import React from 'react';
import {
    TableRow,
    TableCell, 
    Button
} from '@mui/material';
import { ethers } from 'ethers';
import  contractConfig  from './contract.json';


const Candidates = ({name, votes, id}) => {

    const handleVote = async() =>{
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, contractConfig, signer)
            const vote = await contract.Vote(id);
            const receipt = await vote.wait()
            console.log(receipt);
    
        }
        catch(err){
            alert(err.reason)
        }
    }
    return (
       <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{votes}</TableCell>
        <TableCell align="center">
            <Button variant="contained"
             sx={{
                background:"black",
                color:"white",
                "&:hover":{
                    background:"black"
                }
             }}
             onClick={() => {handleVote()}}>
              Vote
            </Button>
        </TableCell>
       </TableRow>
    );
};

export default Candidates;