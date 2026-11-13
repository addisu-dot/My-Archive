/*
  YOUR PHOTOS GO HERE.
  1. Put your image files in the "photos" folder next to this file.
  2. Replace the entries below with your own, for example:
       { thumb: "photos/durame-sunrise-small.jpg", full: "photos/durame-sunrise.jpg", alt: "Sunrise over Durame", caption: "Durame, 6:10 AM" }
  Tip: resize thumbnails to about 600px wide so the page loads fast.

  The entries below are local placeholder images (photos/placeholder-XX.jpg).
*/
window.PHOTOS = Array.from({ length: 24 }, (_, i) => {
  const id = String(i + 1).padStart(2, '0');
  return {
    thumb: `photos/placeholder-${id}-thumb.jpg`,
    full: `photos/placeholder-${id}.jpg`,
    alt: `Placeholder photo ${i + 1}`,
    caption: `Placeholder ${i + 1}`
  };
});
