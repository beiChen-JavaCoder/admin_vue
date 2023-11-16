<template>
    <div>
        <div>

            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd">添加机器人</el-button>

        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="robotName" label="机器人名称" />
                <el-table-column label="操作" align="center" width="auto" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit"
                            @click="handleUpdate(scope.row)">修改</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
            @size-change="getList" />
        <!-- 修改机器人信息对话框 -->
        <div>
            <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
                <el-form ref="robot" :model="robot" :rules="rules" label-width="80px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="机器人名称" prop="robotName" label-width="100px">
                                <el-input v-model="robot.robotName" placeholder="请输入机器人名称" maxlength="30" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 上传机器人对话框 -->
        <div>
            <el-dialog :title="title" :visible.sync="openUpload" width="600px" append-to-body>
                <el-form>
                    <el-col>
                        <span style="color: red;">文件上传格式:以,分隔仅支持txt文件
                            <br />
                            例: 机器人1,机器人2,机器人3,机器人4
                        </span>
                    </el-col>
                </el-form>
                <div slot="footer" class="dialog-footer" style="display: flex; justify-content: flex-end;">
                    <el-upload style="height:20px; margin-right: 10px;" :action="''" :before-upload="handleBeforeUpload">
                        <el-button size="small" type="primary">导入机器人</el-button>
                    </el-upload>
                    <el-button size="small" @click="openUpload = false">取消</el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
import { robotList, robotUpdate, importData } from '@/api/game/robotlist/robotlist';
export default {
    data() {
        return {
            //表格参数
            tableData: [],
            //分页参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,

            },
            //总数
            total: 0,
            //表单参数
            robot: {},
            //修改机器人对话框
            open: false,
            //上传机器人对话框
            openUpload: false,
            //对话框标题
            title: '',
            rules: {}
        }

    },

    methods: {
        handleAdd() {

            this.openUpload = true;
            this.title = '导入机器人';

        },
        submitForm() {
            var robot = this.robot;
            robotUpdate(robot).then(response => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.getList();
            })
                .catch(response => {
                    this.$message({
                        message: '修改失败',
                        type: 'error'
                    });
                })
            this.open = false;
        },
        handleUpdate(robot) {
            this.open = true;
            this.title = "修改机器人";
            this.robot = robot;
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const robotName = row.robotName || this.robotName
            this.$modal
                .confirm('是否确认删除机器人名称为"' + robotName + '"的数据项？')
                .then(function () {
                    return delUser(robotName)
                })
                .then(() => {
                    this.getList()
                    this.$modal.msgSuccess('删除成功')
                })
                .catch(() => { })
        },
        getList() {
            robotList(this.queryParams).then((response) => {
                this.tableData = response.rows
                this.total = response.total
                this.loading = false
            })

        },
        cancel() {
            this.open = false;
        },

        handleBeforeUpload(file) {
            // 在这里可以对文件进行处理，例如校验、压缩等操作
            // 处理完成后调用自定义的网络请求工具类进行上传
            const formData = new FormData();
            formData.append('file', file);

            importData(formData).then(response => {
                this.$message({
                    message: '导入成功',
                    type: 'success'
                });
                this.openUpload = false
                this.getList();

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