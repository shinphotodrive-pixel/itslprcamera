import React, { useState } from 'react';
import { 
  Cpu, 
  Lock, 
  CloudRain, 
  CloudLightning, 
  Database, 
  GitMerge, 
  Key, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Server, 
  Check, 
  FileCode,
  HardDrive
} from 'lucide-react';

export const ArchitectureSecurity: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const pipelineSteps = [
    {
      id: 1,
      title: "1. 4K 60FPS 센서 캡처",
      short: "센서 캡처",
      badge: "RAW VIDEO",
      desc: "4K UHD 광학 센서가 1/500s 셔터로 주행 차량을 무압축 캡처",
      latency: "16.6 ms",
      payload: "Raw Video 3840x2160 (비압축)"
    },
    {
      id: 2,
      title: "2. 온디바이스 NPU 추론 (Edge AI)",
      short: "온디바이스 NPU",
      badge: "BESTSHOT & OCR",
      desc: "카메라 내부 NPU에서 차량 검출, 번호판 영역 크롭(Crop) 및 딥러닝 OCR을 100ms 내 완료",
      latency: "45 ~ 85 ms",
      payload: "텍스트 메타데이터 + 300px BestShot JPEG (~5KB)"
    },
    {
      id: 3,
      title: "3. TEE 프라이버시 마스킹 & AES-256",
      short: "TEE & 암호화",
      badge: "SECURITY ENCLAVE",
      desc: "보안 격리 구역(TEE)에서 운전자 얼굴과 비관련 배경을 자동 블러 마스킹하고 AES-256 암호화",
      latency: "15 ms",
      payload: "마스킹 처리된 암호화 바이너리"
    },
    {
      id: 4,
      title: "4. 머클 트리(Merkle Tree) 위변조 방지",
      short: "머클 트리 블록체인",
      badge: "TAMPER-PROOF",
      desc: "개별 단속 로그의 해시를 머클 트리로 병합하여 루트 해시(Root Hash)를 블록체인에 영구 기록",
      latency: "30 ms",
      payload: "SHA-256 Merkle Root & Timestamp Proof"
    },
    {
      id: 5,
      title: "5. 중앙 ITS 연동 & 하이브리드 재학습",
      short: "중앙 ITS & 재학습",
      badge: "HYBRID CLOUD",
      desc: "중앙 수배 차량 DB와 500ms 내 대조 완료. 오인식 샘플만 클라우드로 전송하여 모델 지속 업데이트",
      latency: "< 500 ms",
      payload: "국가 교통망 DB 연동 + OTA 가중치 갱신"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-l-4 border-purple-500 pl-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
            SECTION 04
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            시스템 아키텍처: 온디바이스 Edge AI, 보안 & 하이브리드 클라우드
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          카메라 단말 자체 NPU 연산으로 중앙 대역폭 부하를 90% 이상 절감하고, TEE 보안 마스킹과 
          머클 트리 블록체인 무결성 검증으로 법적 증거력을 보장하는 첨단 아키텍처를 제시합니다.
        </p>
      </div>

      {/* 3 Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Pillar 1: Edge AI */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span>온디바이스 Edge AI (NPU)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            무거운 고화질 동영상을 중앙 서버로 전송하지 않고, 카메라 내부 NPU에서 차량 감지, 
            바운딩 박스 크롭, 번호판 텍스트 판독을 즉시 수행합니다. 중앙으로는 <strong className="text-purple-300">약 5KB의 JSON 텍스트와 BestShot</strong> 이미지만 전송하여 네트워크 대역폭과 서버 비용을 90% 이상 절감합니다.
          </p>
          <div className="bg-purple-950/40 p-3 rounded-lg border border-purple-800/40 text-[11px] font-mono text-purple-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">단말 추론 속도:</span>
              <strong className="text-emerald-400">~65 ms</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">대역폭 절감률:</span>
              <strong className="text-emerald-400">92.4% 절감</strong>
            </div>
          </div>
        </div>

        {/* Pillar 2: TEE & Merkle Tree */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <Lock className="w-5 h-5 text-purple-400" />
            <span>TEE 마스킹 & 머클트리 위변조 방지</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            신뢰 실행 환경(TEE)에서 동승자 얼굴과 주변 사생활 영역을 하드웨어 레벨에서 자동 마스킹합니다. 
            단속 데이터는 <strong className="text-purple-300">머클 트리(Merkle Tree)</strong>로 해시 병합되어 
            블록체인 분산 원장에 루트 해시만 타임스탬프로 기록되어 재판 시 법적 무결성을 증명합니다.
          </p>
          <div className="bg-purple-950/40 p-3 rounded-lg border border-purple-800/40 text-[11px] font-mono text-purple-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">보안 엔클레이브:</span>
              <strong className="text-purple-300">ARM TrustZone / TEE</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">무결성 검증:</span>
              <strong className="text-emerald-400">Merkle Root + SHA-256</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: Hybrid Retraining */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <GitMerge className="w-5 h-5 text-purple-400" />
            <span>하이브리드 AI 자가 재학습 루프</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            통신 장애 시에도 엣지 카메라는 독자적으로 차량을 적발하고 내장 플래시 메모리에 버퍼링합니다. 
            인식 신뢰도가 낮은 이상 샘플만 클라우드로 업로드하여 중앙의 대규모 AI 클러스터가 추가 학습 후 
            새 가중치를 카메라로 무선(OTA) 배포하는 자가 진화형 구조입니다.
          </p>
          <div className="bg-purple-950/40 p-3 rounded-lg border border-purple-800/40 text-[11px] font-mono text-purple-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">독립 생존성:</span>
              <strong className="text-emerald-400">오프라인 버퍼 지원</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">가중치 배포:</span>
              <strong className="text-purple-300">Zero-Downtime OTA</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Pipeline Visualizer */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">
              인터랙티브 단속 파이프라인 (센서 캡처부터 법적 증거 검증까지)
            </h4>
          </div>
          <span className="text-xs text-slate-400">각 단계를 클릭하여 패킷 페이로드와 기술 제원을 확인하세요</span>
        </div>

        {/* Step Flow Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {pipelineSteps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3 rounded-xl text-left border transition flex flex-col justify-between ${
                  isActive
                    ? 'bg-purple-950/70 border-purple-500 text-white shadow-lg ring-1 ring-purple-500'
                    : 'bg-slate-950/60 hover:bg-slate-800/50 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-purple-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    STEP 0{step.id}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">{step.latency}</span>
                </div>
                <div className="text-xs font-bold leading-tight truncate">
                  {step.short}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed View Card */}
        {(() => {
          const cur = pipelineSteps.find((s) => s.id === activeStep) || pipelineSteps[1];
          return (
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {cur.badge}
                  </span>
                  <h5 className="text-sm font-bold text-white">{cur.title}</h5>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{cur.desc}</p>
                <div className="flex items-center space-x-4 pt-1 text-xs text-slate-400">
                  <div>
                    소요 레이턴시: <strong className="text-emerald-400 font-mono">{cur.latency}</strong>
                  </div>
                  <div>
                    전송 페이로드: <strong className="text-purple-300 font-mono">{cur.payload}</strong>
                  </div>
                </div>
              </div>

              {/* Sample Payload Mock */}
              <div className="md:col-span-4 bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto shadow-inner">
                <div className="text-slate-500 text-[10px] flex items-center justify-between border-b border-slate-800 pb-1 mb-1">
                  <span>METADATA PAYLOAD JSON</span>
                  <span className="text-emerald-400">VERIFIED</span>
                </div>
                <div>{`{`}</div>
                <div className="pl-3 text-emerald-400">"timestamp": 1793086591230,</div>
                <div className="pl-3 text-sky-400">"plate": "123가4567",</div>
                <div className="pl-3 text-amber-400">"confidence": 0.994,</div>
                <div className="pl-3 text-purple-400">"merkle_root": "0x7f9a...3b21",</div>
                <div className="pl-3 text-slate-400">"tee_masked": true</div>
                <div>{`}`}</div>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
};
