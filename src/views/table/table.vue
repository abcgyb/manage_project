<template>
  <div id="vue-menu3">
<!--    <el-form-item label="管理人员">
      <el-input  placeholder="管理人员"></el-input>
    </el-form-item>-->
    <el-row style="margin-bottom: 20px;">
      <el-col :span="4">
        <el-input  placeholder="管理人员" v-model="manager" class="grid-content" size="mini"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-input  placeholder="书名" v-model="bookname" class="grid-content" size="mini"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="借阅日期" size="mini">
        </el-date-picker>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="归还日期" size="mini">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button v-on:click="query" type="primary" icon="el-icon-search" size="mini" >查询</el-button>
        <el-button @click.native="clickAdd" type="success" icon="el-icon-circle-plus" size="mini">新增</el-button>
        <el-button @click.native="clickDelete" type="warning" icon="el-icon-delete" size="mini" :disabled="disabledFlag">批量删除</el-button>
        <el-button v-on:click="forbbidClick" :type="forbbidType" icon="el-icon-warning" size="mini" plain>{{forbbidName}}</el-button>
        <el-button type="primary" :loading="true" size="mini">转转转，转起来</el-button>
      </el-col>
    </el-row>

    <el-table :data="libraryInfo" style="width: 100%" @selection-change="selsChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="bookId"
        label="书籍编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="书名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="chargePerson"
        label="管理人员">
      </el-table-column>
      <el-table-column
        prop="borrowTime"
        label="借阅时期">
      </el-table-column>
      <el-table-column
        prop="returnTime"
        label="归还时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="450px" @close="closeRollback">
      <el-form :model="bookForm">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="bookForm.bookname" auto-complete="off" style="width: 243px" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="管理人员" :label-width="formLabelWidth">
          <el-select v-model="bookForm.manager" placeholder="请选择管理者" style="width: 243px" size="mini">
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
            <el-option label="王五" value="王五"></el-option>
            <el-option label="赵六" value="赵六"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" plain size="mini">取 消</el-button>
        <el-button type="success" @click="dialogFormVisible = false,bookInsert('bookForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>



    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="pageSizesList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDataNumber">
      </el-pagination>
    </div>



  </div>
</template>
<script type="text/ecmascript-6">
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    props: {
      user: {
      }
    },
    data () {
      return {
        libraryInfo:[],
        value1: '',
        value2:'',
        manager:'',
        bookname:'',
        bookId: 0,
        pageNo: 1,
        pageSize: 10,
        pageSizesList: [1, 2, 3,10],
        tableData: [],//返回的结果集合
        totalDataNumber: 0,//数据的总数,
        dialogFormVisible:false,//控制弹出框默认不显示
        bookForm: {
          bookname: '',
          manager: ''
        },
        formLabelWidth:'120px',
        title:'新增书籍',
        sels: [],//选中的值显示
        deleteIds: [],//选中的要删除的ID,
        forbbidName: '禁用批量按钮',
        disabledFlag:false,
        forbbidType:"danger"
      };
    },
    methods:{
      query(){
        this.$http.post('/bookOperate/queryInfo',{
          "manager": this.manager,
          "bookname": this.bookname,
          "pageNo":this.pageNo,
          "pageSize":this.pageSize
        }).then(function(res){
          if(res.body.dtoList.length>0){
            this.libraryInfo = res.body.dtoList;
            this.totalDataNumber = res.body.total;
          }else{
            this.libraryInfo = res.body.dtoList;
            this.totalDataNumber = res.body.total;
          }
        },function(res){
        });
      },
      bookInsert(){
        //首先判断是新增还是修改
        if(this.title=="新增书籍信息"){
          this.$http.post('/bookOperate/insertBook',{
            "chargePerson": this.bookForm.manager,
            "name": this.bookForm.bookname
          }).then(function(res){
            //插入成功，则弹窗提示
            if(res.data>0){
              this.$message({
                message: '恭喜你,插入一条书籍信息',
                type: 'success'
              });
            }
            this.pageSize=10;
            this.query();
          },function(res){
            //关闭对话框
            this.closeRollback()
            this.pageSize=10;
            this.query();
          });
        }else{
          this.$http.post('/bookOperate/updateBook',{
            "chargePerson": this.bookForm.manager,
            "name": this.bookForm.bookname,
            "bookId": this.bookId
          }).then(function(res){
            //更新成功，则弹窗提示
            if(res.data>0){
              this.$message({
                message: '恭喜你,更新一条书籍信息',
                type: 'success'
              });
            }
            this.pageSize=10;
            this.query();
          },function(res){
            //关闭对话框
            this.closeRollback()
            this.pageSize=10;
            this.query();
          });
        }

      },
      //删除
      handleDelete(index,row){
        this.$http.post('/bookOperate/deleteBook',{
          "bookId": parseInt(row.bookId)
        }).then(function(res){
          //更新成功，则弹窗提示
          if(res.data>0){
            this.$message({
              message: '恭喜你,删除一条书籍信息',
              type: 'success'
            });
          }
          this.pageSize=10;
          this.query();
        },function(res){
          //关闭对话框
          this.closeRollback()
          this.pageSize=10;
          this.query();
        });
      },
      //批量删除时查询出选中的checkbox
      selsChange(sels) {
        this.sels = sels
      },

      clickDelete(){
        console.info(this.sels)
        var ids = this.sels.map(item => item.bookId).join(',')//获取所有选中行的id组成的字符串，以逗号分隔
        this.$http.post('/bookOperate/amountDeleteBook',{
          "bookIds": ids
        }).then(function(res){
          //批量删除成功，则弹窗提示
          if(res.data>0){
            this.$message({
              message: '恭喜你,删除了书籍信息',
              type: 'success'
            });
          }
          this.pageSize=10;
          this.query();
        },function(res){
          //关闭对话框
          this.closeRollback()
          this.pageSize=10;
          this.query();
        });
      },

      closeRollback(){
        this.bookForm.manager =''
        this.bookForm.bookname =''
      },

      clickAdd(){
        this.dialogFormVisible=true
        this.title='新增书籍信息'
      },

      //点击修改，弹出对话框
      handleEdit(index,row){
        this.dialogFormVisible=true
        this.title='修改书籍信息'
        this.bookForm.manager =row.chargePerson
        this.bookForm.bookname =row.name
        this.bookId =row.bookId
      },
      //分页
      handleSizeChange(val) {
        var pageSize =val;
        this.pageNo=1
        this.pageSize=parseInt(pageSize)
        this.query();
      },
      handleCurrentChange(val) {
        var pageNo = `${val}`;
        this.pageNo= parseInt(pageNo)
        this.query();
      },

      forbbidClick(){
          if(this.forbbidName=="禁用批量按钮"){
            this.forbbidName="启用批量按钮"
            this.disabledFlag=true
            this.forbbidType='success'
          }else{
            this.forbbidName="禁用批量按钮"
            this.disabledFlag=false
            this.forbbidType='danger'
          }

      }
    }
  };
</script>
<style>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }

  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
