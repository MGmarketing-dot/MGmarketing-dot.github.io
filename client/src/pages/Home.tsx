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
  { label: "Search Intent", value: "발견", delta: "키워드", bar: 88, color: "bg-blue-500" },
  { label: "Content Signal", value: "관심", delta: "메시지", bar: 75, color: "bg-orange-500" },
  { label: "Conversion Flow", value: "선택", delta: "CTA", bar: 85, color: "bg-red-500" },
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
    title: "클릭 되는 콘텐츠",
    description: "고객님의 소중한 콘텐츠가 발견되도록 최적의 키워드를 구성합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    color: "#ef4444",
    bg: "#fef2f2",
    title: "선택되는 서비스",
    description: "콘텐츠에서 문의까지 다음 행동을 자연스럽게 설계합니다.",
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
    description: "유입 데이터를 분석하여 매출과 성과를 관리하고 개선합니다.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="10" width="4" height="10" rx="1" /><rect x="10" y="6" width="4" height="14" rx="1" /><rect x="17" y="2" width="4" height="18" rx="1" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2" aria-label="맥거핀 마케팅 홈">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">M</div>
            <span className="font-black text-slate-900 text-lg">맥거핀 마케팅</span>
          </a>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <a href="#top" className="hover:text-slate-900 transition-colors">About</a>
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 py-5 hover:text-slate-900 transition-colors"
                aria-haspopup="true"
              >
                Service
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-36 -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <a href="/service/google-seo" className="block rounded-lg px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600">구글 SEO</a>
                <a href="/service/naver-seo" className="block rounded-lg px-4 py-3 text-left text-sm text-slate-700 hover:bg-green-50 hover:text-green-600">네이버 SEO</a>
              </div>
            </div>
            <a href="/blog" className="hover:text-slate-900 transition-colors">Blog</a>
            <a href="/qna" className="hover:text-slate-900 transition-colors">QnA</a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="py-24 sm:py-28 md:py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-50" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" /></span>
              SEO 기반 
            </div>
            <div className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 leading-[1.08] mb-6" style={{ letterSpacing: "-0.055em" }}>
              소비자의 행동을 분석하고
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">고객의 선택을</span>
              <br />
              이끌어냅니다
            </h1>
              <a
                href="/contact"
                className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-lg shadow-red-200 transition-all hover:-translate-y-1 hover:bg-red-600 md:absolute md:right-0 md:top-0 md:mt-0 md:h-24 md:w-24 md:text-base"
                aria-label="문의 페이지로 이동"
              >
                문의
              </a>
            </div>
            <h2 className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              네이버·구글 상위노출 | SEO 검색 엔진 최적화 |소비자의 검색 의도를 분석합니다.
              검색 노출부터 클릭, 문의 전환까지 | 최소 비용으로 광고 효율 극대화|
            </h2>
            <a href="/contact" className="inline-block px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors shadow-lg shadow-blue-200">내 브랜드 흐름 진단하기 →</a>
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
                <h2 className="text-4xl font-black text-slate-900 mb-6">상위 노출부터 <br />선택까지 이어지는 흐름</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">SEO, 고객이 브랜드를 발견하는 것부터 클릭, 문의하는 과정을 하나로 연결합니다.</p>
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
            <div className="text-4xl font-black text-slate-900 mb-4">분석 → 실행 → 매출 전환</div>
            <h2 className="text-slate-600 text-xl mb-12">맥거핀 마케팅 | 검색 엔진 최적화 전략</h2>
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-100">
              <div className="flex gap-2 justify-center mb-5 text-blue-500"><span>◆</span><span>◆</span><span>◆</span></div>
              <p className="text-xl sm:text-2xl text-slate-900 font-light leading-relaxed mb-7">“확인할 수 있는 검색 데이터와 소비자 의도를 바탕으로 전환을 설계합니다.”</p>
              <div className="flex items-center justify-center gap-3"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">M</div><div className="text-left"><p className="font-bold text-slate-900">맥거핀 마케팅</p><p className="text-sm text-slate-500">Working Principles</p></div></div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 scroll-mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">팔리는 제품은 우연이 아닌 설계입니다.</h2>
            <p className="text-blue-100 text-lg sm:text-xl mb-8"><br /></p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:shadow-xl transition-shadow">문의하기 →</a>
              <a href="#services" className="px-8 py-4 rounded-xl border-2 border-white/40 text-white font-bold hover:bg-white/10 transition-colors">사이트 무료 진단</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="min-h-[22rem] bg-slate-900 px-6 py-24">
        <div className="max-w-7xl mx-auto min-h-[10rem] flex flex-col justify-between gap-14">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-black text-white">M</div>
              <span className="text-lg font-bold text-white">맥거핀 마케팅</span>
            </a>

            <div className="md:text-right">
              <p className="mb-5 text-xl font-bold text-white sm:text-2xl">팔리는 제품은 우연이 아닌 설계입니다.</p>
              <div className="flex items-center gap-3 md:justify-end">
                <a href="#" aria-label="인스타그램" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                </a>
                <a href="#" aria-label="페이스북" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.6 22v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V14h2.8v8h3.4Z" /></svg>
                </a>
                <a href="#" aria-label="카카오톡" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C6.5 3 2 6.5 2 10.8c0 2.8 1.9 5.2 4.7 6.6L5.5 22l5.1-3.4c.5.1.9.1 1.4.1 5.5 0 10-3.5 10-7.9S17.5 3 12 3Z" /></svg>
                </a>
                <a href="#" aria-label="텔레그램" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-white hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m21.5 3.4-3.1 16.2c-.2 1.1-.9 1.4-1.8.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20 3.3c.9-.3 1.7.2 1.5 1.1Z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-800 pt-6">
            <p className="text-sm text-slate-500">© 2026 MacGuffin Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
}

