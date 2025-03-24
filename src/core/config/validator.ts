import { SiteConfig } from './interface';

/**
 * 配置验证错误
 */
export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

/**
 * 配置验证器
 */
export class ConfigValidator {
  /**
   * 验证配置是否有效
   */
  static validate(config: SiteConfig): void {
    // 验证必须的字段
    this.validateRequired(config);
    
    // 验证服务器配置
    this.validateServer(config);
    
    // 验证URL格式
    this.validateUrl(config);
    
    // 验证目录配置
    this.validateDirectories(config);
  }
  
  /**
   * 验证必需的配置项
   */
  private static validateRequired(config: SiteConfig): void {
    const requiredFields = ['title', 'source_dir', 'public_dir'];
    
    for (const field of requiredFields) {
      if (!config[field as keyof SiteConfig]) {
        throw new ConfigValidationError(`缺少必需的配置项: ${field}`);
      }
    }
  }
  
  /**
   * 验证服务器配置
   */
  private static validateServer(config: SiteConfig): void {
    if (config.server) {
      if (config.server.port && (config.server.port < 0 || config.server.port > 65535)) {
        throw new ConfigValidationError(`无效的端口号: ${config.server.port}`);
      }
    }
  }
  
  /**
   * 验证URL格式
   */
  private static validateUrl(config: SiteConfig): void {
    if (config.url && !config.url.match(/^https?:\/\/.*$/)) {
      throw new ConfigValidationError(`无效的URL格式: ${config.url}`);
    }
    
    if (config.root && !config.root.startsWith('/')) {
      throw new ConfigValidationError(`根路径必须以 / 开始`);
    }
  }
  
  /**
   * 验证目录配置
   */
  private static validateDirectories(config: SiteConfig): void {
    const dirFields = ['source_dir', 'public_dir', 'theme_dir'];
    
    for (const field of dirFields) {
      const value = config[field as keyof SiteConfig];
      if (typeof value === 'string' && value.includes('..')) {
        throw new ConfigValidationError(`目录路径不能包含上级目录引用: ${field}`);
      }
    }
  }
}