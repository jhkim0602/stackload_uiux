import { AppShell } from "@/components/layout/AppShell";
import { ArrowRight, Code, Database, Globe, Smartphone, Server, Terminal, Cpu } from "lucide-react";
import Link from "next/link";

const ROADMAPS = [
  {
    role: "Frontend Developer",
    icon: Globe,
    desc: "웹의 시각적 요소를 구현하고 사용자 경험을 설계합니다.",
    techs: ["React", "TypeScript", "TailwindCSS"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    role: "Backend Developer",
    icon: Server,
    desc: "서버, 데이터베이스, 애플리케이션 로직을 다룹니다.",
    techs: ["Node.js", "Python", "PostgreSQL"],
    color: "bg-green-50 text-green-600",
  },
  {
    role: "Full Stack Developer",
    icon: Code,
    desc: "프론트엔드와 백엔드를 아우르는 전체적인 개발을 수행합니다.",
    techs: ["Next.js", "NestJS", "Docker"],
    color: "bg-purple-50 text-purple-600",
  },
  {
    role: "DevOps Engineer",
    icon: Terminal,
    desc: "개발과 운영의 조화를 통해 배포 파이프라인을 구축합니다.",
    techs: ["AWS", "Kubernetes", "CI/CD"],
    color: "bg-orange-50 text-orange-600",
  },
  {
    role: "Mobile Developer",
    icon: Smartphone,
    desc: "iOS 및 Android 모바일 애플리케이션을 개발합니다.",
    techs: ["Flutter", "React Native", "Swift"],
    color: "bg-pink-50 text-pink-600",
  },
  {
    role: "AI/ML Engineer",
    icon: Cpu,
    desc: "인공지능 모델을 학습시키고 데이터 기반 시스템을 만듭니다.",
    techs: ["PyTorch", "TensorFlow", "Python"],
    color: "bg-indigo-50 text-indigo-600",
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 overflow-hidden bg-base-50">
         <div className="container max-w-7xl mx-auto px-4 relative z-10">
              <div className="max-w-2xl">
                  <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-base-900 mb-6">
                      개발자 로드맵
                  </h1>
                  <p className="text-lg text-base-600 leading-relaxed mb-8">
                      각 직무별로 필요한 기술 스택과 학습 경로를 확인하세요.<br className="hidden md:block"/>
                      여러분의 커리어 성장을 위한 나침반이 되어드립니다.
                  </p>
              </div>
         </div>
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-60"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-40 -translate-x-1/2 translate-y-1/2"></div>
      </section>

      <section className="py-20">
          <div className="container max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ROADMAPS.map((roadmap) => (
                      <Link
                        key={roadmap.role}
                        href={`/tech-hub?role=${roadmap.role.toLowerCase().replace(' ', '-')}`}
                        className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                      >
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${roadmap.color}`}>
                              <roadmap.icon className="w-7 h-7" />
                          </div>

                          <h3 className="text-xl font-bold text-base-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {roadmap.role}
                          </h3>

                          <p className="text-base-500 leading-relaxed mb-6 h-12">
                              {roadmap.desc}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                              {roadmap.techs.map(tech => (
                                  <span key={tech} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-md border border-gray-100">
                                      {tech}
                                  </span>
                              ))}
                          </div>

                          <div className="flex items-center text-sm font-bold text-blue-600 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              로드맵 보기 <ArrowRight className="w-4 h-4 ml-1" />
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
}
