let appId = 'abc';
const button = document.querySelector('button')!;

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}

function clickHandler(message: string) {
  // let userName = 'Max';
  console.log('Clicked! ' + message);
}
// a comment
if (button) {
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}


const add3 = (...numbers : number[] ) => {
  return numbers.reduce ((curResult, curValue ) => {
    return curResult + curValue
  },0)
}
const addedNumbers = add3(5,10,2,3.7)