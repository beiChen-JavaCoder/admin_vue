<template>
  <div class="container">
    <div class="child">
    <el-form :inline="true">
      <div label="点对点控制" style="position: relative">
        <div>
          <span class="label" style="width: auto; margin-right: 50px;">点对点控制</span>
          <el-form-item label="玩家id">
            <el-input clearable size="small" type="text" style="width: 120px;" />
          </el-form-item>
          <el-form-item label="加减金币任务" style="margin-left: 60px;">
            <el-input clearable size="small" type="text" style="width: 120px;  " />
          </el-form-item>
          <div class="label" style="margin-left: 120px;">
            <el-button>执行</el-button>
          </div>
          <br>
        </div>
      </div>
      <span style="color: red;">注：尽量少点控，点控多会了影响血池与其他末未被点控用户！</span>
    </el-form>
    </div>
  </div>
</template>
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
}</style>