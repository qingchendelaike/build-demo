<template>
  <div class="organ-aside">
     <div>组织名称 <span class="add-icon-span fr"><i class="el-icon-plus"></i>添加组织 </span> </div>
     <div class="tree-com">
       <el-tree :data="organList" :props="defaultProps" @node-click="handleNodeClick">
         <span class="custom-tree-node" slot-scope="{ node, data }">
           <span>{{ node.label }}</span>
           <el-popover class="pb-popover"
             placement="right"
             width="430" trigger="hover" @show="initParam">
              <h3 class="pb-popover-title">添加下级组织</h3>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="组织名称" prop="organize_name">
                  <el-input v-model="ruleForm.organize_name"></el-input>
               </el-form-item>
               <el-form-item  style="text-align: right; margin: 0">
                  <el-button type="text">取消</el-button>
                  <el-button type="primary" @click="onSubmit(data.parent_id)">提交</el-button>
               </el-form-item>
              </el-form>
              <span class="el-icon-plus add-icon" slot="reference"></span>
            </el-popover>

         </span>
       </el-tree>
     </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        visible:false,
        organList: [],
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
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      async getOrganList(){
        let res=await this.$api.globalConfig.getOrganList({});
        console.log(res);
        if(res.status=="success"){
          this.organList=res.data;
        }
      },
      initParam(){
        this.ruleForm.organize_name="";
      },
      onSubmit(organize_id){
        console.log(organize_id);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .organ-aside{
    margin:0 20px;
    width:190px;
    display: inline-block;
    color:$color999999;
    font-size: 15px;
    .add-icon-span{
      color:$color675757;
      font-size: 14px;
    }
  }


</style>
