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
              <el-input placeholder="请输入玩家id" v-model="queryParams.queryId" clearable size="small" style="width: 240px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openDialog">新增</el-button>
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

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-col :span="6">
          <el-form-item label="玩家id">
            <el-input v-model="form.userId" placeholder="请输入玩家id" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="原始分數">
            <el-input v-model="form.currentScore" placeholder="请输入原始分數" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="加減任務分數">
            <el-input v-model="form.targetScore" placeholder="请输入加减任务分数" />
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gameUserUpdate, listPtp,addUserControl } from '@/api/game/ptp'
export default {
  data() {
    return {
      queryParams: {
        //分页参数
        pageNum: 1,
        pageSize: 10,
        queryId: null,
      },
      //搜索结果
      userControl: {},
      // 总条数
      total: 0,
      //控制dilog框
      open: false,
      title: '',

      pageUserControls: [],
      ptps: [],
      games: [],
      game: {
        // gameId: 901,
        // gameName: "骰子",
        // userControls: [
        //   {
        //     userId: 1,
        //     currentScore: 0,
        //     targetScore: 10000
        //   }
        // ]
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
        },
          form:{
            targetScore: [
              { required: true, message: '请输入玩家id', trigger: 'blur' },
              { pattern: /^[0-9]+$/, message: '玩家id必须为数字', trigger: 'blur' }
            ]
          }

      }
    }
  },
  methods: {
    submitForm(){
      this.open = false
      this.title = "新增计划"
      this.form.gameId = this.game.gameId
      this.$refs.form.validate((valid) => {
        if (valid) {
          addUserControl(this.form).then((response) =>{
            this.$notify({
              title: '成功',
              message: '添加成功',
              type:'success',
              duration: 2000
            })
            this.getList()
          })
        }else{

        }
        console.log(this.form)

    })
  },
    openDialog() {
      this.open = true
    },
    cancel() {
      this.open = false
    },
    handleQuery() {
      //如果查询为空则返回全部数据
      if (this.queryParams.queryId == null) {
        //设置默认第一页
        this.currentChange(1)
        return
      }
      let userControls = this.game.userControls
      // this.pageUserControls = userControls.filter(function (item) {
      //   return item.userId == 100002;
      // });
      //过滤分页数据
      let list = [];
      userControls.forEach(item => {
        if (item.userId == this.queryParams.queryId) {
          list.push(item);
          console.log(item);

        }
      });
      if (list.length === 0) {
        console.log(list)
        this.currentChange(1)

        return
      }
      //更新分页列表数据
      this.pageUserControls = list
      this.total = list.length
      console.log(list);
      console.log(this.queryParams.queryId);
      this.queryParams.queryId = null
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


      //修改血池
      userControl.gameId = this.game.gameId;
      userControl.type = 2
      this.userControlUpdate(userControl)
      this.game.gameId = null;
      this.getList()
      console.log(userControl)

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
        this.games.forEach(game => {

        })
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