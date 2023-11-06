<template>
    <div class="app-container">
        <div>
            <div style="position: relative;">
                <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="玩家编号" prop="rid">
                        <el-input v-model="queryParams.rid" placeholder="请输入玩家编号" clearable size="small"
                            style="width: 240px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="交易凭证" prop="voucher">
                        <el-input v-model="queryParams.voucher" placeholder="请输入交易凭证" clearable size="small"
                            style="width: 240px" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    </el-form-item>
                </el-form>
                <!-- <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button type="primary" plain icon="el-icon-plus" :disabled="false" size="mini" @click="openDialog">新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="ids.length === 0" @click="handleDelete">删除</el-button>
            </el-col>
          </el-row> -->
                <el-table :data="tableData" stripe style="width: 100%" :expand-row-keys="expandedRows" v-loading="loading"
                    @selection-change="handleSelectionChange">
                    <el-table-column prop="rid" label="玩家编号" align="center" />
                    <el-table-column label="游戏币数量" prop="num" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.num" placement="top">
                                <div class="tooltip">{{ scope.row.num }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号类型" prop="accountType" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.accountType" placement="top">
                                <div class="tooltip">{{ scope.row.accountType }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="收款账号" prop="payeeAccount" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.payeeAccount" placement="top">
                                <div class="tooltip">{{ scope.row.payeeAccount }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="收款昵称" prop="payeeNickname" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.payeeNickname" placement="top">
                                <div class="tooltip">{{ scope.row.payeeNickname }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>

                    <el-table-column label="订单状态" prop="status" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.status" placement="top">
                                <div class="tooltip">{{ scope.row.status }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" prop="createTime" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.createTime" placement="top">
                                <div class="tooltip">{{ scope.row.createTime }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="超时时间" prop="timeOut" align="center">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.timeOut" placement="top">
                                <div class="tooltip">{{ scope.row.timeOut }}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-edit"
                                @click="openDialog(scope.row)">审核</el-button>
                            <!-- <el-button size="mini" type="text" icon="el-icon-delete"
                                @click="handleDelete(scope.row)">删除</el-button> -->
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
                                <el-form-item label="账号类型" prop="accountType">
                                    <el-input v-model="form.accountType" placeholder="微信" :disabled="true" maxlength="30" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="收款账号" prop="payeeAccount">
                                    <el-input v-model="form.payeeAccount" placeholder="收款账号" :disabled="true"
                                        maxlength="30" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="收款昵称" prop="wx">
                                    <el-input v-model="form.payeeNickname" placeholder="收款昵称" :disabled="true" maxlength="30" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="创建时间" prop="createTime">
                                    <el-input v-model="form.createTime" placeholder="创建时间" :disabled="true" maxlength="30" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="交易凭证" prop="voucher">
                                    <el-input v-model="form.voucher" placeholder="请输入交易凭证" maxlength="30" />
                                </el-form-item>
                            </el-col>

                        </el-row>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
                        <el-button @click="cancel">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
            <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum"
                @current-change="getList" @size-change="getList" />
        </div>
    </div>
</template>
  
<script>
import { sellMerchant, listItem, delMerchant,} from '@/api/content/item'
import {orderList,updateOrder } from '@/api/content/order'

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
                merchantName: undefined,
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

    methods: {
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id)
            this.single = selection.length !== 1
            this.multiple = !selection.length
        },
        getList() {
            console.log(this.queryParams)
            orderList(this.queryParams).then((response) => {
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
                .confirm("是否确认审核玩家编号" + form.rid+"的提现订单")
                .then(function () {
                    return updateOrder(form)
                })
                .then(() => {
                    this.getList()
                    this.$modal.msgSuccess('审核已提交')
                })
                .catch(() => { })
            this.coinsale = false;
        },
        // 取消按钮
        cancel() {
            this.coinsale = false
        },
        openDialog() {
            this.coinsale = true
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
  