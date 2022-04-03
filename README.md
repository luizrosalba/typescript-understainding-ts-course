# typescript-understainding-ts-course

typescript-understainding-ts-course

## Running 

npm start 

## Install 
- npm install -g typescript 

Ts compiles to JS 

- tsc app.ts  -> creates app.js which can be loaded in index.html

Ts adds:  

- Types 
- Better autocompletes 
- Next gen js features compiled down for older browsers (like babel)
- Non js like interfaces and generics 
- Meta programming like decorators 
- Rich configurations options
- Get support in non Ts projects 

## TS Basics 

Javascript uses "dynamic types" (resolved at runtime), TS yses "static types" (resolved during development). 

Good Practice : 

- let number1: number; (non initialized variable must have its type)

Bad Practice : 

const number1: number = 5; (unneeded)

Core Types : 

- number (all number formats)

```Js
function add(n1: number, n2 : number ) { 
    return n1 + n2; 
}

//const number1 = '5';  /// error 
const number1 = 5;  /// ok 
const number2 = 2.8; 

/// can sum up numbers os string with numbers ... 
const result = add(number1, number2); 
console.log(result)

```
- string (all ticks)
- boolean (just true e false) 
- object {age:30} (infer if property exists)
```Js
const person: {
    name: string,
    age: number
} = { 
    name: 'Luiz', 
    // age: '30' // fails 
    age: 30
}
//console.log(person.nickname) /// fails , do not exists 
console.log(person.age)
```

17 - Parei aqui 

Important: Type Casing
In TypeScript, you work with types like string or number all the times.

Important: It is string and number (etc.), NOT String, Number etc.

The core primitive types in TypeScript are all lowercase!



## 3 Compiler and configs 

## Next gen JS 

## Classes and interfaces 

## Advances types and Ts features 

## Generics 

## Decorators 

## Building a project from scratch 

## Namespace and modules 

## Webpack and TS 

## 3rd party libs 

## React + TS and NodeJS + TS 


