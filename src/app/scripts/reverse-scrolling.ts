import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
declare const ScrollTimeline: any;

export function initReverseScrolling() {
  if (
    (window.CSS && CSS.supports('animation-timeline: scroll()')) ||
    (window.CSS && !CSS.supports('animation-timeline: foo'))
  ) {
    const columns = document.querySelector('.columns') as HTMLElement | null;
    if (!columns) return;

    columns.style.overflowY = 'hidden';

    const timeline = new ScrollTimeline({
      scrollSource: document.documentElement,
      timeRange: 1,
      fill: 'both',
    });

    const columnNodes = document.querySelectorAll('.column-reverse');

    columnNodes.forEach((col) => {
      const element = col as HTMLElement;
      element.style.flexDirection = 'column-reverse';

      element.animate(
        {
          transform: [
            'translateY(calc(-200% + 100vh))',
            'translateY(calc(100% - 100vh))',
          ],
        },
        {
          duration: 1,
          fill: 'both',
          timeline: timeline,
        }
      );
    });
  }
}
