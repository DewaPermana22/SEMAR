import type { Route } from "./+types/home";
import LandingPage from "../landingpage/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SEMAR | Sistem Evaluasi Mutu Akademik Responsif" },
    { name: "description", content: "Sistem Evaluasi Mutu Akademik Responsif" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
