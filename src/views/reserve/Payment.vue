<template>
  <div class="layout-content">
    <template v-if="!isShowSuccess">
      <div class="print-logo-box">
        <img src="../../assets/img/print-logo.png"
          class="print-logo"
          alt="">
      </div>
      <div class="doc-title">确认订单</div>
      <div class="doc-subtitle">请确认预约订单信息。</div>
      <group>
        <div v-for="(el,index) in fileData"
          :key="index">
          <div class="file-title-cell">{{el.filename}}</div>
          <cell-form-preview class="file-preview-form cell-noborder"
            :list="list"></cell-form-preview>
        </div>
        <cell title="合计">
          <span class="font-red">$ 8.50</span>
        </cell>
      </group>
      <group>
        <cell title="优惠">
          <span class="font-red">$ 1.50</span>
        </cell>
      </group>
      <div class="van-submit-bar">
        <div class="van-submit-bar__bar">
          <div class="van-submit-bar__price">
            <span>合计：</span>
            <span class="van-submit-bar__price-integer">¥7.00</span>
            <!-- <span class="van-submit-bar__price-decimal">00</span> -->
          </div>
          <x-button type="primary"
            class="van-button"
            @click.native="onPayment"
            :show-loading="isShowLoading">
            提交订单
          </x-button>
        </div>
      </div>
    </template>
    <msg v-if="isShowSuccess"
      class="action-success"
      title="支付成功"
      description="您已成功预约打印订单，请稍候前来XXX地址取件"
      :buttons="buttons"
      :icon="icon"></msg>
    <!-- <div class="button-box">
      <x-button type="primary"
        link="/chiocestore">确定</x-button>
      <x-button @click.native="onBack">返回</x-button>
    </div> -->
  </div>
</template>

<script>
import { XButton, CellFormPreview, Group, Cell, Msg } from 'vux';
import { mapState } from 'vuex';

export default {
  components: {
    XButton,
    CellFormPreview,
    Group,
    Cell,
    Msg
  },
  data: function() {
    return {
      isShowLoading: false,
      isShowSuccess: false,
      list: [
        {
          label: '单价',
          value: '0.5元/张'
        },
        {
          label: '页数',
          value: '4'
        },
        {
          label: '份数',
          value: '2'
        }
      ],
      icon: '',
      buttons: [
        {
          type: 'primary',
          text: '我的订单',
          onClick: this.changeIcon.bind(this)
        },
        {
          type: 'default',
          text: '继续预约',
          link: '/index'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      storeData: (state) => state.printData.storeData,
      fileData: (state) => state.printData.fileData
    })
  },
  methods: {
    onBack() {
      this.$router.push({
        path: '/setconfig'
      });
    },
    onPayment() {
      this.$vux.toast.show({
        text: '调用微信支付',
        type: 'text'
      });
      this.isShowLoading = true;
      setTimeout(() => {
        this.isShowSuccess = true;
        this.isShowLoading = false;
      }, 3000);
    },
    changeIcon() {
      if (!this.icon || this.icon === 'success') {
        this.icon = 'warn';
        return;
      }
      if (this.icon === 'warn') {
        this.icon = 'info';
        return;
      }
      if (this.icon === 'info') {
        this.icon = 'waiting';
        return;
      }
      if (this.icon === 'waiting') {
        this.icon = 'success';
      }
    }
  },
  created: function() {}
};
</script>

<style>
  .weui-cell.cell-noborder:before {
    display: none;
  }
  .weui-cells .file-title-cell {
    padding: 10px 15px 0;
    line-height: 1;
    font-size: 1em;
  }

  .file-preview-form .weui-form-preview__label {
    text-align: left;
    text-align-last: left;
    letter-spacing: 4px;
    font-size: 1em;
  }
  .van-submit-bar {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  .van-submit-bar__bar {
    height: 50px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    font-size: 16px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background-color: #f1f1f1;
  }
  .van-submit-bar__price {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: right;
    color: #666;
    padding-right: 12px;
  }
  .van-submit-bar__price-integer {
    color: #f44;
  }
  .van-submit-bar__price span {
    display: inline-block;
  }
  .van-submit-bar__price-decimal {
    color: #f44;
    font-size: 12px;
  }
  .van-submit-bar__price span {
    display: inline-block;
  }

  .van-submit-bar .van-button {
    width: 130px;
    height: 100%;
    border-radius: 0;
    font-size: 16px;
  }
</style>
