const { type } = require("express/lib/response");
const inq=require("inquirer");
const Manager=require('./manager');
const Intern=require('./intern');
const Engineer=require('./engineer');
const engineer = require("./engineer");
const fs=require(fs);
const employees=[];
const generateHtml=(employee)=>{
    let specialRole;
    if('manager'=== employee.getRole()){
        specialRole=employee.getOfficeNumber
    }else if('engineer'=== employee.getRole()){
        specialRole=employee.getGitHub
    }else if('intern'===employee.getRole()){
        specialRole=employee.getSchool
    }
    return`<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getName()}</li>
      <li class="list-group-item">${employee.getId}</li>
      <li class="list-group-item">${employee.getEmail}</li>
      <li class="list-group-item">${employee.specialRole}</li>
      </ul>

   
      </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
    `
}

const addEngineer=()=>{
    inq.prompt([{
        message:'what is engineers name',
        type:'input',
        name:'firstName'
    }, 
    
    {
        message:'what is a engineers employee id',
        type:'input',
        name:'engnId'
    },
    {
        message:'what is engineers email',
        type:'input',
        name:'engnEmail'
    },
    {
        message:'what is engineers github',
        type:'input',
        name:'engnGtHb'
    }

]).then((answers)=>{
    //make engineer class from answers
    const engineer= new Engineer(answers.firstName,answers.engnId,answers.engnEmail,answers.engnGtHb)
    employees.push(engineer)
    nextemployee();
})
}
const addIntern=()=>{
    inq.prompt([{
        message: 'what is interns name',
        type:'input',
        name:'firstName'
    },
{
    message:'what is interns employee id',
    type:'input',
    name:'intrnId'
},
{
    message:'what is interns email',
    type:'input',
    name:'intrnEmail'
},
{
    message:'what is interns school',
    type:'input',
    name:'intrnSchool'
}
]).then((answers)=>{
//make intern class from answers
const intern= new Intern(answers.firstName,answers.intrnId,answers.intrnEmail,answers.intrnSchool);
employees.push(intern);
nextemployee();
})
}

const nextemployee=()=>{
    inq.prompt([{
        message:'who would you like to add to your team',
        type:'list',
        choices:['engineer', 'intern','done'],
        name:'nextOp'
    }]).then((answers)=>{
        switch (answers.nextOp) {
            case 'engineer':{
                //add engineer
                addEngineer();
                break;
            }
            case 'intern':{
                // add intern
                addIntern();
                break;
            }
            case 'done':{
                //move to next step
                let htmlBody='';
                for(const employee of employees){
                  htmlBody+= generateHtml(employee) 
                   {

                 }
                 const html=`<!DOCTYPE html>
                 <html lang="en">
                 <head>
                 
                     <meta charset="UTF-8">
                     <meta http-equiv="X-UA-Compatible" content="IE=edge">
                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                     <title>Document</title>
                     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                 </head>
                 <body>
                     ${htmlBody}
                 </body>
                 </html>`
                }
                fs.writeFileSync('./index.html', html)
                break;
            }
        }  
    })
    inq.prompt([{
        message:'what is your name',
        type:'input',
        name:'name'

    },
    
    {
        message:'what is your employee ID',
        type:'input',
        name:'id'
    },{
    message:'what is your email',
    type:'input',
    name:'email'
    },
{
  message:'what is your office number',
  type:'input', 
  name:'offnum'
}
]).then((answers)=>{
    const manager=new Manager(answers.name, answers.id,answers.email,answers.offnum);
    employees.push(manager);
    nextemployee();
})};