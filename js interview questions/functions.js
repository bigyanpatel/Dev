//  function real(){
//      console.log("i am real");
//  }

//  function real(){
//      console.log("i'm real one");
//  }

//  function real(){
//      console.log("you both are wasted");
//  }

//  real();

 //while calling the same funtion simultaniously  

//  console.log(global);
//  console.log(this);


// console.log("varName", varName);
// var varName;
// console.log("varName", varName);
// varName = "Bigyan";
// console.log("varName", varName);
// fn();
// function fn(){
//     console.log("hello from fn");
// }
// fn();
// fnContainer();
// var fnContainer = function(){
//     return "I'm an expression";
// }
// fnContainer();

// Q.

// console.log("line number 39", varName);
// var varName = 10;

// function b(){
//     console.log("line number 43", varName);
// }
// console.log("line number 45", varName);

// function fn(){
//     console.log("line number 48", varName);
//     var varName = 20;
//     b();
//     console.log("line number 51", varName);
// }
// fn();

//scope :- Area under where a funtion or a varaible can be found.

//Q.

var a = 10;
console.log("line number 60", a);

function fn(){
    console.log("line number 63", a);
    var a = 20;
    a++;
    console.log("line number 66", a);
    if(a){
        var a = 30;
        a++;
        console.log("line number 70", a);
    }
}

fn();
console.log("line number 75", a);
