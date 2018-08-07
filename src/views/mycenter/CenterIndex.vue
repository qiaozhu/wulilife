<template>
  <div class="layout-content">
    <div class="avatar-bg">
      <img class="avatar-img"
        :src="userInfo.avatarUrl"
        alt="">
      <div class="avatar-name">{{userInfo.nickName}}</div>
    </div>
    <div class="my-panel text-c"
      style="padding-top:10px">
      <div class="divider-title">
        <span>—</span>
        <span>我的订单</span>
        <span>—</span>
      </div>
      <flexbox :gutter="0">
        <flexbox-item class="mycenter-flexbox-item">
          <i class="iconfont icon-orderBlank font-gray"
            style="font-size:24px;margin-top:8px;"></i>
          <div class="order-item-name">预约订单</div>
        </flexbox-item>
        <flexbox-item class="mycenter-flexbox-item">
          <i class="iconfont icon-orderBlank font-gray"
            style="font-size:24px;margin-top:8px;"></i>
          <div class="order-item-name">商城订单</div>
        </flexbox-item>
      </flexbox>
    </div>
    <group>
      <cell title="我的文件"
        is-link></cell>
      <cell title="会员积分"
        is-link></cell>
      <cell title="优惠卡券"
        is-link></cell>
    </group>
    <group>
      <cell title="个人资料"
        is-link></cell>
      <cell title="绑定手机"
        is-link></cell>
      <cell title="意见反馈"
        is-link></cell>
    </group>
    <div class="footer-kefu">
      <span>©南湖印务 联系电话：李</span>
      <span class="zan-c-orange">18671451730</span>
    </div>
    <zanToast></zanToast>
  </div>
</template>
<script>
import { Group, Cell, Flexbox, FlexboxItem } from 'vux';
export default {
  data() {
    return {
      title: 'MyCenterIndex',
      userInfo: {
        avatarUrl: 'http://www.gexing.me/uploads/150115/6-15011510464N41.jpg',
        nickName: '乔'
      }
    };
  },
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem
  }
};
</script>
<style>
  .avatar-bg {
    width: 100%;
    height: 160px;
    background: #ff4444;
    text-align: center;
  }
  .avatar-img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-top: 25px;
  }
  .avatar-name {
    height: 20px;
    line-height: 20px;
    margin-top: 0px;
    color: #ffffff;
  }
  .divider-title {
    line-height: 25px;
    font-size: 15px;
    color: #222;
    margin: 10px 0;
  }
  .order-item-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 15px;
  }
  .order-item-name {
    height: 30px;
    line-height: 30px;
    margin-top: 0px;
  }
  .footer-kefu {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666;
    font-size: 14px;
  }
  .mycenter-flexbox-item {
    height: 90px;
    text-align: center;
  }
</style>
