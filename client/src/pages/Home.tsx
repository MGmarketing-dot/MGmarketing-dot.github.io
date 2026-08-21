/**
 * Design reminder — Indexing Field Notes: Swiss editorial structure, parchment space,
 * deep-ink reading color, and Index Teal (#0B8275) only as a precise signal.
 */
import { Check, ChevronDown, Copy, ExternalLink, FileText, Globe2, Menu, Network, Search, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const siteChecks = [
  { label: "문서 제목", detail: "페이지별 title을 구분해 작성", status: "ready" },
  { label: "설명 메타태그", detail: "검색 결과용 요약 문장 포함", status: "ready" },
  { label: "robots.txt", detail: "크롤링 정책과 사이트맵 경로 제공", status: "ready" },
  { label: "sitemap.xml", detail: "배포 도메인으로 URL만 교체", status: "action" },
];

const documentSections = [
  {
    number: "01",
    label: "PUBLIC SIGNAL",
    title: "공개 신호를 먼저 정리합니다.",
    body: "검색 엔진은 페이지의 제목, 설명, 본문 구조를 바탕으로 문서의 주제를 해석합니다. 이 홈페이지는 각 신호를 구분해 확인할 수 있도록 구성했습니다.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663892807890/XCYOxMEIwPbYlvev.jpg",
    alt: "문서와 신호 경로를 상징하는 청록색 정보 다이어그램",
    list: ["의미 있는 H1·H2 계층", "모바일에서도 유지되는 본문 순서", "명확한 내부 탐색 링크"],
  },
  {
    number: "02",
    label: "DOCUMENT ANATOMY",
    title: "사람과 로봇이 같은 문서를 읽습니다.",
    body: "눈에 보이는 문장만큼 HTML의 구조도 중요합니다. 헤딩, 링크, 이미지 대체 텍스트가 각자의 역할을 갖도록 작성해 수집 결과를 확인하기 좋게 만들었습니다.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663892807890/nlOkFHOhCUdQTpXh.jpg",
    alt: "문서 구조를 상징하는 크림색 인덱스 카드와 청록 탭",
    list: ["본문 맥락을 가진 링크 문구", "이미지별 대체 텍스트", "읽기 쉬운 정보 계층"],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [host, setHost] = useState("your-domain.example");

  useEffect(() => {
    setHost(window.location.host || "your-domain.example");
  }, []);

  const copyAddress = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f1e8] text-[#17211e]">
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>

      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="웹마스터 테스트 사이트 첫 화면">
            <span className="brand-mark-frame"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663892807890/ilmzXudRuBAqRqmA.png" alt="" className="brand-mark" /></span>
            <span className="brand-wordmark"><small>PERSONAL HOSTING / 01</small><strong>웹마스터 테스트 사이트</strong></span>
          </a>
          <nav className="desktop-nav" aria-label="주요 탐색">
            <a href="#signals">공개 신호</a>
            <a href="#checklist">검증 목록</a>
            <a href="#guide">등록 가이드</a>
          </nav>
          <div className="header-ledger"><span className="header-coordinate">DOC / SEO–01</span><a className="header-status" href="#checklist"><span /> INDEX READY</a></div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기" aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="모바일 탐색">
            <a onClick={() => setMenuOpen(false)} href="#signals">공개 신호</a>
            <a onClick={() => setMenuOpen(false)} href="#checklist">검증 목록</a>
            <a onClick={() => setMenuOpen(false)} href="#guide">등록 가이드</a>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-rail" aria-hidden="true">
            <span>FIELD NOTE</span>
            <i />
            <span>2026 / 08</span>
          </div>
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="signal-dot" /> PERSONAL HOSTING / SEO CHECK</p>
            <h1>검색 로봇이<br /><em>읽을 수 있는</em><br />개인 홈페이지.</h1>
            <p className="hero-description">네이버 웹마스터 도구 테스트를 위해 만든 개인 호스팅용 정적 홈페이지입니다. 수집, 색인, 메타데이터, 문서 구조를 한 곳에서 차분하게 점검합니다.</p>
            <div className="hero-actions">
              <a className="ink-button" href="#guide">등록 전 구조 점검 <ChevronDown size={16} /></a>
              <button className="text-button" onClick={copyAddress}>{copied ? <><Check size={16} /> 주소 복사됨</> : <><Copy size={16} /> 페이지 주소 복사</>}</button>
            </div>
          </div>
          <div className="hero-art reveal" style={{ animationDelay: "90ms" }}>
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663892807890/wVvMwpYCZpsGRtHr.jpg" alt="검색 색인용 문서와 크롤링 경로를 표현한 편집 이미지" />
            <div className="art-caption"><span>CRAWL PATH</span><span>01—03</span></div>
            <div className="location-label"><i /> SITE: {host}</div>
          </div>
          <a href="#signals" className="scroll-cue" aria-label="공개 신호 섹션으로 이동"><span>SCROLL TO READ</span><ChevronDown size={17} /></a>
        </section>

        <section className="signal-section" id="signals">
          <div className="section-rail"><span>01</span><i /><span>READABLE</span></div>
          <div className="section-intro reveal">
            <p className="eyebrow">WHAT A CRAWLER CAN FIND</p>
            <h2>작은 신호들이<br />문서의 맥락을 만듭니다.</h2>
            <p>사이트가 검색에 노출되려면 먼저 접근 가능한 문서여야 합니다. 이 페이지에는 일반적인 개인 호스팅 환경에서 확인하기 좋은 기본 신호를 담았습니다.</p>
          </div>
          <div className="path-map" aria-label="홈페이지에서 sitemap과 robots 파일로 이어지는 구조">
            <div className="map-node current"><Globe2 size={20} /><strong>/</strong><span>Home</span></div>
            <div className="map-line" />
            <div className="map-node"><FileText size={20} /><strong>/robots.txt</strong><span>Policy</span></div>
            <div className="map-line short" />
            <div className="map-node"><Network size={20} /><strong>/sitemap.xml</strong><span>Map</span></div>
          </div>
        </section>

        <section className="document-series">
          {documentSections.map((section, index) => (
            <article className={`document-row ${index % 2 ? "reverse" : ""}`} key={section.number}>
              <div className="doc-image reveal"><img src={section.image} alt={section.alt} /><span>{section.number}</span></div>
              <div className="doc-copy reveal">
                <p className="eyebrow">{section.label}</p>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                <ul>{section.list.map(item => <li key={item}><Check size={15} /> {item}</li>)}</ul>
              </div>
            </article>
          ))}
        </section>

        <section className="check-section" id="checklist">
          <div className="check-title reveal">
            <p className="eyebrow">PRE-FLIGHT CHECK</p>
            <h2>수집 요청 전,<br />기본 구조를 점검하세요.</h2>
            <p>아래 항목은 이 템플릿에 반영된 설정입니다. 실제 도메인을 연결한 뒤 URL과 소유 확인 토큰만 바꾸면 테스트를 시작할 수 있습니다.</p>
          </div>
          <div className="check-list reveal" aria-label="검색 엔진 검증 항목">
            {siteChecks.map((item, index) => (
              <div className="check-item" key={item.label}>
                <span className="check-number">0{index + 1}</span>
                <div><h3>{item.label}</h3><p>{item.detail}</p></div>
                {item.status === "ready" ? <span className="status-ready"><Check size={14} /> 준비됨</span> : <span className="status-action">도메인 변경</span>}
              </div>
            ))}
          </div>
        </section>

        <section className="guide-section" id="guide">
          <div className="guide-head reveal">
            <p className="eyebrow">NAVER SETUP NOTE</p>
            <h2>배포 후에는<br />두 곳만 바꾸면 됩니다.</h2>
          </div>
          <ol className="guide-steps">
            <li className="reveal"><span>1</span><div><h3>실제 도메인을 반영합니다.</h3><p><code>robots.txt</code>와 <code>sitemap.xml</code> 안의 <code>https://example.com</code>을 운영할 도메인으로 교체하세요.</p></div></li>
            <li className="reveal"><span>2</span><div><h3>소유 확인 메타태그를 넣습니다.</h3><p><code>index.html</code>의 <code>YOUR_NAVER_VERIFICATION_TOKEN</code>을 네이버에서 발급받은 값으로 바꾼 뒤 업로드하세요.</p></div></li>
            <li className="reveal"><span>3</span><div><h3>사이트맵을 제출하고 수집을 요청합니다.</h3><p>네이버 서치어드바이저에서 사이트를 등록한 뒤 <code>/sitemap.xml</code> 경로를 제출하면 됩니다.</p></div></li>
          </ol>
          <a className="outline-button" href="https://searchadvisor.naver.com/" target="_blank" rel="noreferrer">서치어드바이저에서 사이트 제출 <ExternalLink size={16} /></a>
        </section>

        <section className="closing-note reveal">
          <Search size={22} />
          <p>이 페이지는 <strong>테스트를 위한 공개 문서</strong>입니다. 실제 서비스 정보나 민감한 개인정보를 넣지 않고도 수집·색인 상태를 확인할 수 있습니다.</p>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="footer-brand"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663892807890/ilmzXudRuBAqRqmA.png" alt="" /> WEBMASTER TEST SITE</a>
        <p>PERSONAL HOSTING · DOCUMENT INDEX CHECK</p>
        <p>© {new Date().getFullYear()} / BUILT FOR DISCOVERABILITY</p>
      </footer>
    </div>
  );
}
