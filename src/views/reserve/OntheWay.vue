<template>
  <div class="layout-content-list">
    <el-breadcrumb separator=">"
      class="bc-nav">
      <el-breadcrumb-item>
        <i class="iconfont icon-home icon-t-1"></i>
        <span>在途运单</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="toolbar-panel">
      <div class="toolbar-row">
        <div class="toolbar-item">
          <span class="item-label">支付日期</span>
          <el-date-picker v-model="timeRange"
            type="daterange"
            placeholder="选择日期范围"
            @change='chioceTime'
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="toolbar-item">
          <span class="item-label">筛选条件</span>
          <el-input v-model="filter.keyword"
            style="width:220px"
            suffix-icon="el-icon-search"
            placeholder="请输入站点,客户,手机号码">
          </el-input>
        </div>
        <div class="toolbar-item"
          v-if="isManager">
          <span class="item-label">站点筛选</span>
          <el-select v-model="filter.storeid"
            placeholder="请选择"
            filterable
            style="width:210px;">
            <el-option v-for="item in siteArrList"
              :label="item.storecore.storename"
              :value="item.storecore.storeid"
              :key="item.storecore.storeid">
            </el-option>
          </el-select>
        </div>
        <div class="toolbar-item">
          <el-button type="primary"
            size="small"
            @click="screen">筛选</el-button>
          <el-button type="primary"
            size="small"
            @click="exportList">导出数据</el-button>
        </div>
        <div class="toolbar-totaltip">
          订单数：
          <span class="font-red">{{tableData.count}}单</span>
          <span class="pl-20">实收金额：</span>
          <span class="font-red">{{tableData.sellerincometotal==""?0:tableData.sellerincometotal | thousands(2)}}元</span>
        </div>
      </div>
    </div>
    <el-table :data="tableData.list"
      border>
      <el-table-column label="订单号"
        class-name="font-green pointer"
        min-width="180">
        <template slot-scope="scope">
          <div @click="goToOrderDetail(scope.row.orderno)">{{scope.row.orderno}}</div>
        </template>
      </el-table-column>
      <el-table-column label="支付日期"
        min-width="140">
        <template slot-scope="scope">
          <div>{{scope.row.paytime|stamp2TextDateFull}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="storename"
        label="站点"
        min-width="140"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="buyername"
        label="客户"
        min-width="125">
      </el-table-column>
      <el-table-column prop="buyermobile"
        label="手机号码"
        min-width="110">
      </el-table-column>
      <el-table-column prop="goodsskuname"
        label="品项"
        min-width="90">
      </el-table-column>
      <el-table-column prop="number"
        label="数量(升/千克)"
        min-width="100">
      </el-table-column>
      <el-table-column label="实收金额（元）"
        min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.sellerincomemoney}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-fix">
      <el-pagination :page-size="20"
        :current-page.sync="currentPage"
        :total="tableData.count"
        @current-change="currentChange"
        layout="total, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import common from '@/assets/js/common';
import biz from '@/assets/js/biz';
import axios from '@/assets/js/axios';
import api from '@/api/order.api';

export default {
  data: function() {
    return {
      isManager: false, //默认不为管理员;
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      timeRange: [common.time.timestart, common.time.timeend],
      currentPage: 1,
      toolexpand: false,
      siteArrList: [],
      filter: {
        //筛选条件
        begintime: common.time.timestart,
        endtime: common.time.timeend,
        storeid: '0',
        keyword: ''
      },
      cache: {}, //缓存筛选条件
      tableData: {}
    };
  },
  created: function() {
    this.isManager = biz.currentData().employee.manager;
    var options = {
      regioncode: '',
      keyword: '',
      currentpage: 1,
      pagesize: 1000
    };
    if (this.isManager) {
      axios({
        method: 'POST',
        url: api.siteList,
        data: options
      }).then((response) => {
        if (!response) return;
        if (response.status == 0) {
          this.siteArrList = response.data.list;
          if (this.isManager) {
            var allStore = {
              storecore: {
                storename: '全部',
                storeid: '0'
              }
            };
            this.siteArrList.unshift(allStore);
          }
        } else {
          this.$message.error(response.msg);
        }
      });
    }
    this.cache = { ...this.filter };
    this.axiosRequest();
  },
  methods: {
    //筛选查询
    screen: function() {
      if (this.filter.endtime == 0) {
        this.$message.warning('请选择查询的时间范围');
        return;
      }
      this.cache = { ...this.filter };
      // 在第一页时直接查询  不在第一页时通过设置currentpage来自动改变数据
      this.currentPage == 1 ? this.axiosRequest() : (this.currentPage = 1);
    },
    // 导出表格
    exportList: function() {},
    selectSourceCode: function(data) {
      this.filter.sourceCode = data.id;
    },
    selectTargetCode: function(data) {
      this.filter.targetCode = data.id;
    },
    //选择时间范围回调
    chioceTime: function(val) {
      if (val) {
        this.filter.begintime = Date.parse(val[0]);
        this.filter.endtime = Date.parse(val[1]);
      } else {
        this.filter.begintime = 0;
        this.filter.endtime = 0;
      }
    },
    goToOrderDetail: function(orderNum) {
      //点击到详情页面
      this.$router.push({ path: '/orderDetail/' + orderNum });
    },
    //分页点击
    currentChange: function(val) {
      this.axiosRequest({
        currentpage: val,
        count: this.tableData.count
      });
    },
    axiosRequest: function(opts) {
      var options = { currentpage: 1, pagesize: 20 };
      //筛选时 带上查询参数
      options = common.JSONextend(options, this.cache);
      //合并其他提交参数(这里只有page)
      options = common.JSONextend(options, opts);
      // 结束时间加1天
      options.endtime = options.endtime + common.time.oneday;
      axios({
        method: 'POST',
        url: api.orderList,
        data: options
      }).then((response) => {
        if (!response) return;
        if (response.status == 0) {
          if (response.data.count == 0) {
            this.$message.warning('未查询到数据，请重新筛选');
          }
          this.tableData = response.data;
        } else {
          this.$message.error(response.msg);
        }
      });
    }
  }
};
</script>
