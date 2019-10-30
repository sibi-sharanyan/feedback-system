import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut  , Bar ,Line , Pie} from 'react-chartjs-2';
import randomcolor from 'randomcolor';
import { Paper , Typography , CircularProgress } from '@material-ui/core';
class Result extends Component {
          constructor() {
    super();
    this.state = {
      result: {},
      done: false
    };

this.teachers = [];
this.data = {};





 
  }


  componentDidMount() {
    console.log(this.props.match.params.code);
let {code} = this.props.match.params;
        axios.get("https://feedback-system-api.herokuapp.com/finalresult/" + code).then((res) => {
            // console.log(res.data);
           this.teachers =  Object.keys(res.data.qno1);
 var values= this.teachers.map((teacher) =>  0);


Object.keys(res.data).map((qno) => {
  Object.keys(res.data[qno]).map((teacher , index) => {
        // console.log( "rakesshhh" , index , qno , teacher, res.data[qno][teacher] );
      values[index] = values[index] +  res.data[qno][teacher];
      })
    })
    // console.log("weorkkeaeraer" , values);




              this.data = {
          labels: this.teachers,
  datasets: [
    {
      label: 'Teachers',
      fill: false,
      lineTension: 0.1,
      backgroundColor: this.teachers.map((teacher) =>  randomcolor()),

     
      pointRadius: 1,
      pointHitRadius: 10,
      data: values
    }
  ]
       }






 this.setState({result: res.data , done: true});
            
            // console.log(this.teachers);
       })



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
} else {







    let list = Object.keys(this.state.result).map((qno) => {
     return <tr> {  Object.keys(this.state.result[qno]).map((teacher) => {

        return <td> { this.state.result[qno][teacher]} </td>
      }) } </tr>
    })
      return (
        <div className = "container">

<div className = "w-50 d-flex mx-5">

 <Doughnut  data={this.data} />
         <Bar
  data={this.data}

/>

</div>



<div className = "w-50 d-flex m-5">

    
<Line data={this.data} />

<Pie data={this.data} />
</div>


         <table class="table table-striped"> 
            <thead>
    <tr>
    {this.teachers.map(teacher => <th> {teacher} </th>) }
    </tr>
  </thead>

  <tbody>
  {list}
  </tbody>
         </table>



         </div>
      );
  }
  }

}

export default Result;