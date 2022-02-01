#! /usr/bin/env node

// #! 符号的名称叫 Shellbang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log("eric-node-cli working~");

const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");

// 定义命令和参数
program
  .command("create <app-name>")
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exists")
  .action((name, options) => {
    console.log("name:", name, "options:", options);
    // 在 create.js 中执行创建任务
    require("../lib/create.js")(name, options);
  });

// 配置 config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option form config")
  .action((value, options) => {
    console.log(value, options);
  });

// 配置 ui 命令

program
  .command("ui")
  .description("start add open ze-cli ui")
  .option("-p, --port <port>", "Port used for the UI Server")
  .action((option) => {
    console.log(option);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program
  // 监听 --help 执行
  .on("--help", () => {
    // 使用 figlet 绘制 Logo
    console.log(
      "\r\n" +
        figlet.textSync("Yize Lee", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
    );
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(`ze <command> --help`)} show details\r\n`
    );
  });

// 解析用户执行命令传入参数
program.parse(process.argv);
