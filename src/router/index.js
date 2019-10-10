import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: () => import('@/components/login.vue')
  }, {
    path: '/index',
    name: 'index',
    component: () => import('@/components/index.vue'),
    children: [
      /* 事项中心 */
      {
        /* 事项总页 */
        path: '/index/eventSummary',
        name: 'eventSummary',
        redirect: '/index/eventSummary/allMatters',
        component: () => import('@/components/eventCenter/eventSummary.vue'),
        children: [{
          /* 所有事项 */
          path: '/index/eventSummary/allMatters',
          name: 'allMatters',
          component: () => import('@/components/eventCenter/allMatters.vue')
        }, {
          /* 系列事项 */
          path: '/index/eventSummary/seriesItems',
          name: 'seriesItems',
          component: () => import('@/components/eventCenter/seriesItems.vue')
        }, {
          /* 我执行的 */
          path: '/index/eventSummary/ieXecute',
          name: 'ieXecute',
          component: () => import('@/components/eventCenter/IExecute.vue')
        }, {
          /* 我发起的 */
          path: '/index/eventSummary/iLaunched',
          name: 'iLaunched',
          component: () => import('@/components/eventCenter/ILaunched.vue')
        }]
      },
      /* 事项详情 */
      {
        path: '/index/detailsEvent',
        name: 'detailsEvent',
        component: () => import('@/components/detailsEvent/index.vue'),
        children:[{
          path: '/index/detailsEvent/initiateDetails',
          name: 'initiateDetails',
          component: () => import('@/components/detailsEvent/initiateDetails.vue'),
        },{
          path: '/index/detailsEvent/uploadFiles',
          name: 'uploadFiles',
          component: () => import('@/components/detailsEvent/uploadFiles.vue'),
        },{
          path: '/index/detailsEvent/participation',
          name: 'participation',
          component: () => import('@/components/detailsEvent/participation.vue'),
        }]
      }
      /* 个人信息 */
      , {
        path: 'person',
        name: 'person',
        component: () => import('@/components/personal/index.vue'),
        children: [{
          path: 'adminPerson',
          name: 'adminPerson',
          component: () => import('@/components/personal/adminPerson.vue'),
        }, {
          path: 'personMSg',
          name: 'personMSg',
          component: () => import('@/components/personal/personMSg.vue'),
        }]
      },
      /* 大事记 */
      {
        path: 'recordList',
        name: 'recordList',
        component: () => import('@/components/eventRecord/recordList.vue')
      },
      /* 全局设置 */
      {
        path: 'globalConfig',
        name: 'globalConfig',
        component: () => import('@/components/globalConfig/globalConfig.vue'),
        redirect: '/index/globalConfig/partyWork/organManage',
        children: [{
          /* 组织架构管理 */
          path: '/index/globalConfig/partyWork/organManage',
          name: 'organManage',
          component: () => import('@/components/globalConfig/organManage.vue')
        }, {
          /* 职务权限管理 */
          path: '/index/globalConfig/partyWork/powerManage',
          name: 'powerManage',
          component: () => import('@/components/globalConfig/powerManage.vue')
        }, {
          /* 党务用户管理 */
          path: '/index/globalConfig/partyWork/userManage',
          name: 'userManage',
          component: () => import('@/components/globalConfig/userManage.vue')
        }, {
          /* 人员资料库验证 */
          path: '/index/globalConfig/partyWork/userDataPwd',
          name: 'userDataPwd',
          component: () => import('@/components/globalConfig/userDataPwd.vue')
        },{
          /* 人员资料库 */
          path: '/index/globalConfig/partyWork/userData',
          name: 'userData',
          component: () => import('@/components/globalConfig/userData.vue')
        },{
          /* 系统角色管理 */
          path: '/index/globalConfig/system/roleManage',
          name: 'roleManage',
          component: () => import('@/components/globalConfig/roleManage.vue')
        }, {
          /* 系统用户管理 */
          path: '/index/globalConfig/system/sysUserManage',
          name: 'sysUserManage',
          component: () => import('@/components/globalConfig/sysUserManage.vue')
        }]
      }
    ]
  }, ]
})
