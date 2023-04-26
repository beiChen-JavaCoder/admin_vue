<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form
          v-show="showSearch"
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="模糊搜索" prop="title">
            <el-input
              v-model="queryParams.title"
              placeholder="请输入关键字"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="数据状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="" clearable size="small">
          <el-option :key="0" label="全部" :value="0" />
          <el-option :key="1" label="推荐" :value="1" />
        </el-select>
      </el-form-item>
          <el-form-item label="数据类型" prop="type">
            <el-select v-model="queryParams.type" placeholder="" clearable size="small">
              <el-option :key="0" label="全部" :value="0" />
              <el-option :key="1" label="facebook" :value="1" />
              <el-option :key="2" label="twitter" :value="2" />
              <el-option :key="3" label="google" :value="3" />
              <el-option :key="4" label="reddit" :value="4" />
              <el-option :key="5" label="linkedin" :value="5" />
            </el-select>
        </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
            >搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
   
    <el-table
    :data="tableData"
    style="width: 100%" :expand-row-keys="expandedRows">
    <el-table-column type="expand" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="ID" style="display: block;">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="原文地址" style="display: block;" >
            <span>{{ props.row.link }}</span>

          </el-form-item>
          <el-form-item label="标题翻译" style="display: block;">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="摘要翻译" style="display: block;">
            <span>{{ props.row.snippet }}</span>
          </el-form-item>
          <el-form-item label="收录时间" style="display: block;">
            <span>{{ props.row.time }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="标题" width="100"
      prop="title">
    </el-table-column>
    <el-table-column
      label="摘要翻译"
      prop="snippet" width="auto">
    </el-table-column>
    <el-table-column
      label="收录时间"
      prop="time" width="auto">
    </el-table-column>
    <el-table-column label="操作" width="auto">
  <div>
    <el-link style="color: cornflowerblue;" :href="address" target="_self">
      查看<i class="el-icon-view el-icon--right"></i>
    </el-link>
  </div>
</el-table-column>

  </el-table>
  
  <el-pagination
      :page-size.sync="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      :current-page.sync="queryParams.pageNum"
      @current-change="getList"
      @size-change="getList"
/>
  </div>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  
</style>


<script>
import {
  listItem,
}
from '@/api/content/item'

export default {
  name: 'Article',
  data() {
    return {
      tableData: [{
            id: ,
            link: '好滋好味鸡蛋仔',
            title: '江浙小吃、小吃零食',
            snippet: '荷兰优质淡奶，奶香浓而不腻',
            time: '上海市普陀区真北路',
          },{
            id: '12987126',
            link: '好滋好味鸡蛋仔',
            title: '江浙小吃、小吃零食',
            snippet: '荷兰优质淡奶，奶香浓而不腻',
            time: '上海市普陀区真北路',
          }],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        keyword: undefined,
        status: undefined,
         // 设置默认选项为 '全部'
        type: 0,
        address: 'www.baidu.com'
      },
      title: '',
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      articleList: [],
      showSearch: true
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods:{
    getList(){
      this.loading = true
      listItem(this.queryParams).then((response) => {
          queryParams.
       

      })
    }
  }
}
</script>
