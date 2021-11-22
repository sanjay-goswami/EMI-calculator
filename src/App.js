import React, {useState} from 'react';
import './App.css';
import {withStyles} from '@material-ui/core/styles';
import slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Table,TableCell, TableRow ,TableHead,TableBody,} from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import ntable from './TableDetails';
import AmortizationData from './AmortizationData';


const Pslider = withStyles({
  root:{ color:'#ea8040',height:10},
  thumb:{height:25,backgroundColor:'#ea8040', marginTop:-9,marginLeft:-9},
  track:{height:10,borderRadius:4},
  rail:{height:10,borderRadius:4},
})(slider);
function App() {
  var [pAmount,setpAmount] = useState(100000);
  const [interest,setinterest] = useState(27);
  const [duration,setDuration] = useState(12);
  const maxValue = 20000000;
  const intMax = 20;
  const maxDuration = 360;

  const intr = interest/1200;
  const emi = duration? Math.round(pAmount*intr/(1-(Math.pow(1/(1+intr),duration)))):0;
  const totalAmt = duration*emi;
  var TotalAmountOfCredit = Math.round((emi/intr)*(1-Math.pow((1+intr),(-duration))));
  const TotalAmountofInterest = Math.round(totalAmt - TotalAmountOfCredit);
  const arr = AmortizationData({duration:duration,pAmount:pAmount,emi:emi,interest_rate:intr});
  // console.log(arr);
  return (
    <div className="App">
      <div className="form">
          <h2 className="calHeading" ><u>EMI Caculator</u></h2>
          <div className='slidermain'>
          <div className='slider'>
            <Typography gutterBottom><strong> Loan Amount <input type="text" value={pAmount} onChange={(event,value)=>{setpAmount(event.target.value)}}/> &#8377; </strong></Typography>
            <Pslider value={pAmount} onChange={(event,vAmt)=>{setpAmount(vAmt)}} defaultValue={pAmount} max={maxValue}/>
          </div>
          
          <div className='slider'>
            <Typography gutterBottom><strong> Interest Rate <input type="text" value={interest} onChange={(event)=>{setinterest(event.target.value)}}/>%</strong></Typography>
            <Pslider value={interest} onChange={(event,vInt)=>{setinterest(vInt)}} max={intMax} defaultValue={interest}/>
          </div>
          <div className='slider'>
            <Typography gutterBottom><strong> Tenure <input type="text" value={duration} onChange={(event)=>{setDuration(event.target.value)}}/>Months</strong></Typography>
            <Pslider value={duration} onChange={(event,vDur)=>{setDuration(vDur)}} max={maxDuration} defaultValue={duration}/>
          </div>
          </div>
          <div className='div1'>
          <div className="loanData">
            <div className="loanEMi">
              <h5>Loan EMI</h5>
              <h4><strong>{emi}&#8377;</strong></h4>
            </div>
            <div className="loanEMi">
              <h5>Total Interest Payable</h5>
              <h4><strong>{totalAmt-pAmount}&#8377;</strong></h4>
            </div>
            <div className="loanEMi">
              <h5> Total Payment (Principal + Interest) </h5>
              <h4><strong>{totalAmt}&#8377;</strong></h4>
            </div>
          </div>
          <div className="chart" >
            <Pie
            data = {{
              labels : ['Total Interest','Principal Loan Amount'],
              datasets:[{
                data:[TotalAmountofInterest,pAmount],
                backgroundColor:['green','red']
              }]
            }}
            width={50}
            height={50}
            />
          </div>
          </div>
          <div className='table'>
            <Table border="1px">
              <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell>Principal(A)</TableCell>
                <TableCell>Interest</TableCell>
                <TableCell>Total(A+B)</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Loan Paid Till Date</TableCell>
              </TableRow>
              </TableHead>  
              <TableBody>                
              {arr.map(ntable)}
              </TableBody>
            </Table>
          </div>
      </div>
    </div>
  );
}

export default App;
