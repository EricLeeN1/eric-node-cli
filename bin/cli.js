#! /usr/bin/env node

// #! 符号的名称叫 Shellbang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log("eric-node-cli working~");

const program = require("commander");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");

// 定义命令和参数
program
  .command("create <app-name>")
  .description("create a new application")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exists")
  .action((name, options) => {
    console.log("name:", name, "options:", options);
    // 在 create.js 中执行创建任务
    require("../lib/create.js")(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option>]");

// 解析用户执行命令传入参数
program.parse(process.argv);

// inquirer
//   .prompt([
//     {
//       type: "input", // input, number, confirm, list, checkbox ...
//       name: "name", // key 名
//       message: "You name", // 提示信息
//       default: "eric-node-cli", // 默认值
//     },
//   ])
//   .then((answers) => {
//     // 模板文件目录
//     const destUrl = path.join(__dirname, "templates");
//     // 生成文件目录
//     // process.cwd() 对应控制台所在目录
//     const cwdUrl = process.cwd();
//     console.log(cwdUrl);

//     fs.readdir(destUrl, (err, files) => {
//       if (err) throw err;
//       files.forEach((file) => {
//         // 使用 ejs 渲染对应的模版文件
//         // renderFile(模板文件地址，传入渲染数据)
//         ejs.renderFile(path.join(destUrl, file), answers).then((data) => {
//           // 生成ejs处理后的模板文件
//           fs.writeFileSync(path.join(cwdUrl, file), data);
//         });
//       });
//     });
//     // 打印用户输入结果
//     console.log(answers);
//   });
