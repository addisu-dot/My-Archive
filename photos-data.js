/*
  YOUR PHOTOS GO HERE.
  1. Put your image files in a folder called "photos" next to this file.
  2. Replace the entries below with your own, for example:
       { thumb: "photos/durame-sunrise.jpg", full: "photos/durame-sunrise.jpg", alt: "Sunrise over Durame", caption: "Durame, 6:10 AM" }
  Tip: resize thumbnails to about 600px wide so the page loads fast.

  The entries below are temporary placeholder photos from picsum.photos.
*/
window.PHOTOS = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1;
  return {
    thumb: `https://picsum.photos/seed/archive-${n}/600/400`,
    full: `https://picsum.photos/seed/archive-${n}/1600/1000`,
    alt: `Placeholder photo ${n}`,
    caption: `Placeholder ${n}`
  };
});
