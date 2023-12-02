<template>
  <div v-loading="loading" class="container">
    <div>
      <el-row class="dropdown-container">
        <el-col :span="24">
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
        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏ID: {{ game.gameId }} </span>
        <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏名称: {{ game.gameName }} </span>
      </div>
      <br />
      <br />
      <div>
        <div label="当前金币" style="position: relative">
          <span class="label" style="width: auto;  margin-right: 50px;"
            :style="{ color: coinControlBackgroundColor }">当前金币
          </span>
          <el-form-item label="分值">
            <el-input clearable size="small" :value="getFormattedValue('', 'bloodScore')"
              @input="setFormattedValue('bloodScore')" :disabled="isdisabled" type="text" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="加减金币任务" style="margin-left: 120px;" prop="score">
            <el-input clearable size="small" v-model="game.score" type="text" style="width: 120px;" />
            <br />
            <span style="color: red;">填入正数金币（例如： 100）利润增加100元</span>
            <br />
            <span style="color: red;">填入负数金币 （例如：-100）利润减少100元</span>
          </el-form-item>
          <el-button class="label" @click="handleSubmit(game, controlType = 0)">执行</el-button>
        </div>
      </div>

      <hr>
      <br>
      <div label="平衡控制" style="position: relative; ">
        <div style="height: 80px;">
          <span class="label" style="width: auto; margin-right: 50px; color:#EB453C ;">金币极多</span>
          <el-form-item label="分值">
            <el-input clearable size="small" :value="getFormattedValue('bigVomitControl', 'limitScore')"
              @input="setFormattedValue('bigVomitControl', 'limitScore', $event)" type="text"
              style="width: 200px;   margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" v-model="game.bigVomitControl.ratio" placeholder="1-10000" type="text"
              style="width: 120px; " />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 1)">执行</el-button>
        </div>
        <br>
        <div style="height: 150px;">
          <span class="label" style="width: auto; margin-right: 50px; color: #FF8A80;">金币较多</span>
          <el-form-item label="分值">
            <el-input clearable size="small" :value="getFormattedValue('vomitControl', 'limitScore')"
              @input="setFormattedValue('vomitControl', 'limitScore', $event)" type="text"
              style="width: 200px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" v-model="game.vomitControl.ratio" placeholder="1-10000" type="text"
              style="width: 120px;" />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 2)">执行</el-button>

        </div>
        <br>
        <div style="height: 80px;">
          <span class="label" style="width: auto; margin-right: 50px; color:#69F0AE; ">金币较少</span>
          <el-form-item label="分值">
            <el-input clearable size="small" :disabled="isdisabled" :value="getFormattedValue('eatControl', 'limitScore')"
              @input="setFormattedValue('eatControl', 'limitScore', $event)" type="text"
              style="width: 200px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" :disabled="isdisabled" v-model="game.eatControl.ratio" placeholder="1-10000"
              type="text" style="width: 120px; " />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 4)">执行</el-button>

        </div>
        <br>
        <div style="height: 80px;">
          <span class="label" style="width: auto; margin-right: 50px; color:#50AE55; ">金币极少</span>
          <el-form-item label="分值">
            <el-input clearable size="small" :disabled="isdisabled"
              :value="getFormattedValue('bigEatControl', 'limitScore')"
              @input="setFormattedValue('bigEatControl', 'limitScore', $event)" type="text"
              style="width: 200px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率（万分比）">
            <el-input clearable size="small" :disabled="isdisabled" v-model="game.bigEatControl.ratio"
              placeholder="1-10000" type="text" style="width: 120px; " />
          </el-form-item>
          <el-button class="label" style="margin-left: 120px;" @click="handleSubmit(game, controlType = 3)">执行</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import { listBlood, updateBolood, refreshScore } from '@/api/game/blood'

export default {
  name: 'blood',
  data() {
    return {
      games: [],
      total: 0,
      //0:血池，1:狂吐，2:吐分，3:狂吃，4:吃分
      controlType: undefined,
      //响应结果
      remsg: "test",
      //定时器运行时间
      minutes: 0,
      //禁用输入框
      isdisabled: true,

      game: {
        gameId: 0,
        bloodScore: '',
        gameName: "",
        score: 0,
        bigVomitControl: {
          limitScore: '',
          ratio: 0
        },
        vomitControl: {
          limitScore: '',
          ratio: 0
        },
        eatControl: {
          limitScore: '',
          ratio: 0
        },
        bigEatControl: {
          limitScore: '',
          ratio: 0
        }
      },
      rules: {
        // game: {
        //   // 表单验证规则
        //   score: [
        //     { required: true, message: '请输入加减金币任务分值', trigger: 'blur' },
        //     { pattern: /^[+-]\d+$/, message: '分值必须以 + 或 - 开头并为数字', trigger: 'blur' }
        //   ],
        //   bigVomitControl: {
        //     ratio: [
        //       { required: true, message: '请输入1-10000', trigger: 'blur' },
        //       { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }

        //     ]
        //   },
        //   vomitControl: {
        //     ratio: [
        //       { required: true, message: '请输入1-10000', trigger: 'blur' },
        //       { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }
        //     ]
        //   },
        //   eatControl: {
        //     ratio: [
        //       { required: true, message: '请输入1-10000', trigger: 'blur' },
        //       { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }

        //     ]
        //   },
        //   bigEatControl: {
        //     ratio: [
        //       { required: true, message: '请输入1-10000', trigger: 'blur' },
        //       { pattern: /^(0*([1-9][0-9]{0,3}|10000))$/, message: '分值必须为1-10000之间的数字', trigger: 'blur' }
        //     ]
        //   }
        // }
      },
      loading: true

    }
  },
  methods: {
    //过滤属性显示
    formatCurrency(value) {

      const numericValue = parseFloat(value);

      if (isNaN(numericValue)) {
        return '';
      }

      // 使用 toFixed 方法将数值精确到小数点后两位
      const fixedValue = Math.abs(numericValue).toFixed(2);

      // 使用正则表达式在需要的位置添加千位分隔符
      const formattedValue = fixedValue.replace(/\d(?=(\d{3})+\.)/g, '$&,');

      const splitArr = formattedValue.split(".")
      const formatted = splitArr[0]
      // 判断原始值是否为负数，如果是则添加负号
      if (numericValue < 0) {
        return '-' + formatted;
      } else {
        return formatted;
      }

    },
    parseCurrency(value) {
      return value.replace(/[^\d.-]/g, '');
    },
    getFormattedValue(controlType, propertyName) {

      if (controlType == '') {
        return this.formatCurrency(this.game[propertyName]);
      }
      return this.formatCurrency(this.game[controlType][propertyName]);
    },
    setFormattedValue(controlType, propertyName, value) {
      this.game[controlType][propertyName] = this.parseCurrency(value);
      console.log(controlType, propertyName, value, this.game[controlType][propertyName]);

    },
    getList() {
      this.loading = true
      listBlood().then((response) => {
        this.games = response.rows
        this.total = response.total
        this.loading = false
        this.firstGame()
      })
      // if(this.game.gameName === null){
      this.firstGame(this.game)
      // }
    },
    firstGame() {
      let game = this.games[0]
      this.game = game
      console.log(game)
    },
    handleSubmit(game, type) {


      //控制类型大小限制
      var bigVomitControlScore = game.bigVomitControl.limitScore;
      var vomitControl = game.vomitControl.limitScore;
      var eatControl = game.eatControl.limitScore;
      var bigEatControl = game.bigEatControl.limitScore;

      if (!(bigVomitControlScore > vomitControl && vomitControl > eatControl && eatControl > bigEatControl)) {
        console.log(bigVomitControlScore, vomitControl, eatControl, bigEatControl);

        return this.$message.error('参数大小不匹配请核实！金币极多>金币较多>金币较少>金币极少');
      }



      this.$refs.game.validate(valid => {
        console.log(game)
        if (true) {
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
      //取反操作金币控制
      var str = "" + game.score;
      if (str.charAt(0) == '-') {
        str = str.substring(1); // 移除开头的 "-"
      } else {
        str = '-'+str
      }
      var gameControlVo = {
        type: type,
        game: game,
        score: str
      }
      updateBolood(gameControlVo)
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('执行成功')
    
        })

    },
    handleDropdownCommand(command) {
      this.game = command;
      // 根据选项做其他操作，比如初始化表单数据等
    },
    refreshBlood() {
      refreshScore().then((response) => {
        console.log("定时器血池分数第" + this.minutes + "次刷新");
        var bloodScore = response.rows
        bloodScore.forEach(element => {
          this.game.bloodScore = element.bloodScore
        });
        console.log(this.game.bloodScore);
      });
    }

  },

  created() {
    //第一次获取game
    this.timer = setInterval(() => {
      this.minutes++
      // 在这里调用你需要执行的方法
      this.refreshBlood()
    }, 30000)
    this.getList()
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.timer)
  },
  //计算属性
  computed: {
    //计算颜色背景
    coinControlBackgroundColor() {
      const bloodScore = this.game.bloodScore;
      if (bloodScore >= this.game.bigVomitControl.limitScore) {
        return '#EB453C';
      } else if (bloodScore <= this.game.bigVomitControl.limitScore && bloodScore > this.game.vomitControl.limitScore) {
        return '#FF8A80';
      } else if (bloodScore <= this.game.vomitControl.limitScore && bloodScore > this.game.eatControl.limitScore) {
        return "#69F0AE";
      } else if (bloodScore <= this.game.eatControl.limitScore && bloodScore > this.game.bigEatControl.limitScore) {
        return "#50AE55";
      } else if (bloodScore < this.game.bigEatControl.limitScore) {
        return "#50AE55";
      }
    },
  }
}
</script>
<style>
.container {
  /**设置边框 */
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

}

.dropdown-container {
  position: absolute;
  top: 5%;
  left: 5%;
}
</style>