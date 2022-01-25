import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let routes = [
  { //用户登录
    path: '/login',
    name: 'login',
    component: ()=>import('./views/Login'),
    meta: {
      title: 'login',
    },
  },
  { 
    path: '/register',
    name: 'register',
    component: ()=>import('./views/Register'),
    meta: {
      title: 'register',
    },
  },
  { //首页
    path: '/',
    component: ()=>import('./views/Index'),
    children: [
      {
        path: '/',
        name: 'home',
        alias: '/home',
        component: ()=>import('./views/VendorCoordination/Index'),
        meta: {
          title: 'home'
        }
        // path: '/',
        // name: 'Acknowledgements',
        // component: ()=>import('./views/VendorCoordination/Acknowledgements'),
        // meta: {
        //   title: 'PO Acknowledgements'
        // }
      },
      {
        path: '/门店管理',
        name: '门店管理',
        component: ()=>import('./views/Shop/ShopManage'),
        meta: {
          title: '门店管理',
          noCache: true
        }
      },
      {
        path: '/店员管理',
        name: '店员管理',
        component: ()=>import('./views/Member/MemberManage'),
        meta: {
          title: '店员管理',
          noCache: true
        }
      },
      {
        path: '/店员详情',
        name: '店员详情',
        component: ()=>import('./views/Member/MemberDetails'),
        meta: {
          title: '店员详情',
          noCache: true
        }
      },
      {
        path: '/活动管理',
        name: '活动管理',
        component: ()=>import('./views/Activity/ActivityManage'),
        meta: {
          title: '活动管理',
          noCache: true
        }
      },
      {
        path: '/开口说管理',
        name: '开口说管理',
        component: ()=>import('./views/Study/StudyManage'),
        meta: {
          title: '开口说管理',
          noCache: true
        }
      },
      {
        path: '/开口说记录',
        name: '开口说记录',
        component: ()=>import('./views/Study/StudyRequestManage'),
        meta: {
          title: '开口说记录',
          noCache: true
        }
      },
      {
        path: '/问卷管理',
        name: '问卷管理',
        component: ()=>import('./views/Question/QuestionManage'),
        meta: {
          title: '问卷管理',
          noCache: true
        }
      },
      // {
      //   path: '/问卷记录',
      //   name: '问卷记录',
      //   component: ()=>import('./views/Question/QuestionRequestManage'),
      //   meta: {
      //     title: '问卷记录',
      //     noCache: true
      //   }
      // },
      {
        path: '/资讯管理',
        name: '资讯管理',
        component: ()=>import('./views/Artical/ArticalManage'),
        meta: {
          title: '资讯管理',
          noCache: true
        }
      },
      {
        path: '/积分商城',
        name: '积分商城',
        component: ()=>import('./views/Score/ScoreMallManage'),
        meta: {
          title: '积分商城',
          noCache: true
        }
      },
      {
        path: '/积分申请',
        name: '积分申请',
        component: ()=>import('./views/Score/ScoreRequestManage'),
        meta: {
          title: '积分申请',
          noCache: true
        }
      },
      {
        path: '/商品兑换申请',
        name: '商品兑换申请',
        component: ()=>import('./views/Score/ScoreGiftRequestManage'),
        meta: {
          title: '商品兑换申请',
          noCache: true
        }
      },
      {
        path: '/店员积分明细',
        name: '店员积分明细',
        component: ()=>import('./views/Member/MemberScoreManage'),
        meta: {
          title: '店员积分明细',
          noCache: true
        }
      },
      {
        path: '/Open Orders',
        name: 'Order',
        component: ()=>import('./views/VendorCoordination/Order'),
        meta: {
          title: 'Open Orders',
          noCache: true

        }
      },
      {
        path: '/Forecast Sharing',
        name: 'Sharing',
        component: ()=>import('./views/VendorCoordination/Sharing'),
        meta: {
          title: 'Forecast Sharing',
          activeNav: 'Forecast Sharing'
        }
      },
      {
        path: '/PO Acknowledgements',
        name: 'Acknowledgements',
        component: ()=>import('./views/VendorCoordination/Acknowledgements'),
        meta: {
          title: 'PO Acknowledgements',
          noCache: true
        }
      },
      {
        path: '/XML Report',
        name: 'XMLReport',
        component: ()=>import('./views/CommonReport/XMLReport'),
        meta: {
          title: 'XML Report',
          noCache: true
        }
      },
      {
        path: '/Authorization Manage',
        name: 'Authorization',
        component: ()=>import('./views/VendorCoordination/Authorization'),
        meta: {
          title: 'Authorization Manage',
          noCache: true
        }
      },
      {
        path: '/Payments',
        name: 'Payments',
        component: ()=>import('./views/VendorInvioce/Payments'),
        meta: {
          title: 'Payments',
          noCache: true
        }
      },
      {
        path: '/MRO Apply',
        name: 'MRO',
        component: ()=>import('./views/VendorInvioce/MRO'),
        meta: {
          title: 'MRO Apply',
          noCache: true
        }
      },
      {
        path: '/Consignment',
        name: 'Consignment',
        component: ()=>import('./views/VendorInvioce/Consignment'),
        meta: {
          title: 'Verification Of Consignment'
        }
      },
      {
        path: '/Match',
        name: 'Match',
        component: ()=>import('./views/VendorInvioce/Match'),
        meta: {
          title: 'Invoice Match'
        }
      },
     
      { //404页面
        path: '/404',
        component: ()=>import('./views/404'),
        name: '404',
        meta: {
          title: '404'
        }
      },
      { //403页面
        path: '/403',
        component: ()=>import('./views/403'),
        name: '403',
        meta: {
          title: '403'
        }
      },
      {
        path: '*',
        redirect: '/'
      },
    ]
  }
]

export default new Router({
  mode: 'hash', //history
  base: process.env.BASE_URL,
  routes: routes
})
