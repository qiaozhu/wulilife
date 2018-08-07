<template>
  <div>
    <swiper :list="swiperlist"
      auto
      loop
      v-model="swiperindex"></swiper>
    <div class="vux-panel-title">
      <span class="left-title">热门资料</span>
      <span class="font-red right-act">
        <i class="iconfont icon-zhandianpeizhi font-red"></i>
        全部分类</span>
    </div>
    <div v-for="i in 5"
      :key="i"
      class="van-card">
      <div class="van-card__thumb">
        <img class="van-card__img"
          src="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg">
      </div>
      <div class="van-card__content">
        <div class="van-card__row">
          <div class="van-card__title">2018 英语6级题库 理工大出考题</div>
          <div class="van-card__price font-red">¥ 999.99</div>
        </div>
        <div class="van-card__row">
          <div class="van-card__desc">100题，附答案。</div>
          <div class="van-card__num">x 2</div>
        </div>
        <div class="van-card__row">
          <span class="van-hairline--surround van-tag van-tag--plain van-tag--danger">英语</span>
          <span class="van-hairline--surround van-tag van-tag--plain van-tag--danger">6级</span>
          <span class="van-hairline--surround van-tag van-tag--plain van-tag--danger">雅思</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { Swiper, InlineXNumber } from 'vux';
export default {
  data: function() {
    return {
      title: 'library',
      swiperindex: 0,
      swiperlist: [
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
          title: '送你一朵花'
        },
        {
          url: 'javascript:',
          img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
          title: '送你一辆车'
        },
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg', // 404
          title: '送你一次旅行',
          fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
        }
      ]
    };
  },
  components: {
    Swiper,
    InlineXNumber
  }
};
</script>
<style>
  .van-card {
    color: #333;
    min-height: 100px;
    font-size: 16px;
    background: #fff;
    position: relative;
    box-sizing: border-box;
    padding: 5px 15px 5px 115px;
  }
  .van-card:not(:first-child) {
    margin-top: 10px;
  }
  .van-card--center,
  .van-card__thumb {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .van-card__thumb {
    top: 5px;
    left: 15px;
    width: 90px;
    height: 90px;
    position: absolute;
  }
  .van-card__thumb img {
    border: none;
    max-width: 100%;
    max-height: 100%;
  }
  .van-card,
  .van-card__thumb,
  .van-card__row {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .van-card__row + .van-card__row {
    margin-top: 5px;
  }
  .van-card__content {
    width: 100%;
  }
  .van-card__title {
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .van-card__title,
  .van-card__desc {
    line-height: 20px;
    word-break: break-all;
  }
  .van-card__price {
    font-size: 14px;
  }
  .van-card__price,
  .van-card__num {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 80px;
    line-height: 20px;
    text-align: right;
  }
  .van-card__desc {
    color: #666;
    font-size: 12px;
    max-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .van-card__title,
  .van-card__desc {
    line-height: 20px;
    word-break: break-all;
  }
  .van-card__num {
    color: #666;
    font-size: 12px;
  }
  .van-card__price,
  .van-card__num {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 80px;
    line-height: 20px;
    text-align: right;
  }
  .van-card__footer {
    right: 15px;
    bottom: 5px;
    position: absolute;
  }

  .van-tag {
    display: inline-block;
    padding: 2px 5px;
    line-height: normal;
    border-radius: 3px;
    font-size: 10px;
    background: #c9c9c9;
    color: #fff;
  }
  .van-tag + .van-tag {
    margin-left: 10px;
  }
  .van-tag--danger {
    background: #f44;
  }
  .van-tag--danger.van-tag--plain {
    color: #f44;
  }
  .van-tag--plain {
    background: #fff;
    color: #c9c9c9;
  }
  [class*='van-hairline'] {
    position: relative;
  }
  [class*='van-hairline']::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e5e5e5;
  }
  .van-hairline--surround::after {
    border-width: 1px;
  }
  .van-tag::after {
    border-color: currentColor;
    border-radius: 4px;
  }
  .vux-panel-title {
    display: flex;
    margin-top: 0.77em;
    margin-bottom: 0.3em;
    padding-left: 15px;
    padding-right: 15px;
    color: #333;
    font-size: 14px;
  }
  .vux-panel-title .left-title {
    flex: 1;
  }
  .vux-panel-title .right-act {
    flex: 0;
    min-width: 80px;
    text-align: right;
  }
</style>
