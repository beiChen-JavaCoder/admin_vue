<template>
  <div class="app-container">
    <div>
      <div style="position: relative;">
        <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="商行名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入商行名称" clearable size="small" style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" :disabled="false" size="mini" @click="openDialog">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="ids.length === 0" @click="handleDelete">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" 
        :expand-row-keys="expandedRows" 
        v-loading="loading" 
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="商行编号" align="center" />
          <el-table-column label="商行" prop="merchant" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.name" placement="top">
                <div class="tooltip">{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="QQ" prop="qq" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.qq" placement="top">
                <div class="tooltip">{{ scope.row.qq }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="微信/YY" prop="wx" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.wx" placement="top">
                <div class="tooltip">{{ scope.row.wx }}/{{ scope.row.yy }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
              <!-- <el-button size="mini" type="text" icon="el-icon-coin" @click="openDialog(scope.row)">出售金币</el-button> -->
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
                <el-form-item label="商户名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入商户名" maxlength="30" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="QQ" prop="qq">
                  <el-input v-model="form.qq" placeholder="请输入QQ" maxlength="30" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="微信" prop="wx">
                  <el-input v-model="form.wx" placeholder="请输入微信" maxlength="30" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="YY" prop="wx">
                  <el-input v-model="form.yy" placeholder="请输入YY" maxlength="30" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="提现比例" prop="ratio">
                  <el-input v-model="form.ratio" placeholder="请输入比例" maxlength="30" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
        <!-- <el-dialog :visible.sync="coinsale">
          <span slot="title" style="height: 100%; width: 150%;">出售金币</span>
          <el-form ref="form" :model="form" :rules="rules" withdraw>
            <el-form-item label="游戏商行:" style="display: inline-block; white-space: nowrap;">
              <div>{{ form.name }}</div>
            </el-form-item>
            <br>
            <el-form-item label="出售比例:" style="display: inline-block; white-space: nowrap;">
              <div>{{ form.ratio }}</div>
            </el-form-item>
            <br>
            <el-form-item label="出售金币:" style="display: inline-block; white-space: nowrap;" prop="num">
              <el-input class="full-width-input" v-model="form.num" placeholder="出售金币1100000-550000000" type="text"
                tabindex="1"></el-input>

            </el-form-item>
            <br>
            <el-form-item label="账户类型:" style="display: inline-block; white-space: nowrap;" prop="accountType">
              <template>
                <el-select v-model="form.accountType" clearable placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
            <br>
            <el-form-item label="收款账户:" style="display: inline-block; white-space: nowrap;" prop="account">
              <el-input class="full-width-input" v-model="form.account" placeholder="请输入提现账号" type="text"
                tabindex="1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="收款昵称:" style="display: inline-block; white-space: nowrap;" prop="nickname">
              <el-input class="full-width-input" v-model="form.nickname" placeholder="请输入提现账号昵称" type="text"
                tabindex="1"></el-input>
            </el-form-item>
            <br>
            <div class="submit-button-centre">
              <el-button type="primary" @click="validateForm('sell')">出售</el-button>
            </div>
          </el-form>
        </el-dialog> -->
      </div>
      <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
      @size-change="getList" />
    </div>
  </div>
</template>

<script>
import { sellMerchant, listItem, delMerchant,addMerchant } from '@/api/content/item'

export default {
  name: 'Item',
  data() {
    return {
      options: [{
        value: 'A',
        label: '支付宝'
      }, {
        value: 'B',
        label: '微信'
      }],
      value: '',
      tableData: [
      ],
      // 选中数组
      ids: [],
      // 表单参数
      form: {},
      // 查询参数
      queryParams: {
        name: undefined,
        pageNum: 1,
        pageSize: 10,
        dataRange: undefined

      },
      // 是否显示弹出层
      open: false,
      // 总条数
      total: 0,
      showSearch: true,
      coinsale: false,
      //表单验证
      rules: {
        name: [
          { required: true, message: '请输入商户名', trigger: 'blur' },
        ],
        qq: [
          { required: true, message: '请输入提现账号', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
        ],
        wx: [
          { required: true, message: '请输入微信或YY', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '请输入数字或字母', trigger: 'blur' }
        ],
        ratio: [
          { required: true, message: '请选择账户提现比例', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入数字或字母', trigger: 'blur' }
        ]

      }
    }
  },
  // loading: false,
  watch: {},
  created() {
    this.getList()
  },

  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    getList() {
      listItem(this.queryParams).then((response) => {
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
    /** 删除按钮操作 */
    handleDelete(row) {

      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除用户编号为"' + ids + '"的数据项？')
        .then(function () {
          return delMerchant(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => { })
    },
    /** 新增商户 */
    submitForm(form) {
      this.$modal
        .confirm("是否新增商户" + form.name)
        .then(function () {
          return addMerchant(form)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('新增成功')
        })
        .catch(() => { })
      this.coinsale= false;
    },
    // 取消按钮
    cancel() {
      this.coinsale = false
    },
    openDialog() {
      this.coinsale = true;
      console.log("test");
    },
    validateForm(action) {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 验证通过，执行出售操作
          this.sell(this.form);
          //完成请求退出对话框
          this.coinsale = false;
        } else {
          // 验证未通过，给出提示信息
          this.$message.error('请填写正确的表单信息');
        }
      });

    },
    sell(form) {
      sellMerchant(form).then((response) => {
        if (response.rows != null) {
          $message("提现成功")
        } else {
          $message("提现失败")
        }
      })
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
