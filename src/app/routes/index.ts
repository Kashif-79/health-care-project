import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { SpecialitiesRoutes } from "../modules/Specialities/specialties.routes";
import { DoctorRoutes } from "../modules/Doctor/doctor.routes";

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
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialitiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
];

moduleROutes.forEach((route) => router.use(route.path, route.route));

export default router;
