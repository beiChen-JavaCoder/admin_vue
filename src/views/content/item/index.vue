<template>
  <div class="app-container">
    <div>
      <div style="position: relative;">
        <el-table :data="tableData" border="true" stripe style="width: 100%" :expand-row-keys="expandedRows"
          v-loading="loading">
          <el-table-column label="商行" width="aotu" prop="merchant" header-align="center" align="left">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.name" placement="top">
                <div class="tooltip">{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="QQ" prop="qq" width="aotu" header-align="center" align="left">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.qq" placement="top">
                <div class="tooltip">{{ scope.row.qq }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="微信/YY" prop="wx" width="aotu" header-align="center" align="left">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.wx" placement="top">
                <div class="tooltip">{{ scope.row.wx }}/{{ scope.row.yy }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="openDialog(scope.row)">出售金币</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <div>
        <el-dialog :visible.sync="coinsale">
          <span slot="title">出售金币</span>
          <el-form ref="form" :model="form" withdraw>
            <el-form-item label="游戏商行:" style="display: inline-block; white-space: nowrap;">
            </el-form-item>
            <br>
            <el-form-item label="出售比例:" style="display: inline-block; white-space: nowrap;">
            </el-form-item>
            <br>
            <el-form-item label="出售金币:" style="display: inline-block; white-space: nowrap;">
              <el-input class="full-width-input" v-model="form.gold" placeholder="出售金币1100000-550000000" type="text"
                tabindex="1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="账户类型:" style="display: inline-block; white-space: nowrap;">
              <el-input class="full-width-input" v-model="form.accountType" type="text" tabindex="1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="收款账户:" style="display: inline-block; white-space: nowrap;">
              <el-input class="full-width-input" v-model="form.account" placeholder="请输入提现账号" type="text"
                tabindex="1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="收款昵称:" style="display: inline-block; white-space: nowrap;">
              <el-input class="full-width-input" v-model="form.nickname" placeholder="请输入提现账号昵称" type="text"
                tabindex="1"></el-input>
            </el-form-item>
            <br>
            <div class="submit-button-centre">
              <el-button type="primary" round>主要按钮</el-button>
            </div>


          </el-form>
        </el-dialog>
      </div>



      <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
        @size-change="getList" />
    </div>
  </div>
</template>

<script>
import {
  listItem
}
  from '@/api/content/item'

export default {
  name: 'Item',
  data() {
    return {
      tableData: [
      ],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyWord: undefined,
        status: 0,
        engine: 0,
        dataRange: undefined

      },
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      showSearch: true,
      coinsale:null
    }
  },
  // loading: false,
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {

      listItem().then((response) => {
        this.tableData = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    pageGetList() {
      //搜索栏搜索默认返回第一页数据
      this.queryParams.pageNum = 1
      console.log(this.queryParams.pageNum)
      this.getList()
    },
    openDialog(row) {
      this.form = row;
      this.coinsale = true;
    }
  }
}
</script>



<style>
.demo-table-expand {
  font-size: 0;
}

.full-width-input {
  width: 100%;
  /* 设置宽度为100% */
}

.centered-title {
  display: block;
  text-align: center;
  font-size: 250%;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.submit-button-centre {
  display: flex;
  justify-content: center;
}
</style>
