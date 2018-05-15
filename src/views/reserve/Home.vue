<template>
  <div>
    <router-view></router-view>
    <tabbar style="position:fixed">
      <tabbar-item>
        <img slot="icon"
          src="../../assets/img/tabbar1.png">
        <span slot="label">Wechat</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon"
          src="../../assets/img/tabbar2.png">
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected
        link="/btndemo">
        <img slot="icon"
          src="../../assets/img/tabbar3.png">
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <img slot="icon"
          src="../../assets/img/tabbar4.png">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux';

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
};
</script>
<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
</style>
