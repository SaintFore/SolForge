import { SiteConfig } from './interface';
import path from 'path';

/**
 * 默认配置
 */
export const DEFAULT_CONFIG: SiteConfig = {
  // 基础配置
  title: 'SolForge Site',
  description: 'A site powered by SolForge',
  author: 'SolForge User',
  url: 'http://example.com',
  root: '/',
  
  // 目录配置
  source_dir: 'source',
  public_dir: 'public',
  theme_dir: 'themes',
  
  // 文章配置
  post_dir: '_posts',
  permalink: ':year/:month/:day/:title/',
  date_format: 'YYYY-MM-DD',
  
  // 主题配置
  theme: 'default',
  theme_config: {},
  
  // 扩展配置
  markdown: {
    extensions: [],
    highlight: true,
    code_block: true,
  },
  
  // 服务器配置
  server: {
    port: 4000,
    host: 'localhost',
    log: true,
  },
};