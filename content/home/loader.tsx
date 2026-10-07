const letters = "DEVALENTINE".split("");

export const Loader = () => (
  <div aria-hidden="true" className="noema-loader" id="noemaLoader">
    <div className="loader-grid"></div>
    <div className="loader-mark">
      <svg aria-hidden="true" fill="none" viewBox="0 0 42 18">
        <path
          d="M3 9C8 1.8 14 1.8 21 9C28 16.2 34 16.2 39 9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        ></path>
        <path
          d="M3 9C8 16.2 14 16.2 21 9C28 1.8 34 1.8 39 9"
          opacity="0.55"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        ></path>
      </svg>
    </div>
    <div className="loader-brand">
      <div aria-label="DEVALENTINE." className="loader-brand-main">
        {letters.map((letter, index) => (
          <span className="loader-letter" key={index}>
            {letter}
          </span>
        ))}
        <span className="loader-letter loader-dot">.</span>
      </div>
      <div className="loader-tag">Websites and apps that work</div>
    </div>
    <div className="loader-meta">
      <span>Hello, I&apos;m Valentine</span>
      <span>One moment</span>
    </div>
    <div className="loader-strips">
      <span className="loader-strip"></span>
      <span className="loader-strip"></span>
      <span className="loader-strip"></span>
      <span className="loader-strip"></span>
      <span className="loader-strip"></span>
      <span className="loader-strip"></span>
      <span className="loader-strip"></span>
    </div>
    <div className="loader-scanline"></div>
  </div>
);
