#!/usr/bin/env node
const fs = require("fs");
let command = require("commander");


const executeSubcommands = (options, program) => {


  options.forEach((option) => {

    if (option.hasOwnProperty("subCommand") && option.subCommand !== "") {
      try {
        if (fs.existsSync(option.subCommand + ".js")) {

          require(option.subCommand);
          console.log("Info: Command \"" + option.subCommand + "\" loaded");
        }
        else {
          throw "Error: File:\"" + option.subCommand + "\" for execute option:\"" + option.name + "\" doesn't exist. Generation stopped.";
        }
      }
      catch (err) {
        console.error(err);
        process.exit(1);
      }
    }
  })
}


const load = (options,program) => {

  options.forEach((option) => {

    if (option.required) {
      program.requiredOption("-" + option.shortName + ", --" + option.name, option.comment)
    }
    else {
      program.option("-" + option.shortName + ", --" + option.name, option.comment)
    }
  })

}

const execute=(options, version)=>
{
  load(options, command);
  executeSubcommands(options,command);
  command.version(version);
  command.parse(process.argv);
  return command;
}

module.exports = execute;
