<template>


  <div class="app-container">

    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="模糊搜索" prop="keyword">
            <el-input v-model="queryParams.keyword" placeholder="请输入摘要关键字" clearable size="small" style="width: 240px"
              @keyup.enter.native="getList" />
          </el-form-item>
          <el-form-item label="数据状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="" clearable size="small">
              <el-option :key="0" label="暂未开发" :value="0" />
              <el-option :key="1" label="暂未开发" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型" prop="engine">
            <el-select v-model="queryParams.engine" placeholder="" clearable size="small" @click="getList">
              <el-option :key="0" label="全部" :value="0" />
              <el-option :key="1" label="facebook" :value="1" />
              <el-option :key="2" label="google" :value="2" />
              <el-option :key="3" label="twitter" :value="3" />
              <el-option :key="4" label="reddit" :value="4" />
              <el-option :key="5" label="linkedin" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="日期选择" prop="dataRange">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker v-model="queryParams.dataRange" value-format="yyyy-MM-dd" type="daterange"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" border="true" stripe style="width: 100%" :expand-row-keys="expandedRows">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID" style="display: inline-block; white-space: nowrap;">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <hr>
            <el-form-item label="原文地址" style="display: inline-block; white-space: nowrap;">
              <span>{{ props.row.link }}</span>
            </el-form-item>
            <hr>
            <el-form-item label="标题翻译" style="display: inline-block; white-space: nowrap;">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <hr>
            <el-form-item label="摘要翻译" style="display: inline-block; white-space: nowrap;">
              <span>{{ props.row.snippet }}</span>
            </el-form-item>
            <hr>
            <el-form-item label="来源" style="display: inline-block; white-space: nowrap;">
              <span>{{ props.row.engine }}</span>
            </el-form-item>
            <hr>
            <el-form-item label="收录时间" style="display: inline-block; white-space: nowrap;">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <hr>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="aotu" prop="title" header-align="center" align="left">
      </el-table-column>
      <el-table-column label="摘要翻译" prop="snippet" width="aotu" header-align="center" align="left">
      </el-table-column>
      <el-table-column label="收录时间" prop="time" width="160px" align="center">
      </el-table-column>
      <el-table-column label="操作" width="80px" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.link" style="color: #409eff;" target="_blank">查看</a>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
      @size-change="getList" />
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

hr {
  border: none;
  border-top: 1px dashed #ccc;
  margin: 10px 0;
}
</style>
<script>
import {
  listItem
}
  from '@/api/content/item'

export default {
  name: 'Item',
  data() {
    return {
      tableData: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyWord: undefined,
        status: 0,
        engine: 0,
        dataRange: undefined

      },
      title: '',
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      showSearch: true
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      listItem(this.queryParams).then((response) => {
        this.tableData = response.rows
        this.total = response.total
        this.loading = false
      })
    }
  }
}
</script>

