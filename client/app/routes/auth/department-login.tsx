import type { Route } from "./+types/department-login";
import DepartmentLogin from "../../login/department-login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dasbor Monitoring Dinas Pendidikan | SEMAR" },
    { name: "description", content: "Monitoring wilayah & statistik kelulusan tingkat Dinas Pendidikan - SEMAR" },
  ];
}

export default function DepartmentLoginPage() {
  return <DepartmentLogin />;
}