import path from 'path';
import { SiteConfig, UserConfig } from './interface';
import { ConfigLoader } from './loader';
import { ConfigValidator } from './validator';

/**
 * 配置管理器
 */
export class ConfigManager {
  private static instance: ConfigManager;
  private config: SiteConfig;
  private sitePath: string;
  
  private constructor(sitePath: string) {
    this.sitePath = sitePath;
    this.config = ConfigLoader.loadConfig(sitePath);
    ConfigValidator.validate(this.config);
  }
  
  /**
   * 获取配置管理器实例
   */
  public static getInstance(sitePath: string = process.cwd()): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager(sitePath);
    }
    return ConfigManager.instance;
  }
  
  /**
   * 重置配置管理器实例
   */
  public static resetInstance(): void {
    ConfigManager.instance = undefined!;
  }
  
  /**
   * 获取完整配置
   */
  public getConfig(): SiteConfig {
    return this.config;
  }
  
  /**
   * 更新配置
   */
  public updateConfig(userConfig: UserConfig): void {
    this.config = ConfigLoader.mergeConfig(userConfig);
    ConfigValidator.validate(this.config);
  }
  
  /**
   * 获取主题路径
   */
  public getThemePath(): string {
    return path.join(this.sitePath, this.config.theme_dir, this.config.theme);
  }
  
  /**
   * 获取源文件目录路径
   */
  public getSourcePath(): string {
    return path.join(this.sitePath, this.config.source_dir);
  }
  
  /**
   * 获取发布目录路径
   */
  public getPublicPath(): string {
    return path.join(this.sitePath, this.config.public_dir);
  }
  
  /**
   * 获取文章目录路径
   */
  public getPostPath(): string {
    return path.join(this.getSourcePath(), this.config.post_dir);
  }
}

export { SiteConfig, UserConfig } from './interface';
export { ConfigValidationError } from './validator';
export { DEFAULT_CONFIG } from './default';