#!/usr/bin/env node

const VERSION = '0.1.0';

function main() {
  // 直接将控制权交给CLI模块
  require('./cli');
}

if (require.main === module) {
  main();
}

export { VERSION };