import config from '@/utils/config';
const domain = config.domain;
/*----------公共接口----------*/
export default {
  domain: domain,
  queryWXuserOpenid: domain + 'queryWXuserOpenid',
  upload: domain + 'upload',
  test: domain + 'test'
};
