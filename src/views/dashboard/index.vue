<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      后台管理系统
    </div>
    <!-- <div>
      <a href=""></a>
      <el-button  @click="test">
        测试按钮
      </el-button>
    </div> -->
    <div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { test } from "@/api/test";
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    test() {
      var num = "1";
      const Number = num*1000;
      console.log("Number of"+Number);
      test().then(() =>{
      console.log("测试111111");
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
