import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  X, 
  Video, 
  Sparkles, 
  Tv, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { VIDEO_REFERENCES, VideoReference } from '../data/lprData';

export const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoReference | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 레퍼런스' },
    { id: 'rear', label: '이륜차 후면단속' },
    { id: 'radar', label: '레이더 추적' },
    { id: 'etri', label: 'ETRI 초해상도 AI' },
    { id: 'heavy', label: '건설기계/모바일' }
  ];

  const filteredVideos = VIDEO_REFERENCES.filter((v) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'rear') return v.category.includes('후면');
    if (categoryFilter === 'radar') return v.category.includes('레이더');
    if (categoryFilter === 'etri') return v.category.includes('복원') || v.category.includes('ETRI');
    if (categoryFilter === 'heavy') return v.category.includes('건설');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-l-4 border-red-500 pl-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            SECTION 06
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            LPR 실무 적용 및 작동 원리 시연 영상 (유튜브 레퍼런스 허브)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          경찰청 공식 채널, 주요 방송사(MBC, YTN, SBS, KBS) 및 ETRI(한국전자통신연구원)의 
          실무 현장 검증 영상 레퍼런스를 통해 기술적 신뢰성을 실증합니다.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-semibold flex items-center mr-1">
          <Filter className="w-3.5 h-3.5 mr-1 text-red-400" /> 필터:
        </span>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoryFilter(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
              categoryFilter === c.id
                ? 'bg-red-500/20 border-red-500 text-red-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between hover:border-slate-700 hover:shadow-2xl transition space-y-4 group"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${video.badgeColor}`}>
                  {video.category}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {video.publisher}
                </span>
              </div>

              {/* Title & Summary */}
              <h4 className="text-sm font-bold text-white leading-snug group-hover:text-red-300 transition">
                {video.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {video.summary}
              </p>

              {/* Key Takeaway Callout */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{video.keyTakeaway}</span>
              </div>
            </div>

            {/* Video Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedVideo(video)}
                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition shadow-md shadow-red-950/50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>앱 내 재생</span>
              </button>

              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition"
              >
                <span>YouTube 열기</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded YouTube Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 p-5 md:p-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {selectedVideo.publisher}
                </span>
                <h4 className="text-sm md:text-base font-bold text-white mt-1">
                  {selectedVideo.title}
                </h4>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iframe Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner border border-slate-800">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-1">
              <p className="line-clamp-2">{selectedVideo.summary}</p>
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 font-semibold whitespace-nowrap"
              >
                <span>YouTube에서 원본 시청</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
