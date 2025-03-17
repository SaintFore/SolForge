import { Command } from './command';
import chalk from 'chalk';

export class InitCommand extends Command {
  getName(): string {
    return 'init';
  }

  getDescription(): string {
    return '初始化一个新的SolForge网站项目';
  }

  getUsage(): string {
    return 'solforge init <site-name>';
  }

  async execute(args: string[]): Promise<void> {
    const siteName = args[0];
    if (!siteName) {
      console.error(chalk.red('错误: 必须提供站点名称'));
      console.log(`使用方法: ${chalk.cyan(this.getUsage())}`);
      return;
    }
    
    console.log(chalk.green(`正在创建新站点: ${siteName}`));
    // 这里将来会添加实际创建站点的逻辑
    console.log(chalk.green('站点创建成功!'));
  }
}