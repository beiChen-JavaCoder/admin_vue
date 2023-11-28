<template>
  <div>
    <div>
      <el-form>
        <el-row>
          <el-col :span="24" :xs="24">

            <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
              <el-form-item>
                <span  style="color: red; font-size: large;">税收百分比:{{ taxPercentage }}</span>
              </el-form-item>
              <el-form-item prop="signIn" :span="6">
                <div class="block">
                  <span class="form-item-span">时间</span>
                  <el-date-picker v-model="queryParams.sectionTime" type="daterange" align="right" unlink-panels
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-button size="small" icon="el-icon-search" type="primary" @click="handleQuery">立即查询</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData">
        <el-table-column label="id" align="left" prop="id" />
        <el-table-column label="日期" align="left" prop="sectionTime" />
        <el-table-column label="税收金额" align="left" prop="num" />
      </el-table>
    </div>

  </div>
</template>
  
<script>
import { merchantRatio } from "@/api/content/item";
import { listRevenue } from "@/api/game/revenue";

export default {
  data() {
    return {
      //税收百分比
      merchant:{
        ratio: '',

      },
      queryParams: {
        pageNum: 1,
        pageSize:10,
        time: null
      },
      tableData: [
        {
          id: "1",
          time: "1",
          num: "1",
        },
        {
          id: "2",
          time: "2",
          num: "2",
        }
      ],
      //时间选择器
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  methods:{
    getList(){
      listRevenue(this.queryParams).then((response)=>{
        this.tableData = response.rows;
        this.total = response.total;

      })
    },
    //获取税收百分比
    getMerchant(){
      merchantRatio().then((response)=>{
        this.merchant = response
        console.log(response.ratio);
      })
    },
    handleQuery(){

    }
  },
  computed: {
    taxPercentage() {
      return (this.merchant.ratio / 10000 * 100).toFixed(2) + '%';
    }
  },
  created(){
    this.getList();
    this.getMerchant();

  }
};
</script>
<style>
.form-item-span {
    color: #606266;
    font-weight: bold;
}
</style>
  