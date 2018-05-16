<template>
  <div class="layout-box">
    <router-view></router-view>
    <base-tabbar></base-tabbar>
  </div>
</template>

<script>
import BaseTabbar from '@/components/BaseTabbar';

export default {
  components: {
    BaseTabbar
  }
  // watch: {
  //   '$route': function(to, from) {
  //     console.log(this.$store.state);
  //     console.log('router lanjie');
  //   }
  // }
};
</script>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  // common里包含全局公用样式
  @import '../../assets/css/common.less';
  // 下面可以写此页公用样式
  .print-logo-box {
    text-align: center;
    padding-top: 35px;
  }
  .print-logo {
    width: 60px;
    height: 57px;
  }

  .doc-title {
    padding: 15px 0;
    margin: 10px 15px;
    line-height: 25px;
    font-size: 25px;
    color: #222;
  }

  .doc-subtitle {
    padding: 5px 15px 12px;
  }
  // 页面或组件样式写在各自页面或组件style内
  /* components somerules */
</style>
