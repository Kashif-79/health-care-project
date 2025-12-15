import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";

const router = express.Router();

const moduleROutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleROutes.forEach((route) => router.use(route.path, route.route));

export default router;
