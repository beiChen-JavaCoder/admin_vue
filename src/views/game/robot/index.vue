<template>
    <div class="top-container">
        <div>
        </div>
        <div class="child">
            <br />
            <el-row :span="24" :xs="24">
                <el-form :inline="true" label-width="68px">

                </el-form>
            </el-row>
            <el-form :inline="true" ref="pageUserControls" :modal="pageUserControls" :rules="rules.game">
                <br />
                <div label="机器人控制" style="position: relative">
                    <div label="游戏信息">
                        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏ID: {{ game.gameId
                        }} </span>
                        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏名称: {{
                            game.gameName
                        }}</span>
                        <br />
                    </div>
                    <br />
                    <div>
                        <el-form ref="form" :model="form" :rules="form" label-width="auto">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="下注概率(万分比):" label-width="auto">
                                        <el-input v-model="form.betRatio"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button @click="handleSubmit(4)">执行</el-button>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="初始金币区间">
                                        <el-form-item label="最小区间:">
                                            <el-input v-model="form.initScore.min"></el-input>
                                        </el-form-item>
                                        <el-form-item label="最大区间:">
                                            <el-input v-model="form.initScore.max"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button @click="handleSubmit(0)">执行</el-button>
                                        </el-form-item>
                                    </el-form-item>



                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="下注区间">
                                        <el-form-item label="最小区间:">
                                            <el-input v-model="form.betScore.min"></el-input>
                                        </el-form-item>
                                        <el-form-item label="最大区间:">
                                            <el-input v-model="form.betScore.max"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button @click="handleSubmit(1)">执行</el-button>
                                        </el-form-item>
                                    </el-form-item>


                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="下注时间区间(毫秒)">
                                        <el-form-item label="最小区间:">
                                            <el-input v-model="form.betTime.min"></el-input>
                                        </el-form-item>
                                        <el-form-item label="最大区间:">
                                            <el-input v-model="form.betTime.max"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button @click="handleSubmit(3)">执行</el-button>
                                        </el-form-item>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="携带金币区间">
                                        <el-form-item label="最小区间:">
                                            <el-input v-model="form.carryScore.min"></el-input>
                                        </el-form-item>
                                        <el-form-item label="最大区间:">
                                            <el-input v-model="form.carryScore.max"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button @click="handleSubmit(2)">执行</el-button>
                                        </el-form-item>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div>

                        </div>
                        <hr />
                        <div class="upload-container">
                            <el-upload class="upload-demo" :action="''" :before-upload="handleBeforeUpload">
                                <el-button size="small" type="primary">导入机器人</el-button>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <span style="color: red;"></span>

            </el-form>
        </div>
    </div>
</template>
  
<script>
import { importData, listGame, upRobotScore } from "@/api/game/robot";

export default {
    data() {
        return {
            // 可以在这里定义一些需要用到的数据


            loading: true,

            pageUserControls: [],
            ptps: [],
            games: [],
            game: {
                //  * --机器人初始金币区间
                initScore: { minScore: 50000, maxScore: 200000000 },
                //  * --机器人下注区间
                betScore: { minScore: 10000, maxScore: 5000000 },
                //  * --机器人携带金币区间(存取区间: 低于最小值存, 高于最大值取)
                carryScore: { minScore: 10000, maxScore: 5000000000 },
                //  * --机器人下注时间区间(毫秒)
                betTime: { min: 500, max: 29000 },
                //  * --机器人下注概率(万分比)
                betRatio: 10000
            },

            //用于表单验证
            form: {},
            rules: {
                form: {
                    betRatio: [
                        { required: true, message: '不能为空', trigger: 'blur' },]

                }
            }
        }
    },

    methods: {
        handleSubmit(type) {
            var robotContrlUpdate = {};
            if (type === 0) {
                robotContrlUpdate = JSON.parse(JSON.stringify(this.form.betScore));
                robotContrlUpdate.type = 0;
            } else if (type === 1) {
                robotContrlUpdate = JSON.parse(JSON.stringify(this.form.initScore));
                robotContrlUpdate.type = 1;
            } else if (type === 2) {
                robotContrlUpdate = JSON.parse(JSON.stringify(this.form.carryScore));
                robotContrlUpdate.type = 2;

            } else if (type === 3) {
                robotContrlUpdate = JSON.parse(JSON.stringify(this.form.betTime));
                robotContrlUpdate.type = 3;

            } else if (type === 4) {
                robotContrlUpdate.betRatio = this.form.betRatio
                robotContrlUpdate.type = 4;
            }
            robotContrlUpdate.gameId =this.form.gameId
            console.log(robotContrlUpdate)

            upRobotScore(robotContrlUpdate).then(response => {
                console.log(response)
                this.$message({
                    showClose: true,
                    message: '执行成功',
                    type: 'success'
                });
            })
            this.getList()
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
        getList() {
            listGame().then(response => {

                this.games = response.rows;
                this.total = response.total;
                console.log(this.games);
                this.game = this.games[0];
                this.form = this.games[0];
                console.log(this.game);
                console.log(this.form);
            });
            this.loading = false;

        }
    },
    created() {
        this.getList()
    },
    computed: {
    }
}
</script>
  
<style>
/* 在这里可以添加组件的样式 */
.top-container {
    /* *设置边框 */
    /* border: 1px solid #ccc;
  padding: 10px; */

    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    /* 设置父容器的高度 */
}

.label {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    font-weight: bold;
    /* 可选，用于添加间距 */
}
.upload-container {
  margin-top: 20px; /* 上边距 */
  padding: 10px; /* 内边距 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 5px; /* 圆角 */
}

/* 可以根据需要进一步添加样式 */

</style>
  