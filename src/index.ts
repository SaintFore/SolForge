#!/usr/bin/env node

const VERSION = '0.1.0';

function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--version') || args.includes('-v')) {
    console.log(`SolForge v${VERSION}`);
    return;
  }
  
  console.log('SolForge静态网站生成器');
  console.log('使用 --help 查看可用命令');
}

if (require.main === module) {
  main();
}

export { VERSION };