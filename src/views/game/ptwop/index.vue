<template>
  <div class="container">

    <div>
 
      <el-row class="block-col-2">
        <el-col :span="12">
          <span class="demonstration">游戏列表</span>
          <el-dropdown @command="handleDropdownCommand">
            <span class="el-dropdown-link">
              {{ game.gameName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(game, index) in games" :key="index" :command="game">
                {{ game.gameName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <br/>
      <br/>
    <div class="child">
      <el-form :inline="true" ref="game" :modal="game" :rules="rules.game">
        <div label="游戏信息" style="position: relative">
          <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏ID:{{ game.gameId }} </span>
          <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏名称:{{ game.gameName }}
          </span>
        </div>
        <br />
        <div label="点对点控制" style="position: relative">
          <div v-for="(userControl,index) in game.userControls" :key="index">
            <span class="label" style="width: auto; margin-right: 50px;">点对点控制</span>
            <el-form-item label="玩家id">
              <el-input clearable size="small" v-model="userControl.userId" :disabled="true" type="text"
                style="width: 120px;" />
            </el-form-item>
            <el-form-item label="原始分数" style="margin-left: 60px;">
              <el-input clearable size="small" v-model="userControl.targetScore" type="text" style="width: 120px;  " />
            </el-form-item>
            <el-form-item label="加减金币任务" style="margin-left: 60px;">
              <el-input clearable size="small" v-model="userControl.currentScore" type="text" style="width: 120px;  " />
            </el-form-item>
              <el-button @click="handleSubmit(this.userPtp)">执行</el-button>
            <br>
          </div>
        </div>
        <span style="color: red;">注：尽量少点控，点控多会了影响血池与其他未被点控用户！</span>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateptp, listPtp } from '@/api/game/ptp'
export default {
  data() {
    return {

      ptps: [],
      games:[],
      game:{}
      // userPtp: {
      //   gameId: '111',
      //   gameName: '111',
      //   userControls: [
      //     {
      //       "userId": 100001,
      //       "targetScore": 222222222222,
      //       "currentScore": 0
      //     }
      //   ]
      //   ,
      //   score: ''
      // },
      ,
      rules: {
        game: {
          // 表单验证规则
          score: [
            { required: true, message: '请输入加减金币任务分值', trigger: 'blur' },
            { pattern: /^[+-]\d+$/, message: '分值必须以 + 或 - 开头并为数字', trigger: 'blur' }
          ]
        }
      }
    }

  },
  methods: {
    handleSubmit(userPtp) {
      this.$refs.userPtp.validate(valid => {
        if (valid) {
          // 表单验证通过，执行提交操作
          console.log('表单验证通过，执行提交操作');
          this.ptpUpdate(userPtp);
        } else {
          // 表单验证未通过
          console.log('表单验证未通过');
        }
      });
    },
    ptpUpdate(userPtp) {

    },
    handleDropdownCommand(command) {
      this.game = command;

      console.log(this.userPtp);
      // 根据选项做其他操作，比如初始化表单数据等
    },
    getList() {
      this.loading = true
      listPtp().then((response) => {
        this.games = response.rows
        this.total = response.total
        this.loading = false
        console.log(this.games)

      })
    }
  },
  created() {
    this.getList()
  }
}


</script>
<style>
.container {
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
</style>