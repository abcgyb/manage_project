<template>
  <el-row class="container">
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>书籍部分</template>
            <el-submenu index="1-4">
              <template slot="title">分类</template>
              <el-menu-item to index="/table"><router-link to="/table" @click.native="flushCom">书籍列表</router-link></el-menu-item>
              <el-menu-item to index="/manager"><router-link to="/manager" @click.native="flushCom">人员列表</router-link></el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px;background-color: rgb(238, 241, 246)">
                  <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>查看</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
          <span>超级管理员</span>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer style="background-color: rgb(238, 241, 246)">斌哥有限责任公司出品</el-footer>
      </el-container>
    </el-container>
  </el-row>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                message: ''
            }
        },
        methods:{
          flushCom () {
            this.$router.go(0);
          },
        }
    }
</script>

<style>
</style>
