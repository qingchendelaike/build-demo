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
      },{
        path: 'recordList',
        name: 'recordList',
        component: () => import('@/components/eventRecord/recordList.vue')
      }
    ]
  }, ]
})
