/**
 * Purpose: REview JS concpets
 * Prtotypes vs Classes
 * Regular functions, anon functions, arrow functions 
 * callback functions
 * MERN: N stands for node.js
 */

// var vs lets --global (var) vs local scope (let)
var globalVariable = 100;
let localVariable = 200;

function functionName(){
    let varInFunc = "local"
}
//console.log(varInFunc); will fail

// Prototype --one time use object fro prototype
const oneTimeUseObj = {
    prop1:"Kalid",
    prop2: "comp3123",
    method1: function (param1){
        console.log(param1)
    }
}

// const oneTimeUseObj = new Object()
console.log(oneTimeUseObj);
console.log(oneTimeUseObj.prop1);
console.log(oneTimeUseObj.prop2);
oneTimeUseObj.method1("Pizza"); 

//prptotype -- using constructor
function Student (student_name_p, course_p, lunch_p){
    this.student_name = student_name_p;
    this.course = course_p;
    this.lunch = lunch_p;

    this.method1 = function (param1){
        return param1;
    }
}

const morning_student = new Student("Kalid", "comp3123", "noodles");
console.log(morning_student);
console.log(morning_student.student_name);
console.log(morning_student.course);
console.log(morning_student.method1(morning_student.lunch));

//Classes -- always have constuctor 

class Prof{
    constructor(prof_name_o){ //no func keyword 
        this.prof_name = prof_name_o;
    }
    method1(lunch){
        console.log(lunch)
    }
}

const morning_prof = new Prof("Laily")
console.log(morning_prof.prof_name)
morning_prof.method1("burger")
