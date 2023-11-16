<template>
    <div>
        <el-button  type="danger" @click="handleDeleteDB">删除游戏库</el-button>
    </div>
</template>

<script>
import { deleteDB } from '@/api/system/game';
export default {
    data() {
        return {

        }
    },
    methods: {
        handleDeleteDB() {
            this.$confirm('此操作将永久删除该游戏库, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteDB().then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped></style>