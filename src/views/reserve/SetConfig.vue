<template>
  <div class="layout-content">
    <div class="print-logo-box">
      <img src="../../assets/img/print-logo.png"
        class="print-logo"
        alt="">
    </div>
    <div class="doc-title">打印设置</div>
    <div class="doc-subtitle">如有特殊需求，请填留言/备注。</div>
    <group v-for="(el,index) in fileData"
      :key="index"
      label-width="4.5em"
      label-margin-right="1.5em"
      label-align="left"
      :title="el.filename">
      <x-number title="份数"
        align="left"
        v-model="el.number"
        button-style="round"
        :min="1"
        :max="999"></x-number>
      <popup-picker title="尺寸"
        placeholder="请选择尺寸"
        :data="sizeOption"
        v-model="el.size"
        value-text-align="left"></popup-picker>
      <popup-picker title="黑白"
        placeholder="请选择"
        :data="colorOption"
        v-model="el.color"
        value-text-align="left"></popup-picker>
      <popup-picker title="单/双面"
        placeholder="请选择"
        :data="pageOption"
        v-model="el.page"
        value-text-align="left"></popup-picker>
      <popup-picker v-if="el.filetype=='pdf'"
        title="多合一"
        placeholder="请选择"
        :data="compositeOption"
        v-model="el.composite"
        value-text-align="left"></popup-picker>
    </group>
    <group label-width="4.5em"
      label-margin-right="1.5em"
      label-align="left"
      title="留言/备注">
      <x-textarea placeholder="请填写"
        :show-counter="true"
        :max="200"
        :rows="3"></x-textarea>
    </group>
    <div class="button-box">
      <x-button type="primary"
        @click.native="onSubmitSet">确定</x-button>
      <x-button @click.native="onBack">返回</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, GroupTitle, Group, PopupPicker, XNumber, XTextarea } from 'vux';
import { mapState } from 'vuex';

export default {
  components: {
    XButton,
    Group,
    GroupTitle,
    PopupPicker,
    XNumber,
    XTextarea
  },
  data() {
    return {
      sizeOption: [['A3', 'A4', 'B4', 'B5']],
      colorOption: [['黑白', '彩色']],
      pageOption: [['单面', '双面']],
      compositeOption: [['2合1', '4合1', '6合1', '8合1', '9合1']]
    };
  },
  computed: {
    ...mapState({
      storeData: (state) => state.printData.storeData,
      fileData: (state) => state.printData.fileData
    })
  },
  methods: {
    onSubmitSet() {
      console.log(this.fileData);
      this.$router.push({ path: '/payment' });
    },
    onBack() {
      this.$router.push({
        path: '/uploadfile'
      });
    }
  },
  created: function() {
    console.log(this.storeData);
    console.log(this.fileData);
    if (!this.storeData.value || this.fileData.length == 0) {
      this.$router.push({ path: '/chiocestore' });
      return;
    }
  }
};
</script>

<style>
</style>
