import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import axios  from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Paper , Typography , CircularProgress } from '@material-ui/core';

class TakeTest extends Component {
   constructor() {
    super();
    this.state = {
      value : [],
      currentQuestion : "Who Are You?" ,
      prevClass : "invisible" ,
      nextClass : "" ,
      animation: "bounceInLeft",
      subcnt : 0,
      pageno: 0 ,
      isSubmit: 'invisible', 
      subjects: [],
      isNameFilled: false,
      testCode : '' ,
      studentName: '',
      isGetCodeLoading: false
    };





  }
  currcnt = 0;
   questions = ["Dummy Question 1?" , "Dummy Question 2?" , "Dummy Question 3?" , "Dummy Question 4? " , "Dummy Question 5?" , "Dummy Question 6?" , "Dummy Question 7?" , "Dummy Question 8?" , "Dummy Question 9?" , "Dummy Question 10?" , "Dummy Question 11?" , "Dummy Question 12?" , "Dummy Question 13?" , "Dummy Question 14?" , "Dummy Question 15?"];


//next question button   
  goToNext = (e) =>{
       
      this.setState({ prevClass : " " , animation: "bounceOutRight"});
      setTimeout(()=> {
this.setState({animation : "bounceInLeft" , pageno : this.state.pageno + 1});
      } , 600 );
      // 
      if(this.state.pageno == this.questions.length - 2) 
      {
        this.setState({nextClass: " invisible" , isSubmit: 'd'})
      }
     
  }

//previous button logic
    goToPrev = (e) =>{
       
      this.setState({ nextClass : "" , animation: "bounceOutLeft" , isSubmit: 'invisible'});

      setTimeout(()=> {
this.setState({animation : "bounceInRight" , pageno : this.state.pageno - 1});
      } , 600 );
      if(this.state.pageno == 1) 
      {
        this.setState({prevClass: "invisible"})
      }

  }



    handleChange = value => {
    this.setState({
      value: value
    })
  };

 


  onSubmit = async (e) => {

    var markarr = [];

let temp = 1;
  for(var i = 0 ; i < this.questions.length ; i++) 
  {
    for(var j = 0 ; j < this.state.subjects.length ; j++)
    {
      var valueName = 'value' + temp;
      temp++;
      markarr.push({name: this.state.subjects[j].name , sub: this.state.subjects[j].sub , mark: Number(this.state[valueName]) , qno: i+1});
    }
  }
  console.log(markarr);
  var finalobj = {};
  finalobj.code = this.state.testCode;
  finalobj.student = this.state.studentName;
  finalobj.markarr = markarr;
  let result = await axios.post("https://feedback-system-api.herokuapp.com/addresult" , finalobj ); 
  console.log(result);
  swal("Feedback Submitted" , "Your Feedback has been submitted. Please Close the browser window." , "success");
  }

  goToPage = (pgno) => {
    this.setState({pageno : pgno , animation: " bounceIn faster"});
       setTimeout(()=> {
this.setState({animation : ""});
      } , 700 );
    if(pgno == 0) 
    {
      // alert('hi');
       this.setState({prevClass: " invisible"});
       this.setState({ nextClass : " "  , isSubmit: 'invisible'});
       return;
        // this.setState({ prevClass : "mx-4 fas fa-chevron-left fa-4x float-left" });
        
    }else {
       this.setState({ nextClass : " "  , isSubmit: 'invisible'});
      

    }

    if(pgno == this.questions.length  - 1)
    {
       this.setState({nextClass: " invisible" , isSubmit: 'd'});
       this.setState({ prevClass : "" });
       return;
     
    }else {
      this.setState({ prevClass : "" });
      
    }
  }

  getCode = () => {
    this.setState({isGetCodeLoading: true});
 axios.get("https://feedback-system-api.herokuapp.com/test/" + this.state.testCode).then((test) => {
    console.log(test.data);
   this.setState({subjects: test.data.subarray , subcnt : test.data.subarray.length , isNameFilled: true});
 } );
  }

  render() {

     if(this.state.isNameFilled == true) 
     {
      var myList = [];
      var temp = 0;
      for(var k = 0 ; k <  this.questions.length ; k++ )
      {
         myList[k] = this.state.subjects.map((subject ,index)=> {
           temp++;
     var valueName = "value" + temp;
  

     return (<div className='slider w-50' key = {subject.name}>  

     <div className = " lead">
     {subject.name} - {subject.sub} 
     </div>
    <div className = "">
     <div className = ""> 

             <Slider
          min={0}
          max={100}
          value= {this.state[valueName]}
        
          onChange={(e) => this.setState( { [valueName] : e } )}
            />

  
    </div>
</div> 
     </div>);
   }

)
      }

  

    return (



      <div>
       <div className = "numcont"> 
       {this.questions.map((question , index) => {
         return (<button className =  "numbtn" id = {  index==this.state.pageno ? "btnselected" : "bbbbbbbb"  } onClick = {(e) => this.goToPage(index)}>  {index+1}  </button> ) 
       } )}
  </div>
          
          <div></div>



     <Paper  className={`p-5 myShadow m-4 mb-3 animated faster ${this.state.animation}`}>
        <Typography variant="h5" component="h3">
          {this.questions[this.state.pageno]}
        </Typography>
  
      </Paper>
  



<div className="d-flex justify-content-around align-items-center">
<i onClick = {(e) => this.goToPrev(e)} class={"mx-4 fas fa-chevron-left fa-4x float-left " + this.state.prevClass}></i>
<div className='d-flex flex-column w-75 justify-content-center align-items-center'>
          {myList[this.state.pageno]}
    
      </div>
   
      
        <i onClick = {(e) => this.goToNext(e)} class={"mx-4 fas fa-chevron-right fa-4x float-right " + this.state.nextClass}></i>
</div>


       

     

       <Button className = {` ${this.state.isSubmit} mx-5 float-right p-2`} onClick = {(e) => this.onSubmit(e)} variant="contained" color="primary">
      Submit
    </Button>

      </div>
    );
  } else {
    return (
     


<div className = "d-flex justify-content-center align-items-center  flex-column fullh">
      <TextField
      className = "w-25"
          id="standard-with-placeholder"
          label="Enter Name"
        placeholder="Kalaivanan"
         autoComplete="off"
      value = {this.state.studentName} onChange = {(e) => this.setState({studentName : e.target.value})}
        margin="normal"
      />





      <TextField
      className = "w-25"
      id="standard-with-placeholder"
      label="Enter Test Code"
        placeholder="t68qw"
      autoComplete="off"
      value = {this.state.testCode} onChange = {(e) => this.setState({testCode : e.target.value})}
        margin="normal"
        
      />








   <Button className = "my-5 w-25" onClick = {(e) => this.getCode() } variant="contained" color="primary">
      Submit
    </Button>
{
  
   this.state.isGetCodeLoading ? <CircularProgress  /> : <CircularProgress  className = "v-hidden" /> 
}
    
</div>




  




 
    );
  } 

  }
}



export default TakeTest;