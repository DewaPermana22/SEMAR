import type { Route } from "./+types/student-login";
import StudentLogin from "../../login/student-login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portal Ruang Ujian Siswa | SEMAR" },
    { name: "description", content: "Selamat datang di ruang ujian evaluasi mandiri siswa - SEMAR" },
  ];
}

export default function StudentLoginPage() {
  return <StudentLogin />;
}