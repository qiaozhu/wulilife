<template>
  <div class="layout-content">
    <div class="van-center"
      style="padding-top: 35px;">
      <img src="../../assets/img/vue-logo.png"
        alt=""
        class="print-logo">
    </div>
    <div class="doc-title">选择文件</div>
    <div class="doc-subtitle">文件格式为只能未word，Excel，pdf，jpg，PPT，caj。 为防止word版本不同导致格式变化，建议上传PDF格式。
    </div>
    <div class="van-panel bg-white">
      <div class="weui-uploader c-padding">
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
            <div class="van-pull-right">
              <i class="iconfont icon-chenggong van-c-green"></i>
              <span class="van-c-red"
                style="margin-left:20px"
                @click="onDeleteFile(index)">删除</span>
            </div>
            <div class="filelist-pull-left">
              <i class="iconfont icon-yundan van-c-gray"></i>
              <span style="padding-left:5px;">{{ el.filename }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-box">
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
  .van-center {
    text-align: center;
  }
  .filelist-pull-left {
    margin-right: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .van-pull-right {
    float: right;
    line-height: 38px;
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

  .c-padding {
    padding: 12px 15px;
  }

  .c-padding-lr {
    padding: 0 15px;
  }

  .c-padding-tb {
    padding: 12px 0;
  }

  .weui-uploader {
    padding: 12px 15px;
  }

  .uploader-row {
    height: 40px;
    line-height: 40px;
  }

  .uploader-filename {
    margin-right: 40px;
  }

  .bg-white {
    background: #ffffff;
  }

  .van-c-gray {
    color: #c9c9c9 !important;
  }

  .van-c-green {
    color: #06bf04 !important;
  }

  .van-c-red {
    color: #ff4444 !important;
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

  .submit-box {
    padding: 15px 0;
    margin: 10px 15px;
    font-size: 25px;
  }

  .submit-btn {
    width: 100%;
    margin-left: auto;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    margin-bottom: 0;
    margin-right: 0;
    color: #fff;
    background-color: #f44;
    border: none;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 45px;
    height: 45px;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
  }
  .submit-btn.default {
    color: #333;
    background-color: #fff;
    border: 1px solid #eee;
  }
</style>
