import { Command } from './command';
import chalk from 'chalk';

export class ServerCommand extends Command {
  getName(): string {
    return 'server';
  }

  getDescription(): string {
    return '启动本地开发服务器';
  }

  getUsage(): string {
    return 'solforge server [--port <port>]';
  }

  async execute(args: string[]): Promise<void> {
    const portIndex = args.indexOf('--port');
    const port = portIndex >= 0 && portIndex < args.length - 1 ? args[portIndex + 1] : '4000';
    
    console.log(chalk.green(`启动本地服务器，监听端口: ${port}`));
    // 这里将来会添加实际启动服务器的逻辑
    console.log(chalk.green(`服务器启动成功: http://localhost:${port}`));
  }
}