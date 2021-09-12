import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Merge Routes
const Routes = [
  {
    path: "/groups/:group_id/simulators",
    component: lazy(() => import("../../views/simulators")),
    meta: {
      menu: "groups",
    },
  },
  {
    path: '/simulator/:sim_id/lessons/:lesson_id/pages/:page_id',
    component: lazy(() => import('../../views/pages/details'))
  }, 
  {
    path: '/simulator/:sim_id/onboarding/:page_id',
    component: lazy(() => import('../../views/pages/details'))
  }, 
  {
    path: '/simulator/:sim_id/lessons/:lesson_id',
    component: lazy(() => import('../../views/pages/index'))
  },  
  {
    path: '/simulator/:sim_id/lessons',
    component: lazy(() => import('../../views/lessons/index'))
  },  
  {
    path: '/simulator/:sim_id/characters',
    component: lazy(() => import('../../views/characters/index'))
  },
  {
    path: '/simulator/:sim_id/theory',
    component: lazy(() => import('../../views/theory/index'))
  },  
  {
    path: '/simulator/:sim_id/users',
    component: lazy(() => import('../../views/users/index'))
  },
  {
    path: '/simulator/:sim_id/statistics',
    component: lazy(() => import('../../views/statistics/index'))
  },
  {
    path: '/simulator/:sim_id/shop',
    component: lazy(() => import('../../views/shop/index'))
  },
  {
    path: '/simulator/:sim_id/promocodes',
    component: lazy(() => import('../../views/promocodes/index'))
  },
  {
    path: '/simulator/:sim_id/requests',
    component: lazy(() => import('../../views/requests/index'))
  },  
  {
    path: '/simulator/:sim_id/settings',
    component: lazy(() => import('../../views/settings/index'))
  },
  {
    path: '/simulator/:sim_id/triggers',
    component: lazy(() => import('../../views/triggers/index'))
  },
  {
    path: "/triggers",
    component: lazy(() => import("../../views/triggers/index")),
  },
  {
    path: "/second-page",
    component: lazy(() => import("../../views/SecondPage")),
  },
  {
    path: "/login",
    component: lazy(() => import("../../views/auth/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/signup",
    component: lazy(() => import("../../views/auth/Register")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout",
  },
];

export {TemplateTitle, Routes }
