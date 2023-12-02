<template>
    <div class="top-container">
        <div>
        </div>
        <div class="child">
            <el-form v-loading.fullscreen.lock="loading" :inline="true" ref="pageUserControls" :modal="pageUserControls"
                :rules="rules.game">
                <br />
                <div label="机器人控制" style="position: relative">
                    <div label="游戏信息">
                        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏ID: {{ game.gameId
                        }} </span>
                        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏名称: {{
                            game.gameName
                        }}</span>

                    </div>

                    <hr />
                    <br />
                    <div>
                        <el-form ref="form" :model="form" :rules="rules.form" label-width="auto">
                            <el-row>
                                <el-col class="form-row">
                                    <span class="label" style="width: auto; margin-right: 170px;">下注概率(万分比)</span>
                                    <el-form-item label-width="auto">
                                        <el-input v-model="form.betRatio"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button @click="handleSubmit(4)">执行</el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col class="form-row">
                                    <span class="label" style="width: auto; margin-right: 50px;">初始金币区间</span>
                                    <el-form-item label="最小区间:">
                                        <el-input v-model="form.initScore.min"></el-input>
                                    </el-form-item>
                                    <el-form-item label="最大区间:" style="width: auto; margin-right: 50px; ">
                                        <el-input v-model="form.initScore.max"></el-input>
                                    </el-form-item>
                                    <el-button @click="handleSubmit(0)">执行</el-button>
                                </el-col>

                                <el-col class="form-row">
                                    <span class="label" style="width: auto; margin-right: 50px;">下注区间</span>
                                    <el-form-item style="margin-left: 33px;" label="最小下注:">
                                        <el-input v-model="form.betScore.min"></el-input>
                                    </el-form-item>
                                    <el-form-item label="最大下注:" style="width: auto; margin-right: 50px; ">
                                        <el-input v-model="form.betScore.max"></el-input>
                                    </el-form-item>
                                    <el-button @click="handleSubmit(1)">执行</el-button>
                                </el-col>
                                <el-col class="form-row">
                                    <span class="label" style="width: auto; margin-right: 50px;">下注时间区间</span>
                                    <el-form-item label="最小区间:">
                                        <el-input v-model="form.betTime.min"></el-input>
                                    </el-form-item>
                                    <span style="margin-right: 50px; color: #606266; ">秒</span>
                                    <el-form-item label="最大区间:">
                                        <el-input v-model="form.betTime.max"></el-input>
                                    </el-form-item>
                                    <span style="margin-right: 50px; color: #606266; ">秒</span>
                                    <el-button @click="handleSubmit(3)">执行</el-button>
                                </el-col>
                                <el-col class="form-row">
                                    <span class="label" style="width: auto; margin-right: 80px; ">存取金币</span>
                                    <el-form-item label="低于取:">
                                        <el-input v-model="form.carryScore.min"></el-input>
                                    </el-form-item>
                                    <el-form-item label="高于存:" style="width: auto; margin-right: 75px; margin-left: 70px; ">
                                        <el-input v-model="form.carryScore.max"></el-input>
                                    </el-form-item>
                                    <el-button @click="handleSubmit(2)">执行</el-button>
                                </el-col>
                                <el-col class="form-row">
                                    <span class="label" style="width: auto; margin-right: 65px; ">机器人数量</span>
                                    <el-form-item label="最少:">
                                        <el-input v-model="form.inRoomNum.min"></el-input>
                                    </el-form-item>
                                    <el-form-item label="最多:" style="width: auto; margin-right: 75px; margin-left: 70px; ">
                                        <el-input v-model="form.inRoomNum.max"></el-input>
                                    </el-form-item>
                                    <el-button @click="handleSubmit(5)">执行</el-button>
                                </el-col>
                            </el-row>

                        </el-form>
                        <div>

                        </div>

                    </div>
                </div>

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

            loading: false,

            pageUserControls: [],
            ptps: [],
            games: [],
            game: {},

            //用于表单验证
            form: {
            },
            rules: {
                form: {
                    betRatio: {
                        min: [
                            { required: true, message: '请输入提现账号', trigger: 'blur' },
                            { pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur' }
                        ]
                    }
                }

            },



            computed: {
            }
        }
    },
    
    methods: {
        validateNumber(min, max) {
            if (isNaN(min) || isNaN(max)) {
                return this.$modal.msgError('参数不合规！');
            }
            return '';
        },
        handleSubmit(type) {
            var robotContrlUpdate = {};
            var UpFrom = this.form;
            if (type === 0) {
                robotContrlUpdate = JSON.parse(JSON.stringify(UpFrom.initScore));
                robotContrlUpdate.type = 0;
                var min = UpFrom.initScore.min;
                var max = UpFrom.initScore.max;
                robotContrlUpdate.min = min;
                robotContrlUpdate.max = max;
                this.validateNumber(min, max);
                if (!(min < max && min >= 1 && max <= 99999999999)) {
                    return this.$modal.msgError('初始金币最小为1,最大99999999999');
                }
            } else if (type === 1) {
                robotContrlUpdate = JSON.parse(JSON.stringify(UpFrom.betScore));
                robotContrlUpdate.type = 1;
                var min = UpFrom.betScore.min;
                var max = UpFrom.betScore.max;
                robotContrlUpdate.min = min;
                robotContrlUpdate.max = max;
                this.validateNumber(min, max);
                if (!(min < max && min >= 10000 && max <= 10000000)) {
                    return this.$modal.msgError('最小下注10000,最大下注10000000');
                }
            } else if (type === 2) {
                robotContrlUpdate = JSON.parse(JSON.stringify(UpFrom.carryScore));
                robotContrlUpdate.type = 2;
                var min = UpFrom.carryScore.min;
                var max = UpFrom.carryScore.max;
                robotContrlUpdate.min = min;
                robotContrlUpdate.max = max;
                this.validateNumber(min, max);
                if (!(min < max && min >= 1 && max <= 99999999999)) {
                    return this.$modal.msgError('存取最小为1,最大99999999999');
                }
            } else if (type === 3) {
                robotContrlUpdate = JSON.parse(JSON.stringify(UpFrom.betTime));
                robotContrlUpdate.type = 3;
                var min = UpFrom.betTime.min;
                var max = UpFrom.betTime.max;
                robotContrlUpdate.min = min;
                robotContrlUpdate.max = max;
                this.validateNumber(min, max);
                if (!(min < max && min > 0 && max <= 30)) {
                    return this.$modal.msgError('时间最小1,最大30');
                }
            } else if (type === 4) {

                robotContrlUpdate.type = 4;
                var betRatio = UpFrom.betRatio;
                robotContrlUpdate.betRatio = betRatio;
                if (isNaN(betRatio)) {
                    return this.$modal.msgError('参数不合规');
                }
                if (!betRatio >= 1 && betRatio <= 100000) {
                    return this.$modal.msgError('万分比大于1小于10000');
                }
            } else if (type === 5) {
                robotContrlUpdate = JSON.parse(JSON.stringify(UpFrom.inRoomNum));
                robotContrlUpdate.type = 5;
                var min = UpFrom.inRoomNum.min;
                var max = UpFrom.inRoomNum.max;
                robotContrlUpdate.min = min;
                robotContrlUpdate.max = max;
                this.validateNumber(min, max);
                if (!(min < max && min >= 1 && max <= 100)) {
                    return this.$modal.msgError('机器人最小大于1,最大小于100');
                }
            }
            robotContrlUpdate.gameId = UpFrom.gameId;
            upRobotScore(robotContrlUpdate)
                .then(() => {
                    this.getList()
                    this.$message({
                        showClose: true,
                        message: '执行成功',
                        type: 'success'
                    });
                })
                ,
                //刷新当前数据

                console.log("更新后的form");
            console.log(this.form)
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
            this.loading = true;

            listGame().then(response => {

                this.games = response.rows;
                this.total = response.total;
                this.game = this.games[0];
                this.form = this.games[0];
                this.loading = false;
            });

        }
    },
    created() {
        this.getList();
    },
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
    margin-top: 20px;
    /* 上边距 */
    padding: 10px;
    /* 内边距 */
    border: 1px solid #ccc;
    /* 边框 */
    border-radius: 5px;

    flex: 1;
    /* 使两个 div 充满父容器的宽度 */
    /* 圆角 */
}

.form-row {
    margin-bottom: 50px;
    /* 设置行间距，可以根据需要进行调整 */
}

/* 可以根据需要进一步添加样式 */
</style>
  