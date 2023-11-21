<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24" :xs="24">
                <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
                    <el-form-item label="用户rid" prop="rid" :span="6">
                        <el-input v-model="queryParams.rid" placeholder="请输入用户rid" clearable size="small"
                            style="width: 100%" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item :span="6">
                        <div class="block">
                            <span class="form-item-span">时间</span>
                            <el-date-picker v-model="queryParams.sectionTime" type="daterange" align="right" unlink-panels
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item prop="lastLogin" :span="6">
                        <div class="block">
                            <span class="form-item-span">游戏</span>
                            <el-select size="small" v-model="queryParams.gameId" clearable placeholder="请选择"
                                @change="handleQuery">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div>
                            <el-button size="mini" icon="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
                            <el-button size="mini" icon="el-icon-delete" @click="reset">重置</el-button>
                        </div>
                    </el-form-item>
                    <el-table :data="tableData" @selection-change="handleSelectionChange" >
                        <el-table-column type="selection" width="55" />
                        <el-table-column label="id" align="center" prop="id" />
                        <el-table-column label="时间" align="center" prop="createTime" />
                        <el-table-column label="rid" align="center" prop="rid" />
                        <el-table-column label="变动前金币" align="center" prop="beforeTotal" />
                        <el-table-column label="变动后金币" align="center" prop="afterTotal" />
                        <el-table-column label="总输赢" align="center" prop="num" />
                    </el-table>
                </el-form>
            </el-col>
        </el-row>
        <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
            @size-change="getList" />
    </div>
</template>

<script>
import { flowList } from "@/api/player/flow";
export default {
    data() {
        return {
            //流水信息
            tableData: [],
            //搜索参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                rid: null,
                sectionTime: null,
                gameId: null
            },
            //分页总数
            total: 0,
            //搜索表单
            queryForm: {

            },
            games: {

            },
            //多选框
            ids:[],
            options: [
                {
                    value: 0,
                    label: '骰子'
                },
                {
                    value: 1,
                    label: '金花'
                },
                {
                    value: 2,
                    label: '斗地主'
                }
            ]
            ,

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

    methods: {
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id)
            this.single = selection.length !== 1
            this.multiple = !selection.length
            console.log(this.ids);
        },
        handleQuery() {
            var queryParams = this.queryParams
            this.getList(queryParams);
        },
        getList() {

            flowList(this.queryParams).then((response) => {
                this.tableData = response.rows;
                this.total = response.total;
            })
        },
        //重置搜索栏
        reset() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                rid: null,
                sectionTime: null,
                gameId: null,

            };
            this.getList()
        },
    },

    created() {
        this.getList();
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

.form-item-span {
    color: #606266;
    font-weight: bold;
}
</style>