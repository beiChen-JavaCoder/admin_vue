<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable size="small" style="width: 240px"
              @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParams.status" placeholder="用户状态" clearable size="small" style="width: 240px">
              <el-option :key="0" label="正常" :value="0" />
              <el-option :key="1" label="停用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="用户编号" align="center" />
          <el-table-column prop="userName" label="用户名称" align="center" />
          <el-table-column prop="nickName" label="用户昵称" align="center" />
          <el-table-column prop="merchantEntId" label="商户ID" align="center">
            <template slot-scope="scope">
              <template>
                <el-tag type="" v-if="typeof scope.row.merchantEntId !== 'undefined' && scope.row.merchantEntId !== 0">{{
                  scope.row.merchantEntId }}</el-tag>
                <el-tag type="danger" v-else>未绑定</el-tag>
              </template>
            </template>


          </el-table-column>
          <!-- <el-table-column prop="phonenumber" label="手机号码" align="center" /> -->
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
                @change="handleStatusChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <!-- 编号为1的用户无法操作 -->
          <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">

            <template v-if="scope.row.id !== 1" slot-scope="scope">
              <template v-if="typeof scope.row.merchantEntId == 'undefined' || scope.row.merchantEntId == 0">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="handlebing(scope.row)">绑定</el-button>
              </template>
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
      @size-change="getList" />
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" @visible-change="handleClose" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio :key="'0'" :label="'0'">正常</el-radio>
                <el-radio :key="'1'" :label="'1'">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item v-if="form.id != undefined" label="用户密码">
              <div style="display: flex;">
                <el-input v-model="updatePassword" placeholder="输入更新密码" maxlength="20" :disabled="!showUpdatePassword"
                  @blur="handleBlur" />
                <el-checkbox v-model="showUpdatePassword" label="1" style="margin-left: 10px;">
                  选择
                </el-checkbox>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="用户名称" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" multiple placeholder="请选择角色" @change="hhh">
                <el-option v-for=" item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"
                  :disabled="item.status === 1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <div class="dialog-header">
              <div class="dialog-header-title" style="font-size: inherit; font-weight: inherit; color: inherit;">绑定商户信息
              </div>
            </div>
            <br>
            <el-col :span="12">
              <el-form-item label="商户名称">
                <el-input :disabled="disabled" v-model="form.merchantName" placeholder="请输入商户名" maxlength="30" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提现比例">
                <el-input :disabled="disabled" v-model="form.ratio" placeholder="请输入比例" maxlength="30" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="QQ">
                <el-input :disabled="disabled" v-model="form.qq" placeholder="请输入QQ" maxlength="30" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="微信">
                <el-input :disabled="disabled" v-model="form.wx" placeholder="请输入微信" maxlength="30" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="YY">
                <el-input :disabled="disabled" v-model="form.yy" placeholder="请输入YY" maxlength="30" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="渠道号" prop="channel" >
                  <el-input v-model="form.channel" placeholder="请填写渠道号" maxlength="30" :disabled="disabled" />
                </el-form-item>
              </el-col>
          </el-row>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="openBinding" width="600px" append-to-body>
      <el-form :ref="bindingForm" :model="bindingForm">
        <el-form-item :span="12">
          <el-input v-model="bindingForm.merchantId" placeholder="请输入商户编号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindingMerchant">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  changeUserStatus,
  changeUserMerchant
}
  from '@/api/system/user'
import {
  listAllRole,

}
  from '@/api/system/role'
export default {
  name: 'User',
  data() {
    return {
      //商户模块输入框
      disabled: false,
      // 查询参数
      showUpdatePassword: false,
      updatePassword: undefined,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        password: undefined,
        status: undefined
      },
      binding: {}, // 控制绑定状态
      inputValue: '', // 输入框的值
      //控制商户对话框显示
      merchantReveal: true,
      title: '',
      // 是否显示弹出层
      open: false,
      //是否弹出binding层
      openBinding: false,
      // 表单校验
      rules: {
        userName: [
          {
            pattern: /^[a-zA-Z0-9]{2,20}$/,
            message: '用户名称必须由2至20位英文或数字组成',
            trigger: 'blur'
          }

        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: '用户昵称长度必须介于 5 和 10 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        merchantName: [
          { required: true, message: '请输入商户名', trigger: "blur" },
          { min: 5, max: 10, message: '商户名长度必须介于 5 和 10 之间', trigger: 'blur' }

        ],
        qq: [
          { required: true, message: '请输入QQ账号', trigger: "blur" },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
          { min: 5, max: 10, message: 'QQ长度必须介于 5 和 10 之间', trigger: 'blur' }
        ],
        wx: [
          { required: true, message: '请输入微信号', trigger: "blur" },
          { pattern: /^[a-zA-Z0-9]+$/, message: '请输入数字或字母', trigger: 'blur' },
          { min: 5, max: 15, message: '微信号长度必须介于 5 和 10 之间', trigger: 'blur' }

        ],
        yy: [
          { required: true, message: '请输入YY号', trigger: "blur" },
          { pattern: /^[a-zA-Z0-9]+$/, message: '请输入数字或字母', trigger: 'blur' },
          { min: 5, max: 15, message: 'YY长度必须介于 5 和 10 之间', trigger: 'blur' }

        ],
        ratio: [
          { required: true, message: '请选择账户提现比例', trigger: "blur" },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
          { min: 5, max: 15, message: '提现比例长度必须介于 1 和 5 之间', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请填写渠道号', trigger: "blur" },
          { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' },
          { min: 5, max: 15, message: '请填写长度为5-10的数字', trigger: 'blur' }
        ]
      },

      // 角色选项
      roleOptions: [],
      // 显示搜索条件
      showSearch: true,
      // 遮罩层
      loading: true,
      // 用户表格数据
      userList: null,
      // 总条数
      total: 0,
      // 选中数组
      ids: [],
      // 表单参数
      form: {
      },
      //绑定表单
      bindingForm: {
        merchantEntId: ''
      },
      //对话框类型
      dialogType: null,
      //角色组
      roleIds: []
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {

    //绑定商户按钮
    handlebing(row) {
      //打开对话框
      this.disabled = true;
      this.bindingForm = row;
      this.openBinding = true;
    },
    //提交绑定
    bindingMerchant() {
      changeUserMerchant(this.bindingForm).then(() => {
        this.getList()
        this.openBinding = false;
        this.$message.success('绑定成功');

      })
    },
    handleClose() {
      console.log(this.merchantReveal);
    },
    //当焦点离开更新表单密码
    handleBlur() {
      this.form.password = this.updatePassword
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pafalse
      this.getList()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.openBinding = false
      this.merchantReveal = false
      this.reset()
    },
    /** 查询用户列表 */
    getList() {
      listUser(this.queryParams).then((response) => {
        this.userList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 用户状态修改
    handleStatusChange(row) {
      const text = row.status === '0' ? '启用' : '停用'
      this.$modal
        .confirm('确认要"' + text + '""' + row.userName + '"用户吗？')
        .then(function () {
          return changeUserStatus(row.id, row.status)
        })
        .then(() => {
          this.$modal.msgSuccess(text + '成功')
        })
        .catch(function () {
          row.status = row.status === '0' ? '1' : '0'
        })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {

      this.reset()
      const id = row.id || this.ids
      getUser(id).then((response) => {
        this.form = response.user
        this.roleOptions = response.roles
        this.$set(this.form, "roleIds", response.roleIds);
        this.open = true
        this.title = '修改用户'
        this.form.password = response.password
        this.form.merchantEntity = response.merchantEntity
        this.form.merchantName = response.merchantEntity.merchantName
        this.form.qq = response.merchantEntity.qq
        this.form.ratio = response.merchantEntity.ratio
        this.form.wx = response.merchantEntity.wx
        this.form.channel = response.merchantEntity.channel
        this.form.yy = response.merchantEntity.yy
      })
      this.disabled = true;

    },
    //绑定商户
    baningMerchant() {

    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        status: '0',
        remark: undefined,
        roleIds: [],
        merchantName: '',
        qq: '',
        ratio: '',
        wx: '',
        yy: ''
      }
      this.resetForm('form')
    },
    /** 新增用户 */
    handleAdd() {
      //打开商户对话框
      this.reset()
      listAllRole().then((response) => {
        this.roleOptions = response
        this.open = true
        this.title = '添加用户'
        console.log(this.roleOptions);

      })
      this.disabled = false;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除用户编号为"' + ids + '"的数据项？')
        .then(function () {
          return delUser(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => { })
    },
    /** 提交按钮 */
    submitForm: function () {

      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    }
  }
}
</script>
<style>
.dialog-header {
  display: flex;
  align-items: baseline;
}

.dialog-header .dialog-header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.dialog-header .dialog-header-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
