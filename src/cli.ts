#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { CommandRegistry } from './utils/command-registry';
import { InitCommand } from './commands/init';
import { NewCommand } from './commands/new';
import { GenerateCommand } from './commands/generate';
import { ServerCommand } from './commands/server';
import { VERSION } from './index';

// 初始化命令行
const program = new Command();
const registry = CommandRegistry.getInstance();

// 注册所有命令
registry.register(new InitCommand());
registry.register(new NewCommand());
registry.register(new GenerateCommand());
registry.register(new ServerCommand());

// 设置程序基本信息
program
    .name('solforge')
    .description('SolForge静态网站生成器')
    .version(VERSION);

// 为每个命令创建commander子命令
registry.getAllCommands().forEach(command => {
    const cmd = program
        .command(command.getName())
        .description(command.getDescription())
        .allowUnknownOption(true);

    // 根据不同命令添加参数
    if (command.getName() === 'init') {
        cmd.argument('<site-name>', '站点名称');
    } else if (command.getName() === 'new') {
        cmd.argument('<title>', '文章标题');
    }

    cmd.action((options, cmdObj) => {
        const args = cmdObj.args || [];
        command.execute(args)
            .catch(err => {
                console.error(chalk.red(`执行命令 ${command.getName()} 时出错:`));
                console.error(chalk.red(err.stack || err.message));
                process.exit(1);
            });
    });
});


// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何命令，显示帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}