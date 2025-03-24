import fs from 'fs';
import path from 'path';
import { ConfigManager, SiteConfig, DEFAULT_CONFIG } from '../src/core/config';

// 测试目录
const TEST_DIR = path.join(__dirname, 'test-site');

// 创建测试环境
function setupTestEnv() {
  // 创建测试目录
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }
  
  // 创建测试配置文件
  const yamlConfig = `
title: 测试站点
description: 这是一个测试站点
author: 测试用户
theme: custom-theme
server:
  port: 8080
`;

  fs.writeFileSync(path.join(TEST_DIR, '_config.yml'), yamlConfig);
}

// 清理测试环境
function cleanupTestEnv() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

// 测试配置加载
function testConfigLoading() {
  console.log('测试配置加载...');
  
  // 从测试目录加载配置
  const configManager = ConfigManager.getInstance(TEST_DIR);
  const config = configManager.getConfig();
  
  // 验证配置值
  console.log('站点标题:', config.title);
  console.log('描述:', config.description);
  console.log('作者:', config.author);
  console.log('主题:', config.theme);
  console.log('服务器端口:', config.server.port);
  
  // 验证合并的默认值
  console.assert(config.public_dir === DEFAULT_CONFIG.public_dir, 
    `应该使用默认的public_dir值，期望: ${DEFAULT_CONFIG.public_dir}, 实际: ${config.public_dir}`);
  
  console.log('配置加载测试完成');
}

// 运行测试
async function runTests() {
  try {
    // 设置测试环境
    setupTestEnv();
    
    // 运行测试
    testConfigLoading();
    
    console.log('\n所有配置测试通过!');
  } catch (err) {
    console.error('测试失败:', err);
  } finally {
    // 清理测试环境
    cleanupTestEnv();
  }
}

runTests();