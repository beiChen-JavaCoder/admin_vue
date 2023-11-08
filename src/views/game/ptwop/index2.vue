<template>
              <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="userName">
            <el-input  placeholder="请输入用户名称" clearable size="small" style="width: 240px"
               />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select  placeholder="用户状态" clearable size="small" style="width: 240px">
              <el-option :key="0" label="正常" :value="0" />
              <el-option :key="1" label="停用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" >搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
</template>