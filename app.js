var btn=document.querySelector('.btn');
var userInpt=document.querySelector('.inpt');
var output=document.querySelector('#output');
var daysInAMonth=[31,Number(`${new Date().getFullYear() % 4 ? 29 : 28}`),31,30,31,30,31,31,30,31,30,31];

btn.addEventListener('click',outPut);


function outPut(){

    if(userInpt.value==''){
        output.innerText="Mention a date please";

    }else{
        output.innerText="loading......";
        setTimeout(()=>{
            inputManager();
        },2000)
    }

}

function inputManager(){
    var arr=userInpt.value.split("-");
    var dateStr=arr[2];
    var monthStr=arr[1];
    var yearStr=arr[0];

    var result=checkAllFormates(dateStr,monthStr,yearStr);

    if(result){
        output.innerText=`Whoa!!! Your birthdate in format ${result} is a palindrome.`;
    }else{
        let newData=nextPalindrome(dateStr,monthStr,yearStr);
        let nearestPal=newData[0]
        let daysAway=newData[1]
        output.innerText=`Awww! Your birthdate is not palindrome. Nearest palindrome date is ${nearestPal} You missed it by ${daysAway} days.`
    }
}

function checkAllFormates(dd,mm,yyy){
    var dateString=dd.toString();
    var monthString=mm.toString();
    var yearString=yyy.toString();

    if(dateString.length===1){
        dateString="0"+dateString;
    }
    if(monthString.length===1){
        monthString="0"+monthString
    }

    var formate1=yearString+monthString+dateString;
    var formate2=dateString+monthString+yearString;
    var formate3=monthString+dateString+yearString;

    if(prime_check(formate1)){
        return(`${yearString}-${monthString}-${dateString}`);

    }else if(prime_check(formate2)){
        return(`${dateString}-${monthString}-${yearString}`);

    }else if(prime_check(formate3)){
        return(`${monthString}-${dateString}-${yearString}`);
    }else{
        return 0;
    }

}

function prime_check(str){
    var len=str.length;
    var j=Math.floor(len/2);
    for(var i=0;i<j;i++){
        if(str[i]!=str[len-i-1]){
           
            return 0;
        }
    }
    return 1;
}
function nextPalindrome(dd,mm,yyy){
    
    let nextDate = Number(dd);
    let nextMonth = Number(mm);
    let nextYear = Number(yyy);

    let prevDate = Number(dd);
    let prevMonth = Number(mm);
    let prevYear = Number(yyy);

    let missedDays = 0;
    while (true) {
        missedDays += 1;
        nextDate += 1;
        prevDate -= 1;

        if (nextDate > daysInAMonth[nextMonth - 1]) {
            nextDate = 1;
            nextMonth += 1;
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear += 1;
                if(nextYear>9999){
                    break
                }
            }
        }
        
        if (prevDate < 1) {
            prevMonth -= 1;
            if (prevMonth < 1) {
                prevYear -= 1;
                if(prevYear < 1) {
                    return ["", ""];
                }else{
                    prevMonth = 12;
                    prevDate = daysInAMonth[prevMonth - 1];
                }
            } else {
            prevDate = daysInAMonth[prevMonth - 1];
            }
        }
    
        const nextPali=checkAllFormates(nextDate,nextMonth,nextYear);
        if (nextPali)
            return [nextPali, missedDays];

            const prevPali=checkAllFormates(prevDate,prevMonth,prevYear);
        if (prevPali)
            return [prevPali, missedDays];
    }
}