const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const buttonValue = e.target.innerHTML;
    const lastCharacter = input.value.slice(-1); //last character
   
    if (buttonValue === "RESET") {
      input.value = ""; //clears the input string
    } 
    else if (buttonValue === "DEL") {
      input.value = input.value.slice(0, -1); //removes lat character from string
    } 
    else if (buttonValue === "=") {

      if (["+", "-", ".", "/", "x"].includes(lastCharacter)) {// checks if last character of input string is any operator      
        input.value = "Error";
      }
       else {
        try{
          //calculate string input using eval() function
          let expression=input.value.replace(/x/g,"*");  //replacing expression
          let result = eval(expression);
        if(Number.isInteger(result)){
          input.value = result;
        }
        else if (result ===Infinity  || result === -Infinity) { //when result divides  by 0 we get infinity so checking result
          input.value = "Cannot divide by 0";   
        } 
        else if(result===NaN) {
          input.value = "Error";
        }
        else {
            input.value = result.toFixed(3); //round upto 3
          }
        }
        catch(error){
          input.value="Error";
        }
        
      }
    } 
    else {
      if (input.value === "" && ["+", "x", "/"].includes(buttonValue)) {//prevents entering at the start on input except (-) operator
          return;
      }
      //prevents entering twice operator
      if (["+", "-", "x", "/"].includes(lastCharacter) &&["+", "-", "x", "/"].includes(buttonValue)) //from operator array checking if last character is present in that array or not
      {
        return;
      }
      input.value += buttonValue;
    }
  });
});
