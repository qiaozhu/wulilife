<template>
  <div class="layout-content">
    <div class="print-logo-box">
      <img src="../../assets/img/print-logo.png"
        class="print-logo"
        alt="">
    </div>
    <div class="doc-title">选择门店</div>
    <div class="doc-subtitle">请选择就近门店，方便取件。</div>

    <group title="选择门店">
      <cell title="优惠">
        <span class="font-red">$ 1.50</span>
      </cell>
      <popup-picker title="门店"
        placeholder="请选择"
        popup-title="请选择"
        :data="storeList"
        v-model="storeVal"
        @on-change="onChange"
        show-name>
      </popup-picker>
    </group>
    <div class="button-box">
      <x-button type="primary"
        @click.native="onJumpStep">确定</x-button>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common';
import { GroupTitle, Group, PopupPicker, Cell, XButton } from 'vux';

export default {
  components: {
    GroupTitle,
    Group,
    PopupPicker,
    Cell,
    XButton
  },
  data: function() {
    return {
      storeList: [[{ name: '广东', value: 'gd' }, { name: '广西', value: 'gx' }]],
      storeVal: ['gd'],
      storeValObj: { name: '广东', value: 'gd' }
    };
  },
  created() {},
  methods: {
    // 选项变更保存选中对象
    onChange(val) {
      this.storeValObj = common.getArrayObject(val, 'value', this.storeList[0]);
    },
    onJumpStep() {
      if (this.storeVal.length == 0) {
        this.$vux.toast.show({
          text: '请选择门店',
          type: 'text'
        });
        return;
      }
      let printData = { ...this.$store.state.printData };
      printData.storeData = this.storeValObj;
      // 将选中门店数据存入store
      this.$store.dispatch('changePrintdata', printData);
      this.$router.push({ path: '/uploadfile' });
    }
  }
};
</script>

<style>
</style>
