<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24" :xs="24">
                <el-form ref="queryParams" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="用户rid" prop="rid" :span="6">
                        <el-input v-model="queryParams.rid" placeholder="请输入用户rid" clearable size="small"
                            style="width: 100%" />
                    </el-form-item>
                    <!-- <el-form-item prop="regTime" :span="6">
                        <div class="block">
                            <span class="form-item-span">注册时间</span>
                            <el-date-picker size="small" v-model="queryParams.regTime" type="daterange" align="right" unlink-panels
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                :picker-options="pickerOptions" @change="handleQuery"></el-date-picker>
                        </div>
                    </el-form-item> -->
                    <!-- <el-form-item prop="lastlogin_time" :span="6">
                        <div class="block">
                            <span class="form-item-span">最后登陆时间</span>
                            <el-date-picker size="small" v-model="queryParams.lastlogin_time" type="daterange" align="right" unlink-panels
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                :picker-options="pickerOptions" @change="handleQuery"></el-date-picker>
                        </div>
                    </el-form-item> -->
                    <el-form-item prop="gold" :span="6">
                        <div class="block">
                            <el-col :span="4">
                                <span class="form-item-span">用户金币</span>
                            </el-col>
                            <el-col :span="6">
                                <el-input size="small" v-model="queryParams.gold.min" clearable></el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">-</el-col>
                            <el-col :span="6">
                                <el-input size="small" v-model="queryParams.gold.max" clearable></el-input>
                            </el-col>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item prop="lastLogin" :span="6">
                        <div class="block">
                            <span class="form-item-span">是否在线</span>
                            <el-select size="small" v-model="queryParams.isOnline" clearable placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item> -->
                    <!-- <el-form-item prop="recharge" :span="6">
                        <div class="block">
                            <el-col :span="4">
                                <span class="form-item-span">充值金币</span>
                            </el-col>
                            <el-col :span="6">
                                <el-input size="small" v-model="queryParams.recharge.min" clearable></el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">-</el-col>
                            <el-col :span="6">
                                <el-input size="small" v-model="queryParams.recharge.max" clearable></el-input>
                            </el-col>
                        </div>
                    </el-form-item> -->
                    <!-- <el-form-item prop="winningLosing" :span="6">
                        <div class="block">
                            <el-col :span="4">
                                <span class="form-item-span">总输赢</span>
                            </el-col>
                            <el-col :span="6">
                                <el-input size="small" v-model="queryParams.winningLosing.min" clearable></el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center;">-</el-col>
                            <el-col :span="6">
                                <el-input size="small" v-model="queryParams.winningLosing.max" clearable></el-input>
                            </el-col>
                        </div>
                    </el-form-item> -->
                    <el-form-item>
                            <el-button size="mini" icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" icon="el-icon-delete" @click="handleReset">重置</el-button>
                    </el-form-item>
                    <br />


                    <el-table :data="tableData" @selection-change="handleSelectionChange" >
                        <el-table-column type="selection" width="55" />
                        <el-table-column label="用户rid" align="center" prop="rid" />
                        <!-- <el-table-column label="是否在线" align="center" prop="isOnline">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.isOnline == 1">在线</el-tag>
                                <el-tag type="danger" v-else>离线</el-tag>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="昵称" align="center" prop="rolename" />
                        <el-table-column label="账号" align="center" prop="userName" />

                        <!-- <el-table-column label="注册时间" align="center" prop="regTime" />
                        <el-table-column label="最后登陆时间" align="center" prop="lastlogin_time" /> -->
                        <el-table-column label="用户金币" align="center" prop="gold" />
                        <!-- <el-table-column label="充值金币" align="center" prop="recharge" />
                            -->
                        <el-table-column label="渠道号" align="center" prop="channel" >
                        </el-table-column>

                    </el-table>
                </el-form>
            </el-col>
        </el-row>
        <div></div>
        <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
            @size-change="getList" />
    </div>
</template>

<script>
import { listPlayer } from '@/api/player/list';
export default {
    data() {
        return {
            //玩家数据
            tableData: [{
                rid: '1',
                online: 0,
                nickName: '1',
                userName: '1',
                signIn: '2020-01-01',
                lastLogin: '2020-01-01',
                gold: '100',
                recharge: '100',
                winningLosing: '100'
            },
            {
                rid: '2',
                online: 1,
                signIn: '2020-01-01',
                lastLogin: '2020-01-01',
                gold: '100',
                recharge: '100',
                winningLosing: '100'
            }],
            //搜索参数
            queryParams: {
                //分页参数
                pageNum: 1,
                pageSize: 10,
                //玩家id
                rid: '',
                //注册时间
                regTime: '',
                //最后登陆时间
                lastlogin_time: '',

                //金币
                gold: {
                    min: null,
                    max: null
                },
                //充值
                recharge: {
                    min: null,
                    max: null
                },
                //输赢
                winningLosing: {
                    min: null,
                    max: null
                },

                isOnline: null


            },
            options: [
                {
                    value: 0,
                    label: '离线'
                },
                {
                    value: 1,
                    label: '在线'
                }
            ],
            ids:[],
            total: 0,
            //搜索表单
            queryForm: {

            },
            player: {
                allGold: 10000000,
                allRecharge: 10000000,
                allWinningLosing: 10000000,
                todayWinningLosing: 10000000
            },

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
            //注册时间
            siginTime: '',
            //最后登陆时间
            lastTime: '',
        }
    },
    methods: {
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id)
            this.single = selection.length !== 1
            this.multiple = !selection.length
            console.log(this.ids);
        },
        //重置搜索表单
        handleReset() {
            this.queryParams = {
                //分页参数
                pageNum: 1,
                pageSize: 10,
                //玩家id
                rid: '',
                //注册时间
                regTime: '',
                //最后登陆时间
                lastlogin_time: '',
                //金币
                gold: {
                    min: null,
                    max: null
                },
                //充值
                recharge: {
                    min: null,
                    max: null
                },
                //输赢
                winningLosing: {
                    min: null,
                    max: null
                }
            }
            this.getList();
        },
        getList() {
            var query = {};
            query.pageNum = this.queryParams.pageNum;
            query.pageSize = this.queryParams.pageSize;
            listPlayer(this.queryParams).then((response) => {
                this.tableData = response.rows;
                this.total = response.total;

            })

        },
        //查询
        handleQuery() {
            console.log(this.queryParams);
            //表单验证
            this.$refs.queryParams.validate((valid) => {
                if (true) {
                    this.getList();
                } else {
                    return false;
                }
            });
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style lang="scss" scoped>
.form-item-span {
    color: #606266;
    font-weight: bold;
}

.form-item-span-font {
    color: red;
    font-weight: bold;
    /* 其他样式 */
}

.form-item-span-span {
    color: #666060;
    font-weight: bold;
    font-size: medium;
}
</style>