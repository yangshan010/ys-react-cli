#!/usr/bin/env node

// 当前目录为空，如果当前目录的名称和project-name一样，则直接在当前目录下创建工程，否则，在当前目录下创建以project-name作为名称的目录作为工程的根目录
// 当前目录不为空，如果目录中不存在与project-name同名的目录，则创建以project-name作为名称的目录作为工程的根目录，否则提示项目已经存在，结束命令执行。

const path = require("path");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const fs = require("fs");
const glob = require("glob");
const download = require("../lib/download");
const inquirer = require("inquirer");
const generator = require("../lib/generator.js");
const copyFiles = require("../lib/copyFiles.js");
const rm = require("rimraf").sync;
let projectRoot = "";
console.log(path.parse("ys/dev").dir);
// 获取当前文件夹 有哪些文件
const list = glob.sync("*");
let next = undefined;
// let rootName = path.basename(process.cwd());
next = inquirer
  .prompt([
    {
      name: "buildInCurrent",
      message: "文件目录名称",
      default: "dev-project"
    }
  ])
  .then(answer => {
    if (list.length) {
      if (list.indexOf(answer.buildInCurrent) >= 0) {
        console.log(chalk.red(`项目${answer.buildInCurrent}已经存在`));
        return Promise.reject();
      }
      // console.log("answer", answer.buildInCurrent);
    }
    projectRoot = answer.buildInCurrent;
    return Promise.resolve(answer.buildInCurrent);
  });
next && go;
function go() {
  next
    .then(projectRoot => {
      fs.mkdirSync(projectRoot);
      return copyFiles(projectRoot).then(target => {
        return {
          target,
          name: projectRoot
        };
      });
    })
    .then(context => {
      return inquirer
        .prompt([
          {
            name: "port",
            message: "端口号",
            default: "8080"
          },
          {
            name: "projectName",
            message: "项目的名称",
            default: context.name
          },
          {
            name: "projectVersion",
            message: "项目的版本号",
            default: "1.0.0"
          },
          {
            name: "projectDescription",
            message: "项目的简介",
            default: `A project named ${context.name}`
          }
        ])
        .then(answers => {
          return {
            ...context,
            metadata: {
              ...answers
            }
          };
        });
    })
    .then(context => {
      // console.log("path.parse(context.target).dir", context.target);
      return generator(
        context.metadata,
        context.target,
        path.parse(context.target).dir
      );
    })
    .then(context => {
      console.log(logSymbols.success, chalk.green("创建成功:)"));
      console.log();
      console.log(
        chalk.green("cd " + projectRoot + "\nnpm install\nnpm run start")
      );
    })
    .catch(err => {
      rm(projectRoot);
      console.log(logSymbols.error, chalk.green("创建失败:)"), err);
    });
}

go();
