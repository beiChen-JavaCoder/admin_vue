<template>
  <div class="app-container">
    <div>
      <div style="position: relative;">
        <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="玩家id：" prop="userName">
            <el-input v-model="queryParams.id" placeholder="玩家id" clearable size="small" style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" :expand-row-keys="expandedRows" v-loading="loading"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="rid" label="玩家id" align="center" />
          <el-table-column label="用户名" prop="userName" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.userName" placement="top">
                <div class="tooltip">{{ scope.row.userName }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="角色昵称" prop="rolename" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.rolename" placement="top">
                <div class="tooltip">{{ scope.row.rolename }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="金币" prop="gold" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.gold" placement="top">
                <div class="tooltip">{{ scope.row.gold }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="openDialog(scope.row)">充值</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <div>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="coinsale" width="600px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户名">
                  <el-input v-model="form.userName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色昵称">
                  <el-input v-model="form.rolename" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="充值数量">
                  <el-input-number v-model="form.num"></el-input-number>
                </el-form-item>
                <el-form-item label="金币数量">
                  {{ calculatedCoins }}
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>

        <br>
      </div>
      <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
        @size-change="getList" />
    </div>
  </div>
</template>

<script>
import { listRole, updategold } from '@/api/content/role'

export default {
  name: 'Item',
  data() {
    return {
      value: '',
      tableData: [
      ],
      // 选中数组
      ids: [],
      // 表单参数
      form: {
        num: 0, // 充值数量初始值
        gold:0
      },
      // 查询参数
      queryParams: {
        name: undefined,
        pageNum: 1,
        pageSize: 10,
        status: 0,
        dataRange: undefined

      },
      // 总条数
      total: 0,
      showSearch: true,
      coinsale: false,
      //表单验证
      rules: {
        qq: [
          { required: true, message: '请输入提现账号', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
        ]

      }
    }
  },
  // loading: false,
  watch: {},
  created() {
    this.getList()
  },
  computed: {
    calculatedCoins() {

      const num = parseFloat(this.form.num);

      // 根据充值数量计算金币数量的逻辑
      // 假设每个充值数量对应 10 个金币
      return num * 100 ;
    }
  },

  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    getList() {
      listRole(this.queryParams).then((response) => {
        this.tableData = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 充值金币 */
    submitForm(form) {
      const clas = this.calculatedCoins
      this.$modal
        .confirm("是否为" + form.userName + "充值" + clas + "的金币")
        .then(function () {
          form.num = clas
          return updategold(form)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('充值成功')
        })
        .catch(() => { })
        this.getList()
      this.coinsale = false;
    },
    // 取消按钮
    cancel() {
      this.coinsale = false
    },
    openDialog(row) {
      this.form.rid = row.rid;
      this.form.userName = row.userName;
      this.form.rolename = row.rolename;
      this.coinsale = true;
      console.log("test");
    },
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
