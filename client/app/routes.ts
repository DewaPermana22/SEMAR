import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login/proktor", "routes/auth/operator-login.tsx"),
  route("login/siswa", "routes/auth/student-login.tsx"),
  route("login/dinas", "routes/auth/department-login.tsx"),
] satisfies RouteConfig;
