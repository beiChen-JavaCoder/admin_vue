<template>
    <div>
        <el-table :data="tableData">
            <el-table-column label="id" align="left" prop="id" />
            <el-table-column label="游戏名称" align="left" prop="gameName" />

            <el-table-column label="状态" align="left" prop="isActive">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.active">正常</el-tag>
                    <el-tag type="danger" v-else>下线</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="版本" align="left" prop="version" />
            <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
                <template  slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-delete" @click="handledownline(scope.row)">下线</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import { gameList,downlineGame } from '@/api/system/game';
export default {
    data() {
        return {
            tableData: [{}],
            queryParams: {

                pageNum: 1,
                pageSize: 10,
            }
        }
    },
    methods: {
        handledownline(game) {
            this.$confirm('此操作将下线'+game.gameName+'游戏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                downlineGame(game.id).then(() => {
                    this.$message({
                        type: 'success',
                        message: '下线成功!'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下线'
                });
            });
        },
        getList() {
            gameList(this.queryParams).then((response) => {

                this.tableData = response.rows;
                this.total = response.total;
            })
        },
    },
    created() {
        this.getList();
    }
}
</script>

<style lang="scss" scoped></style>