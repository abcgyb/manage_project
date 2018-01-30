<template>
  <div id="appLogin">
    <h1>欢迎来到登录页面</h1>
    <el-button @click="testMethod" type="success" size="mini">登录</el-button>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  const ERR_OK = "000";
  export default {
    data () {
      return {
        user: {}
      };
    },
    created () {
    },
    methods: {
      testMethod (){
        this.$router.push({ path: 'main' })
      }

    },
    components: {
      ElButton,
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
