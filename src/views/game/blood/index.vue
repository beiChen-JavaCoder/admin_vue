<template>
  <div class="container">
    <el-form :inline="true">
      <br>
            <br>
      <div label="血池控制" style="position: relative">
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">血池控制 </span>
          <el-form-item label="玩家id">
            <el-input clearable size="small" type="text" style="width: 120px;" />
          </el-form-item>
          <el-form-item label="加减金币任务" style="margin-left: 60px;">
            <el-input clearable size="small" type="text" style="width: 120px;  " />
          </el-form-item>
          <div class="label" style="margin-left: 120px;">
            <el-button>执行</el-button>
          </div>
        </div>
      </div>
      <hr>
      <br>
      <div label="平衡控制" style="position: relative; ">
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">狂吐控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" type="text" style="width: 120px;   margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率" >
            <el-input clearable size="small" type="text" style="width: 120px; " />
          </el-form-item>
        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">吐分控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" type="text" style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率">
            <el-input clearable size="small" type="text" style="width: 120px;" />
          </el-form-item>
        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px; ">吃分控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" type="text" style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率">
            <el-input clearable size="small" type="text" style="width: 120px; " />
          </el-form-item>
        </div>
        <br>
        <div>
          <span class="label" style="width: auto; margin-right: 50px; ">狂吃控制</span>
          <el-form-item label="分值">
            <el-input clearable size="small" type="text" style="width: 120px; margin-right: 100px; " />
          </el-form-item>
          <el-form-item label="触发率">
            <el-input clearable size="small" type="text" style="width: 120px; " />
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

export default {
  name: 'blood',
  data() {
    return {

    }
  },
  methods: {
    dialogVisible() {

    }

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