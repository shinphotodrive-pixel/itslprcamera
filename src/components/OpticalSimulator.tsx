import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  Car, 
  Gauge, 
  SunMedium, 
  Moon,
  CloudRain,
  Camera,
  Layers,
  ChevronRight
} from 'lucide-react';
import { OPTICAL_PRESETS, OpticalPreset } from '../data/lprData';

export const OpticalSimulator: React.FC = () => {
  const [targetType, setTargetType] = useState<"reflective" | "motorcycle" | "damaged" | "standard">("reflective");
  const [shutterVal, setShutterVal] = useState<number>(3); // 1: 1/30, 2: 1/125, 3: 1/500, 4: 1/2000, 5: 1/10000
  const [agcVal, setAgcVal] = useState<number>(1); // 1: Low (-30dB), 2: Med, 3: High
  const [irisVal, setIrisVal] = useState<number>(2); // 1: F/1.4, 2: F/2.8, 3: F/8.0
  const [irVal, setIrVal] = useState<number>(2); // 1: Low, 2: Med, 3: Max
  const [vehicleSpeed, setVehicleSpeed] = useState<number>(100); // km/h
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [weatherCondition, setWeatherCondition] = useState<"clear" | "rain">("clear");
  const [activePreset, setActivePreset] = useState<string>("추천: 야간 고속도로 표준 프리셋");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Label dictionaries
  const shutterLabels = [
    { label: "1/30 초", desc: "심각한 모션 블러 (저속)" },
    { label: "1/125 초", desc: "도심 저속용 (잔상 잔존)" },
    { label: "1/500 초", desc: "고속도로 권장 표준" },
    { label: "1/2000 초", desc: "초고속 동결 (우수)" },
    { label: "1/10000 초", desc: "극초고속 (충분한 조명 필요)" }
  ];

  const agcLabels = [
    { label: "Low (-30dB 제한)", desc: "포화/난반사 하드 억제" },
    { label: "Medium (자동)", desc: "일반 야간 조도" },
    { label: "High (무제한)", desc: "심각한 노이즈 & 화이트아웃" }
  ];

  const irisLabels = [
    { label: "F/1.4 (완전 개방)", desc: "빛 과다유입, 핀아웃 위험" },
    { label: "F/2.8 (수동 고정 권장)", desc: "광학 해상력 & 심도 최적" },
    { label: "F/8.0 (심조리개)", desc: "광량 급감, 야간 암부 유발" }
  ];

  const irLabels = [
    { label: "OFF / Low", desc: "야간 시인성 취약" },
    { label: "Medium (적정 850nm)", desc: "반사필름 균일 조사" },
    { label: "Max (과다 투광)", desc: "초근접 반사체 백화 유발" }
  ];

  // Optical physics calculation
  const calculateMetrics = useCallback(() => {
    // Whiteout Risk: Iris wide (1) + High IR (3) or High AGC (3) + Reflective Film
    let whiteoutScore = 0;
    if (irisVal === 1) whiteoutScore += 35;
    if (irisVal === 2) whiteoutScore += 10;
    if (irVal === 3) whiteoutScore += 35;
    if (irVal === 2) whiteoutScore += 10;
    if (agcVal === 3) whiteoutScore += 35;
    if (agcVal === 2) whiteoutScore += 15;
    if (targetType === "reflective") whiteoutScore *= 1.35; // Reflective film multiplies glare!
    if (headlightsOn) whiteoutScore += 15;
    if (weatherCondition === "rain") whiteoutScore += 10; // wet surface reflection

    const isWhiteout = whiteoutScore >= 65;

    // Motion Blur calculation: Speed * ShutterDuration
    const shutterSeconds = [1 / 30, 1 / 125, 1 / 500, 1 / 2000, 1 / 10000][shutterVal - 1];
    const speedMps = vehicleSpeed * (1000 / 3600);
    const blurDisplacementCm = speedMps * shutterSeconds * 100; // cm of blur
    const blurPixels = blurDisplacementCm * 3.5; // pixel smearing
    const isBlur = blurPixels > 4.0;

    // Underexposure: Iris closed (3) + Shutter high (4,5) + Low IR (1)
    let underexposed = false;
    if (irisVal === 3 && shutterVal >= 4 && irVal === 1) {
      underexposed = true;
    }

    // OCR Accuracy Score
    let ocr = 99.6;
    if (isWhiteout) {
      ocr -= Math.min(85, (whiteoutScore - 55) * 2.2);
    }
    if (isBlur) {
      ocr -= Math.min(75, blurPixels * 8.5);
    }
    if (underexposed) {
      ocr -= 60;
    }
    if (targetType === "damaged") {
      ocr -= 6.5; // Physical plate defect
    }
    if (weatherCondition === "rain") {
      ocr -= 4.0;
    }

    ocr = Math.max(8.0, Math.min(99.8, ocr));

    return {
      whiteoutScore: Math.min(100, Math.round(whiteoutScore)),
      isWhiteout,
      blurDisplacementCm: blurDisplacementCm.toFixed(1),
      blurPixels: blurPixels.toFixed(1),
      isBlur,
      underexposed,
      ocrScore: ocr.toFixed(1)
    };
  }, [targetType, shutterVal, agcVal, irisVal, irVal, vehicleSpeed, headlightsOn, weatherCondition]);

  const metrics = calculateMetrics();

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI Support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background: Night Asphalt & Fog
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Perspective Highway Road Lines
    const vanishX = width / 2;
    const vanishY = height * 0.28;

    // Road surface gradient
    const roadGrad = ctx.createLinearGradient(0, vanishY, 0, height);
    roadGrad.addColorStop(0, '#0f172a');
    roadGrad.addColorStop(1, '#020617');
    ctx.fillStyle = roadGrad;
    ctx.beginPath();
    ctx.moveTo(vanishX - 40, vanishY);
    ctx.lineTo(vanishX + 40, vanishY);
    ctx.lineTo(width + 80, height);
    ctx.lineTo(-80, height);
    ctx.closePath();
    ctx.fill();

    // Road Lane Dash Markings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 16]);
    ctx.beginPath();
    ctx.moveTo(vanishX, vanishY + 10);
    ctx.lineTo(width * 0.35, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(vanishX, vanishY + 10);
    ctx.lineTo(width * 0.65, height);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // Rain Simulation
    if (weatherCondition === 'rain') {
      ctx.strokeStyle = 'rgba(180, 210, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 4, ry + 12);
        ctx.stroke();
      }
    }

    // Vehicle Silhouette & Headlights
    const vehCenterX = width / 2;
    const vehCenterY = height * 0.58;

    if (headlightsOn) {
      // Left and right headlights
      const hlLeftX = vehCenterX - 110;
      const hlRightX = vehCenterX + 110;
      const hlY = vehCenterY - 15;

      const drawHeadlight = (hx: number) => {
        const hGrad = ctx.createRadialGradient(hx, hlY, 4, hx, hlY, 90);
        hGrad.addColorStop(0, 'rgba(255, 255, 240, 0.85)');
        hGrad.addColorStop(0.3, 'rgba(255, 240, 180, 0.35)');
        hGrad.addColorStop(1, 'rgba(255, 240, 180, 0)');
        ctx.fillStyle = hGrad;
        ctx.beginPath();
        ctx.arc(hx, hlY, 90, 0, Math.PI * 2);
        ctx.fill();

        // Bulb center
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(hx, hlY, 6, 0, Math.PI * 2);
        ctx.fill();
      };

      drawHeadlight(hlLeftX);
      drawHeadlight(hlRightX);
    }

    // Vehicle Grille / Bumper Backdrop
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(vehCenterX - 130, vehCenterY - 35, 260, 85, 12);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // License Plate Dimension & Location
    const isMoto = targetType === "motorcycle";
    const plateWidth = isMoto ? 160 : 230;
    const plateHeight = isMoto ? 75 : 54;
    const plateX = vehCenterX - plateWidth / 2;
    const plateY = vehCenterY - plateHeight / 2 + 5;

    // Blur Smear Effect
    const blurOffset = parseFloat(metrics.blurPixels);

    const renderPlateBase = (offsetX = 0, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      // Base Plate Color
      if (metrics.isWhiteout) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 35;
      } else if (metrics.underexposed) {
        ctx.fillStyle = '#1e293b';
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      } else if (isMoto) {
        ctx.fillStyle = '#fef08a'; // Motorcycle yellow
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = '#f8fafc'; // Crisp Korean plate white
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 10;
      }

      ctx.beginPath();
      ctx.roundRect(plateX + offsetX, plateY, plateWidth, plateHeight, 6);
      ctx.fill();

      // Border line on plate
      if (!metrics.isWhiteout && !metrics.underexposed) {
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Reflective Film Left Blue Strip (신형 8자리 반사필름 특유의 좌측 파란 엠블럼)
      if (targetType === "reflective" && !metrics.isWhiteout && !metrics.underexposed) {
        ctx.fillStyle = '#1d4ed8'; // Blue hologram strip
        ctx.beginPath();
        ctx.roundRect(plateX + offsetX + 3, plateY + 3, 22, plateHeight - 6, [4, 0, 0, 4]);
        ctx.fill();

        // KOR text & taegeuk mark
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px font-mono, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('KOR', plateX + offsetX + 14, plateY + plateHeight - 10);

        // Hologram mini circle
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(plateX + offsetX + 14, plateY + 16, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Plate Text Rendering
      if (!metrics.isWhiteout && !metrics.underexposed) {
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (targetType === 'reflective') {
          ctx.font = '700 24px "JetBrains Mono", sans-serif';
          ctx.fillText('123가 4567', plateX + offsetX + (plateWidth / 2) + 10, plateY + plateHeight / 2);
        } else if (targetType === 'motorcycle') {
          ctx.font = '600 12px Pretendard, sans-serif';
          ctx.fillText('서울 강남', plateX + offsetX + (plateWidth / 2), plateY + 22);
          ctx.font = '700 22px "JetBrains Mono", sans-serif';
          ctx.fillText('8901', plateX + offsetX + (plateWidth / 2), plateY + 48);
        } else if (targetType === 'damaged') {
          ctx.font = '700 21px "JetBrains Mono", sans-serif';
          ctx.fillStyle = '#334155';
          ctx.fillText('건설 04-5678', plateX + offsetX + (plateWidth / 2), plateY + plateHeight / 2);

          // Mud spatter & scratch noise
          ctx.fillStyle = '#78350f';
          const mudSeeds = [
            { x: 20, y: 10, r: 8 }, { x: 70, y: 30, r: 12 }, { x: 120, y: 15, r: 14 },
            { x: 160, y: 35, r: 10 }, { x: 190, y: 12, r: 9 }, { x: 40, y: 40, r: 11 }
          ];
          mudSeeds.forEach(m => {
            ctx.beginPath();
            ctx.arc(plateX + offsetX + m.x, plateY + m.y, m.r, 0, Math.PI * 2);
            ctx.fill();
          });
        } else {
          ctx.font = '700 23px "JetBrains Mono", sans-serif';
          ctx.fillText('56나 7890', plateX + offsetX + (plateWidth / 2), plateY + plateHeight / 2);
        }
      }

      // Severe Whiteout Overdrive Glare
      if (metrics.isWhiteout) {
        const whiteGrad = ctx.createRadialGradient(
          plateX + plateWidth / 2, plateY + plateHeight / 2, 10,
          plateX + plateWidth / 2, plateY + plateHeight / 2, 120
        );
        whiteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        whiteGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.85)');
        whiteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = whiteGrad;
        ctx.beginPath();
        ctx.arc(plateX + plateWidth / 2, plateY + plateHeight / 2, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Render with blur displacement if shutter is slow
    if (metrics.isBlur && blurOffset > 1) {
      const passes = 5;
      for (let p = -passes; p <= passes; p++) {
        const offset = (p / passes) * blurOffset * 2.5;
        const alpha = Math.max(0.12, 1 - Math.abs(p) / passes);
        renderPlateBase(offset, alpha * 0.4);
      }
    } else {
      renderPlateBase(0, 1.0);
    }

    // High AGC / ISO Grain Simulation
    if (agcVal === 3) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let i = 0; i < 400; i++) {
        const nx = plateX - 20 + Math.random() * (plateWidth + 40);
        const ny = plateY - 10 + Math.random() * (plateHeight + 20);
        ctx.fillRect(nx, ny, 2, 2);
      }
    }

    // AI OCR Target Bracket Overlay (Emerald / Red HUD)
    const hudColor = parseFloat(metrics.ocrScore) >= 90 ? '#10b981' : parseFloat(metrics.ocrScore) >= 60 ? '#f59e0b' : '#ef4444';
    ctx.strokeStyle = hudColor;
    ctx.lineWidth = 2;

    const roiPadX = 14;
    const roiPadY = 10;
    const rx = plateX - roiPadX;
    const ry = plateY - roiPadY;
    const rw = plateWidth + roiPadX * 2;
    const rh = plateHeight + roiPadY * 2;
    const corner = 14;

    // Corner brackets
    // Top-left
    ctx.beginPath();
    ctx.moveTo(rx, ry + corner);
    ctx.lineTo(rx, ry);
    ctx.lineTo(rx + corner, ry);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(rx + rw - corner, ry);
    ctx.lineTo(rx + rw, ry);
    ctx.lineTo(rx + rw, ry + corner);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(rx, ry + rh - corner);
    ctx.lineTo(rx, ry + rh);
    ctx.lineTo(rx + corner, ry + rh);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(rx + rw - corner, ry + rh);
    ctx.lineTo(rx + rw, ry + rh);
    ctx.lineTo(rx + rw, ry + rh - corner);
    ctx.stroke();

    // OCR Detected Tag
    ctx.fillStyle = hudColor;
    ctx.beginPath();
    ctx.roundRect(rx, ry - 22, 170, 18, 4);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    let plateLabel = "123가4567";
    if (targetType === "motorcycle") plateLabel = "서울강남 8901";
    if (targetType === "damaged") plateLabel = "건설 04-5678";
    if (targetType === "standard") plateLabel = "56나7890";

    const displayOcrText = metrics.isWhiteout ? "OCR: [FAILED] 포화" : metrics.isBlur ? "OCR: [BLUR] 판독불가" : `OCR: ${plateLabel} (${metrics.ocrScore}%)`;
    ctx.fillText(displayOcrText, rx + 6, ry - 13);

    // Camera On-Screen Display (OSD) in Top Left
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.beginPath();
    ctx.roundRect(10, 10, 310, 48, 6);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '600 9px "JetBrains Mono", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`CAM-04 ITS HWY | 4K UHD 60FPS | LATENCY: 1.2ms`, 18, 16);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 9px "JetBrains Mono", sans-serif';
    ctx.fillText(`EXP: ${shutterLabels[shutterVal - 1].label} | ${irisLabels[irisVal - 1].label.split(' ')[0]} | AGC: ${agcLabels[agcVal - 1].label.split(' ')[0]}`, 18, 28);
    ctx.fillText(`IR: 850nm (${irLabels[irVal - 1].label.split(' ')[0]}) | V-SPEED: ${vehicleSpeed} km/h`, 18, 40);

  }, [targetType, shutterVal, agcVal, irisVal, irVal, vehicleSpeed, headlightsOn, weatherCondition, metrics]);

  // Apply Preset Handler
  const handleApplyPreset = (preset: OpticalPreset) => {
    setActivePreset(preset.name);
    setTargetType(preset.targetType);
    setShutterVal(preset.shutterVal);
    setAgcVal(preset.agcVal);
    setIrisVal(preset.irisVal);
    setIrVal(preset.irVal);
    setVehicleSpeed(preset.vehicleSpeed);
  };

  const handleReset = () => {
    handleApplyPreset(OPTICAL_PRESETS[0]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-l-4 border-emerald-500 pl-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              SECTION 01
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              LPR 광학 및 조명 파라미터 실시간 인터랙티브 시뮬레이터
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            카메라 셔터 속도, P-Iris 조리개, AGC 하드 리미트, 850nm IR 투광 파워를 가변 조작하여 
            반사필름 야간 난반사(White-out)와 고속 모션 블러를 억제하는 최적의 광학 튜닝점을 도출합니다.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start md:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>초기화</span>
        </button>
      </div>

      {/* Preset Quick Selection Bar */}
      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
        <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
          <span>실무 권장 검증 프리셋 (1-Click 실증 테스트)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {OPTICAL_PRESETS.map((p) => {
            const isSelected = activePreset === p.name;
            const isWarning = p.name.includes("실패");
            return (
              <button
                key={p.name}
                onClick={() => handleApplyPreset(p)}
                className={`p-2.5 rounded-lg text-left transition border text-xs flex flex-col justify-between ${
                  isSelected
                    ? isWarning
                      ? 'bg-red-950/60 border-red-500 text-red-200 ring-1 ring-red-500'
                      : 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                    : 'bg-slate-950/50 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold flex items-center justify-between mb-1">
                  <span>{p.name.split(':')[0]}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {p.name.split(':')[1]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Main Grid */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column (Left 5 Cols) */}
        <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center">
              <Sliders className="w-4 h-4 text-emerald-400 mr-1.5" />
              광학 및 하드웨어 조절부
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">ON-THE-FLY TUNING</span>
          </div>

          {/* Target Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>감지 대상 번호판 유형</span>
              <span className="text-[10px] text-slate-500">Target Type</span>
            </label>
            <select
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value as any);
                setActivePreset("사용자 정의 커스텀");
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="reflective">신형 8자리 반사필름식 번호판 (야간 IR 난반사 취약)</option>
              <option value="motorcycle">이륜차(오토바이) 소형 후면 번호판 (250~900mm 저지상고)</option>
              <option value="damaged">건설기계 / 흙먼지 오염 훼손 번호판 (진흙 피복)</option>
              <option value="standard">표준 페인트식 가로 긴 번호판 (일반 흰색)</option>
            </select>
          </div>

          {/* Shutter Speed Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-300">셔터 속도 (Shutter Speed)</span>
              <span className="font-mono text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {shutterLabels[shutterVal - 1].label}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={shutterVal}
              onChange={(e) => {
                setShutterVal(parseInt(e.target.value));
                setActivePreset("사용자 정의 커스텀");
              }}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1/30s (블러 심함)</span>
              <span>1/500s (권장)</span>
              <span>1/10000s (초고속)</span>
            </div>
          </div>

          {/* P-Iris Aperture Fixed */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-300">P-Iris 조리개 수동 고정 (F-Number)</span>
              <span className="font-mono text-sky-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {irisLabels[irisVal - 1].label.split(' ')[0]}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={irisVal}
              onChange={(e) => {
                setIrisVal(parseInt(e.target.value));
                setActivePreset("사용자 정의 커스텀");
              }}
              className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>F/1.4 (완전개방/과다)</span>
              <span>F/2.8 (수동고정 권장)</span>
              <span>F/8.0 (심조리개)</span>
            </div>
          </div>

          {/* AGC Gain Control */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-300">AGC 게인 제어 (Auto Gain Control)</span>
              <span className="font-mono text-amber-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {agcLabels[agcVal - 1].label.split(' ')[0]}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={agcVal}
              onChange={(e) => {
                setAgcVal(parseInt(e.target.value));
                setActivePreset("사용자 정의 커스텀");
              }}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Low (-30dB 리미트 권장)</span>
              <span>Medium</span>
              <span>High (포화 위험)</span>
            </div>
          </div>

          {/* IR Illuminator */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-300">IR 적외선 투광기 파워 (850nm)</span>
              <span className="font-mono text-purple-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {irLabels[irVal - 1].label.split(' ')[0]}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              value={irVal}
              onChange={(e) => {
                setIrVal(parseInt(e.target.value));
                setActivePreset("사용자 정의 커스텀");
              }}
              className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>OFF / Low</span>
              <span>Medium (균일)</span>
              <span>Max (근거리 백화)</span>
            </div>
          </div>

          {/* Vehicle Speed Slider */}
          <div className="space-y-1 pt-1 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-slate-300 flex items-center">
                <Car className="w-3.5 h-3.5 text-slate-400 mr-1" />
                차량 주행 속도 (Vehicle Speed)
              </span>
              <span className="font-mono text-emerald-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {vehicleSpeed} km/h
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={vehicleSpeed}
              onChange={(e) => {
                setVehicleSpeed(parseInt(e.target.value));
                setActivePreset("사용자 정의 커스텀");
              }}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Headlights & Weather Toggle */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setHeadlightsOn(!headlightsOn)}
              className={`p-2 rounded-lg text-xs font-semibold border flex items-center justify-center space-x-1.5 transition ${
                headlightsOn
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              <span>전조등 직사 {headlightsOn ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setWeatherCondition(weatherCondition === 'clear' ? 'rain' : 'clear')}
              className={`p-2 rounded-lg text-xs font-semibold border flex items-center justify-center space-x-1.5 transition ${
                weatherCondition === 'rain'
                  ? 'bg-sky-500/10 border-sky-500/50 text-sky-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>{weatherCondition === 'rain' ? '우천/젖은 노면' : '맑은 야간'}</span>
            </button>
          </div>
        </div>

        {/* Viewfinder & Diagnostics Column (Right 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          {/* Viewfinder Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center">
                <Camera className="w-4 h-4 text-sky-400 mr-1.5" />
                카메라 센서 실시간 캡처 뷰포트 (4K 60FPS 렌더링)
              </span>

              {/* Status Badge */}
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center space-x-1 border ${
                  parseFloat(metrics.ocrScore) >= 90
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60'
                    : parseFloat(metrics.ocrScore) >= 60
                    ? 'bg-amber-950 text-amber-300 border-amber-700/60'
                    : 'bg-red-950 text-red-300 border-red-700/60'
                }`}
              >
                {parseFloat(metrics.ocrScore) >= 90 ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 mr-1" />
                    <span>최적 화질 (인식 완벽)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3 h-3 text-red-400 mr-1" />
                    <span>인식 장애 (튜닝 시급)</span>
                  </>
                )}
              </span>
            </div>

            {/* Canvas Viewport Frame */}
            <div className="relative w-full h-64 md:h-72 bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-700/80 shadow-2xl">
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              {/* Corner Watermark */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-slate-900/80 rounded border border-slate-800 text-[10px] font-mono text-slate-400 pointer-events-none">
                SIM ENGINE v2.6 • 60FPS
              </div>
            </div>
          </div>

          {/* Diagnostic Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">예상 AI OCR 인식률</div>
              <div
                className={`text-2xl font-black font-mono ${
                  parseFloat(metrics.ocrScore) >= 90
                    ? 'text-emerald-400'
                    : parseFloat(metrics.ocrScore) >= 60
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {metrics.ocrScore}%
              </div>
              <div className="text-[10px] text-slate-500">
                {parseFloat(metrics.ocrScore) >= 90 ? '정밀 판독 보증' : '오인식 위험'}
              </div>
            </div>

            <div className="space-y-1 border-x border-slate-800/80 px-2">
              <div className="text-[11px] text-slate-400 font-medium">화이트아웃 (난반사)</div>
              <div
                className={`text-sm font-bold mt-1.5 ${
                  metrics.isWhiteout ? 'text-red-400 font-mono' : 'text-slate-300'
                }`}
              >
                {metrics.isWhiteout ? `심각 (${metrics.whiteoutScore}%)` : `정상 (${metrics.whiteoutScore}%)`}
              </div>
              <div className="text-[10px] text-slate-500">
                {metrics.isWhiteout ? 'P-Iris 고정 필요' : '균일 노출 유지'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">모션 블러 (잔상)</div>
              <div
                className={`text-sm font-bold mt-1.5 ${
                  metrics.isBlur ? 'text-red-400 font-mono' : 'text-slate-300'
                }`}
              >
                {metrics.isBlur ? `${metrics.blurPixels}px 잔상` : '< 0.5px (동결)'}
              </div>
              <div className="text-[10px] text-slate-500">
                {metrics.isBlur ? '셔터 1/500s 권장' : '문자 윤곽 엣지 선명'}
              </div>
            </div>
          </div>

          {/* Actionable Engineering Advice Box */}
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start space-x-2.5 ${
              parseFloat(metrics.ocrScore) >= 90
                ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-200'
                : 'bg-red-950/40 border-red-800/50 text-red-200'
            }`}
          >
            {parseFloat(metrics.ocrScore) >= 90 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold">
                {parseFloat(metrics.ocrScore) >= 90
                  ? 'ITS 조달 기술 심의 통과 상태:'
                  : '광학 튜닝 조치 권고사항:'}
              </span>
              <p className="text-[11px] text-slate-300">
                {metrics.isWhiteout
                  ? '야간 반사필름의 재귀반사체에 의해 픽셀 포화가 발생했습니다. P-Iris 조리개를 F/2.8로 수동 고정하고 AGC 상한을 -30dB로 제한하십시오.'
                  : metrics.isBlur
                  ? `시속 ${vehicleSpeed}km/h 주행 중 셔터 속도가 부족하여 ${metrics.blurDisplacementCm}cm의 위치 밀림 및 잔상이 발생했습니다. 셔터 속도를 최소 1/500s 이상으로 상향하십시오.`
                  : metrics.underexposed
                  ? '광량이 극단적으로 부족하여 번호판 음영 폰트가 노이즈 속에 묻혔습니다. IR 투광기 파워를 올리거나 셔터 속도를 조정하세요.'
                  : '현재 파라미터 조합은 100km/h 이상의 고속 주행 시에도 폰트 외곽선 분리도 99% 이상을 안정적으로 유지합니다.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
