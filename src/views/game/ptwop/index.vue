<template>
  <div class="container">
    <div class="child">
      <el-form :inline="true" ref="p2p" :modal="p2p" :rules="rules.p2p">
        <div label="点对点控制" style="position: relative">
          <div>
            <span class="label" style="width: auto; margin-right: 50px;">点对点控制</span>
            <el-form-item label="玩家id" prop="userId">
              <el-input clearable size="small" v-model="p2p.userControls.userId" type="text" style="width: 120px;" />
            </el-form-item>
            <el-form-item label="加减金币任务" style="margin-left: 60px;" prop="add">
              <el-input clearable size="small" v-model="p2p.add" type="text" style="width: 120px;  " />
            </el-form-item>
            <div class="label" style="margin-left: 120px;">
              <el-button @click="handleSubmit">执行</el-button>
            </div>
            <br>
          </div>
        </div>
        <span style="color: red;">注：尽量少点控，点控多会了影响血池与其他未被点控用户！</span>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

      p2p: {
        gameId: 901,
        gameName: "骰子",
        add: '',
        userControls: {
          userId: 1,
          currentScore: 0,
          targetScore: 10000,

        },
      },
      rules: {
        p2p: {
          // 表单验证规则
          add: [
            { required: true, message: '请输入加减金币任务分值', trigger: 'blur' },
            { pattern: /^[+-]\d+$/, message: '分值必须以 + 或 - 开头并为数字', trigger: 'blur' }
          ]
        }
      }
    }

  },
  methods: {
    handleSubmit() {
      this.$refs.p2p.validate(valid => {
        if (valid) {
          // 表单验证通过，执行提交操作
          console.log('表单验证通过，执行提交操作');
        } else {
          // 表单验证未通过
          console.log('表单验证未通过');
        }
      });
    },
  },
}


</script>
<style>
.container {
  /**设置边框 */
  border: 1px solid #ccc;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  /* 设置父容器的高度 */
}

.label {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  font-weight: bold;
  /* 可选，用于添加间距 */
}
</style>