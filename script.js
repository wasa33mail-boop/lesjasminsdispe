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
})();
