<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div class="clearfix">
            <span style="font-size:larger;"><b>个人信息</b></span>
          </div>
          <div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户名称
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" />创建人
                <div class="pull-right">{{ user.createBy }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="people" />用户昵称
                <div class="pull-right">{{ user.nickName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="time" />创建日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
          <div v-if="disable">
            <div class="clearfix">
            <span style="font-size: larger;"><b>商户信息</b></span>
          </div>
          <div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />商户名称
                <div class="pull-right">{{ merchant.merchantName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="qq" />QQ
                <div class="pull-right">{{ merchant.qq }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="wechat" />微信
                <div class="pull-right">{{ merchant.wx }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />YY
                <div class="pull-right">{{ merchant.yy }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="money" />提现比例
                <div class="pull-right">{{ merchant.ratio }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="rate" />渠道号
                <div class="pull-right">{{ merchant.channel }}</div>
              </li>
            </ul>
          </div>
          </div>
        
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>
  
<script>

import { getUserProfile } from "@/api/system/user";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      merchant: {},
      roleGroup: [],
      disable:false,
    };
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.user;
        this.roleGroup = response.user.roles.join(', ');
        if(response.merchant != null){
          this.merchant = response.merchant;
          this.disable = true;
        }
      });
    }
  },
  created() {
    this.getUser();
  },
};
</script>
  