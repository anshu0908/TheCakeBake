import { site } from "@/config/site";

/*
 * First-visit loader. Plain inline JS, not a React component: it has to be on screen before React's
 * bundle has downloaded, and it must track the page's own loading (readyState, eager images, fonts,
 * window load). It builds the overlay itself, so React never hydrates or patches it, and without
 * JavaScript nothing is shown. One SVG path morphs (SMIL, so Safari too) through six shapes with
 * the same point count: cake top, cake box, slice, heart, star, frosting. When loading is done it
 * stops on the circle, grows the logo's cherry stem, then slides up. Shown once per browser session.
 * Styles live in app/globals.css under "Loader"; every colour, font and curve comes from tokens.
 */
const code = `(function () {
  try { if (sessionStorage.getItem("cb-loaded")) return; } catch (e) {}
  var d = document, root = d.documentElement, css = getComputedStyle(root);
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var N = 120, R = 80, T = 2.7, STEP = T / 6, HOLD = 0.12; // seconds: full loop, one shape, its pause
  function at(a, r) { return [r * Math.cos(a), r * Math.sin(a)]; }
  function polar(f) { var p = []; for (var i = 0; i < N; i++) { var a = -Math.PI / 2 + i * 2 * Math.PI / N; p.push(at(a, f(a))); } return p; }
  function poly(v, dy) { var p = [], k = N / v.length; for (var i = 0; i < v.length; i++) { var a = v[i], b = v[(i + 1) % v.length];
    for (var j = 0; j < k; j++) p.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k + dy]); } return p; }
  function ring(n, r0, r1) { var v = []; for (var i = 0; i < n; i++) v.push(at(-Math.PI / 2 + i * 2 * Math.PI / n, i % 2 ? r1 : r0)); return v; }
  function heart() { var p = []; for (var i = 0; i < N; i++) { var t = i * 2 * Math.PI / N;
    p.push([73 * Math.pow(Math.sin(t), 3), -4.6 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) - 12]); } return p; }
  function path(p) { return "M" + p.map(function (q) { return q[0].toFixed(1) + " " + q[1].toFixed(1); }).join("L") + "Z"; }
  // All six start at twelve o'clock and run clockwise, so each point has a partner in the next shape.
  var shapes = [
    polar(function () { return R; }),
    polar(function (a) { return 0.9 * R / Math.pow(Math.pow(Math.abs(Math.cos(a)), 4) + Math.pow(Math.abs(Math.sin(a)), 4), 0.25); }),
    poly(ring(3, 1.12 * R, 1.12 * R), 18),
    heart(),
    poly(ring(10, 1.05 * R, 0.45 * R), 6),
    polar(function (a) { return R * (0.88 + 0.12 * Math.cos(8 * (a + Math.PI / 2))); })
  ].map(path);
  function tok(n) { return "rgb(" + css.getPropertyValue("--rgb-" + n).trim().split(/\\s+/).join(",") + ")"; }
  var fills = ["blush", "cream", "blush-200", "blush-600", "cream", "blush-200"].map(tok);
  var ease = (css.getPropertyValue("--ease-in-out").match(/[\\d.]+/g) || [0.65, 0, 0.35, 1]).join(" ");
  var dv = [], fv = [], kt = [], ks = [];
  for (var k = 0; k < 6; k++) { dv.push(shapes[k], shapes[k]); fv.push(fills[k], fills[k]); kt.push(k * STEP / T, (k * STEP + HOLD) / T); ks.push("0 0 1 1", ease); }
  dv.push(shapes[0]); fv.push(fills[0]); kt.push(1);
  function anim(attr, values) { return '<animate attributeName="' + attr + '" dur="' + T + 's" repeatCount="indefinite" calcMode="spline" values="' + values.join(";") +
    '" keyTimes="' + kt.map(function (x) { return x.toFixed(4); }).join(";") + '" keySplines="' + ks.join(";") + '"/>'; }

  var el = d.createElement("div");
  el.className = "cb-loader";
  el.setAttribute("role", "progressbar"); el.setAttribute("aria-label", "Loading " + ${JSON.stringify(site.name)});
  el.setAttribute("aria-valuemin", "0"); el.setAttribute("aria-valuemax", "100"); el.setAttribute("aria-valuenow", "0");
  el.setAttribute("data-lenis-prevent", "");
  el.innerHTML = '<div class="cb-stack"><p class="cb-name">' + ${JSON.stringify(site.name)} + '</p>' +
    '<svg class="cb-shape" viewBox="-110 -135 220 245" aria-hidden="true"><path class="cb-body" fill="' + fills[0] + '" d="' + shapes[0] + '">' + anim("d", dv) + anim("fill", fv) + '</path>' +
    '<path class="cb-stem" pathLength="1" d="M0 -78C4 -100 14 -112 32 -122"/><path class="cb-leaf" pathLength="1" d="M24 -117C34 -131 52 -130 60 -119C47 -110 33 -110 24 -117Z"/></svg>' +
    '<p class="cb-count" aria-hidden="true">0%</p><div class="cb-bar"><i></i></div></div>';
  d.body.appendChild(el);
  root.classList.add("cb-loading");

  var svg = el.querySelector("svg"), count = el.querySelector(".cb-count"), bar = el.querySelector(".cb-bar i");
  var start = performance.now(), shown = 0, fonts = !d.fonts, loaded = false;
  if (reduce) svg.pauseAnimations();
  if (d.fonts) d.fonts.ready.then(function () { fonts = true; });
  addEventListener("load", function () { loaded = true; });
  setTimeout(function () { fonts = loaded = true; }, 8000); // never trap the visitor behind a stuck request

  function real() { // share of the page that has actually arrived
    var imgs = d.querySelectorAll('img:not([loading="lazy"])'), n = 0;
    for (var i = 0; i < imgs.length; i++) if (imgs[i].complete) n++;
    var steps = [d.readyState !== "loading", d.readyState === "complete", fonts, loaded];
    return 100 * (steps.filter(Boolean).length + n) / (steps.length + imgs.length);
  }
  function show(v) { count.textContent = Math.round(v) + "%"; el.setAttribute("aria-valuenow", Math.round(v)); bar.style.transform = "scaleX(" + v / 100 + ")"; }
  function frame(now) {
    // The count can't outrun one loop of shapes; it lands just before the loop returns to the circle.
    var done = loaded && fonts, floor = Math.min(100, (now - start) / ((T - 0.2) * 1000) * 100);
    var target = Math.min(floor, done ? 100 : Math.min(92, real()));
    shown += (target - shown) * 0.12;
    if (done && floor >= 100) return settle();
    show(shown); requestAnimationFrame(frame);
  }
  function settle() { // finish on the circle (the start of a loop), then grow the cherry's stem
    show(100);
    var phase = reduce ? 0 : svg.getCurrentTime() % T, wait = phase < HOLD ? 0 : T - phase + HOLD / 2; // already resting on the circle, or the next time it is
    setTimeout(function () {
      svg.pauseAnimations();
      if (!reduce) svg.setCurrentTime(Math.round(svg.getCurrentTime() / T) * T + HOLD / 2);
      el.classList.add("is-cherry");
      setTimeout(function () {
        el.classList.add("is-out"); root.classList.remove("cb-loading");
        try { sessionStorage.setItem("cb-loaded", "1"); } catch (e) {}
        setTimeout(function () { el.remove(); }, 900);
      }, 650);
    }, wait * 1000);
  }
  requestAnimationFrame(frame);
})();`;

export default function Preloader() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
