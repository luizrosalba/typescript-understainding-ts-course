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

https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

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
### Type aliases

```TS
type Combinable = number | string
type ConversionDescriptor = 'as-number' | 'as-text';
function combine(
 input1: Combinable,
 input2 : Combinable, 
 resultConversion: ConversionDescriptor
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
### Type Aliases and Object Types 
Type aliases can be used to "create" your own types. You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.

For example:

```TS 
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 }; // this works!
//This allows you to avoid unnecessary repetition and manage types centrally.
//For example, you can simplify this code:

function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
//To:

type User = { name: string; age: number };
 
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```
use void if you want to ignore the return type 

### Function as types 

```
let combineValues: (a:number, b:number) => number
function add (n1: number, n2:number){
  return n1+n2
}
let combineValues: Function 
combineValues = add //ok 
```

### Callbacks 
```
let combineValues: (a:number, b:number) => number
function add (n1: number, n2:number){
  return n1+n2
}
function addAndHandle (n1: number, n2:number, cb: (num: number)=> void)
addAndHandle(10,20, (result) => {
  console.log(result)
})

```
### unkown type
Can store any types  unkown is a bit of restrictive than any 
```TS
let userInput: unkown; 
let usrName: string

userInput = 5 
userInput = 'Max'

if(typeof userInput ==='string') // this check is required to be able to assing an unkown to a string fixed type 
  userName = userInput
```
### Never type

make clear For programmers that functions that never produces a return value

```TS
function generateError(message:string, code: number): never {
  throw { message: message, errorCode: code}
}
generateError('An error occurred!', 500)
```

## 3 Compiler and configs 

### Watch mode 

- tsc app.ts --watch

### Initializing a project 

- tsc --init  (everything in this folder is a project)

creates a tsconfig.json. After , run 

- tsc (which will compile all tsc files)
- tsc --watch  

Including and excluding files 

Same idea for include 
```
// in tsconfig.json 
  "exclude": [
    // exclude from compilation, work with wildcars
    // any file in any folder "**/*.dev.ts"
    "node_modules" // this is default behavior 
  ]
```
### Seting compiler options 

Important options : 

- target :  what browsers supports. es5 -> older browsers
- the older, the more workarounds must be made to make the code work on older browsers 
- lib : Unlock features TS knows if not set , default will be assumed: "dom", "es6", "dom.iterable", "scripthost" 
- allowJS a JS file will be compiled by ts 
- checkJS : TS will check JS files to help 
-  sourcemap: helps with debuging true: generate the map files to connect js to input files (can place breakpoints and super usefull to simplify debug)
- outdir tells where the created files will be stored 
- rootDir TS will look in only in the rootDir and subfolders 
- noEmit : TS will only check , not produce js 
- downlevelIteration : workaraound only turn on if you have several loops inside loops  
- noEmitOnError: true will not generate files when errors 
- strict : enable all to true what will be checked 
- ! tells TS that operation will have a know value
### Code Quality options
- Additional Checks can be turned off for debuging 

### Debugging the project 
- Extensions : EsLint (Improve code quality) , Prettier (format) , Debbuger for Chrome (default)
- to launch Debug : 
1) Enable sourcemaps in tsconfig.json 
2) place a breakpoint in code 
3) Press F5 -> select Chrome 
4) lauch.json will be created 
5) change to localhost:5050 (node)
6) Install live server extension 
7) compile the codes tsc 
8) F5 again should pause in breakpoint when reached 
```JS
/// Correct launch;json 
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5500",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
## Next gen JS 
- TS helps older browsers to use new JS features 

- let vs const
- arrow functions 
- default function params 

const add = ( a: number, b: number = 1) => a + b

- spread operator for arrays and objects 

- rest params 

```TS
const add = (...numbers : number[] ) => {
  return numbers.reduce ((curResult, curValue ) => {
    return curResult + curValue
  },0)
}
const addedNumbers = add(5,10,2,3.7)
```
- Array destructuring 

const [hobby1, hobby2, ...remainingHobbies] = hobbies 

const {firstName: userName, age} = person // override firstname with userName
### The ! operator

Tells TS that the expression will never yeld null ex: 

```TS
userInputElement = document.getElementById('user-input')!;
```
## Classes and interfaces 
- Object-Oriented Programming (OOP)

- Work with real life entities in code 

- Ex: ProductList -> Product -> ShoppingCart ... 

### Objects and Classes 

Objects : Things your code work with in code ex: Instance of classes . Class based is an alternative to using ibject literals. 

Classes : BluePrints for objects. Define how objects look like which properties and methods they have. Classes make creation of multiple similar objects much easier

src\classes\cl-interfaces-02-class-and-this-basics

### This

src\classes\cl-interfaces-02-class-and-this-basics


### Private and public 

src\classes\cl-interfaces-03-private-and-public

### Shorthand initialization 

src\classes\cl-interfaces-04-shorter-init-syntax

ex: constructor (private readonly id :string, public name: string )

### Inherance 
Gest everything from base class 
- you have to add super to load base class 

src\classes\cl-interfaces-06-inheritance

- class ITDepartment extends Department {
  constructor(id: string){
    super(id, 'IT')
  }
}
### Private vs protected 

- private are accessed only from class and not from classes with extend the class

- protected is avaliable to extended classes 

### Interface 

src\classes\cl-interfaces-07-overriding-and-protected

### Getter and Setter 

- getter and setter  call getter like property not like method 

src\classes\cl-interfaces-08-getters-and-setters

### Static 
- static property and methods : Called directly on the class (Department.createEmployee('Luiz')) not on instances of the class ex: Math.pow() don't need new Math() . Good for utilities methods 
- static properties also can't be accessed by this, should be accessed by Department.name; 

### Abstract Classes 

Enforce a certain method is available 
- Add abstract on method and on class  good for singletons 

src\classes\cl-interfaces-09-abstract

### Interface 
Describe the structure of an object. Acepts readonly modifier 

src\classes\cl-interfaces-11-basic-interfaces

### Interface with classes 

src\classes\cl-interfaces-12-implementing-interfaces

### Extending intefaces 

src\classes\cl-interfaces-13-interface-inheritance

### Interfaces as function types 
src\classes\cl-interfaces-14-interface-function-types

### option params 

src\classes\cl-interfaces-15-optional-properties

## Advances types and Ts features 


### Intersection Types 
src\advancedTypes\adv-types-01-starting-setup

src\advancedTypes\adv-types-02-intersection-types

### Type Guards 

Check if a property exists before something else is done (typeof, in, instanceof )

src\advancedTypes\adv-types-03-type-guards

### Discriminated Unions

Common pattern to mix interfaces with same methods with small distictions 

src\advancedTypes\adv-types-04-discriminated-unions
### Type Casting 
src\advancedTypes\adv-types-05-type-casting

### Index Properties 
src\advancedTypes\adv-types-06-index-properties

### Functional Overload 

Like headers from C++ 

src\advancedTypes\adv-types-07-function-overloads

### Optional Chaining and Nullish Coalescing 

fetchedData.?job.?title 

?? only works for undefined 

const Input = userInput  ?? 'DEFAULT'
src\advancedTypes\adv-types-08-optional-chaining-nullish-coalescing


## Generics 
## Decorators 

## Building a project from scratch 

## Namespace and modules 

## Webpack and TS 

## 3rd party libs 

## React + TS and NodeJS + TS 


