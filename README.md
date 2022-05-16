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

### The !! operator 

The !! ensures the resulting type is a boolean (true or false).

javascript:alert("foo") --> foo

javascript:alert(!"foo") --> false

javascript:alert(!!"foo") --> true

javascript:alert(!!null) --> false

They do this to make sure $('row') isn't null.

It's shorter to type than $('row') != null ? true : false.

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

A type conected to other type. 

Ex1: Array<string> , Array<string | number>

This allow TS to call string methods 


Ex1: Array<string> , Array<string | number>

```TS 
const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});
```

### Creating a generic function : 

```TS
/// T and U are different type of data 
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

///mergeObj.name will work same as mergeObj.age
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);
```

### Constrains 

Ability to limit which kind inputs can be user on a function 

```TS
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));
```
### The keyOf constrain 

Garanties that second object is a property of first object (extends keyOf T)

```TS
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');


```
### Generic Classes 

Restrict what is accepted by a class

```TS
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());
```

### Generic utility types 

```TS
//// create a var where all the props are optional
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu'); ///error 
// names.pop(); ///// error 
```

https://www.typescriptlang.org/docs/handbook/utility-types.html


### Generic Types vs Union types 

Union lets you mix (choose whichever) data while Generics is useful to locks and restricts to only one type of data to all the class. Generics help create data structures that works togheter with multiple other possible types (e.g. an object which emits data of different types )


## Decorators 

Garanties that a class, method, etc is used correctly by others programmers 

make sure to use "experimentalDecorators": true  on tsconfig 

Decorators are all about classes 

```TS
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}


///decorator @ 
@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
```
Decorators run when class is defined not when its initiated 

### Decorators Factories 

A function that returns a function in order to be able to pass values which will be used by the inner decorator function 

the h1 will be injected into app by the decorator 

```TS
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger('LOGGING - PERSON')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

```
### More useful decorators 
We can expose libs to others devs , its easy to expose and change behaviors. Angular uses decorators a lot 

```TS
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function(constructor: any) {
    console.log('Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

```

### Decorators run order : 

bottom to top but first the decorator factory 

### Property decorators 

we can add decorators to properties 
```TS
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function(constructor: any) {
    console.log('Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
// symbol is a unique element in ts 
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  // log is added to properties 
  @Log
  title: string;
  private _price: number;
  // log2 is added to accessors 
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  //method decorator
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

```
Decorators do not decide run order in runtime. Decorators do things behind the scenes. It's a design pattern that adds behaviors when a function, method, property ... is called. Its not created when the class is instancied. 

### Using the return of decorators 

```TS
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function<T extends { new (...args: any[]): {name: string} }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

```
We can extend, replace, ...  classes using decorators.  Decorators added to methods and accessors can return values 

Properties descriptors 
type: PropertyDescriptor 
- configurable 
- enumerable 
- value 
- writable 


Accesors descriptors: 
- configurable
- enumerable 
- get 
- set 

### Creating a autobinder decorator 

```TS
const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
```

### Validation with decorators 

Decorators can be used to validate title and price 

```TS

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};
 
function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}
 
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;// if no validator , always valid 
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});

```
## Namespace and modules (Code Spliting)
- Namespaces are good for small projects 

- We want to split code into module files (able to import and export)

- code spliting 

- multiple js bundles can be created and imported on HTML ( error prone )

- namespaces and bundling are a good choice for big projects 

```ts 
namespace DDInterfaces {
  /// with export you can access inside and outside namespace 
  export interface Example {
    first : string 
    second: number 
  }
}

// to import : use three slashes, this is the syntax. But the interface must be declared inside the file which is using it

/// <reference path = "interface.ts" />
```
if you have multiple namespaces, uncomment "outFile": "./",  in tsconfig.json to compile multiple namespaces to same file and also set module to amd. this generates the index.html and the single import of multiple files to one 

src\modulesNamespaces\modules-01-namespaces

- Es6 modules can warn if there is some definitions/ imports  missing

- with Es6 you can delete all namespaces and import 

src\modulesNamespaces\modules-02-es-modules-basics

export : 

- you can only have 1 default export per file , but you can have unlimited exports . exports forces to use the same name 

import { feature } from 'abc.js'


- the imported from default doesn't have to match the exported name from file 

```
import Component from 'abc.js'
```

## Webpack and TS 

Every http have a overhead, a lot of files splited takes time 


Webpack bundle files together. Reduce the amount of http requests. Optimize code (minified) . Help with css. External local development server. 

using devtools , you will find the webpack folder inside sources tab and you can add breakpoints 
```TS 
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map', // improves debugin
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
```
package.json 
```
    "start": "webpack-dev-server",
    "build": "webpack --config webpack.config.prod.js"
```
you must set publicpath so that dev config will work with debug, else devserver gets lost thinking the src folder is the project root 

prod configs 
```TS
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
};
```
## 3rd party libs 

- Lodash (https://lodash.com/docs/) (npm and cdn)
- ts doesnt understand lodash, there is no ts version of lodash 
- lodash can be translated to ts 
- install types of lodash @types/lodash (.d.ts are declaration files, tells how to convert js to ts) 
- npm install --save-dev @types/lodash 
- same goes with any js lib in ts search for types of lib to get rid of the errors 
- when does not exists, 

- obs : adds a global var to window obj

<script> var GLOBAL = 'This is set'; </script> 

in ts we can use 
```ts
declare var GLOBAL: any; 
```

- Class transformer 

class transformer convert data into apropriate modules 

```ts
export class Product {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
```

```ts
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import { Product } from './product.model';

/// would come from a backend as json 
const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 }
];

// const p1 = new Product('A Book', 12.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

/// will translate every loaded products from json into compactible Product class
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

```

- Class validator 

Validation rules using decorators. turn experimental Decorators to true in tsconfig.json


```ts
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
```
must also import validate
```ts
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Product } from './product.model';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 }
];

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log('VALIDATION ERRORS!');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const p1 = new Product('A Book', 12.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

```
## React + TS 

- create react app (CRA)
- npx create-react-app proj-name --typescript
- tsx add jsx code to ts
- in node _modules/@types we can see a lot of declareted types 
- Type React.FC stands for React function component could also use React.ClassicComponent
- with this type, ts makes sure jsx is returned 

- props and types for props 

Typescript will force to declare the types of props 

```ts
import React from 'react';

interface TodoListProps {
  items: {id: string, text: string}[];
};

const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;

```
useRef can add functionalities to existing components 

```ts
import React, { useRef } from 'react';

const NewTodo: React.FC = () => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //! to avoid the fact that textInputRef will never be null 
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};

export default NewTodo;

```

States and types on React 

```ts
import React, { useState } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

const App: React.FC = () => {
  /// <> is required 
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random().toString(), text: text }
    ]);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
```

OBS: TS error: Could not find a declarition file for module 'module-name' can be solved with . This will give autocomplete to module 

npm install --save-dev @types/module-name

##  NodeJS + TS 




