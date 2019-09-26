<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->

        <el-tab-pane v-for="(item,index) in detailsData" :key="index" :label="item.feed_name" ：name="item.feed_id">{{item.feed_name}}</el-tab-pane>

      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "participation",
        data() {
            return {
                activeName: 'second',
                detailsData:[{feed_name:'未反馈',feed_id:0,more_remark:0}]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            /* 反馈列表 */
            async menu() {
                const res = await this.$api.details.feedbackMenu();
                if (res.status == "success") {
                    this.detailsData.push(...res.data);
                }
            }
        },
        mounted() {
            this.menu()
        }
    }
</script>

<style scoped lang="scss">

</style>
