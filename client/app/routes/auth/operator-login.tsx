import type { Route } from "./+types/operator-login";
import OperatorLogin from "../../login/operator-login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Operator & Proktor | SEMAR" },
    { name: "description", content: "Sistem Administrasi Proktor & Operator Sekolah - SEMAR" },
  ];
}

export default function OperatorLoginPage() {
  return <OperatorLogin />;
}