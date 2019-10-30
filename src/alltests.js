import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

class Alltests extends Component {
          constructor() {
    super();
    this.state = {
      tests: [] , 
      done: false
    };
  }

 async componentDidMount() {
   let result = await axios.get("https://feedback-system-api.herokuapp.com/tests" );
    this.setState({tests: result.data , done: true});
    console.log(this.state.tests);
  }

  render() {






if(this.state.done == false) 
{
  return (

<div className = "bg-dark">
  <div class="ui active dimmer">
    <div class="ui text loader">
    Loading
    </div>
  </div>
</div>



  );
}else 
  {

  


    var list = this.state.tests.map((test) => {
      return ( <div key = {test.id} class="ui segment p-4 m-5" > 
       <div className = "d-flex justify-content-around"> <div class = "h5 bg-info text-white p-2 rounded shadow">   {test.name} </div>  <div class = "h5 bg-success text-white p-2 rounded shadow">   {test.code} </div> 

       <div class = "h5 bg-warning text-white p-2 rounded shadow">     <Link to={'/result/' + test.code} className="nav-link">Result</Link> </div> 
               
        </div> 

                 

        <div className = "mt-4">  



          <Table >
        <TableHead>
          <TableRow>
     
            <StyledTableCell align="left"><Typography variant="h6" component="h2">
            Teacher
</Typography></StyledTableCell>
            <StyledTableCell align="left"><Typography variant="h6" component="h2">
            Subject
</Typography></StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {test.subarray.map(sub => {
      return (   <StyledTableRow>

<StyledTableCell>
{sub.sub}
  </StyledTableCell> 

  <StyledTableCell>
{sub.name}
  </StyledTableCell> 
  
        </StyledTableRow>)
    } )  }

        </TableBody>

        </Table>








            </div>
       </div>);
    })
    return  <div className = "container"> {list} </div>;
  }
  }

}

export default Alltests;