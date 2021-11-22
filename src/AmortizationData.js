
export default function AmortizationData(data){
    const duration = data.duration;
    var Balance = data.pAmount;
    var paid=0;
    const emi = data.emi;
    const mir = data.interest_rate;
    const arr=[];
    for(let i=1;i<=duration;i++){
        let temp = {
            month:i,
            interest:Math.round(Balance*mir),
            total_balance:emi,
        };
        temp.principal=Math.round(emi-temp.interest);
        temp.balance=(Balance=Balance-temp.principal);
        if(temp.balance<0)
            temp.balance=0;
        temp.paid=parseFloat((paid=paid+temp.principal)/data.pAmount*100).toFixed(2);
        if(temp.paid>100)
        temp.paid=100.00;
        arr.push(temp);
    }

    return arr;
}