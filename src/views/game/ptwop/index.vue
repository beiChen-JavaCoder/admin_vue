<template>
  <div class="container">
    <el-row class="dropdown-container">
      <el-col :span="24">
        <span class="demonstration">游戏列表</span>
        <el-dropdown @command="handleDropdownCommand">
          <span class="el-dropdown-link">
            {{ game.gameName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" size="medium ">
            <el-dropdown-item v-for="(game, index) in games" :key="index" :command="game">
              {{ game.gameName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <div class="child">
      <br />
      <el-row :span="24" :xs="24">
        <el-form :inline="true" label-width="68px">

        </el-form>
      </el-row>
      <el-form :inline="true" ref="pageUserControls" :modal="pageUserControls" :rules="rules.game">
        <br />
        <div label="点对点控制" style="position: relative">
          <div label="游戏信息">
            <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏ID: {{ game.gameId }} </span>
            <span class="label" style="width: auto; font-size: large; margin-right: 50px;">游戏名称: {{ game.gameName
            }}</span>
            <br />
          </div>
          <br />
          <div>
            <el-form-item label="玩家id" prop="userId">
              <el-input placeholder="请输入玩家id或名称" v-model="queryParams.queryId" clearable size="small"
                style="width: 240px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-form-item>
          </div>
          <hr />
          <div v-for="(userControl, index) in pageUserControls" :key="index">
            <el-form-item label="玩家id">
              <el-input clearable size="small" v-model="userControl.userId" :disabled="true" type="text"
                style="width: 120px;" />
            </el-form-item>
            <el-form-item label="原始分数" style="margin-left: 60px;">
              <el-input clearable size="small" v-model="userControl.currentScore" :disabled="true" type="text"
                style="width: 120px;  " />
            </el-form-item>
            <el-form-item label="加减金币任务" style="margin-left: 60px;">
              <el-input clearable size="small" v-model="userControl.targetScore" type="text" style="width: 120px;  " />
            </el-form-item>
            <el-button @click="handleSubmit(userControl)">执行</el-button>
            <br>
          </div>
        </div>
        <span style="color: red;">注：尽量少点控，点控多会了影响血池与其他未被点控用户！</span>
        <div>
          <el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum"
            @current-change="currentChange" @size-change="sizeChange" />
        </div>
      </el-form>
    </div>
    <br />
  </div>
</template>
<script>
import { gameUserUpdate, listPtp } from '@/api/game/ptp'
export default {
  data() {
    return {
      queryParams: {
        //分页参数
        pageNum: 2,
        pageSize: 10,
        queryId: undefined,
      },
      //搜索结果
      userControl: {},
      // 总条数
      total: 0,
      pageUserControls: [],
      ptps: [],
      games: [],
      game: {
        gameId: 901,
        gameName: "骰子",
        userControls: [
          {
            userId: 1,
            currentScore: 0,
            targetScore: 10000
          }
        ]
      }
      ,
      //用于表单验证
      form: {},
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
    handleQuery() {
      var userControls = this.game.userControls

       var arr = userControls.forEach(userControl => {
        if (userControl.userId === this.queryParams.queryId) {
          return userControl
        }
      });
      //查询操作
      var arr2 = [] 
      arr.push({
        qwe:"111"
      })
      console.log(arr)
      // this.game.userControls = null
      // this.game.userControls.push(userControl)


    },
    //监控分页变化
    currentChange(val) {
      console.log("翻页，当前为第几页", val);
      this.queryParams.pageNum = val;
      this.getUserPage();
    },
    sizeChange(val) {
      conso1e.log("改变每页多少条，当前一页多少条数据", val);
      this.queryParams.pageSize = val;
      this.queryParams.pageNum = 1;
      this.getUserPage();
    },
    //分页玩家
    getUserPage() {

      var num = this.queryParams.pageNum
      var size = this.queryParams.pageSize
      var userControls = this.game.userControls

      this.pageUserControls = userControls.slice(
        (num - 1) * size,
        num * size
      );
      this.total = userControls.length
    },
    handleSubmit(userControl) {
      this.form.score = userControl.currentScore
      // this.$refs.game.validate(valid => {
      //   if (valid) {
      //     // 表单验证通过，执行提交操作
      //     console.log('表单验证通过，执行提交操作');
      //     this.ptpUpdate(game);
      //   } else {
      //     // 表单验证未通过
      //     console.log('表单验证未通过');
      //   }
      // });
      userControl.gameId = this.game.gameId;
      this.userControlUpdate(userControl)
      this.game.gameId = null;
      this.getList()

    },
    //更新游戏玩家信息
    userControlUpdate(userControl) {

      gameUserUpdate(userControl).then((response => {
        this.$modal.msgSuccess('更新成功')

      }))

    },
    //下拉框处理
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
        //给game默认值
        this.game = this.games[0]
        this.getUserPage()



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

.dropdown-container {
  position: absolute;
  top: 10%;
  left: 5%;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 20px;
  margin-bottom: 20px;

}
</style>