<template>
  <el-row class="container">
  <el-container style="height: 700px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item to index="/table"><router-link to="/table" @click.native="flushCom">书籍列表</router-link></el-menu-item>
            <el-menu-item index="/test"><router-link to="/test">测试</router-link></el-menu-item>

          </el-submenu>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;background-color: rgb(238, 241, 246)">
<!--        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
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

<script>
  import header from './views/header/header.vue';
  import tablepage  from './views/table/table.vue'
  const ERR_OK = "000";
  export default {
    data () {
      return {
        user: {}
      };
    },
/*    created () {
      this.$http.get('/api/user').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.user = response.datas;
        }
      });
    },*/
    methods: {
      flushCom () {
          this.$router.go(0);
      }
    },
    components: {
      'v-header': header,
      'v-tablebody':tablepage
    }
  };
</script>

<style>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
