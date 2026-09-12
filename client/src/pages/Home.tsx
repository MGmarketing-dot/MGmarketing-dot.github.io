import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const serviceDetails = [
  "키워드와 검색 의도, 경쟁 콘텐츠 분석",
  "고객의 질문에 답하는 SEO 콘텐츠 구조",
  "블로그·릴스·숏폼의 바이럴 메시지 기획",
  "랜딩페이지에서 문의까지의 전환 동선 개선",
];

const dashboardSignals = [
  { label: "Search Intent", value: "발견", delta: "키워드", bar: 78, color: "bg-blue-500" },
  { label: "Content Signal", value: "관심", delta: "메시지", bar: 66, color: "bg-cyan-500" },
  { label: "Conversion Flow", value: "선택", delta: "CTA", bar: 88, color: "bg-violet-500" },
];

const services = [
  {
    color: "#3b82f6",
    bg: "#eff6ff",
    title: "검색되는 구조",
    description: "키워드와 검색 의도로 유입의 시작점을 설계합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /><path d="M8 11h6M11 8v6" />
      </svg>
    ),
  },
  {
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "퍼지는 이야기",
    description: "사람들이 멈춰 보고 기억할 콘텐츠를 기획합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    color: "#ef4444",
    bg: "#fef2f2",
    title: "선택되는 흐름",
    description: "콘텐츠에서 문의까지 다음 행동을 자연스럽게 잇습니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m15 9 6-6M17 3h4v4" />
      </svg>
    ),
  },
  {
    color: "#6366f1",
    bg: "#eef2ff",
    title: "측정과 개선",
    description: "실제 반응을 확인하며 메시지와 동선을 개선합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="10" width="4" height="10" rx="1" /><rect x="10" y="6" width="4" height="14" rx="1" /><rect x="17" y="2" width="4" height="18" rx="1" />
      </svg>
    ),
  },
];

function InquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fields, setFields] = useState({ brand: "", contact: "", message: "" });

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const summary = useMemo(
    () => `[브랜드명] ${fields.brand}\n[연락받을 곳] ${fields.contact}\n[해결하고 싶은 문제]\n${fields.message}`,
    [fields],
  );

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const close = () => {
    setSubmitted(false);
    setCopied(false);
    onClose();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 backdrop-blur-sm px-4" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Project inquiry</p>
            <h2 id="inquiry-title" className="text-2xl sm:text-3xl font-black text-slate-900">지금 막힌 지점부터 알려주세요.</h2>
          </div>
          <button type="button" onClick={close} className="w-9 h-9 shrink-0 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="문의 창 닫기">✕</button>
        </div>
        {!submitted ? (
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">이름 또는 브랜드명
              <input required value={fields.brand} onChange={(e) => setFields({ ...fields, brand: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal focus:border-blue-500 focus:outline-none" placeholder="예: 맥거핀 스튜디오" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">연락받을 곳
              <input required value={fields.contact} onChange={(e) => setFields({ ...fields, contact: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal focus:border-blue-500 focus:outline-none" placeholder="이메일 또는 전화번호" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">가장 해결하고 싶은 문제
              <textarea required rows={5} value={fields.message} onChange={(e) => setFields({ ...fields, message: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal focus:border-blue-500 focus:outline-none resize-y" placeholder="예: 검색 유입은 있지만 상담 문의로 잘 이어지지 않습니다." />
            </label>
            <p className="text-xs leading-relaxed text-slate-400">비공개 미리보기에서는 입력한 내용이 외부로 전송되지 않습니다.</p>
            <button type="submit" className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-white font-bold hover:bg-blue-700 transition-colors">문의 내용 정리하기 →</button>
          </form>
        ) : (
          <div>
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">✓</div>
            <h3 className="text-xl font-black text-slate-900 mb-2">문의 초안이 완성되었습니다.</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">현재는 외부 전송 없이 브라우저 안에서만 정리됩니다. 공개 전 실제 수신 채널을 연결할 수 있습니다.</p>
            <pre className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 whitespace-pre-wrap font-sans mb-4">{summary}</pre>
            <button type="button" onClick={copy} className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-white font-bold hover:bg-blue-700 transition-colors">{copied ? "복사되었습니다 ✓" : "내용 복사하기"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2" aria-label="맥거핀 마케팅 홈">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">M</div>
            <span className="font-black text-slate-900 text-lg">맥거핀 마케팅</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors">서비스</a>
            <a href="#process" className="hover:text-slate-900 transition-colors">진행 방식</a>
            <a href="#principles" className="hover:text-slate-900 transition-colors">마케팅 원칙</a>
          </div>
          <button onClick={() => setInquiryOpen(true)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">상담 시작하기</button>
        </div>
      </nav>

      <main id="top">
        <section className="py-24 sm:py-28 md:py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-50" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" /></span>
              SEO 기반 바이럴 마케팅
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 leading-[1.08] mb-6" style={{ letterSpacing: "-0.055em" }}>
              소비자의 행동을 분석하고
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">고객의 선택을</span>
              <br />
              이끌어냅니다
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              검색하고, 비교하고, 망설인 뒤 선택하는 고객의 여정을 읽습니다. SEO 콘텐츠부터 바이럴 메시지, 문의 전환까지 하나의 흐름으로 설계합니다.
            </p>
            <button onClick={() => setInquiryOpen(true)} className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors shadow-lg shadow-blue-200">내 브랜드 흐름 진단하기 →</button>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-8 mt-12 text-sm text-slate-500">
              {["검색 의도에서 시작", "콘텐츠와 전환 동선 연결", "확인 가능한 근거로 개선"].map((text) => <span key={text} className="flex items-center gap-1.5"><span className="text-emerald-500"><Check /></span>{text}</span>)}
            </div>
          </div>
        </section>

        <section id="services" className="py-24 px-6 scroll-mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Behavior to choice</p>
                <h2 className="text-4xl font-black text-slate-900 mb-6">노출이 아니라,<br />선택까지 이어지는 흐름</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">SEO, 바이럴 콘텐츠, 랜딩페이지를 따로 보지 않습니다. 고객이 브랜드를 발견하고 신뢰하고 문의하는 과정을 하나로 연결합니다.</p>
                <div className="space-y-3">
                  {serviceDetails.map((text) => <div key={text} className="flex items-center gap-3"><div className="w-5 h-5 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</div><span className="text-slate-700 text-sm">{text}</span></div>)}
                </div>
              </div>
              <div id="process" className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/50 scroll-mt-24">
                <div className="mb-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Customer journey signals</p><p className="mt-1 text-sm text-slate-600">행동 신호를 다음 선택으로 연결합니다.</p></div>
                <div className="space-y-3">
                  {dashboardSignals.map((signal) => (
                    <div key={signal.label} className="p-4 rounded-xl bg-white border border-slate-200">
                      <div className="flex justify-between items-center mb-2"><span className="text-sm text-slate-600">{signal.label}</span><div><span className="font-black text-slate-900">{signal.value}</span><span className="text-xs text-blue-600 ml-2">{signal.delta}</span></div></div>
                      <div className="h-1.5 rounded-full bg-slate-100"><div className={`h-1.5 rounded-full ${signal.color}`} style={{ width: `${signal.bar}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <article key={service.title} className="group p-5 rounded-xl bg-white border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: service.bg }}>{service.icon}</div>
                  <h3 className="font-semibold text-[15px] text-slate-800 mb-1">{service.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="principles" className="py-24 px-6 bg-slate-50 scroll-mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-4xl font-black text-slate-900 mb-4">근거 → 실행 → 축적</div>
            <p className="text-slate-600 text-xl mb-12">맥거핀 마케팅이 프로젝트를 진행하는 방식</p>
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-100">
              <div className="flex gap-2 justify-center mb-5 text-blue-500"><span>◆</span><span>◆</span><span>◆</span></div>
              <p className="text-xl sm:text-2xl text-slate-900 font-light leading-relaxed mb-7">“그럴듯한 수치나 확인되지 않은 성공담 대신, 지금 확인할 수 있는 검색 데이터와 고객 반응을 바탕으로 다음 실행을 정합니다.”</p>
              <div className="flex items-center justify-center gap-3"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">M</div><div className="text-left"><p className="font-bold text-slate-900">맥거핀 마케팅</p><p className="text-sm text-slate-500">Working Principles</p></div></div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 scroll-mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">지금 막힌 지점부터 시작합니다.</h2>
            <p className="text-blue-100 text-lg sm:text-xl mb-8">정리된 기획서가 없어도 괜찮습니다. 먼저 살펴볼 문제부터 명확하게 정리해 드립니다.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setInquiryOpen(true)} className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:shadow-xl transition-shadow">상담 시작하기 →</button>
              <a href="#services" className="px-8 py-4 rounded-xl border-2 border-white/40 text-white font-bold hover:bg-white/10 transition-colors">서비스 다시 보기</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">M</div><span className="font-bold text-white">맥거핀 마케팅</span></a>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-slate-500"><a href="#services" className="hover:text-white transition-colors">서비스</a><a href="#process" className="hover:text-white transition-colors">진행 방식</a><a href="#principles" className="hover:text-white transition-colors">마케팅 원칙</a><button onClick={() => setInquiryOpen(true)} className="hover:text-white transition-colors">문의</button></div>
          <p className="text-slate-600 text-sm">© 2026 MacGuffin Marketing</p>
        </div>
      </footer>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}

