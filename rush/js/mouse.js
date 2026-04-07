// FIX: only run custom cursor on real pointer devices (not touch screens)
const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouch) {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    let mx = -200, my = -200;
    let rx = -200, ry = -200;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    (function lerpRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(lerpRing);
    })();
}

// ── About button: force-show both dropdowns ──
const aboutBtn = document.querySelector('#about-btn');
const profileContainers = document.querySelectorAll('.profile-container');
let isOpen = false;

if (aboutBtn) {
    aboutBtn.addEventListener('click', e => {
        e.preventDefault();
        isOpen = !isOpen;
        profileContainers.forEach(c => c.classList.toggle('force-show', isOpen));
    });
}

// ── FIX: tap-to-toggle dropdowns on mobile ──
profileContainers.forEach(container => {
    container.addEventListener('click', e => {
        // Don't interfere with "See More" link clicks
        if (e.target.closest('.see-more-btn')) return;

        const isActive = container.classList.contains('active');
        // Close all others first
        profileContainers.forEach(c => c.classList.remove('active'));
        // Toggle this one
        if (!isActive) container.classList.add('active');
    });
});

// Close when clicking outside cards
document.addEventListener('click', e => {
    if (!e.target.closest('.image-row') && !e.target.closest('ul')) {
        isOpen = false;
        profileContainers.forEach(c => {
            c.classList.remove('force-show');
            c.classList.remove('active');
        });
    }
});
