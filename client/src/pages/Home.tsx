import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent } from "react";

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

const keywordNodeClass =
  "absolute cursor-default select-none whitespace-nowrap px-2 py-1 text-slate-500 transition-[transform,color] duration-200 ease-out will-change-transform hover:z-30 hover:text-slate-800";

const keywordConnections = [
  ["brand", "consumer"], ["brand", "intent"], ["brand", "analysis"],
  ["brand", "choice"], ["brand", "conversion"], ["brand", "marketing"],
  ["brand", "funnel"], ["consumer", "beauty"], ["consumer", "traffic"],
  ["intent", "hospital"], ["intent", "nudge"], ["analysis", "b2b"],
  ["choice", "restaurant"], ["conversion", "organic"], ["marketing", "revenue"],
] as const;

function updateKeywordConnections(area: HTMLDivElement) {
  const areaRect = area.getBoundingClientRect();
  if (!areaRect.width || !areaRect.height) return;

  area.querySelectorAll<SVGLineElement>("[data-keyword-line]").forEach((line) => {
    const fromId = line.dataset.from;
    const toId = line.dataset.to;
    if (!fromId || !toId) return;

    const from = area.querySelector<HTMLElement>(`[data-keyword-id="${fromId}"]`);
    const to = area.querySelector<HTMLElement>(`[data-keyword-id="${toId}"]`);
    if (!from || !to) return;

    const fromRect = from.getBoundingClientRect();
    const toRect = to.getBoundingClientRect();
    const x1 = ((fromRect.left + fromRect.width / 2 - areaRect.left) / areaRect.width) * 100;
    const y1 = ((fromRect.top + fromRect.height / 2 - areaRect.top) / areaRect.height) * 100;
    const x2 = ((toRect.left + toRect.width / 2 - areaRect.left) / areaRect.width) * 100;
    const y2 = ((toRect.top + toRect.height / 2 - areaRect.top) / areaRect.height) * 100;

    line.setAttribute("x1", x1.toFixed(2));
    line.setAttribute("y1", y1.toFixed(2));
    line.setAttribute("x2", x2.toFixed(2));
    line.setAttribute("y2", y2.toFixed(2));
  });
}

function InteractiveKeywordHero() {
  const areaRef = useRef<HTMLDivElement>(null);
  const connectionFrameRef = useRef<number | null>(null);

  const animateConnections = (area: HTMLDivElement) => {
    if (connectionFrameRef.current !== null) cancelAnimationFrame(connectionFrameRef.current);
    const startedAt = performance.now();

    const followNodes = (now: number) => {
      updateKeywordConnections(area);
      if (now - startedAt < 260) {
        connectionFrameRef.current = requestAnimationFrame(followNodes);
      } else {
        connectionFrameRef.current = null;
      }
    };

    connectionFrameRef.current = requestAnimationFrame(followNodes);
  };

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return undefined;

    const update = () => updateKeywordConnections(area);
    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      if (connectionFrameRef.current !== null) cancelAnimationFrame(connectionFrameRef.current);
    };
  }, []);

  const moveKeywords = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const area = event.currentTarget;
    const areaRect = area.getBoundingClientRect();
    const pointerX = event.clientX - areaRect.left;
    const pointerY = event.clientY - areaRect.top;

    area.querySelectorAll<HTMLElement>("[data-keyword-node]").forEach((node) => {
      const centerX = node.offsetLeft + node.offsetWidth / 2;
      const centerY = node.offsetTop + node.offsetHeight / 2;
      const deltaX = centerX - pointerX;
      const deltaY = centerY - pointerY;
      const distance = Math.hypot(deltaX, deltaY);
      const radius = 170;

      if (distance < radius) {
        const force = (radius - distance) / radius;
        const safeDistance = Math.max(distance, 1);
        const translateX = (deltaX / safeDistance) * force * 18;
        const translateY = (deltaY / safeDistance) * force * 18;
        const scale = 1 + force * 0.14;
        node.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      } else {
        node.style.transform = "translate3d(0, 0, 0) scale(1)";
      }
    });
    animateConnections(area);
  };

  const resetKeywords = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.querySelectorAll<HTMLElement>("[data-keyword-node]").forEach((node) => {
      node.style.transform = "translate3d(0, 0, 0) scale(1)";
    });
    animateConnections(event.currentTarget);
  };

  return (
    <div
      ref={areaRef}
      className="relative mx-auto h-[420px] w-full max-w-5xl overflow-visible bg-transparent sm:h-[480px] md:h-[520px]"
      onPointerMove={moveKeywords}
      onPointerLeave={resetKeywords}
      aria-describedby="keyword-graphic-description"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="rgb(148 163 184)" strokeWidth="0.12" opacity="0.5">
          {keywordConnections.map(([from, to]) => (
            <line key={`${from}-${to}`} data-keyword-line data-from={from} data-to={to} />
          ))}
        </g>
      </svg>

      <h1 aria-label="맥거핀마케팅 소비자 행동 고객 의도 분석 선택 전환 마케팅" className="absolute inset-0 m-0 text-slate-900">
        <span data-keyword-node data-keyword-id="brand" className={`${keywordNodeClass} left-[39%] top-[34%] z-20 text-xl font-black sm:text-3xl md:text-4xl`}>맥거핀마케팅</span>
        <span data-keyword-node data-keyword-id="consumer" className={`${keywordNodeClass} left-[5%] top-[27%] text-xl font-black sm:left-[8%] sm:text-3xl md:text-4xl`}>소비자 행동</span>
        <span data-keyword-node data-keyword-id="intent" className={`${keywordNodeClass} left-[61%] top-[20%] text-lg font-bold sm:text-2xl md:text-3xl`}>고객 의도</span>
        <span data-keyword-node data-keyword-id="analysis" className={`${keywordNodeClass} left-[16%] top-[55%] text-lg font-bold sm:left-[20%] sm:text-2xl md:text-3xl`}>분석</span>
        <span data-keyword-node data-keyword-id="choice" className={`${keywordNodeClass} left-[70%] top-[51%] text-xl font-black sm:text-3xl md:text-4xl`}>선택</span>
        <span data-keyword-node data-keyword-id="conversion" className={`${keywordNodeClass} left-[51%] top-[68%] text-lg font-bold sm:text-2xl md:text-3xl`}>전환</span>
        <span data-keyword-node data-keyword-id="marketing" className={`${keywordNodeClass} left-[27%] top-[73%] text-lg font-bold sm:text-2xl md:text-3xl`}>마케팅</span>
      </h1>

      <h2 aria-label="뷰티 병원 음식점 B2B 퍼널 넛지 트래픽 오가닉 매출" className="absolute inset-0 m-0 text-slate-500">
        <span data-keyword-node data-keyword-id="beauty" className={`${keywordNodeClass} left-[3%] top-[10%] text-sm font-semibold sm:text-base`}>뷰티</span>
        <span data-keyword-node data-keyword-id="hospital" className={`${keywordNodeClass} left-[80%] top-[10%] text-sm font-semibold sm:text-base`}>병원</span>
        <span data-keyword-node data-keyword-id="restaurant" className={`${keywordNodeClass} left-[76%] top-[78%] text-sm font-semibold sm:text-base`}>음식점</span>
        <span data-keyword-node data-keyword-id="b2b" className={`${keywordNodeClass} left-[5%] top-[80%] text-sm font-semibold sm:text-base`}>B2B</span>
        <span data-keyword-node data-keyword-id="funnel" className={`${keywordNodeClass} left-[46%] top-[7%] text-sm font-semibold sm:text-base`}>퍼널</span>
        <span data-keyword-node data-keyword-id="nudge" className={`${keywordNodeClass} left-[83%] top-[43%] text-sm font-semibold sm:text-base`}>넛지</span>
        <span data-keyword-node data-keyword-id="traffic" className={`${keywordNodeClass} left-[4%] top-[45%] text-sm font-semibold sm:text-base`}>트래픽</span>
        <span data-keyword-node data-keyword-id="organic" className={`${keywordNodeClass} left-[61%] top-[85%] text-sm font-semibold sm:text-base`}>오가닉</span>
        <span data-keyword-node data-keyword-id="revenue" className={`${keywordNodeClass} left-[45%] top-[53%] text-sm font-semibold sm:text-base`}>매출</span>
      </h2>

      <p id="keyword-graphic-description" className="absolute -bottom-8 left-1/2 w-full -translate-x-1/2 px-6 text-center text-xs font-medium tracking-[0.2em] text-slate-400 sm:text-sm">
        소비자의 행동을 분석하고 고객의 선택을 이끌어냅니다
      </p>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("");

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const website = String(data.get("website") ?? "");
    const message = String(data.get("message") ?? "");
    const summary = [
      `[상호명] ${company}`,
      `[이메일] ${email}`,
      `[연락처] ${phone}`,
      `[웹페이지 주소] ${website || "없음"}`,
      "",
      "[문의 내용]",
      message,
    ].join("\n");
    const recipient = import.meta.env.VITE_CONTACT_EMAIL?.trim();

    if (recipient) {
      const subject = encodeURIComponent(`[맥거핀 마케팅 문의] ${company}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(summary)}`;
      setStatus("이메일 작성창을 열었습니다. 내용을 확인한 뒤 전송해주세요.");
      return;
    }

    try {
      await navigator.clipboard.writeText(summary);
      setStatus("문의 내용이 복사되었습니다. 카카오톡 창에 붙여넣어 보내주세요.");
    } catch {
      setStatus("카카오톡 창에서 작성한 내용을 보내주세요.");
    }
    window.open("https://open.kakao.com/o/sHRnFKNi", "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2" aria-label="맥거핀 마케팅 홈">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">M</span>
            <span className="font-black">맥거핀 마케팅</span>
          </a>
          <a href="/" className="text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900">홈으로 돌아가기</a>
        </div>
      </header>

      <main className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-blue-600">Project inquiry</p>
            <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl">프로젝트 문의</h1>
            <p className="mx-auto max-w-xl leading-relaxed text-slate-500">현재 고민하고 있는 문제와 목표를 알려주세요. 내용을 확인한 뒤 연락드리겠습니다.</p>
          </div>

          <form onSubmit={submitInquiry} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="text-sm font-bold text-slate-700">
                상호명 <span className="text-red-500">*</span>
                <input name="company" required className={inputClass} placeholder="회사 또는 브랜드명을 입력해주세요" />
              </label>
              <label className="text-sm font-bold text-slate-700">
                Email <span className="text-red-500">*</span>
                <input name="email" type="email" required className={inputClass} placeholder="reply@example.com" />
              </label>
              <label className="text-sm font-bold text-slate-700">
                연락처 <span className="text-red-500">*</span>
                <input name="phone" type="tel" required className={inputClass} placeholder="010-0000-0000" />
              </label>
              <label className="text-sm font-bold text-slate-700">
                웹페이지 주소
                <input name="website" type="url" className={inputClass} placeholder="https://example.com" />
              </label>
            </div>

            <label className="mt-6 block text-sm font-bold text-slate-700">
              문의 내용 <span className="text-red-500">*</span>
              <textarea
                name="message"
                required
                rows={8}
                className={`${inputClass} resize-y`}
                placeholder={"목표 키워드 및 요청사항을 입력해주세요. 현재 운영 중인 채널, 해결하고 싶은 문제, 원하는 목표를 함께 적어주시면 더 정확하게 확인할 수 있습니다.\n\n해당 내용은 복사되니 문의 보내기를 누른 후 채팅방에서 붙여넣기를 해주세요. 감사합니다."}
              />
            </label>

            <div className="mt-7 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs leading-relaxed text-slate-400">입력한 정보는 문의 확인과 회신 목적으로만 사용됩니다.</p>
              <button type="submit" className="shrink-0 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition-colors hover:bg-blue-700">문의 보내기 →</button>
            </div>
            {status && <p role="status" className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">{status}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const isEnglishPage = typeof window !== "undefined" && /^\/en(?:\/|$)/.test(window.location.pathname);
  const isContactPage = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("page") === "contact";

  if (isContactPage) return <ContactPage />;

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="mx-auto h-16 max-w-none px-4 flex items-center justify-between sm:px-6">
          <a href="#top" className="flex items-center gap-2" aria-label="맥거핀 마케팅 홈">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-sm">M</div>
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
            <a href="https://blog.naver.com/sorekara_" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Blog</a>
            <a href="/qna" className="hover:text-slate-900 transition-colors">QNA</a>
            <a
              href={isEnglishPage ? "/" : "/en"}
              className="hover:text-slate-900 transition-colors"
              aria-label={isEnglishPage ? "한국어 페이지로 이동" : "영문 페이지로 이동"}
            >
              {isEnglishPage ? "KOR" : "ENG"}
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="py-24 sm:py-28 md:py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative mb-20">
              <InteractiveKeywordHero />
              <a
                href="/?page=contact"
                className="fixed bottom-6 right-6 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-lg shadow-red-200 transition-all hover:scale-105 hover:bg-red-600 md:bottom-auto md:top-1/2 md:h-24 md:w-24 md:-translate-y-1/2 md:text-base"
                aria-label="문의 페이지로 이동"
              >
                문의
              </a>
            </div>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              네이버·구글 상위노출 | SEO 검색 엔진 최적화 | 소비자의 검색 의도를 분석합니다. 검색 노출
              <br />
              부터 클릭, 문의 전환까지 | 최소 비용으로 광고 효율 극대화
            </p>
            <a href="/?page=contact" className="inline-block px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors shadow-lg shadow-blue-200">내 브랜드 흐름 진단하기 →</a>
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
              <div className="flex items-center justify-center gap-3"><div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-white font-bold">M</div><div className="text-left"><p className="font-bold text-slate-900">맥거핀 마케팅</p><p className="text-sm text-slate-500">Working Principles</p></div></div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 bg-orange-500 scroll-mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">SEO 검색엔진 최적화, 지금 확인하세요</h2>
            <p className="text-orange-100 text-lg sm:text-xl mb-8"><br /></p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/?page=contact" className="px-8 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg hover:shadow-xl transition-shadow">문의하기 →</a>
              <a href="#services" className="px-8 py-4 rounded-xl border-2 border-white/40 text-white font-bold hover:bg-white/10 transition-colors">사이트 무료 진단</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="min-h-[22rem] bg-slate-900 px-6 py-24">
        <div className="max-w-7xl mx-auto min-h-[10rem] flex flex-col justify-between gap-14">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-black text-white">M</div>
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



