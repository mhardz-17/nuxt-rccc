import Vue from 'vue'
import Router from 'vue-router'
import ResistorColorCodeCalculator from '@/components/ResistorColorCodeCalculator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResistorColorCodeCalculator',
      component: ResistorColorCodeCalculator
    }
  ]
})
