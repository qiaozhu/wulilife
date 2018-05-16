<template>
  <div class="layout-content">
    <div class="print-logo-box">
      <img src="../../assets/img/print-logo.png"
        class="print-logo"
        alt="">
    </div>
    <div class="doc-title">预约打印</div>
    <div class="doc-subtitle">选择门店-上传文件-预约打印-到店取货，告别排队不用等。</div>

    <div class="button-box">
      <x-button type="primary"
        link="/chiocestore">预约打印</x-button>
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
