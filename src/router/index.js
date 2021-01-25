import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Hangar from "@/components/Hangar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/hangar",
    name: "Hangar",
    component: Hangar,
  },
  {
    path: "/:catchAll(.*)",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
