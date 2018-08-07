<template>
  <div class="layout-content">
    <div class="print-logo-box">
      <img src="../../assets/img/print-logo.png"
        alt=""
        class="print-logo">
    </div>
    <div class="doc-title">选择文件</div>
    <div class="doc-subtitle">文件格式为只能未word，Excel，pdf，jpg，PPT，caj。 为防止word版本不同导致格式变化，建议上传PDF格式。
    </div>
    <div class="upload-panel">
      <div style="padding:12px 15px;">
        <div>
          <div>
            <a href="javascript:;"
              class="upload-filebtn">选择文件
              <input type="file"
                ref="fileArr"
                name=""
                @change="onFileChange">
            </a>
          </div>
          <div style="margin-top:10px;">一个订单最多上传6个文件，单个文件不可大于10M</div>
        </div>
        <div style="margin-top:10px;">
          <div v-for="(el,index)  in fileList"
            :key="index"
            class="uploader-row">
            <div class="filelist-pull-right">
              <i class="iconfont icon-chenggong font-green"></i>
              <span class="font-red"
                style="margin-left:20px"
                @click="onDeleteFile(index)">删除</span>
            </div>
            <div class="filelist-pull-left">
              <i class="iconfont icon-orderBlank font-gray"></i>
              <span style="padding-left:5px;">{{ el.filename }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-box">
      <x-button type="primary"
        @click.native="onSubmitFile">确定</x-button>
      <x-button @click.native="onBack">返回</x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux';
import { mapState } from 'vuex';
export default {
  components: {
    XButton
  },
  data: function() {
    return {
      fileList: [
        {
          filename: '理综试卷.pdf',
          filetype: 'pdf',
          number: 1,
          size: ['A4'],
          color: ['黑白'],
          page: ['单面'],
          composite: []
        },
        {
          filename: '准考证.png',
          filetype: 'png',
          number: 1,
          size: ['A4'],
          color: ['黑白'],
          page: ['单面'],
          composite: []
        }
      ]
    };
  },
  computed: {
    ...mapState({
      storeData: (state) => state.printData.storeData
    })
  },
  methods: {
    submitForm: function(type) {}
  },
  created: function() {
    if (!this.storeData.value) {
      this.$router.push({ path: '/chiocestore' });
      return;
    }
  },
  methods: {
    onFileChange() {
      console.log(this.$refs.fileArr);
      console.log(this.$refs.fileArr.files);
      const file = this.$refs.fileArr.files[0];
      this.fileList.push({
        filename: file.name,
        filetype: file.type,
        number: 1,
        size: ['A4'],
        color: ['黑白'],
        page: ['单面'],
        composite: []
      });
      //   return;
      //   var oMyForm = new FormData();
      //   oMyForm.append('timestamp', +new Date());
      //   oMyForm.append('userfile', this.target.files);
      //   var oXHR = new XMLHttpRequest();
      //   oXHR.open('POST', '/WXClass/upload');
      //   oXHR.send(oMyForm);
    },
    onDeleteFile(index) {
      this.fileList.splice(index, 1);
    },
    onSubmitFile() {
      if (this.fileList.length == 0) {
        this.$vux.toast.show({
          text: '请选择文件',
          type: 'text'
        });
        return;
      }

      let printData = { ...this.$store.state.printData };
      printData.fileData = this.fileList;
      // 将文件数据存入store
      this.$store.dispatch('changePrintdata', printData);
      this.$router.push({ path: '/setconfig' });
    },
    onBack() {
      this.$router.push({
        path: '/chiocestore'
      });
    }
  }
};
</script>

<style>
  .upload-panel {
    background: #ffffff;
  }

  .uploader-row {
    height: 40px;
    line-height: 40px;
  }
  .filelist-pull-left {
    margin-right: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .filelist-pull-right {
    float: right;
    line-height: 38px;
  }
  .uploader-filename {
    margin-right: 40px;
  }

  .upload-filebtn {
    position: relative;
    display: inline-block;
    background: #d0eeff;
    overflow: hidden;

    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #4b0;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px;
    text-align: center;
    vertical-align: middle;

    font-size: 14px;
  }

  .upload-filebtn input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
