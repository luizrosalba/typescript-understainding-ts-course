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

## Core Types : 

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
### Common Types 
- string (all ticks)
- boolean (just true e false) 
- object {age:30} (infer if property exists)
- Arrays [1,2,3] 
- Tuples [1,2] -> fixed-length array 

```Js
const person: {
    name: string,
    age: number,
    hobbies: string[]
    role: [number, string] // tuple
} = { 
    name: 'Luiz', 
    // age: '30' // fails 
    age: 30
    hobbies: ['Sports']
    role: [2,'author']  // [number,string]
}
let favoritesActivities: string[]
//console.log(favoritesActivies = 'no') /// fails , is not array
//console.log(person.nickname) /// fails , do not exists 
console.log(person.age)
person.role.push=('admin') /// allowed in tuples
// person.role[1]= 10 // error 

```
### Enums
- enums enum{ NEW, OLD } -> automatically enumerated global constant identifiers start with 0 

```JS 
/// good-practice use uppercase for enums
/// We can reassign mapping numeration or names using = 
enum Role { ADMIN, READ_ONLY = 5, AUTHOR = 'AUTHORS' }

const person = { 
    name: 'Luiz', 
    age: 30
    hobbies: ['Sports']
    role: Role.ADMIN
}
```
### Any
- store any kind of value (good practice: avoid)
```Js
let favoriteActivities: any[]
```
### Nested Objects 
```JS
/// Of course object types can also be created for nested objects.
// Let's say you have this JavaScript object:

const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
// This would be the type of such an object:
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
// So you have an object type in an object type so to say.
```

Important: Type Casing
In TypeScript, you work with types like string or number all the times.

Important: It is string and number (etc.), NOT String, Number etc.

The core primitive types in TypeScript are all lowercase!

### Union type 

```Js
function combine(input1: number | string, input2 : number | string) { 
    let result;
    if (typeof input1 ==='number' && typeof input2 ==='number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result; 
}

const combinedAges = combine(30,26)
console.log(combinedAges)//56
const combinedNames = combine('luiz','sousa') /// ok
console.log(combinedNames)//luizsousa
```
### Literal Types 
A new type, based on a core type (string for instance) but that has a specific value attributed
```
ex: resultConversion: 'as-number' | 'as-text'  /// allow only this two strings 
``` 

```Js
function combine(
 input1: number | string,
 input2 : number | string, 
 resultConversion: string 
 ) { 
    let result;
    if (typeof input1 ==='number' && typeof input2 ==='number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    if (resultConversion ==='as-number'){
      return +result; /// + is same as parseFloat
    } eles { 
      return result.toString();
    }
}

const combinedAges = combine(30,26, 'as-number')
console.log(combinedAges) /// 56 

const combinedStringAges = combine('30','26', 'as-number')
console.log(combinedAges)/// 3026

const combinedNames = combine('luiz','sousa', 'as-text') /// ok
console.log(combinedNames)/// luizsousa
```
Changing the behavior of the function  

```Js
function combine(
 input1: number | string,
 input2 : number | string, 
 resultConversion: 'string' 
 ) { 
    let result;
    if (typeof input1 ==='number' && typeof input2 ==='number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result 
}

const combinedAges = combine(30,26, 'as-number')
console.log(combinedAges) /// 56 

const combinedStringAges = combine('30','26', 'as-number')
console.log(combinedAges)/// 56

const combinedNames = combine('luiz','sousa', 'as-text') /// ok
console.log(combinedNames)/// luizsousa
```

parei no 24 

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


