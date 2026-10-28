export default function initLanding() {
  const $ = (s, c = document) => c.querySelector(s);

  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const root = document.documentElement;

  const offs = [],
    timers = [],
    obs = [];

  let alive = true,
    rafId = 0;

  const on = (t, e, f, o) => {
    t.addEventListener(e, f, o);
    offs.push(() => t.removeEventListener(e, f, o));
  };

  const later = (f, ms) => {
    timers.push(setTimeout(f, ms));
  };

  const observe = (cb, opt) => {
    const o = new IntersectionObserver(cb, opt);
    obs.push(o);
    return o;
  };

  const STATIC = location.hash === "#estatico";

  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const calm = STATIC || REDUCED;

  const fine = matchMedia("(pointer: fine)").matches;

  root.classList.add("js");

  if (calm) root.classList.add("calm");

  function split(el) {
    if (el.dataset.splitDone) return;

    el.dataset.splitDone = "1";

    let i = 0;

    const walk = (node, gt) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();

          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;

            if (/^\s+$/.test(t)) {
              frag.append(" ");
              return;
            }

            const wd = document.createElement("span");
            wd.className = "wd";

            const wi = document.createElement("span");
            wi.className = "wi" + (gt ? " gt" : "");

            wi.style.setProperty("--i", i++);
            wi.textContent = t;

            wd.append(wi);
            frag.append(wd);
          });

          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          const isGt = n.classList.contains("gt");

          if (isGt) n.classList.remove("gt");

          walk(n, gt || isGt);
        }
      });
    };

    walk(el, false);
  }

  $$("[data-split]").forEach(split);

  const io = observe(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  $$(".rv, [data-split]").forEach((el) =>
    calm ? el.classList.add("in") : io.observe(el),
  );

  function count(el) {
    const to = +el.dataset.count,
      pre = el.dataset.prefix || "",
      suf = el.dataset.suffix || "";

    if (calm) {
      el.textContent = pre + to + suf;
      return;
    }

    const t0 = performance.now(),
      dur = 1600;

    (function f(t) {
      if (!alive) return;

      const p = Math.min(1, (t - t0) / dur),
        e = 1 - Math.pow(1 - p, 3);

      el.textContent = pre + Math.round(to * e) + suf;

      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  const cio = observe(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          count(e.target);
          cio.unobserve(e.target);
        }
      }),
    { threshold: 0.6 },
  );

  $$("[data-count]").forEach((el) => cio.observe(el));

  $$(".mq-track").forEach((t) => {
    if (!t.dataset.dup) {
      t.innerHTML += t.innerHTML;
      t.dataset.dup = "1";
    }
  });

  const typed = $("#typed"),
    caret = $(".caret"),
    rs = $("#rs");

  const seq = (n) =>
    $$(`.seq[data-step="${n}"]`).forEach((e) => e.classList.add("on"));

  const artwork = $(".artwork-wrap");

  const revealArtwork = () => {
    if (!alive || !artwork) return;

    artwork.hidden = false;

    requestAnimationFrame(() => {
      if (alive) seq(2);
    });
  };

  const finish = () => {
    rs.textContent = "Esculpiu por 9 segundos";
    rs.classList.add("done");
    later(revealArtwork, 650);
  };

  typed.textContent = "";
  caret.classList.remove("off");
  rs.textContent = "Esculpindo…";
  rs.classList.remove("done");

  $$(".seq").forEach((e) => e.classList.remove("on"));

  if (artwork) artwork.hidden = true;

  if (calm) {
    typed.textContent = typed.dataset.text;
    caret.classList.add("off");
    seq(1);
    rs.textContent = "Esculpiu por 9 segundos";
    rs.classList.add("done");
    revealArtwork();
  } else {
    const text = typed.dataset.text;
    let i = 0;

    const tick = () => {
      typed.textContent = text.slice(0, ++i);

      if (i < text.length) return later(tick, 26);

      caret.classList.add("off");

      later(() => seq(1), 350);
      later(finish, 2200);
    };

    later(tick, 900);
  }

  const cv = $("#bg"),
    cx = cv.getContext("2d"),
    cur = $("#cursor");

  let W,
    H,
    mx = 0.5,
    my = 0.3,
    tx = 0.5,
    ty = 0.3,
    cX = innerWidth / 2,
    cY = innerHeight / 2,
    tX = cX,
    tY = cY;

  const blobs = [
    ["91,60,245", 0.22, 0.12, 0.55, 0.9, 0],
    ["199,58,104", 0.82, 0.08, 0.45, 1.1, 2],

    ["123,77,255", 0.15, 0.62, 0.5, 0.8, 4],
    ["255,138,76", 0.85, 0.9, 0.42, 1.3, 1],
    ["255,190,85", 0.5, 1.02, 0.28, 0.7, 3],
  ];

  const dots = Array.from({ length: 46 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.4,
    v: Math.random() * 6e-5 + 2e-5,
    a: Math.random() * 6,
  }));

  const size = () => {
    W = cv.width = Math.ceil(innerWidth * 0.5);
    H = cv.height = Math.ceil(innerHeight * 0.5);
  };

  function draw(t) {
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;

    const sp = Math.min(
      1,
      scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight),
    );

    cx.globalCompositeOperation = "source-over";
    cx.fillStyle = "#07060C";
    cx.fillRect(0, 0, W, H);

    cx.globalCompositeOperation = "lighter";

    blobs.forEach(([c, x, y, r, s, p]) => {
      const bx =
        (x + Math.sin(t * 1.2e-4 * s + p) * 0.12 + (mx - 0.5) * 0.07) * W;

      const by =
        (y + Math.cos(t * 1e-4 * s + p) * 0.1 + (my - 0.5) * 0.05 - sp * 0.22) *
        H;

      const g = cx.createRadialGradient(bx, by, 0, bx, by, r * Math.max(W, H));

      g.addColorStop(0, `rgba(${c},.085)`);
      g.addColorStop(1, `rgba(${c},0)`);

      cx.fillStyle = g;
      cx.fillRect(0, 0, W, H);
    });

    cx.globalCompositeOperation = "source-over";

    dots.forEach((d) => {
      d.y -= d.v * 16;
      if (d.y < -0.02) d.y = 1.02;

      cx.fillStyle = `rgba(255,255,255,${0.25 + 0.35 * Math.sin(t * 1e-3 + d.a)})`;

      cx.fillRect(d.x * W, d.y * H, d.r, d.r);
    });

    if (fine) {
      cX += (tX - cX) * 0.12;
      cY += (tY - cY) * 0.12;
      cur.style.transform = `translate(${cX}px,${cY}px)`;
    }
  }

  size();
  on(window, "resize", size);

  if (calm) draw(0);
  else
    (function loop(t) {
      if (!alive) return;
      draw(t);
      rafId = requestAnimationFrame(loop);
    })(0);

  on(
    window,
    "pointermove",
    (e) => {
      tx = e.clientX / innerWidth;
      ty = e.clientY / innerHeight;
      tX = e.clientX;
      tY = e.clientY;

      if (fine && !calm) cur.classList.add("on");
    },
    { passive: true },
  );

  on(document, "pointerleave", () => cur.classList.remove("on"));

  const bar = $(".progress i"),
    nav = $("#nav"),
    grows = $$("[data-grow]"),
    par = $$("[data-speed]");

  const steps = $$(".step"),
    fill = $(".how-fill"),
    howR = $(".how-r");

  let ticking = false;

  function update() {
    ticking = false;

    const vh = innerHeight,
      sy = scrollY,
      max = document.documentElement.scrollHeight - vh;

    bar.style.transform = `scaleX(${max > 0 ? sy / max : 0})`;

    nav.classList.toggle("scrolled", sy > 20);

    if (!calm) {
      grows.forEach((el) => {
        const s0 = +el.dataset.grow,
          r = el.getBoundingClientRect();

        let p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)));

        p = 1 - Math.pow(1 - p, 3);

        el.style.transform = `perspective(1400px) translateY(${(1 - p) * 40}px) rotateX(${(1 - p) * 8}deg) scale(${s0 + (1 - s0) * p})`;

        el.style.opacity = 0.35 + 0.65 * p;
      });

      par.forEach((el) => {
        const r = el.getBoundingClientRect(),
          c = r.top + r.height / 2 - vh / 2;

        el.style.transform = `translate3d(0,${-c * +el.dataset.speed}px,0)`;
      });
    }

    if (steps.length) {
      let best = 0,
        bd = 1e9;

      steps.forEach((s, i) => {
        const r = s.getBoundingClientRect(),
          d = Math.abs(r.top + r.height / 2 - vh / 2);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });

      steps.forEach((s, i) => s.classList.toggle("on", i === best));

      const r = howR.getBoundingClientRect();

      fill.style.transform = `scaleY(${Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height))})`;
    }
  }

  const req = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  on(window, "scroll", req, { passive: true });
  on(window, "resize", req);
  update();

  const links = $$(".lk > a");

  const sio = observe(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting)
          links.forEach((a) =>
            a.classList.toggle(
              "act",
              a.getAttribute("href") === "#" + e.target.id,
            ),
          );
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );

  $$("section[id]").forEach((s) => sio.observe(s));

  $$(".cd").forEach((c) => {
    on(c, "pointermove", (e) => {
      if (e.pointerType === "touch") return;

      const r = c.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;

      c.style.setProperty("--mx", x + "px");
      c.style.setProperty("--my", y + "px");

      if (!calm && c.classList.contains("tilt"))
        c.style.transform = `perspective(800px) rotateX(${(0.5 - y / r.height) * 6}deg) rotateY(${(x / r.width - 0.5) * 6}deg) translateY(-4px)`;
    });

    on(c, "pointerleave", () => {
      c.style.transform = "";
    });
  });

  $$(".mag").forEach((b) => {
    on(b, "pointermove", (e) => {
      if (calm || e.pointerType === "touch") return;

      const r = b.getBoundingClientRect();

      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });

    on(b, "pointerleave", () => {
      b.style.transform = "";
    });
  });

  const stage = $("#stage"),
    win = $("#win");

  on(stage, "pointermove", (e) => {
    if (calm || e.pointerType === "touch") return;

    const r = stage.getBoundingClientRect(),
      dx = (e.clientX - r.left) / r.width - 0.5,
      dy = (e.clientY - r.top) / r.height - 0.5;

    win.style.transform = `rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg)`;
  });

  on(stage, "pointerleave", () => {
    win.style.transform = "";
  });

  const burger = $("#burger"),
    lk = $("#lk");

  const setMenu = (open) => {
    lk.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  on(burger, "click", () => setMenu(!lk.classList.contains("open")));

  $$("#lk a").forEach((a) => on(a, "click", () => setMenu(false)));

  on(window, "keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  const prices = $$("[data-m]");

  function setBilling(year) {
    prices.forEach((el) => {
      const to = +(year ? el.dataset.y : el.dataset.m),
        from = +el.textContent || 0,
        t0 = performance.now();

      if (calm) {
        el.textContent = to;
        return;
      }

      (function f(t) {
        if (!alive) return;

        const p = Math.min(1, (t - t0) / 500),
          e = 1 - Math.pow(1 - p, 3);

        el.textContent = Math.round(from + (to - from) * e);

        if (p < 1) requestAnimationFrame(f);
      })(t0);
    });
  }

  $$(".bill button").forEach((b) =>
    on(b, "click", () => {
      $$(".bill button").forEach((x) => x.classList.toggle("on", x === b));

      setBilling(b.dataset.y === "1");
    }),
  );

  $$(".q").forEach((q) =>
    on(q, "click", () => {
      const item = q.parentElement,
        open = !item.classList.contains("open");

      $$(".faq .it.open").forEach((i) => {
        i.classList.remove("open");
        $(".q", i).setAttribute("aria-expanded", "false");
      });

      item.classList.toggle("open", open);
      q.setAttribute("aria-expanded", open);
    }),
  );

  const motionItems = $$(
    ".brand-lab, .artwork-wrap, .show .cap, .cta h2, .cta .row, .met>div",
  );

  if (!calm && typeof IntersectionObserver !== "undefined") {
    const motionObserver = observe(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            motionObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px 36px 0px" },
    );

    motionItems.forEach((el, i) => {
      el.classList.add("motion-enter");
      el.style.setProperty("--motion-delay", `${(i % 4) * 90}ms`);
      motionObserver.observe(el);
    });
  }

  const motionSurface = $("[data-motion-surface]");

  if (motionSurface && fine && !calm) {
    on(
      motionSurface,
      "pointermove",
      (e) => {
        const r = motionSurface.getBoundingClientRect();

        motionSurface.style.setProperty(
          "--dx",
          `${((e.clientX - r.left) / r.width - 0.5) * 22}px`,
        );

        motionSurface.style.setProperty(
          "--dy",
          `${((e.clientY - r.top) / r.height - 0.5) * 22}px`,
        );
      },
      { passive: true },
    );

    on(motionSurface, "pointerleave", () => {
      motionSurface.style.setProperty("--dx", "0px");
      motionSurface.style.setProperty("--dy", "0px");
    });
  }

  const motionScroll = () =>
    root.style.setProperty(
      "--motion-scroll",
      String(Math.min(1, scrollY / Math.max(innerHeight, 1))),
    );

  on(window, "scroll", motionScroll, { passive: true });
  motionScroll();

  return () => {
    alive = false;
    cancelAnimationFrame(rafId);

    offs.forEach((f) => f());
    timers.forEach(clearTimeout);
    obs.forEach((o) => o.disconnect());

    root.classList.remove("js", "calm");
    document.body.style.overflow = "";
  };
}
