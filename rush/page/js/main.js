// FIX: only run custom cursor on real pointer devices (not touch screens)
const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouch) {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    (function loop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
}

// ── Gallery panel ──
const galleryPanel    = document.getElementById('gallery-panel');
const galleryBackdrop = document.getElementById('gallery-backdrop');
const closeGalleryBtn = document.getElementById('close-gallery');
const showcaseLink    = document.querySelector('a[href="#showcase"]');
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose   = document.getElementById('lightbox-close');

function openGallery(e) {
    e.preventDefault();
    galleryPanel.classList.add('open');
    galleryBackdrop.classList.add('open');
}

function closeGallery() {
    galleryPanel.classList.remove('open');
    galleryBackdrop.classList.remove('open');
}

// ── Lightbox ──
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img   = item.querySelector('img');
        const label = item.querySelector('.gallery-overlay');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = label ? label.childNodes[0].textContent.trim() : '';
        lightbox.classList.add('open');
    });
});

function closeLightbox() { lightbox.classList.remove('open'); }

if (showcaseLink)    showcaseLink.addEventListener('click', openGallery);
if (closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGallery);
if (galleryBackdrop) galleryBackdrop.addEventListener('click', closeGallery);
if (lightboxClose)   lightboxClose.addEventListener('click', closeLightbox);
if (lightbox)        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLightbox(); closeGallery(); }
});
