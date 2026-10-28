import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Truck, 
  ShieldCheck, 
  Radar, 
  Cpu, 
  Scan, 
  Layers, 
  FileCheck, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export const TargetStrategies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'car' | 'moto' | 'heavy'>('car');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-l-4 border-amber-500 pl-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            SECTION 03
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            감지 대상물별 LPR 기술적 특수성 및 단속 대응 전략
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          신형 반사필름 승용차, 후면 번호판 및 안전모 단속 이륜차, 오염·훼손 건설기계 등 
          도로 위 대상물의 광학적·물리적 특성에 최적화된 첨단 단속 메커니즘을 상세 분석합니다.
        </p>
      </div>

      {/* Tabs Container */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        
        {/* Tab Navigation Buttons */}
        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/70 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('car')}
            className={`py-3 px-3 sm:px-4 rounded-xl text-center text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'car'
                ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Car className="w-4 h-4 text-emerald-400" />
            <span className="truncate">일반 차량 (반사필름 대응)</span>
          </button>

          <button
            onClick={() => setActiveTab('moto')}
            className={`py-3 px-3 sm:px-4 rounded-xl text-center text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'moto'
                ? 'bg-sky-950/80 border border-sky-500/60 text-sky-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Bike className="w-4 h-4 text-sky-400" />
            <span className="truncate">이륜차 (후면 & 헬멧 적발)</span>
          </button>

          <button
            onClick={() => setActiveTab('heavy')}
            className={`py-3 px-3 sm:px-4 rounded-xl text-center text-xs font-bold transition flex items-center justify-center space-x-2 ${
              activeTab === 'heavy'
                ? 'bg-amber-950/80 border border-amber-500/60 text-amber-300 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span className="truncate">건설기계 (초해상도/가상루프)</span>
          </button>
        </div>

        {/* Tab 1: Reflected Film Cars */}
        {activeTab === 'car' && (
          <div className="p-5 md:p-7 space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-emerald-950/30 p-4 rounded-xl border border-emerald-700/40">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-lg border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    8자리 신형 반사필름식 번호판 야간 난반사(White-out) 제어 기술
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    2020년 7월 도입된 반사필름 번호판은 미세 프리즘 반사체를 통해 빛을 조사 방향으로 100% 되돌려 보냅니다. 
                    야간 적외선(850nm IR) 조명 하에서 기존 카메라는 번호판 영역이 하얗게 타버려 인식이 불가능해집니다.
                  </p>
                </div>
              </div>
              <span className="self-start md:self-auto px-3 py-1 bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 rounded-full text-xs font-mono font-bold whitespace-nowrap">
                KOR 표준 반사필름 규격
              </span>
            </div>

            {/* Strategy Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono mr-2">01</span>
                  P-Iris 정밀 조리개 수동 고정
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  조리개를 자동(Auto) 상태로 두면 주변 암부를 밝히기 위해 완전 개방(F/1.4)되어 포화가 일어납니다. 관리자 소프트웨어에서 <strong className="text-emerald-400 font-mono">F/2.8</strong> 값으로 수동 고정하여 입사광의 총량을 물리적으로 차단합니다.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono mr-2">02</span>
                  AGC 하드 리미트 (-30dB 설정)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  야간 전조등과 반사필름 조사 시 센서가 이득(Gain)을 과도하게 증폭하지 못하도록 AGC 상한을 <strong className="text-emerald-400 font-mono">Low(-30dB)</strong>로 강제 제한합니다. 노이즈와 과노출을 동시에 억제하는 핵심 조치입니다.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono mr-2">03</span>
                  딥러닝 홀로그램/폰트 추론 AI
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  국산 중급형 이상 AI 카메라는 좌측 청색 태극 문양 및 위변조 방지 홀로그램 패턴을 딥러닝으로 학습했습니다. 일부 빛 반사가 발생하더라도 문자의 획 특징점을 유추하여 99.2% 인식률을 달성합니다.
                </p>
              </div>
            </div>

            {/* Comparison Callout */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-2">기존 일반 CCTV vs 최신 다목적 LPR 카메라 비교</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 pr-4 font-semibold">구분 항목</th>
                      <th className="py-2 pr-4 font-semibold text-red-400">구형 / 일반 방범 CCTV</th>
                      <th className="py-2 font-semibold text-emerald-400">차세대 다목적 LPR 카메라</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2 font-mono text-slate-400">조리개 제어</td>
                      <td className="py-2 text-red-300">DC Auto-Iris (야간 완전개방으로 번호판 백화)</td>
                      <td className="py-2 text-emerald-300 font-bold">P-Iris 스텝 모터 (F/2.8 정밀 수동 고정)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-slate-400">IR 투광 동기화</td>
                      <td className="py-2 text-red-300">상시 연속 발광 (초근접 시 전소)</td>
                      <td className="py-2 text-emerald-300 font-bold">스트로브 펄스 동기화 + 거리 비례 밝기 제어</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-slate-400">반사필름 인식률</td>
                      <td className="py-2 text-red-300">야간 30% 이하 (인식 실패 다수)</td>
                      <td className="py-2 text-emerald-300 font-bold">야간 99.5% 안정적 판독 보증</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Motorcycle Enforcement */}
        {activeTab === 'moto' && (
          <div className="p-5 md:p-7 space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-sky-950/30 p-4 rounded-xl border border-sky-700/40">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-lg text-lg border border-sky-500/30">
                  <Radar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    이륜차 후면 단속 & 레이더-카메라 복합 딥러닝 적발
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    전면 번호판이 없는 이륜차의 특성상 단속 사각지대를 악용하는 과속·신호위반을 근절하기 위해 
                    경찰청이 2023년부터 전국적으로 도입 확충 중인 첨단 후면 복합 단속 체계입니다.
                  </p>
                </div>
              </div>
              <span className="self-start md:self-auto px-3 py-1 bg-sky-900/60 text-sky-300 border border-sky-700/60 rounded-full text-xs font-mono font-bold whitespace-nowrap">
                경찰청 후면단속 표준
              </span>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-sky-400 flex items-center">
                  <Scan className="w-4 h-4 mr-1.5" />
                  4K UHD 800만 화소 초고해상도 센서
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  지상고 <strong className="text-sky-300 font-mono">250~900mm</strong>에 장착된 소형 이륜차 번호판을 원거리에서 식별하기 위해 3840×2160 센서와 고배율 전동 광학 줌을 활용하여 유효 픽셀 밀도 160px 이상을 확보합니다.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-sky-400 flex items-center">
                  <Radar className="w-4 h-4 mr-1.5" />
                  마이크로파 도플러 레이더 + AI 융합
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  레이더가 차량 후방에서 실시간 이동 속도를 측정하고, AI 비전 알고리즘이 차로 급변경·꼬리물기 등 불법 궤적을 실시간 역추적(Trajectory Tracking)하여 단속 오차율을 0.1% 미만으로 제압합니다.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-sky-400 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  안전모(헬멧) 미착용 딥러닝 판독
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  라이더의 신체 부위 중 두부(Head) 영역을 바운딩 박스로 검출하고, 헬멧의 곡률 윤곽선 및 턱끈 체결 형태를 신경망으로 분석하여 안전모 미착용 행위를 자동으로 과태료 부과 대상에 올립니다.
                </p>
              </div>
            </div>

            {/* Tactical Workflow Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-200">후면 복합 단속 3단계 실시간 프로세스</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-sky-400 font-bold text-xs font-mono">STEP 1. 레이더 트리거</div>
                  <p className="text-[11px] text-slate-400">교차로 진입 및 통과 순간 속도 벡터 측정 (&gt; 제한속도 초과 시 캡처 트리거)</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-sky-400 font-bold text-xs font-mono">STEP 2. 궤적 추적 & 번호판 추출</div>
                  <p className="text-[11px] text-slate-400">후방 30m 구간에서 광학 줌으로 번호판 BestShot 추출 및 도로교통공단 규격 OCR 실행</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-sky-400 font-bold text-xs font-mono">STEP 3. 헬멧 미착용 AI 판별</div>
                  <p className="text-[11px] text-slate-400">두부 영역 고해상도 크롭 후 헬멧 착용 여부 이진 분류(Classification) 후 경찰청 서버 전송</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Construction & Heavy Vehicles */}
        {activeTab === 'heavy' && (
          <div className="p-5 md:p-7 space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-amber-950/30 p-4 rounded-xl border border-amber-700/40">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg text-lg border border-amber-500/30">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    건설기계 훼손 번호판 ETRI 초해상도(SR) 복원 & 가상 루프 센서
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    덤프트럭, 굴착기 등 토사 운반 차량의 찌그러진 번호판과 비포장 현장 특성으로 인해 
                    아스팔트 물리 매설 루프 코일이 불가능한 현장을 위한 스마트 치안 원천 기술입니다.
                  </p>
                </div>
              </div>
              <span className="self-start md:self-auto px-3 py-1 bg-amber-900/60 text-amber-300 border border-amber-700/60 rounded-full text-xs font-mono font-bold whitespace-nowrap">
                ETRI 원천 연구 연계
              </span>
            </div>

            {/* Core Technologies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  <span>1. ETRI 초해상도(Super Resolution) 딥러닝 복원</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  진흙 오염, 페인트 박리, 물리적 찌그러짐 등으로 육안 식별이 불가능한 저해상도(64x32 이하) 번호판 이미지를 생성형 인공지능(GAN / Super Resolution) 신경망을 통과시켜 원본 폰트 엣지를 선명하게 재구성합니다.
                </p>
                <div className="bg-amber-950/40 p-3 rounded-lg border border-amber-800/40 text-[11px] text-amber-200">
                  <strong>핵심 이점:</strong> 폰트 기하학적 굴곡과 국토부 정규 서체 데이터베이스와의 상호 상관관계를 연산하여 오인식률을 기존 45%에서 5% 미만으로 급감시킵니다.
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>2. 가상 루프 코일 (Virtual Loop Coil) 비전 센서</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  비포장 골재 현장, 임시 진출입로처럼 도로 바닥을 절삭하여 물리 구리 루프 코일을 매설할 수 없는 열악한 환경에서 영상 화면에 소프트웨어 ROI 가상 검지선을 설정하여 차량 통과를 자동 감지합니다.
                </p>
                <div className="bg-amber-950/40 p-3 rounded-lg border border-amber-800/40 text-[11px] text-amber-200">
                  <strong>핵심 이점:</strong> 도로 굴착 및 단선 유지보수 비용을 전액 절감하며, 다중 차로 및 프레임당 복수 건설기계를 동시 다객체 추적(MOT)합니다.
                </div>
              </div>
            </div>

            {/* Mobile LPR Callout */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-200 flex items-center">
                  <FileCheck className="w-4 h-4 text-emerald-400 mr-1.5" />
                  스마트폰/모바일 LPR 국토교통부 건설기계 통합 관리망 연계
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  단속 공무원이 스마트폰 현장 앱으로 번호판을 비추면 온디바이스 OCR 판독 후 국토부 DB와 실시간 통신하여 정기검사 수검 여부 및 불법 구조변경 이력을 500ms 이내에 회신합니다.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
