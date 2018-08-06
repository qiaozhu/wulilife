<template>
  <div class="layout-content">
    <div class="print-logo-box">
      <img src="../../assets/img/print-logo.png"
        class="print-logo"
        alt="">
    </div>
    <div class="doc-title">支付</div>
    <div class="doc-subtitle">你刚选择的文件：{{files}}</div>

    <div class="button-box">
      <x-button type="primary"
        link="/chiocestore">确定</x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux';

export default {
  components: {
    XButton
  },
  data: function() {
    return {};
  },
  methods: {},
  created: function() {}
};
</script>

<style>
</style>
