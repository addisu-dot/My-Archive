# The Archive

A neon-styled photo gallery built with plain HTML, CSS and JavaScript. No frameworks, no build step.

**Features**

- Landing page with a random full-screen background on every visit
- Responsive thumbnail grid with lazy-loaded images
- Full-screen lightbox: arrow keys and swipe to navigate, `Esc` to close
- Shuffle button to reorder the gallery
- Keyboard accessible (focus trap in the viewer) and respects `prefers-reduced-motion`

## Project structure

```
My-Archive/
├── index.html       # Landing page
├── photos.html      # Gallery page
├── style.css        # All styling
├── gallery.js       # Grid, lightbox, shuffle
├── photos-data.js   # Your photo list (edit this)
└── photos/          # Your image files (create this folder)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Add your photos

1. Create a `photos/` folder next to `photos-data.js` and put your images in it.
2. Replace the placeholder code in `photos-data.js` with your own list:

```js
window.PHOTOS = [
  {
    thumb: "photos/durame-sunrise-small.jpg",  // ~600px wide
    full:  "photos/durame-sunrise.jpg",
    alt:   "Sunrise over Durame",
    caption: "Durame, 6:10 AM"
  },
  // ...
];
```

Tip: resize thumbnails to about 600px wide so the page loads fast. `full` and `caption` are optional.

The gallery currently shows 24 placeholder images from [picsum.photos](https://picsum.photos).

## Customize

- **Landing backgrounds:** edit the `images` array in `index.html`.
- **Colors:** the neon accent is `#0ff` in `style.css`.

## Deploy

Because it is fully static, it works on GitHub Pages: *Settings → Pages → Deploy from branch → `main`*.

## Author

Addisu Legese ([@addisu-dot](https://github.com/addisu-dot))
