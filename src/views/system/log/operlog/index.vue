<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="操作地址" prop="operIp">
                <el-input v-model="queryParams.operIp" placeholder="请输入操作地址" clearable style="width: 240px;"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="系统模块" prop="title">
                <el-input v-model="queryParams.title" placeholder="请输入系统模块" clearable style="width: 240px;"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="操作人员" prop="operName">
                <el-input v-model="queryParams.operName" placeholder="请输入操作人员" clearable style="width: 240px;"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!-- <el-form-item label="类型" prop="businessType">
                <el-select v-model="queryParams.businessType" placeholder="操作类型" clearable style="width: 240px">
                    <el-option v-for="dict in dict.type.sys_oper_type" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="操作状态" clearable style="width: 240px">
                    <el-option v-for="dict in dict.type.sys_common_status" :key="dict.value" :label="dict.label"
                        :value="dict.value" />
                </el-select>
            </el-form-item> -->
            <el-form-item label="操作时间">
                <el-date-picker v-model="dateRange" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                    range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
                    v-hasPermi="['monitor:operlog:remove']">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleClean"
                    v-hasPermi="['monitor:operlog:remove']">清空</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
                    v-hasPermi="['monitor:operlog:export']">导出</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange"
            :default-sort="defaultSort" @sort-change="handleSortChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="日志编号" align="center" prop="operId" />
            <el-table-column label="系统模块" align="center" prop="title" :show-overflow-tooltip="true" />
            <el-table-column label="操作类型" align="center" prop="businessType">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_oper_type" :value="scope.row.businessType" />
                </template>
            </el-table-column>
            <el-table-column label="操作人员" align="center" prop="operName" width="110" :show-overflow-tooltip="true"
                sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column label="操作地址" align="center" prop="operIp" width="130" :show-overflow-tooltip="true" />
            <el-table-column label="操作地点" align="center" prop="operLocation" :show-overflow-tooltip="true" />
            <el-table-column label="操作状态" align="center" prop="status">
                <template slot-scope="scope">
                    <dict-tag :options="dict.type.sys_common_status" :value="scope.row.status" />
                </template>
            </el-table-column>
            <el-table-column label="操作日期" align="center" prop="operTime" width="160" sortable="custom"
                :sort-orders="['descending', 'ascending']">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.operTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="消耗时间" align="center" prop="costTime" width="110" :show-overflow-tooltip="true"
                sortable="custom" :sort-orders="['descending', 'ascending']">
                <template slot-scope="scope">
                    <span>{{ scope.row.costTime }}毫秒</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row, scope.index)"
                        v-hasPermi="['monitor:operlog:query']">详细</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    dicts: ['sys_oper_type', 'sys_common_status'],
    data() {
        return {
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 表格数据
            list: [

            ],
            // 是否显示弹出层
            open: false,
            // 日期范围
            dateRange: [],
            // 默认排序
            defaultSort: { prop: 'operTime', order: 'descending' },
            // 表单参数
            form: {},
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                operIp: undefined,
                title: undefined,
                operName: undefined,
                businessType: undefined,
                status: undefined
            }
        };
    }
}
</script>

<style lang="scss" scoped></style>