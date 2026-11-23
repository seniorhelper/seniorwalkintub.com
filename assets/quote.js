/* Quote forms (home form, home pop-up and every inner page).
   Posts straight to the Eye To Ad lead server (clients.eyetoad.com/lead/send.php), which saves the
   lead first and then emails the alert. No third-party form service is used.
   Spam guards: honeypot (_honey / hp_website) and a minimum time on page. Success is shown only when the
   lead server answers {ok:true}; anything else shows the phone number. Details travel in the
   POST body only, never in the URL. */
(function () {
  "use strict";
  var LEAD = "https://clients.eyetoad.com/lead/send.php";
  var PHONE = "1-888-779-2284";
  var shown = Date.now();
  var SITE = location.hostname.replace(/^www\./, "");

  function post(fd) {
    return fetch(LEAD, { method: "POST", body: fd, headers: { "Accept": "application/json" }, credentials: "omit", referrerPolicy: "strict-origin-when-cross-origin" })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (r.ok && j && j.ok) { return j; }
          throw new Error("lead-server " + r.status);
        });
      });
  }

  function wire(form) {
    if (!form || form.__leadWired) { return; }
    form.__leadWired = true;
    var status = form.querySelector('.form-status,[id^="formStatus"]') || document.getElementById(form.id === "modal-quote-form" ? "modal-form-status" : "formStatus");
    if (!status) { status = document.createElement("div"); status.className = "form-status"; form.appendChild(status); }
    function say(text, kind) {
      status.textContent = text;
      status.className = "form-status" + (kind ? " " + kind : "");
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var hp = form.querySelector('input[name="_honey"],input[name="hp_website"]');
      if (hp && hp.value.trim()) { say("Thank you. Your request was sent.", "success"); form.reset(); return; }
      if (Date.now() - shown < 3000) { say("Please take a moment to check your details, then press send again.", "error"); return; }
      if (!form.checkValidity()) { form.reportValidity(); say("Please fill in your name, phone and ZIP code.", "error"); return; }
      var zip = form.querySelector('input[name="user_zip"]');
      if (zip && !/^\d{5}(-\d{4})?$/.test(zip.value.trim())) { say("Please enter a 5-digit ZIP code for the home.", "error"); zip.focus(); return; }
      var phone = form.querySelector('input[name="user_phone"]');
      if (phone && phone.value.replace(/\D/g, "").length < 10) { say("Please enter a phone number with area code so a specialist can call you back.", "error"); phone.focus(); return; }
      var fd = new FormData(form);
      fd.delete("_honey");
      fd.delete("hp_website");
      fd.append("site", SITE);
      fd.append("page", location.pathname.slice(0, 300));
      fd.append("_t", String(shown));
      fd.append("_subject", "New lead - " + SITE);
      try {
        var q = new URLSearchParams(location.search);
        ["utm_source", "utm_medium", "utm_campaign", "gclid"].forEach(function (k) {
          var v = q.get(k); if (v) { fd.append("lead_" + k, v.slice(0, 120)); }
        });
        var ref = document.referrer && document.referrer.indexOf(location.host) === -1 ? document.referrer.slice(0, 200) : "";
        if (ref) { fd.append("lead_referrer", ref); }
      } catch (err) { /* ignore */ }
      fd.append("lead_device", window.innerWidth < 760 ? "phone" : "desktop");
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; }
      say("Sending your request...", "");
      // One retry, so a brief network blip does not lose a lead.
      post(fd).catch(function () { return new Promise(function (res) { setTimeout(res, 1200); }).then(function () { return post(fd); }); })
        .then(function () {
          say("Thank you. Your request was sent. A specialist will contact you, usually within one business day.", "success");
          form.reset();
          if (window.gtag) { try { window.gtag("event", "generate_lead", { form_id: form.id }); } catch (err) { /* ignore */ } }
        })
        .catch(function () { say("Sorry, that did not go through. Please call " + PHONE + " and we will help you by phone.", "error"); })
        .then(function () { if (btn) { btn.disabled = false; } });
    });
  }

  function init() {
    ["quoteForm", "quoteFormTop", "quoteFormBottom", "modal-quote-form"].forEach(function (id) { wire(document.getElementById(id)); });
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();
