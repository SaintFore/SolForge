import { Command } from './command';
import chalk from 'chalk';

export class GenerateCommand extends Command {
  getName(): string {
    return 'generate';
  }

  getDescription(): string {
    return '生成静态网站';
  }

  getUsage(): string {
    return 'solforge generate';
  }

  async execute(args: string[]): Promise<void> {
    console.log(chalk.green('开始生成静态网站...'));
    // 这里将来会添加实际生成站点的逻辑
    console.log(chalk.green('静态网站生成成功!'));
  }
}