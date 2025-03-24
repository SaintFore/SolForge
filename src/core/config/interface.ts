/**
 * SolForge站点配置接口
 */
export interface SiteConfig {
    // 基础配置
    title: string;
    description: string;
    author: string;
    url: string;
    root: string;
    
    // 目录配置
    source_dir: string;
    public_dir: string;
    theme_dir: string;
    
    // 文章配置
    post_dir: string;
    permalink: string;
    date_format: string;
    
    // 主题配置
    theme: string;
    theme_config: Record<string, any>;
    
    // 扩展配置
    markdown: {
      extensions: string[];
      highlight: boolean;
      code_block: boolean;
    };
    
    // 服务器配置
    server: {
      port: number;
      host: string;
      log: boolean;
    };
  }
  
  /**
   * 用户可以提供的部分配置
   */
  export type UserConfig = Partial<SiteConfig>;