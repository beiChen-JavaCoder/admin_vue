<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24" :xs="24">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="用户rid" prop="rid" :span="6">
                        <el-input v-model="queryParams.rid" placeholder="请输入用户rid" clearable size="small"
                            style="width: 100%" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item prop="signIn" :span="6">
                        <div class="block">
                            <span class="form-item-span">时间</span>
                            <el-date-picker size="small" v-model="queryParams.time" type="daterange" align="right" unlink-panels
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                :picker-options="pickerOptions" @change="handleQuery"></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item prop="lastLogin" :span="6">
                        <div class="block">
                            <span class="form-item-span">游戏</span>
                            <el-select size="small" v-model="queryParams.game" clearable placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div>
                            <el-button size="mini" icon="el-icon-search" type="primary">搜索</el-button>
                            <el-button size="mini" icon="el-icon-delete" >重置</el-button>
                            <el-button size="mini" type="danger" icon="el-icon-">导出</el-button>
                        </div>
                    </el-form-item>
                    <el-table :data="tableData">
                        <el-table-column label="时间" align="center" prop="time" />
                        <el-table-column label="rid" align="center" prop="rid" />
                        <el-table-column label="标识" align="center" prop="identifying" />
                        <el-table-column label="游戏下注" align="center" prop="betting" />
                        <el-table-column label="下注赢取" align="center" prop="earn" />
                        <el-table-column label="金币变化" align="center" prop="goldChange" />
                        <el-table-column label="变动前金币" align="center" prop="goldBefore" />
                        <el-table-column label="变动后金币" align="center" prop="goldAfter" />
                        <el-table-column label="总输赢" align="center" prop="winningLosing" />
                    </el-table>
                    </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //流水信息
            tableData: [{
                time: '2020-01-01',
                rid: '1',
                identifying: '1',
                betting: '1',
                earn: '1',
                goldChange: '1',
                goldBefore: '1',
                goldAfter: '1',
                winningLosing: '1'
            },{
                time: '2020-01-01',
                rid: '1',
                identifying: '1',
                betting: '1',
                earn: '1',
                goldChange: '1',
                goldBefore: '1',
                goldAfter: '1',
                winningLosing: '1'
            }
],
            //搜索参数
            queryParams: {
                rid: '',
                time: '',
                game: ''
            },
            //搜索表单
            queryForm: {

            },
            options:{

                game1: {
                    value: '1',
                    label: '骰子'
                },
                game2: {
                    value: '2',
                    label: '金花'
                },
                game3: {
                    value: '3',
                    label: '斗地主'
                },



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
            lastTime: ''
        }
    },
    methods: {
        handleQuery(){

        }
    }
}
</script>

<style lang="scss" scoped>
.form-item-label-container {
    width: 200px;
    /* 设置合适的宽度 */
    display: inline-block;
    white-space: nowrap;
    overflow: visible;
    /* 显示完整内容 */
    text-overflow: clip;
    /* 不省略溢出部分 */
}
.form-item-span{
    color: #606266;
    font-weight: bold;
}
</style>