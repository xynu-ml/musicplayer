import Vue from 'vue'
import Router from 'vue-router'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disic from '@/components/disic/disic'
import RankList from '@/components/rank-list/rank-list'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/recommend"
      
    },
    {
      component:Singer,
      path:"/singer",
      children:[{
      	path:"/singer/:id",
        component:SingerDetail
      }
          
      ]
    },
    {
      component:Rank,
      path:"/rank",
      children:[{
      	path:'/rank/:id',
      	component:RankList
      }]
    },
    {
      component:Recommend,
      path:"/recommend",
      children:[{
      	path:'/recommend/:id',
      	component:Disic
      }]
    },
    {
      component:Search,
      path:"/search",
      children:[{
      	path:"/search/:id",
      	component:SingerDetail
      }]
    }
  ]
})
