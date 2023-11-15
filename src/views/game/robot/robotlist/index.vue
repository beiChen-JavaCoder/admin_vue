<template>
    <div>
        <div label="机器人导入" class="label">
            <el-upload :action="''" :before-upload="handleBeforeUpload">
                <el-button size="small" type="primary">导入机器人</el-button>
            </el-upload>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="robotName" label="机器人名称" />
                <el-table-column label="操作" align="center" width="auto" class-name="small-padding fixed-width">
                    <template>
                        <el-button size="mini" type="text" icon="el-icon-edit">修改</el-button>
                        <el-button v-if="false" size="mini" type="text" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
            @size-change="getList" />
    </div>
</template>

<script>
import { robotList } from '@/api/game/robotlist/robotlist';
export default {
    data() {
        return {
            //表格参数
            tableData: [],
            //分页参数
            queryParams: {
                name: undefined,
                pageNum: 1,
                pageSize: 10,

            },
            //总数
            total: 0
        }
    },
    methods: {
        getList() {
            robotList(this.queryParams).then((response) => {
                this.tableData = response.rows
                this.total = response.total
                this.loading = false
            })
            
        },

        handleBeforeUpload(file) {
            // 在这里可以对文件进行处理，例如校验、压缩等操作
            // 处理完成后调用自定义的网络请求工具类进行上传
            const formData = new FormData();
            formData.append('file', file);

            importData(formData).then(response => {
                console.log('文件上传成功', response);
                // 处理上传成功后的逻辑
            }).catch(error => {
                console.error('文件上传失败', error);
                // 处理上传失败后的逻辑
            });

            return false;  // 返回 false 阻止 Element UI 组件默认的上传行为
        },




    },
    created() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped></style>