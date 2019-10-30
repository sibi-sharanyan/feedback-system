import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import purple from '@material-ui/core/colors/purple';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Paper , Typography , CircularProgress } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);




const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


let myid = 0;

class ScheduleTest extends Component {
  constructor() {
    super();
    this.state = {
      name: '' ,
      sub: '', 
      subss : [] , 
      testName: ''
    };
  }

   
 accent = purple['A200'];
delfromarr = (id) => {

  this.setState({subss : this.state.subss.filter((sub) => sub.id != id )});
}


addsub = () => {
  if(this.state.name == "" || this.state.sub == "") 
  {
    return;
  }
 
  myid++;
  this.setState({subss : [...this.state.subss , {name: this.state.name , sub: this.state.sub , id : myid}] , name : "" , sub : ""});

}


createTest = async() => {
  var finalobj = { };
  finalobj.name = this.state.testName;
  var temp = this.state.subss;
  temp.forEach(function(v){ delete v.id });
  finalobj.subarray = temp;
  let res = await axios.post("https://feedback-system-api.herokuapp.com/createtest" , finalobj);
  console.log(res);
  if(res.status == 200) 
  {
    swal("Done!", "Your Test has Been Created!", "success");
  }else 
  {
    swal("Oops!", "Something went wrong!", "error");
  }

}
  render() {

   var sublist =  this.state.subss.map((sub , index) => {
    
      return (<div key = {index}> {sub.name} - {sub.sub} <button onClick = {(e) => this.delete(index)}>Delete </button>  </div>)

    } );


    return (
      <div>
       
<div className = "d-flex justify-content-center align-items-center fullh1" >



      <TextField
      className = "mr-3"
      id="standard-with-placeholder"
      label="Enter Test Name"
        placeholder="ECE-A 3"
      autoComplete="off"
    value = {this.state.testName} onChange = {(e) => this.setState({testName : e.target.value})}
        margin="normal"
        
      />



      


      <TextField
      className = "mr-3"
      id="standard-with-placeholder"
      label="Enter Teacher Name"
        placeholder="Devendran"
      autoComplete="off"
  value = {this.state.name} onChange = {(e) => this.setState({name : e.target.value})}
        margin="normal"
        
      />



      <TextField
      className = "mr-3"
      id="standard-with-placeholder"
      label="Enter Subject Name"
        placeholder="TQM"
      autoComplete="off"
  value = {this.state.sub} onChange = {(e) => this.setState({sub : e.target.value})}
        margin="normal"
        
      />








     <Button className = "ml-4 mt-4"  onClick = {(e) => this.addsub() } variant="contained" color="primary">
      Add Subject 
    </Button>


         <Button className = "ml-4 mt-4 bg-success"  onClick = {(e) => this.createTest()}  variant="contained" color="secondary">
     Create Test 
    </Button>




</div>

           

       
       <div className = "d-flex justify-content-center align-items-center"> 
        
        <Paper className = "w-50">
       <Table >
        <TableHead>
          <TableRow>
     
            <StyledTableCell align="left"><Typography variant="h6" component="h2">
  Staff
</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant="h6" component="h2">
  Subject
</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant="h6" component="h2">
  Delete
</Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>



   {this.state.subss.map(item => (
                    <StyledTableRow  key={item.id}> <StyledTableCell> {item.name}  </StyledTableCell> <StyledTableCell> {item.sub} </StyledTableCell> <StyledTableCell> 
     <Button className = "bg-danger"  onClick={ (e) => this.delfromarr(item.id)  } variant="contained" color="primary">
      Delete
    </Button> </StyledTableCell>  </StyledTableRow>
                ))}





        </TableBody>
      </Table>
        </Paper>
  






  
       </div>




        
       
      </div>
    );
  }
}

export default ScheduleTest;