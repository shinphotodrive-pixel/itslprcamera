import React, { useState } from 'react';
import { 
  Camera, 
  Sliders, 
  Ruler, 
  Layers, 
  Cpu, 
  Table, 
  Tv, 
  Printer, 
  FileCheck2, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowUpRight,
  ExternalLink,
  Zap,
  Info,
  Clock,
  Car
} from 'lucide-react';
import { OpticalSimulator } from './components/OpticalSimulator';
import { PhysicsCalculator } from './components/PhysicsCalculator';
import { TargetStrategies } from './components/TargetStrategies';
import { ArchitectureSecurity } from './components/ArchitectureSecurity';
import { CameraComparison } from './components/CameraComparison';
import { VideoGallery } from './components/VideoGallery';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    item1: true,
    item2: true,
    item3: true,
    item4: false,
    item5: true,
    item6: false,
    item7: true,
    item8: false
  });

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/60">
              <Camera className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                  차세대 ITS LPR 기술 가이드 & 시뮬레이터
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ITS 2026 규격
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/90 font-medium hidden sm:block">
                지능형 교통 시스템 다목적 차량 번호판 인식 통합 기술 센터
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold">
            <button
              onClick={() => scrollToSection('simulator')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              광학 시뮬레이터
            </button>
            <button
              onClick={() => scrollToSection('standards')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              설치·하드웨어 기준
            </button>
            <button
              onClick={() => scrollToSection('targets')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              대상별 단속 전략
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              엣지 AI & 보안
            </button>
            <button
              onClick={() => scrollToSection('matrix')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              상용 카메라 비교
            </button>
            <button
              onClick={() => scrollToSection('videos')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              시연 영상
            </button>
            <button
              onClick={() => scrollToSection('checklist')}
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              조달 체크리스트
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition shadow"
              title="기술 가이드 브리프 출력 또는 PDF 저장"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">보고서 출력</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">

        {/* HERO BANNER: Paradigm Shift Overview */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 md:p-10 border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ITS PARADIGM SHIFT • 2026 TECHNICAL MANUAL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              단순 광학 식별을 넘어 <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">능동형 엣지 센서 노드</span>로의 진화
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              현대 ITS 다목적 LPR(License Plate Recognition) 카메라는 단순 텍스트 추출 장비가 아닙니다. 
              차량의 제조사·모델·색상·주행 궤적 등 복합 메타데이터를 단말 자체 NPU에서 100ms 이내에 추출하고, 
              500ms 이내에 중앙 DB와 실시간 대조 연동하는 스마트 치안의 핵심 인프라입니다. 
              신형 반사필름, 이륜차 후면·헬멧 미착용, 비포장 훼손 건설기계 등 가혹한 도로 환경을 극복하기 위한 
              정밀 하드웨어 조달 기준과 광학 시뮬레이터를 제공합니다.
            </p>

            {/* 4 Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">실시간 중앙 DB 조회</div>
                <div className="text-xl font-bold text-emerald-400 font-mono">&lt; 500 ms</div>
                <div className="text-[10px] text-slate-500">수배 차량 즉시 회신</div>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">권장 번호판 픽셀 폭</div>
                <div className="text-xl font-bold text-amber-400 font-mono">130 ~ 300 px</div>
                <div className="text-[10px] text-slate-500">정밀 폰트 분리 기준</div>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">설치 수직 시야각</div>
                <div className="text-xl font-bold text-sky-400 font-mono">&lt; 30° 이하</div>
                <div className="text-[10px] text-slate-500">원근 왜곡 방지 한계</div>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">초고속 셔터 제어</div>
                <div className="text-xl font-bold text-purple-400 font-mono">1/500~1/12000s</div>
                <div className="text-[10px] text-slate-500">모션 블러 완전 동결</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: OPTICAL SIMULATOR */}
        <section id="simulator">
          <OpticalSimulator />
        </section>

        {/* SECTION 2: STANDARDS & PHYSICS CALCULATOR */}
        <section id="standards">
          <PhysicsCalculator />
        </section>

        {/* SECTION 3: TARGET ENFORCEMENT STRATEGIES */}
        <section id="targets">
          <TargetStrategies />
        </section>

        {/* SECTION 4: EDGE AI & SECURITY ARCHITECTURE */}
        <section id="architecture">
          <ArchitectureSecurity />
        </section>

        {/* SECTION 5: COMMERCIAL CAMERA COMPARISON MATRIX */}
        <section id="matrix">
          <CameraComparison />
        </section>

        {/* SECTION 6: VIDEO GALLERY & YOUTUBE REFERENCES */}
        <section id="videos">
          <VideoGallery />
        </section>

        {/* SECTION 7: ENGINEERING PROCUREMENT RFP CHECKLIST & CONCLUSION */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SECTION 07
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                ITS 공공 조달 및 현장 감리 필수 점검 체크리스트 (RFP Verification)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              지자체 및 공공기관 ITS 사업 제안서(RFP) 작성과 현장 준공 감리 시 반드시 확인해야 하는 
              8대 기술 기준을 인터랙티브하게 검증합니다.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200 flex items-center">
                <FileCheck2 className="w-4 h-4 text-emerald-400 mr-2" />
                현장 감리 적격성 점검표 (클릭하여 체크 여부 확인)
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                달성률: {Math.round((Object.values(checklist).filter(Boolean).length / 8) * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: 'item1', title: 'P-Iris 수동 고정 기능 지원', desc: 'Auto 상태 배제 및 F/2.8 고정 설정이 펌웨어 상에서 지원되는가?' },
                { id: 'item2', title: 'AGC 상한 하드 리미트 (-30dB)', desc: '야간 전조등 및 반사필름 조사 시 노이즈 증폭 차단 리미트 설정 가능 여부' },
                { id: 'item3', title: '850nm 고효율 적외선 투광기 내장', desc: '야간 20m 이상 균일 조사 및 펄스 스트로브 동기화 기능 구비 여부' },
                { id: 'item4', title: '차량 유효 픽셀 폭 130px 이상 확보', desc: '설치 지점으로부터 목표 차로 번호판의 렌즈 줌 배율이 130px 이상인가?' },
                { id: 'item5', title: '수직 설치 각도 30° 미만 준수', desc: '지주/갠트리 높이 대비 사거리(D)를 감안한 입사각이 30° 이내인가?' },
                { id: 'item6', title: '온디바이스 NPU BestShot 추출', desc: '중앙망에 영상 전체가 아닌 텍스트 메타데이터 + 5KB BestShot 전송 여부' },
                { id: 'item7', title: 'TEE 프라이버시 자동 마스킹', desc: '운전자 및 동승자 안면, 비관련 배경에 대한 하드웨어 레벨 자동 마스킹' },
                { id: 'item8', title: '머클 트리 무결성 로그 증명', desc: '단속 로그 해시 병합을 통해 법적 재판 증거력 무결성 보장 여부' }
              ].map((chk) => {
                const isChecked = checklist[chk.id];
                return (
                  <div
                    key={chk.id}
                    onClick={() => toggleCheck(chk.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start space-x-3 ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-600/60 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-4 h-4 fill-current" />}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold leading-tight">{chk.title}</div>
                      <div className="text-[11px] text-slate-400 leading-snug">{chk.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Executive Summary Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-6 md:p-8 space-y-4 border border-slate-800 shadow-2xl">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>결론 및 지자체 조달 가이드라인 종합 권고</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              현대 LPR 기술은 단순한 문자 광학 판독에서 딥러닝 기반 맥락적 영상 분석 및 분산 클라우드 플랫폼으로 정립되었습니다. 
              반사필름 번호판의 난반사는 P-Iris 정밀 제어와 AGC 하드 리미트로 원천 차단하고, 
              이륜차 후면 단속은 4K 초고해상도 센서와 마이크로파 레이더 복합 딥러닝으로 해결해야 합니다. 
              비포장 건설 현장은 가상 루프(Virtual Loop) 시스템을 도입하여 굴착 및 단선 유지보수 비용을 획기적으로 절감할 수 있습니다. 
              단순 카탈로그상의 화소 수에 의존하지 않고, 온디바이스 NPU 추론 속도, 방진방수 내후성 등급, 
              그리고 TEE 프라이버시 보호 기준을 다각도로 평가하여 최적의 장비를 조달할 것을 강력히 권장합니다.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              ITS
            </div>
            <div>
              <p className="font-semibold text-slate-400">
                © 2026 차세대 지능형 교통 시스템(ITS) 다목적 LPR 카메라 기술 가이드 & 시뮬레이터
              </p>
              <p className="text-[11px] text-slate-600">
                Korea National ITS Architecture Standard Compliant Portal
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-500">
            <span>SPECIFICATION v2.6</span>
            <span>•</span>
            <span>PROPRIETARY TECHNICAL SUITE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
