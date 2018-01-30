<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-input placeholder="人员名称" v-model="name" class="grid-content" size="mini"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="性别" v-model="sex" class="grid-content" size="mini"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input placeholder="年龄" v-model="age" class="grid-content" size="mini"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button v-on:click="query" type="primary" icon="el-icon-search" size="mini">查询</el-button>
        <el-button @click.native="clickAdd" type="success" icon="el-icon-circle-plus" size="mini">新增</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%;margin-top: 20px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="人员姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birth }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="公司">
              <span>{{ props.row.company }}</span>
            </el-form-item>
            <el-form-item label="邮编">
              <span>{{ props.row.postcode }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="160">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="生日"
        sortable
        width="160">
      </el-table-column>
      <!--      <el-table-column
              prop="age"
              label="年龄"
              width="160">
            </el-table-column>-->
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="translate"
        width="160">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <!--      <el-table-column
              prop="company"
              label="公司"
              width="300">
            </el-table-column>-->
      <el-table-column
        prop="postcode"
        label="邮编"
        width="220">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalDataNumber">
      </el-pagination>
    </div>

<!--    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="450px" @close="closeRollback">
      <el-form :model="bookForm">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="bookForm.bookname" auto-complete="off" style="width: 243px" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="管理人员" :label-width="formLabelWidth">
          <el-select v-model="bookForm.manager" placeholder="请选择管理者" style="width: 243px" size="mini">
            <el-option
              v-for="item in managerList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" plain size="mini">取 消</el-button>
        <el-button type="success" @click="dialogFormVisible = false,bookInsert('bookForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script type="text/javascript">
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {ElInput},
    data() {
      return {
        tableData: [],
        name: '',
        sex: '',
        age: '',
        //分页信息
        pageSizesList: [2],
        pageNo: 1,
        pageSize: 2,
        totalDataNumber: 0,//数据的总数,
        //修改弹框
        title:'修改管理人员信息',
        dialogFormVisible: false,//控制弹出框默认不显示
      }
    },
    methods: {
      query(){
        this.$http.post('/managerOperate/query', {
          "name": this.name,
          "sex": this.sex,
          "age": this.age,
          "pageNo": this.pageNo,
          "pageSize": this.pageSize
        }).then(function (res) {
          console.info(res.body)
          if (res.body.respList.length > 0) {
            this.tableData = res.body.respList;
            this.totalDataNumber = res.body.total;
          } else {
            this.libraryInfo = res.body.respList;
            this.totalDataNumber = res.body.total;
          }
        }, function (res) {
        });
      },
      handleClick(row){
        console.info(row)
      },
      translate(row, column){
        switch (row.sex) {
          case 0:
            return '女';
            break;

          case 1:
            return '男';
            break;

          default:
            return '未知';
        }
      },
      //分页
      handleSizeChange(val) {
        var pageSize = val;
        this.pageNo = 1
        this.pageSize = parseInt(pageSize)
        this.query();
      },
      handleCurrentChange(val) {
        var pageNo = `${val}`;
        this.pageNo = parseInt(pageNo)
        this.query();
      },
    }

  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
