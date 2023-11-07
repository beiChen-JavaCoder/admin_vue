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
    <el-form :inline="true" ref="game" :model="game" :rules="rules.game">
      <br />
      <div label="游戏信息" style="position: relative">
        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏ID:{{ game.gameId }} </span>
        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">血池控制:{{ game.gameName }} </span>
      </div>
      <br />
      <br />
      <div label="血池控制" style="position: relative">
        <span class="label" style="width: auto; margin-right: 50px;">血池控制 </span>
        <el-form-item label="分值">
          <el-input clearable size="small" v-model="game.bloodScore" :disabled="true" type="text" style="width: 120px;" />
        </el-form-item>
        <el-form-item label="加减金币任务" style="margin-left: 50px;" prop="score">
          <el-input clearable size="small" v-model="game.score" placeholder="+或-相应的数" type="text" style="width: 120px;" />
        </el-form-item>
        <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 0)">执行</el-button>
      </div>
      <hr>
      <br>
      <div label="平衡控制" style="position: relative; ">
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">狂吐控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.bigVomitControl.limitScore" type="text" :disabled="true"
              style="width: 120px;   margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" v-model="game.bigVomitControl.ratio" placeholder="1-10000" type="text"
              style="width: 120px; " />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 1)">执行</el-button>

        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">吐分控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.vomitControl.limitScore" type="text" :disabled="true"
              style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" v-model="game.vomitControl.ratio" placeholder="1-10000" type="text"
              style="width: 120px;" />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 2)">执行</el-button>

        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px; ">吃分控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.eatControl.limitScore" type="text" :disabled="true"
              style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" v-model="game.eatControl.ratio" placeholder="1-10000" type="text"
              style="width: 120px; " />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 4)">执行</el-button>

        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px; ">狂吃控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.bigEatControl.limitScore" type="text" :disabled="true"
              style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" v-model="game.bigEatControl.ratio" placeholder="1-10000" type="text"
              style="width: 120px; " />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 3)">执行</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import { listBlood, updateBolood } from '@/api/game/blood'

export default {
  name: 'blood',
  data() {
    return {
      games: [],
      total: 0,
      //0:血池，1:狂吐，2:吐分，3:狂吃，4:吃分
      controlType: undefined,

      game: {
        bigEatControl: {
          limitScore: "-1000000",
          ratio: "7000",
        },
        bigVomitControl: {
          limitScore: "10000000",
          ratio: "7000"
        },
        bloodScore: 26189000,
        score: '',
        eatControl: {
          limitScore: 100,
          ratio: 5000
        },
        gameId: 901,
        gameName: "骰子",

        vomitControl: {
          limitScore: "1000000",
          ratio: "5000"
        }
      },
      rules: {
        game: {
          // 表单验证规则
          score: [
            { required: true, message: '请输入加减金币任务分值', trigger: 'blur' },
            { pattern: /^[+-]\d+$/, message: '分值必须以 + 或 - 开头并为数字', trigger: 'blur' }
          ],
          bigVomitControl: {
            ratio: [
              { required: true, message: '请输入1-10000', trigger: 'blur' },
              { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }

            ]
          },
          vomitControl: {
            ratio: [
              { required: true, message: '请输入1-10000', trigger: 'blur' },
              { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }
            ]
          },
          eatControl: {
            ratio: [
              { required: true, message: '请输入1-10000', trigger: 'blur' },
              { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }

            ]
          },
          bigEatControl: {
            ratio: [
              { required: true, message: '请输入1-10000', trigger: 'blur' },
              { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }
            ]
          }
        }
      }
    }
  }
  ,

  methods: {
    getList() {
      this.loading = true
      listBlood().then((response) => {

        this.games = response.rows
        this.total = response.total
        this.loading = false
        console.log(this.games)

      })
    },
    handleSubmit(game, type) {
      this.$refs.game.validate(valid => {
        console.log(game)
        if (valid) {
          // 表单验证通过，执行提交操作
          console.log('表单验证通过，执行提交操作');
          this.bloodupdate(game, type)
        } else {
          // 表单验证未通过
          console.log('表单验证未通过');
        }
      });
    },
    bloodupdate(game, type) {
      var gameControlVo = {
        type: type,
        game: game,
        score: game.score
      }
      updateBolood(gameControlVo)
    },
    handleDropdownCommand(command) {
      this.game = command;
      // 根据选项做其他操作，比如初始化表单数据等
    },

  },

  created() {
    this.getList()
  }
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
  height: 500px;
  /* 设置父容器的高度 */
}

.label {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  font-weight: bold;
  /* 可选，用于添加间距 */
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}</style>