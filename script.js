const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function closeNavigation() {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('open');
}

navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navLinks.classList.toggle('open', open);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavigation();
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');

document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    lightbox.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('#lightbox-close').focus();
  });
});
document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-content')) lightbox.close();
});
lightbox.addEventListener('close', () => document.body.classList.remove('modal-open'));

const videos = [...document.querySelectorAll('video')];
videos.forEach(video => {
  const frame = video.closest('.video-frame');
  const playButton = frame.querySelector('.video-play');
  playButton.addEventListener('click', async () => {
    try {
      await video.play();
    } catch {
      frame.classList.add('started');
      video.focus();
    }
  });
  video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
    frame.classList.add('started');
  });
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('pending-reveal');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(section => {
    section.classList.add('pending-reveal');
    observer.observe(section);
  });
}

document.querySelector('#copy-discord').addEventListener('click', async event => {
  const label = event.currentTarget.querySelector('.copy-label');
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('veloraxxx');
    label.textContent = 'Copied';
    status.textContent = 'Discord username copied: veloraxxx';
    setTimeout(() => { label.textContent = 'Copy'; }, 2500);
  } catch {
    label.textContent = 'veloraxxx';
    status.textContent = 'Discord username: veloraxxx';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
