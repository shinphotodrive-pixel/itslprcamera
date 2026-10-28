import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Ruler, 
  Compass, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const PhysicsCalculator: React.FC = () => {
  const [speedKmH, setSpeedKmH] = useState<number>(100);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Speed in m/s
  const speedMps = speedKmH * (1000 / 3600);

  // Displacements
  const dist1msCm = (speedMps * 0.001 * 100).toFixed(2); // in cm
  const dist50msM = (speedMps * 0.05).toFixed(2); // in meters
  const dist200msM = (speedMps * 0.20).toFixed(2); // in meters

  // Speeds to chart
  const speedRange = [30, 60, 90, 120, 150, 180];

  // Initialize or update chart
  useEffect(() => {
    if (!chartCanvasRef.current) return;
    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const calcPoints = (latencySeconds: number) => {
      return speedRange.map((spd) => {
        const mps = spd * (1000 / 3600);
        return parseFloat((mps * latencySeconds).toFixed(2));
      });
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: speedRange.map((s) => `${s} km/h`),
        datasets: [
          {
            label: '일반 방범 IP CCTV (200ms 지연 - 이탈 위험)',
            data: calcPoints(0.20),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2.5,
            pointBackgroundColor: '#ef4444',
            pointRadius: 4,
            fill: true,
            tension: 0.25
          },
          {
            label: '고속 LPR 전용 IP 카메라 (50ms 지연 - 정상 화각)',
            data: calcPoints(0.05),
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            borderWidth: 2.5,
            pointBackgroundColor: '#f59e0b',
            pointRadius: 4,
            fill: true,
            tension: 0.25
          },
          {
            label: '머신비전 광학 카메라 (1ms 하드웨어 트리거 - 오차 없음)',
            data: calcPoints(0.001),
            borderColor: '#10b981',
            backgroundColor: 'transparent',
            borderWidth: 3,
            pointBackgroundColor: '#10b981',
            pointRadius: 4,
            tension: 0.25
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#94a3b8',
              font: { family: 'Pretendard', size: 11 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: '#334155',
            borderWidth: 1,
            callbacks: {
              label: (context) => ` ${context.dataset.label?.split(' ')[0]}: ${context.raw} m 이동`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: { color: '#94a3b8', font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(51, 65, 85, 0.3)' },
            ticks: { color: '#94a3b8', font: { size: 10 } },
            title: {
              display: true,
              text: '화면 내 차량 물리적 이동 거리 (m)',
              color: '#94a3b8',
              font: { size: 11, weight: 'bold' }
            },
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-l-4 border-sky-500 pl-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
            SECTION 02
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            하드웨어 표준 설치 기준 및 반응 지연(Latency) 물리 계산기
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          정확한 OCR 인식을 위한 규격별 픽셀 밀도(Pixel Density), 기하학적 설치 각도, 
          그리고 차량 속도와 카메라 내부 트리거 지연시간(Trigger Latency) 간의 상관관계를 물리 공식으로 시뮬레이션합니다.
        </p>
      </div>

      {/* 3 Standard Specification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Pixel Density */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
            <Ruler className="w-5 h-5 text-sky-400" />
            <span>규격별 픽셀 밀도 (Pixel Density)</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5">
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">한국 신형 / EU 긴 번호판:</span>
              <strong className="text-emerald-400 font-mono text-sm">130 ~ 300 px</strong>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">미국형 표준 번호판:</span>
              <strong className="text-slate-200 font-mono text-sm">80 ~ 300 px</strong>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">2줄 스택 기호 포함 번호판:</span>
              <strong className="text-amber-400 font-mono text-sm">160 ~ 300 px</strong>
            </li>
          </ul>
          <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
            ※ 130px 미만 시 폰트의 '8'과 'B', '0'과 'O'의 자획 구분이 뭉개지며, 300px 초과 시 과도한 연산 부하가 발생합니다. 전동 가변렌즈로 최적 줌 배율을 고정해야 합니다.
          </p>
        </div>

        {/* Card 2: Geometric Angle */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
            <Compass className="w-5 h-5 text-sky-400" />
            <span>기하학적 설치 각도 (Geometry)</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5">
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">수직 내려다보기 각도:</span>
              <strong className="text-amber-400 font-mono text-sm">&lt; 30° 이하 (필수)</strong>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">카메라 렌즈 기울기 (Roll):</span>
              <strong className="text-emerald-400 font-mono text-sm">&lt; 5° 이내 평형</strong>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">좌우 수평 화각 (Yaw):</span>
              <strong className="text-slate-200 font-mono text-sm">&lt; 30° 이내 유지</strong>
            </li>
          </ul>
          <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
            ※ 각도가 30°를 초과하면 원근 왜곡(Perspective Skew)으로 인해 번호판 사다리꼴 변형이 극대화되어 호모그래피(Homography) 보정 알고리즘 추가 연산이 불가피합니다.
          </p>
        </div>

        {/* Card 3: Exposure & IR */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
            <Lightbulb className="w-5 h-5 text-sky-400" />
            <span>조명 & AGC 하드웨어 노출 제어</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5">
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">IR 적외선 투광 파장:</span>
              <strong className="text-purple-400 font-mono text-sm">850 nm (가시거리 18~30m)</strong>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">역광 보정 (Backlight):</span>
              <strong className="text-red-400 font-mono text-sm">원칙적 비활성화 (OFF)</strong>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">AGC 상한 제한 (Gain Limit):</span>
              <strong className="text-emerald-400 font-mono text-sm">Low (-30dB 고정)</strong>
            </li>
          </ul>
          <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
            ※ 940nm 불가시광 IR 대비 850nm 파장이 센서 감도가 2배 이상 우수합니다. 야간 전조등 직사 상황에서는 AGC가 치솟는 것을 막기 위해 하드 리미트를 걸어야 합니다.
          </p>
        </div>
      </div>

      {/* Physics Displacement Interactive Engine */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 md:p-6 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h4 className="font-bold text-white text-sm flex items-center">
              <Calculator className="w-4 h-4 text-emerald-400 mr-2" />
              차량 속도 및 트리거 지연에 따른 물리적 위치 이동 거리 계산기
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              물리 변위 공식: <span className="font-mono text-emerald-300">D(m) = V(km/h) × (1000 / 3600) × T(초)</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300">속도 조절:</span>
            <input
              type="range"
              min="20"
              max="220"
              step="5"
              value={speedKmH}
              onChange={(e) => setSpeedKmH(parseInt(e.target.value))}
              className="w-28 sm:w-36 accent-emerald-500 cursor-pointer"
            />
            <div className="flex items-center space-x-1">
              <input
                type="number"
                min="10"
                max="250"
                value={speedKmH}
                onChange={(e) => setSpeedKmH(Math.max(10, Math.min(250, parseInt(e.target.value) || 10)))}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs font-mono font-bold text-emerald-400 text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="text-xs font-mono text-slate-400">km/h</span>
            </div>
          </div>
        </div>

        {/* Preset Speed Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold">대표 속도 프리셋:</span>
          {[
            { label: "어린이보호구역 (30 km/h)", val: 30 },
            { label: "도심 간선도로 (60 km/h)", val: 60 },
            { label: "자동차 전용도로 (80 km/h)", val: 80 },
            { label: "고속도로 규정 (100 km/h)", val: 100 },
            { label: "초과속 난폭운전 (160 km/h)", val: 160 }
          ].map((sp) => (
            <button
              key={sp.val}
              onClick={() => setSpeedKmH(sp.val)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition border ${
                speedKmH === sp.val
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Results & Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Diagnostic Result Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Machine Vision (1ms) */}
            <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-700/50 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-300 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                  머신비전 광학 카메라 (1ms 하드웨어 트리거)
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  오차 제로
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {dist1msCm} cm
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                트리거 즉시 셔터가 작동하여 센서 초점면의 정중앙에 완벽하게 결상됩니다.
              </p>
            </div>

            {/* Dedicated LPR (50ms) */}
            <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-700/50 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-300 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
                  고속 LPR 전용 IP 카메라 (50ms 처리 지연)
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                  화각 내 안착
                </span>
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {dist50msM} m
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                차량이 약 {dist50msM}m 전진하지만, 설정된 광각 ROI 화각 내에 머물러 안정적 인식이 가능합니다.
              </p>
            </div>

            {/* Standard Security CCTV (200ms) */}
            <div className="bg-red-950/40 p-4 rounded-xl border border-red-700/50 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-red-300 flex items-center">
                  <XCircle className="w-3.5 h-3.5 text-red-400 mr-1.5" />
                  일반 방범용 IP CCTV (200ms 네트워크 지연)
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono font-bold">
                  이탈 실패 위험
                </span>
              </div>
              <div className="text-2xl font-black text-red-400 font-mono">
                {dist200msM} m
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                반응하는 사이 차량이 무려 {dist200msM}m나 이동하여 초점 영역을 완전히 벗어나 누락됩니다.
              </p>
            </div>
          </div>

          {/* Chart Container (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
                지연시간 모델별 주행 속도 대 이동 변위 곡선
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Chart.js Engine</span>
            </div>
            <div className="h-64 sm:h-72 w-full">
              <canvas ref={chartCanvasRef} />
            </div>
          </div>
        </div>

        {/* Interactive Road Top-down Trigger Simulation Diagram */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center">
              <Activity className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              차량 검지선(루프/레이더) 통과 후 실제 셔터 캡처 시점 위치 가시화
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">V = {speedKmH} km/h ({(speedMps).toFixed(1)} m/s)</span>
          </div>

          <div className="relative h-20 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center px-4">
            {/* Road Lane Lines */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-slate-700 w-full" />
            
            {/* Trigger Sensor Line */}
            <div className="absolute left-16 top-0 bottom-0 w-1 bg-sky-500 shadow-[0_0_10px_#0ea5e9] z-10 flex flex-col justify-between py-1">
              <span className="text-[9px] font-mono font-bold text-sky-300 bg-sky-950 px-1 rounded -ml-7">검지 기준점</span>
            </div>

            {/* Camera Target Capture Zone (Green corridor) */}
            <div className="absolute left-16 w-48 top-0 bottom-0 bg-emerald-500/10 border-r border-emerald-500/30 z-0">
              <span className="absolute right-2 bottom-1 text-[9px] text-emerald-400/80 font-mono">LPR 유효 FOV 범위 (~3.0m)</span>
            </div>

            {/* Machine Vision Pos (1ms) */}
            <div 
              className="absolute top-2 z-20 flex flex-col items-center"
              style={{ left: `calc(4rem + 4px)` }}
            >
              <div className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500 text-slate-950 shadow">
                1ms ({dist1msCm}cm)
              </div>
              <div className="w-1.5 h-4 bg-emerald-400" />
            </div>

            {/* Dedicated LPR Pos (50ms) */}
            <div 
              className="absolute top-6 z-20 flex flex-col items-center transition-all duration-300"
              style={{ left: `calc(4rem + ${Math.min(220, parseFloat(dist50msM) * 36)}px)` }}
            >
              <div className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500 text-slate-950 shadow">
                50ms ({dist50msM}m)
              </div>
              <div className="w-1.5 h-3 bg-amber-400" />
            </div>

            {/* Security CCTV Pos (200ms) */}
            <div 
              className="absolute bottom-2 z-20 flex flex-col items-center transition-all duration-300"
              style={{ left: `calc(4rem + ${Math.min(500, parseFloat(dist200msM) * 36)}px)` }}
            >
              <div className="w-1.5 h-3 bg-red-400" />
              <div className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-500 text-white shadow whitespace-nowrap">
                200ms ({dist200msM}m)
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
