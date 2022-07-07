import { RouteConfig } from 'vue-router';

import { KUBEWARDEN_PRODUCT_NAME } from '../types';
import KubewardenResourceList from '../pages/c/_cluster/kubewarden/index.vue';

const routes: RouteConfig[] = [
  {
    name:       `${ KUBEWARDEN_PRODUCT_NAME }-c-cluster-resource`,
    path:       `/:product/c/:cluster/:resource`,
    component:  KubewardenResourceList
  }
];

export default routes;
