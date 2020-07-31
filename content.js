window.onload = function () {
  showClipboard();
};

const done = new Set();

function showClipboard() {
  try {
    const paths = window.location.pathname.split("/");
    if (paths.length < 3) {
      return;
    }
    const commitPathPrefix = `${paths.slice(0, 3).join("/")}/`;

    for (const node of document.querySelectorAll(
      `a[href*="${commitPathPrefix}"]`
    )) {
      // Skip if clipboard already appeared.
      if (node.nextSibling && node.nextSibling.tagName == 'CLIPBOARD-COPY') {
        continue;
      }
      const text = node.text;
      const aPathname = new URL(node.href).pathname;
      if (
        !(aPathname.includes("/commit/") || aPathname.includes("/commits/"))
      ) {
        continue;
      }
      const aPaths = aPathname.split("/");
      const lastPath = aPaths[aPaths.length - 1];
      if (!lastPath.startsWith(text)) {
        continue;
      }
      if (done.has(node)) {
        continue;
      }
      done.add(node);
      const div = document.createElement("div");
      const innerHtml = `<clipboard-copy class="js-clipboard-copy zeroclipboard-link text-gray link-hover-blue" value="${text}" aria-label="Copy" data-copy-feedback="Copied!" tabindex="0" role="button"><svg class="octicon octicon-clippy d-inline-block mx-1 js-clipboard-clippy-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg><svg class="octicon octicon-check js-clipboard-check-icon mx-1 d-inline-block text-green d-none" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg></clipboard-copy>`;
      div.innerHTML = innerHtml.trim();
      node.parentNode.insertBefore(div.firstChild, node.nextSibling);
    }
  } catch (_) { }

  // check for lazy load
  setTimeout(function () {
    showClipboard();
  }, 1000);
}
