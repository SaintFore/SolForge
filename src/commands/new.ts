import { Command } from './command';
import chalk from 'chalk';

export class NewCommand extends Command {
  getName(): string {
    return 'new';
  }

  getDescription(): string {
    return '创建一篇新文章';
  }

  getUsage(): string {
    return 'solforge new <title>';
  }

  async execute(args: string[]): Promise<void> {
    const title = args[0];
    if (!title) {
      console.error(chalk.red('错误: 必须提供文章标题'));
      console.log(`使用方法: ${chalk.cyan(this.getUsage())}`);
      return;
    }
    
    console.log(chalk.green(`正在创建新文章: ${title}`));
    // 这里将来会添加实际创建文章的逻辑
    console.log(chalk.green('文章创建成功!'));
  }
}