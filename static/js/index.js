const scrollButton = document.querySelector(".scroll-to-top");
const copyButton = document.querySelector(".copy-bibtex-btn");
const bibtexCode = document.querySelector("#bibtex-code");

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    try {
      await navigator.clipboard.writeText(citation);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = citation;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    copyButton.classList.add("copied");
    copyText.textContent = "Copied";
    window.setTimeout(() => {
      copyButton.classList.remove("copied");
      copyText.textContent = originalText;
    }, 1600);
  });
}
