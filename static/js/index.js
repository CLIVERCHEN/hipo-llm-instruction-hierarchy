const scrollButton = document.querySelector(".scroll-to-top");
const copyButton = document.querySelector(".copy-bibtex-btn");
const bibtexCode = document.querySelector("#bibtex-code");

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollButton.classList.toggle("visible", window.scrollY > 420);
  });
}

if (copyButton && bibtexCode) {
  copyButton.addEventListener("click", async () => {
    const copyText = copyButton.querySelector(".copy-text");
    const originalText = copyText.textContent;
    const citation = bibtexCode.textContent.trim();

    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(citation);
      if (status) status.textContent = 'Citation copied.';
    } catch {
      if (status) status.textContent = 'Copy is unavailable. Select the citation below or download the .bib file.';
      return;
    }

    copyButton.classList.add("copied");
    copyText.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.classList.remove("copied");
      copyText.textContent = originalText;
    }, 1600);
  });
}
