const path = require("path");
const Intern = require("./lib/Intern");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];
const ids = [];


function appMenu() {

    function addTeam() {
  
      inquirer.prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Select a position?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
          ]
        }
      ]).then(userChoice => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            createEngineer();
            break;
          case "Intern":
            createIntern();
            break;
          default:
            makeTeam();
        }
      });
    }
  
    function addManager() {
      console.log("Build a team");
      inquirer.prompt([
        {
          type: "input",
          name: "managerName",
          message: "What your manager's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter something!";
          }
        },
        {
          type: "input",
          name: "managerId",
          message: "What your manager's id?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "Please enter a number greater than zero.";
          }
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the team manager's email?",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What your manager's office number?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "Please enter a number greater than zero.";
          }
        }
      ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        team.push(manager);
        ids.push(answers.managerId);
        addTeam();
      });
    }
  
    function createIntern() {
      inquirer.prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              if (ids.includes(answer)) {
                return "This ID is already taken. Please choose a different id.";
              } else {
                return true;
              }
  
            }
            return "Please enter a number greater than zero.";
          }
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter something!";
          }
        }
      ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        team.push(intern);
        ids.push(answers.internId);
        addTeam();
      });
    }

    function createEngineer() {
      inquirer.prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's id?",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              if (ids.includes(answer)) {
                return "This ID is already taken. Please enter a different id.";
              } else {
                return true;
              }
  
            }
            return "Please enter a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's GitHub username?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          }
        }
      ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        team.push(engineer);
        ids.push(answers.engineerId);
        addTeam();
      });
    }
  
    function makeTeam() {
      // Create the output directory if the output path doesn't exist
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(team), "utf-8");
    }
  
    addManager();
  
  }
  
  appMenu();
  