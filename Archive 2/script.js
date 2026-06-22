// Les Jasmins d'Ispe — interactions
(function(){
  "use strict";

  // Confirm JS actually ran before letting CSS hide anything for animation.
  document.documentElement.classList.add('js-ready');

  // ---- Header background on scroll ----
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  toggle.addEventListener('click', function(){
    document.body.classList.toggle('nav-open');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      document.body.classList.remove('nav-open');
    });
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
    // safety net: if something is never intersected (edge cases), reveal anyway
    setTimeout(function(){
      revealEls.forEach(function(el){ el.classList.add('is-visible'); });
    }, 4000);
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // ---- Footer year ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Contact form -> mailto fallback (no backend required) ----
  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('formSuccess');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var arrival = form.arrival.value;
      var departure = form.departure.value;
      var guests = form.guests.value;
      var message = form.message.value.trim();

      var bodyLines = [
        "Nom : " + name,
        "E-mail : " + email,
        "Arrivée : " + (arrival || "—"),
        "Départ : " + (departure || "—"),
        "Voyageurs : " + (guests || "—"),
        "",
        "Message :",
        message
      ];

      var subject = encodeURIComponent("Demande de séjour — Les Jasmins d'Ispe");
      var body = encodeURIComponent(bodyLines.join("\n"));
      var mailto = "mailto:contact@lesjasminsdispe.fr?subject=" + subject + "&body=" + body;

      window.location.href = mailto;

      successMsg.classList.add('show');
      form.reset();
    });
  }

  // ---- Photo gallery lightbox (only runs if a gallery grid is present) ----
  var galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid){
    var items = Array.prototype.slice.call(galleryGrid.querySelectorAll('.gallery-item'));
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var closeBtn = document.getElementById('lightboxClose');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');
    var currentIndex = 0;

    function openLightbox(index){
      currentIndex = index;
      var item = items[index];
      var img = item.querySelector('img');
      lightboxImg.src = img.getAttribute('src');
      lightboxImg.alt = img.getAttribute('alt') || '';
      lightboxCaption.textContent = item.getAttribute('data-caption') || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    function showNext(){ openLightbox((currentIndex + 1) % items.length); }
    function showPrev(){ openLightbox((currentIndex - 1 + items.length) % items.length); }

    items.forEach(function(item, index){
      item.addEventListener('click', function(){ openLightbox(index); });
    });
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    lightbox.addEventListener('click', function(e){
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }
})();
