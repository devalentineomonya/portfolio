"use client";

/** Lenis owns scrolling, so ask it first and fall back to the browser when it isn't running. */
export const BackToTop = () => (
  <button
    className="site-footer__top"
    type="button"
    onClick={() => {
      const handled = !window.dispatchEvent(
        new CustomEvent("site:scroll-top", { cancelable: true }),
      );
      if (!handled) window.scrollTo({ top: 0 });
    }}
  >
    Back to top
    <span aria-hidden="true">↑</span>
  </button>
);
