var btn=document.querySelector('.but');
btn.addEventListener('click',chkP);

function chkP(){
    var inpt=document.querySelector('.inp');
    var otp=document.querySelector('.output');
    var str=inpt.value;
    var j=str.length-1;
    var chk=1;
    for(var i=0,j;i<j;i++,j--){
        if(str[i]=="-"){
            i++;
        }
        if(str[j]=="-"){
            j--;
        }
        if((str[i]!=str[j]) && (i<j)){
            otp.innerText="Not a Palinedrome";
            chk=0;
            break;
        }

    }
    if(chk==1){
        otp.innerText="Palinedrome";
    }

}