(function () {
    const container = document.getElementById('gallery-container');
    const countEl = document.getElementById('gallery-count');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lb-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    const shuffleBtn = document.getElementById('shuffle-btn');

    let photos = (window.PHOTOS || []).slice();
    let current = 0;
    let lastFocused = null;

    function render() {
        container.innerHTML = '';
        if (photos.length === 0) {
            container.innerHTML = '<p class="empty">No photos yet. Add some in photos-data.js.</p>';
            countEl.textContent = '';
            return;
        }
        countEl.textContent = photos.length + ' photos';
        const frag = document.createDocumentFragment();
        photos.forEach((p, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'thumb';
            btn.setAttribute('aria-label', 'Open photo ' + (i + 1) + ': ' + p.alt);
            const img = document.createElement('img');
            img.src = p.thumb;
            img.alt = p.alt;
            img.width = 600;
            img.height = 400;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.addEventListener('error', () => btn.classList.add('broken'));
            btn.appendChild(img);
            btn.addEventListener('click', () => open(i));
            frag.appendChild(btn);
        });
        container.appendChild(frag);
    }

    function show(index) {
        current = (index + photos.length) % photos.length;
        const p = photos[current];
        lbImg.classList.add('loading');
        lbImg.onload = () => lbImg.classList.remove('loading');
        lbImg.onerror = () => { lbImg.classList.remove('loading'); lbImg.src = p.thumb; };
        lbImg.src = p.full || p.thumb;
        lbImg.alt = p.alt;
        lbCaption.textContent = (current + 1) + ' / ' + photos.length + (p.caption ? '  \u2022  ' + p.caption : '');
        // preload neighbours so next/prev feel instant
        [current + 1, current - 1].forEach(n => {
            const q = photos[(n + photos.length) % photos.length];
            if (q && q.full) { const pre = new Image(); pre.src = q.full; }
        });
    }

    function open(index) {
        lastFocused = document.activeElement;
        lightbox.hidden = false;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        show(index);
        closeBtn.focus();
    }

    function close() {
        lightbox.hidden = true;
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        lbImg.src = '';
        if (lastFocused) lastFocused.focus();
    }

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', (e) => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') show(current + 1);
        else if (e.key === 'ArrowLeft') show(current - 1);
        else if (e.key === 'Tab') {
            // keep keyboard focus inside the viewer
            const focusables = [closeBtn, prevBtn, nextBtn];
            const idx = focusables.indexOf(document.activeElement);
            e.preventDefault();
            const next = e.shiftKey ? (idx <= 0 ? focusables.length - 1 : idx - 1) : (idx + 1) % focusables.length;
            focusables[next].focus();
        }
    });

    // swipe on mobile
    let startX = 0, startY = 0;
    lightbox.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        const dx = startX - e.changedTouches[0].clientX;
        const dy = startY - e.changedTouches[0].clientY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx > 0 ? 1 : -1));
    }, { passive: true });

    // Fisher-Yates shuffle (the old "Refresh" button reloaded the page but showed the same photos)
    shuffleBtn.addEventListener('click', () => {
        for (let i = photos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [photos[i], photos[j]] = [photos[j], photos[i]];
        }
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    render();
})();
