import { createRouter, createWebHistory } from "vue-router";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import { useAuthStore } from "@/stores/auth";
import liff from "@line/liff";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () =>
        import("@/views/authentication/Error.vue")
    },
    MainRoutes,
    AuthRoutes
  ]
});

// router.beforeEach(async (to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/auth/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth: any = useAuthStore();

//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (authRequired && !auth.user) {
//             auth.returnUrl = to.fullPath;
//             return next('/auth/login');
//         } else next();
//     } else {
//         next();
//     }
// });

// ** login line
// router.beforeEach(async (to, from, next) => {
//   const liff_id = "2000412209-G49orjzO";
//   await liff
//     .init({
//       liffId: liff_id,
//       withLoginOnExternalBrowser: true
//     })
//     .then(async () => {
//       if (liff.isLoggedIn()) {
//         const profile = await liff.getProfile();
//         const auth: any = useAuthStore();
//         auth.user = profile;
//         next();
//       } else {
//         liff.login();
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// });
