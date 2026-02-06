import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { SpecialitiesRoutes } from "../modules/Specialities/specialties.routes";
import { DoctorRoutes } from "../modules/Doctor/doctor.routes";
import { PatientRoutes } from "../modules/Patient/patient.routes";
import { ScheduleRoutes } from "../modules/Schedule/schedule.routes";

import { AppointmentRoutes } from "../modules/Appointment/appointment.routes";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/doctorSchedule.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";

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
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleROutes.forEach((route) => router.use(route.path, route.route));

export default router;
