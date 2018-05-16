// 配置文件
let config = {};
const NODE_ENV = process.env.NODE_ENV;
console.log('this node_env is ' + NODE_ENV);

// 内网配置
const devconfig = {
  domain: '/WXClass/',
  linkdomain: 'http://localhost:8080/',
  appcode: '200362',
  version: '1.0',
  uploadurl: '../sjbWeb/upload'
};

// 生产配置
const propconfig = {
  domain: 'trade',
  linkdomain: 'http://localhost:8080/',
  appcode: '200336',
  version: '1.0',
  uploadurl: './sjbWeb/upload'
};

// 根据环境变量 导出对应配置
if (NODE_ENV == 'development') {
  config = devconfig;
} else {
  config = propconfig;
}

export default config;
