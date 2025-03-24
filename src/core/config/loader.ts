import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { SiteConfig, UserConfig } from './interface';
import { DEFAULT_CONFIG } from './default';

export class ConfigLoader {
  /**
   * 从指定路径加载配置
   */
  static loadConfig(sitePath: string): SiteConfig {
    // 尝试加载YAML配置文件
    const yamlConfigPath = path.join(sitePath, '_config.yml');
    if (fs.existsSync(yamlConfigPath)) {
      try {
        const yamlContent = fs.readFileSync(yamlConfigPath, 'utf8');
        const userConfig = yaml.load(yamlContent) as UserConfig;
        return this.mergeConfig(userConfig);
      } catch (err) {
        console.error(`加载YAML配置文件失败: ${err}`);
      }
    }
    
    // 尝试加载JS配置文件
    const jsConfigPath = path.join(sitePath, 'SolForge.config.js');
    if (fs.existsSync(jsConfigPath)) {
      try {
        // 动态导入JS配置
        const userConfig = require(jsConfigPath) as UserConfig;
        return this.mergeConfig(userConfig);
      } catch (err) {
        console.error(`加载JS配置文件失败: ${err}`);
      }
    }
    
    // 如果没有找到配置文件，返回默认配置
    return { ...DEFAULT_CONFIG };
  }
  
  /**
   * 合并用户配置和默认配置
   */
  static mergeConfig(userConfig: UserConfig): SiteConfig {
    return this.deepMerge(DEFAULT_CONFIG, userConfig);
  }
  
  /**
   * 深度合并两个对象
   */
  private static deepMerge(target: any, source: any): any {
    const output = { ...target };
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }
}

/**
 * 检查值是否为对象
 */
function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}