<template>
  <div class="main-box organ-container">
    <div class="organ-aside">
      <div>组织名称
        <el-popover class="pb-popover"
                    placement="right"
                    width="430" trigger="click" @show="initParam">
          <h3 class="pb-popover-title">添加组织</h3>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="组织名称" prop="organize_name">
              <el-input v-model="ruleForm.organize_name"></el-input>
            </el-form-item>
            <el-form-item  style="text-align: right; margin: 0">
              <el-button type="text">取消</el-button>
              <el-button type="primary" @click="onSubmit(0)">提交</el-button>
            </el-form-item>
          </el-form>
          <span class="add-icon-span fr" slot="reference"><i class="el-icon-plus"></i>添加组织 </span>
        </el-popover>

      </div>
      <div class="tree-com">
        <el-tree id="organTree" :data="organList" ref="tree" :props="defaultProps" node-key="organize_id" default-expand-all  :expand-on-click-node="false" @node-click="handleNodeClick">
         <span class="custom-tree-node" slot-scope="{ node, data }">
           <span>{{ node.label }}</span>
           <el-popover class="pb-popover"
                       placement="right"
                       width="430" trigger="click" @show="initParam">
              <h3 class="pb-popover-title">添加下级组织</h3>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="组织名称" prop="organize_name">
                  <el-input v-model="ruleForm.organize_name"></el-input>
               </el-form-item>
               <el-form-item  style="text-align: right; margin: 0">
                  <el-button type="text">取消</el-button>
                  <el-button type="primary" @click="onSubmit(data.organize_id)">提交</el-button>
               </el-form-item>
              </el-form>
              <span class="el-icon-plus add-icon" slot="reference"></span>
            </el-popover>

         </span>
        </el-tree>
      </div>

    </div>
    <el-main class="main-box organ-container-main">
      <div class="organ-page-title">
        <h2 >
          <span v-show="!showEdit">{{organize_name}} <i class="el-icon-edit organ-edit" @click="showEditInput"></i> </span>
          <span  v-show="showEdit"><el-input size="small" placeholder="请输入内容" v-model="organize_name"></el-input><el-button size="mini" @click="save">保存</el-button> </span>
          <el-popover
            placement="bottom"
            width="200"
            v-model="delVisible">
            <p class="popover-tip">确定删除该组织？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="delVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="delOrgan">确定</el-button>
            </div>
            <i class="el-icon-minus organ-del fr tc"  slot="reference"></i>
          </el-popover>
        </h2>
      </div>
      <div class="organ-tb">
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="phone" label="登录账号"></el-table-column>
          <el-table-column prop="user_name" label="真实姓名"></el-table-column>
          <el-table-column prop="zh_identify" label="人员身份"></el-table-column>
          <el-table-column prop="duty_name" label="党内职务"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="email" label="电子邮箱"></el-table-column>
        </el-table>
        <!-- 分页  待封装为组件-->
        <div class="page-box" v-if="tableData.length > 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="page.page_limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </div>
      </div>
    </el-main>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        visible:false,
        organList: [],
        tableData:[],//表格数据
        organize_id:0,
        organize_name:"",
        showEdit:false,
        delVisible:false,//删除弹框
        page:{
          currentPage: 1,
          total: 0,
          page_limit: 10
        },
        defaultProps: {
          children: 'sub_organization',
          label: 'organize_name'
        },
        //添加组织
        ruleForm:{
          organize_name:""
        },
        rules: {
          organize_name:[ { required: true, message: '请输入组织名称', trigger: 'blur' },]
        }
      };
    },
    created(){
      this.getOrganList();
    },
    mounted(){
      setTimeout(function () {
        //默认选中树形第一条
        let treeNode=document.getElementById('organTree').getElementsByClassName('el-tree-node');
        document.getElementById('organTree').getElementsByClassName('el-tree-node')[0].classList.add("is-current");
        console.log(treeNode.length)
      },500)
    },
    methods: {
      showEditInput(){
        this.showEdit=true;
      },
      async save(){
        let res=await this.$api.globalConfig.editOrgan({
          organize_id:this.organize_id,
          organize_name:this.organize_name,
        });
        if(res.status=="success"){
          this.getOrganList();
          this.showEdit=false;
        }
      },
      async delOrgan(){
        let res=await this.$api.globalConfig.delOrgan({
          organize_id:this.organize_id
        });
        if(res.status=="success"){
          this.getOrganList();
          this.delVisible=false;
        }
      },
      async getOrganizeUserLists(){
        let params={
          organize_id:this.organize_id,
          page:this.page.currentPage,
          page_limit:this.page.page_limit
        }
        let res=await this.$api.globalConfig.getOrganizeUserLists(params);
        if(res.status=="success"){
          this.tableData=res.data.lists;
          this.page.total = res.data.count;
        }

      },

      handleNodeClick(data) {
        // 选中
        this.organize_id=data.organize_id;
        this.organize_name=data.organize_name;
        document.getElementById('organTree').getElementsByClassName('el-tree-node')[0].classList.remove("is-current")
        this.getOrganizeUserLists();
      },
      handleSizeChange(val){
        this.page.page_limit = val;
        this.getOrganizeUserLists();
      },
      handleCurrentChange(){
        this.page.currentPage = val;
        this.getOrganizeUserLists();
      },
      async getOrganList(){
        let res=await this.$api.globalConfig.getOrganList({});
        if(res.status=="success"){
          this.organList=res.data;
          //获取第一个organize_id和organize_name
          this.organize_id=this.organList[0].organize_id;
          this.organize_name=this.organList[0].organize_name;
          this.getOrganizeUserLists();
        }
      },
      initParam(){
        this.ruleForm.organize_name="";
      },
      async onSubmit(organize_id){
        let res=await this.$api.globalConfig.addOrgan({
          organize_id:organize_id,
          organize_name:this.ruleForm.organize_name,
        });
        if(res.status=="success"){
          this.getOrganList();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/table.scss";
  
  .organ-aside{
     margin: 35px  20px; 
    width:190px;
    display: inline-block;
    color:$color999999;
    font-size: 15px;
    float:left;
    .add-icon-span{
      color:$color675757;
      font-size: 14px;
    }
  }
  .organ-container{
    height: 100%;
    .organ-container-main{
      margin-left: 200px;
      background:rgba(246,246,246,1);
      border-radius:6px;
      height: 100%;
      display: block;
      padding:20px 30px;
      .organ-page-title{
        font-size: 22px;
        margin-bottom: 20px;
        h2{
          font-size: 22px;
        }
        .el-input .el-input__inner{
          width:200px;

        }
        .organ-edit{
          width:22px;
          height: 22px;
          color:#5BA1F3;
          background-color: #fff;
          font-size: 15px;
          border-radius: 1px;
          text-align: center;
          line-height: 22px;
          vertical-align: center;
          position: relative;
          top:-2px;
        }
        .organ-del{
          width:25px;
          height: 25px;
          display: inline-block;
          font-size: 15px;
          line-height: 25px;
          font-size: 15px;
          color:#fff;
          background-color: #DD2D1E;
          border-radius: 6px;
        }
      }

    }
  }




</style>
