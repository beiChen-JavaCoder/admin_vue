<template>
  <div class="container">
    <el-form :inline="true" ref="game" :model="game" :rules="rules.game">
      <br>
      <br>
      <div label="血池控制" style="position: relative">
        <span class="label" style="width: auto; margin-right: 50px;">血池控制 </span>
        <el-form-item label="分值">
          <el-input clearable size="small" v-model="game.bloodScore" :disabled="true" type="text" style="width: 120px;" />
        </el-form-item>
        <el-form-item label="加减金币任务" style="margin-left: 60px;" prop="add">
          <el-input clearable size="small" v-model="game.add" type="text" style="width: 120px;"
             />
        </el-form-item>
        <div class="label" style="margin-left: 120px;">
          <el-button @click="handleSubmit">执行</el-button>
        </div>
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
          <el-form-item label="触发率">
            <el-input clearable size="small" v-model="game.bigVomitControl.ratio" type="text" style="width: 120px; " />
          </el-form-item>
        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">吐分控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.vomitControl.limitScore" type="text" :disabled="true"
              style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率">
            <el-input clearable size="small" v-model="game.vomitControl.ratio" type="text" style="width: 120px;" />
          </el-form-item>
        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px; ">吃分控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.eatControl.limitScore" type="text" :disabled="true"
              style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率">
            <el-input clearable size="small" v-model="game.eatControl.ratio" type="text" style="width: 120px; " />
          </el-form-item>
        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px; ">狂吃控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" v-model="game.bigEatControl.limitScore" type="text" :disabled="true"
              style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率">
            <el-input clearable size="small" v-model="game.bigEatControl.ratio" type="text" style="width: 120px; " />
          </el-form-item>
        </div>
        <div class="label" style="position: absolute; top: 40%; left: 90%;">
          <el-button>执行</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import { listBlood } from '@/api/game/blood'

export default {
  name: 'blood',
  data() {
    return {

      bloodArray: [],
      total: 0,
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
        add:'',
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
      }
      ,
      game2: {
        bigEatControl: {
          limitScore: "-1000000",
          ratio: "7000",
        },
        bigVomitControl: {
          limitScore: "10000000",
          ratio: "7000"
        },
        bloodScore: 26189000,
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
      game3: {
        bigEatControl: {
          limitScore: "-1000000",
          ratio: "7000",
        },
        bigVomitControl: {
          limitScore: "10000000",
          ratio: "7000"
        },
        bloodScore: 26189000,
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
          add: [
            { required: true, message: '请输入加减金币任务分值', trigger: 'blur' },
            { pattern: /^[+-]\d+$/, message: '分值必须以 + 或 - 开头并为数字', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    getList() {
      this.loading = true
      listBlood(this.queryParams).then((response) => {

        this.bloodArray = response.rows
        this.total = response.total
        this.loading = false
        console.log(this.bloodArray)

      })
    },
    handleSubmit() {
      this.$refs.game.validate(valid => {
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