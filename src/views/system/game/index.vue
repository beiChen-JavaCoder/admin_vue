<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

            <el-form-item label="游戏名称" prop="gameName">
                <el-input v-model="queryParams.gameName" placeholder="请输入游戏名称" clearable style="width: 240px;"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="状态" prop="active">
        <el-select v-model="queryParams.active" placeholder="状态" clearable style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-col :span="24" :xs="24">
            <el-table v-loading="loading" :data="tableData" >
                <el-table-column type="selection" width="55" />
                <el-table-column label="游戏编号" align="left" prop="gameId" />
                <el-table-column label="游戏名称" align="left" prop="gameName" />
                <el-table-column label="状态" align="left" prop="isActive">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.active">正常</el-tag>
                        <el-tag type="danger" v-else>关闭</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="版本" align="left" prop="version" />
                <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleturn(scope.row)">关闭</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handledelet(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum"
                @current-change="getList" @size-change="getList" />
        </el-col>

    </div>
</template>

<script>
import { gameList, turnGame, deletGame } from '@/api/system/game';
export default {
    data() {
        return {
            //遮蔽层
            loading: true,
            ids: [],
            //游戏数据
            tableData: [{}],
            //搜索栏
            queryParams: {

                pageNum: 1,
                pageSize: 10,
                gameName:'',
                active:null,
            },
            total: 0,
            showSearch: true,
            options:[
                {
                    value:true,
                    label : "正常"
                },
                {
                    value:false,
                    label:"下线"
                }
            ]
        }
    },
    methods: {
        //重置按钮
        resetQuery(){
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                gameName: null,
                gameId: null,
                active: null,
            };
        },
        //搜索按钮
        handleQuery(){

            this.getList();


        },
        //关闭游戏
        handleturn(game) {
            this.$confirm('此操作将关闭' + game.gameName + '游戏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                turnGame(game.id).then(() => {
                    this.$message({
                        type: 'success',
                        message: '关闭成功!'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消关闭'
                });
            });
            //刷新
            this.getList();
        },
        //删除游戏
        handledelet(game) {
            this.$confirm('此操作將刪除' + game.gameName + '是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletGame(game.id).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                })
            })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',

                    })
                })
            //刷新
            this.getList();
        },
        getList() {
            this.loading = true;
            gameList(this.queryParams).then((response) => {

                this.tableData = response.rows;
                this.total = response.total;
                this.loading = false;
            })
        },
    },
    created() {
        this.getList();
    }
}
</script>

<style lang="scss" scoped></style>