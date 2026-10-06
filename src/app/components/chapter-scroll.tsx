"use client";

import { useEffect } from "react";

export function ChapterScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const previousScrollRestoration = window.history.scrollRestoration;
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const legacyNavigation = performance as Performance & { navigation?: { type: number } };
    const isReload = navigation?.type === "reload" || (!navigation && legacyNavigation.navigation?.type === 1);

    if (isReload) {
      window.history.scrollRestoration = "manual";
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
      }
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousScrollBehavior;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const supportsDesktopWheelNavigation = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (window.innerWidth < 1025 || !supportsDesktopWheelNavigation || sections.length < 2) {
      return () => {
        window.history.scrollRestoration = previousScrollRestoration;
      };
    }

    const transitionDuration = 1450;
    const settleDuration = 180;
    let transitioning = false;
    let animationFrame = 0;
    let settleTimer = 0;
    const previousScrollBehavior = root.style.scrollBehavior;

    const finishTransition = () => {
      settleTimer = window.setTimeout(() => {
        transitioning = false;
      }, settleDuration);
    };

    const animateValue = (start: number, target: number, duration: number, update: (value: number) => void) => {
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        update(start + (target - start) * eased);

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
          return;
        }

        update(target);
        root.style.scrollBehavior = previousScrollBehavior;
        finishTransition();
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const animateDocumentTo = (targetY: number, duration = transitionDuration) => {
      root.style.scrollBehavior = "auto";
      animateValue(window.scrollY, targetY, duration, (value) => window.scrollTo(0, value));
    };

    const animatePanelToTop = (panel: HTMLElement) => {
      animateValue(panel.scrollTop, 0, 700, (value) => { panel.scrollTop = value; });
    };

    const onNavClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>(".site-nav a[href^='#']");
      if (!link) return;

      const hash = link.hash;
      let id = "";
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const destination = document.getElementById(id);
      const destinationSection = destination?.closest<HTMLElement>("main > section");
      const targetIndex = destinationSection ? sections.indexOf(destinationSection) : -1;
      if (!destinationSection || targetIndex < 0) return;

      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(window.history.state, "", hash);

      if (transitioning) {
        window.cancelAnimationFrame(animationFrame);
        window.clearTimeout(settleTimer);
        transitioning = false;
        root.style.scrollBehavior = "auto";
      }

      // Chapters are independent scroll panels. Clear every saved inner
      // position on explicit navigation so returning later always starts at
      // the chapter's opening, rather than its previous reading position.
      sections.forEach((section) => { section.scrollTop = 0; });

      const panelHeight = sections[0].clientHeight;
      const currentIndex = Math.max(0, Math.min(sections.length - 1, Math.round(window.scrollY / panelHeight)));
      const distance = Math.abs(targetIndex - currentIndex);
      transitioning = true;
      if (targetIndex === currentIndex) {
        if (destinationSection.scrollTop > 0) animatePanelToTop(destinationSection);
        else {
          transitioning = false;
          root.style.scrollBehavior = previousScrollBehavior;
        }
        return;
      }

      const duration = Math.min(1700, Math.max(900, 700 + distance * 180));
      animateDocumentTo(targetIndex * panelHeight, duration);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) return;
      const target = event.target instanceof Element ? event.target : null;
      const panel = target?.closest<HTMLElement>("main > section") ?? sections[
        Math.min(sections.length - 1, Math.floor((window.scrollY + 1) / window.innerHeight))
      ];
      const currentIndex = sections.indexOf(panel);
      if (currentIndex < 0) return;

      if (transitioning) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const maxInnerScroll = panel.scrollHeight - panel.clientHeight;
      const hasMoreContent = maxInnerScroll > 2;
      const atEnd = event.deltaY > 0 && panel.scrollTop >= maxInnerScroll - 2;
      const atStart = event.deltaY < 0 && panel.scrollTop <= 2;
      if (hasMoreContent && !(atEnd || atStart)) return;

      const nextIndex = currentIndex + (event.deltaY > 0 ? 1 : -1);
      if (nextIndex < 0 || nextIndex >= sections.length) return;

      event.preventDefault();
      event.stopPropagation();
      transitioning = true;
      window.clearTimeout(settleTimer);
      // Sticky panels report their pinned visual position in Safari, not their
      // original document position. Move one measured panel height per chapter.
      const direction = nextIndex > currentIndex ? 1 : -1;
      const targetY = Math.max(0, window.scrollY + direction * panel.clientHeight);
      animateDocumentTo(targetY);
    };

    document.addEventListener("wheel", onWheel, { capture: true, passive: false });
    document.addEventListener("click", onNavClick);
    return () => {
      document.removeEventListener("wheel", onWheel, true);
      document.removeEventListener("click", onNavClick);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settleTimer);
      root.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return null;
}
