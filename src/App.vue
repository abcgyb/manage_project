<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
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
        this.$router.push({ path: 'login' })
      }

    },
    components: {
    },
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
