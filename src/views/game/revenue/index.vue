<template>
    <div>
      <el-table :data="tableData" style="width: 100%" :show-header="false">
        <el-table-column v-for="(item, index) in tableData" :key="index" :label="item.label">
          <template slot-scope="scope">
            {{ item.value }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableData: [
          { label: '项目A', value: 100 },
          { label: '项目B', value: 150 },
          { label: '项目C', value: 200 },
          { label: '项目D', value: 120 }
        ]
      };
    }
  };
  </script>
  