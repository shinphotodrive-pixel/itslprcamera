import React, { useState, useEffect, useRef } from 'react';
import { 
  Table, 
  Search, 
  ExternalLink, 
  ArrowUpDown, 
  SlidersHorizontal, 
  BarChart3, 
  Check, 
  ShieldAlert, 
  Award,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { CAMERA_DATA, CameraModel } from '../data/lprData';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const CameraComparison: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'pixels' | 'price' | 'irRange'>('pixels');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedModels, setSelectedModels] = useState<string[]>([
    CAMERA_DATA[0].id,
    CAMERA_DATA[1].id
  ]);

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Filter & Sort
  const filteredData = CAMERA_DATA.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.vendor.toLowerCase().includes(q) ||
      item.model.toLowerCase().includes(q) ||
      item.aiFeatures.toLowerCase().includes(q) ||
      item.resolution.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    let valA = a.pixels;
    let valB = b.pixels;
    if (sortBy === 'price') {
      valA = a.priceNum;
      valB = b.priceNum;
    } else if (sortBy === 'irRange') {
      valA = a.irRange;
      valB = b.irRange;
    }
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  // Toggle selection for comparison
  const toggleSelect = (id: string) => {
    if (selectedModels.includes(id)) {
      if (selectedModels.length > 1) {
        setSelectedModels(selectedModels.filter((m) => m !== id));
      }
    } else {
      if (selectedModels.length < 3) {
        setSelectedModels([...selectedModels, id]);
      } else {
        setSelectedModels([selectedModels[1], selectedModels[2], id]);
      }
    }
  };

  // Render Bar Chart
  useEffect(() => {
    if (!chartCanvasRef.current) return;
    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: CAMERA_DATA.map((c) => c.model.split(' ')[0]),
        datasets: [
          {
            label: '센서 해상도 (만 화소)',
            data: CAMERA_DATA.map((c) => c.pixels),
            backgroundColor: 'rgba(16, 185, 129, 0.75)',
            borderColor: '#10b981',
            borderWidth: 1.5,
            borderRadius: 6
          },
          {
            label: 'IR 투광 거리 (m × 10)',
            data: CAMERA_DATA.map((c) => c.irRange * 10),
            backgroundColor: 'rgba(56, 189, 248, 0.75)',
            borderColor: '#38bdf8',
            borderWidth: 1.5,
            borderRadius: 6
          },
          {
            label: '추정 단가 지수 (만원)',
            data: CAMERA_DATA.map((c) => c.priceNum),
            backgroundColor: 'rgba(245, 158, 11, 0.75)',
            borderColor: '#f59e0b',
            borderWidth: 1.5,
            borderRadius: 6
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
              label: (context) => {
                if (context.datasetIndex === 0) return ` 해상도: ${context.raw}만 화소`;
                if (context.datasetIndex === 1) return ` IR 가시거리: ${Number(context.raw) / 10} m`;
                return ` 단가: 약 ${context.raw}만 원`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(51, 65, 85, 0.2)' },
            ticks: { color: '#94a3b8', font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(51, 65, 85, 0.2)' },
            ticks: { color: '#94a3b8', font: { size: 10 } },
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
      <div className="border-l-4 border-emerald-500 pl-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            SECTION 05
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            상용 LPR 카메라 주요 모델 비교 분석 및 데이터 시각화
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          B2B 조달 및 ITS 사업에 즉시 투입 가능한 국내외 핵심 상용 LPR 카메라 5종의 
          스펙, 특화 온디바이스 AI 기능, 방진방수 등급 및 실거래 추정 단가를 다각도로 비교 분석합니다.
        </p>
      </div>

      {/* Chart Visualization */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 md:p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">
              상용 LPR 카메라 모델별 스펙 종합 비교 차트 (해상도 vs IR 가시거리 vs 추정 단가)
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">단위: 만화소 / 10m / 만원</span>
        </div>
        <div className="h-64 sm:h-72 w-full">
          <canvas ref={chartCanvasRef} />
        </div>
      </div>

      {/* Interactive Table Card */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden space-y-4 p-5 md:p-6">
        
        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제조사, 모델명, 해상도, 특화 AI 검색..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="flex items-center font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-emerald-400" /> 정렬:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="pixels">화소 수 (해상도)</option>
              <option value="price">추정 단가</option>
              <option value="irRange">IR 가시거리</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-300"
              title="정렬 방향 토글"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <th className="p-3 font-bold w-12 text-center">선택</th>
                <th className="p-3 font-bold">제조사 및 모델명</th>
                <th className="p-3 font-bold">화소 수 & 해상도</th>
                <th className="p-3 font-bold">광학 렌즈 / 줌</th>
                <th className="p-3 font-bold">야간 IR & WDR</th>
                <th className="p-3 font-bold">특화 AI & 내후 등급</th>
                <th className="p-3 font-bold">참고 단가 & 링크</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredData.map((item) => {
                const isSelected = selectedModels.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-800/40 transition ${
                      isSelected ? 'bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded accent-emerald-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 font-bold text-white whitespace-nowrap">
                      <div>{item.vendor}</div>
                      <div className="text-xs text-emerald-400 font-mono mt-0.5">{item.model}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">{item.recommendedUse}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-200">{item.resolution}</div>
                      <div className="text-[10px] text-slate-500 font-mono">최대 속도: {item.maxSpeedKmH} km/h</div>
                    </td>
                    <td className="p-3">{item.lens}</td>
                    <td className="p-3">
                      <div className="text-sky-300">{item.irWdr}</div>
                      <div className="text-[10px] text-slate-400 font-mono">가시거리: {item.irRange}m</div>
                    </td>
                    <td className="p-3 max-w-xs text-[11px] text-slate-300 leading-snug">
                      <div className="mb-1">{item.aiFeatures}</div>
                      <span className="inline-block px-1.5 py-0.5 bg-slate-800 rounded text-[9px] text-emerald-300 font-mono">
                        {item.ipRating}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-bold text-amber-300 font-mono text-sm">{item.priceText}</div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline mt-1"
                      >
                        <span>제원 공식페이지</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Side-by-Side Comparison Drawer */}
        {selectedModels.length >= 2 && (
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/40 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                선택 모델 1:1 맞비교 분석 (Checkmark Selected)
              </span>
              <span className="text-[10px] text-slate-400">최대 3개 모델 동시 비교 가능</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedModels.map((id) => {
                const model = CAMERA_DATA.find((m) => m.id === id);
                if (!model) return null;
                return (
                  <div key={model.id} className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] text-slate-400">{model.vendor}</div>
                        <div className="font-bold text-white text-sm font-mono">{model.model}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">{model.priceText}</span>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-300 divide-y divide-slate-800/60 pt-1">
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-500">해상도:</span>
                        <span className="font-semibold text-slate-200">{model.resolution}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-500">광학렌즈:</span>
                        <span className="font-semibold text-slate-200">{model.lens}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-500">IR 가시거리:</span>
                        <span className="font-semibold text-sky-400 font-mono">{model.irRange} m</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-500">NPU 프로세서:</span>
                        <span className="font-semibold text-purple-300">{model.npuSpecs}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-slate-500">내후 등급:</span>
                        <span className="font-semibold text-emerald-400 font-mono">{model.ipRating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
