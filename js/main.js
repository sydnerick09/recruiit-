/* ===================================================================
   Business Hub — front-end behaviour
   =================================================================== */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile navigation toggle ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Populate the country dropdown ---- */
  var countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czechia",
    "Denmark","Djibouti","Dominica","Dominican Republic",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
    "Fiji","Finland","France",
    "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Honduras","Hungary",
    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
    "Jamaica","Japan","Jordan",
    "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
    "Oman",
    "Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
    "Qatar",
    "Romania","Russia","Rwanda",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
    "Vanuatu","Vatican City","Venezuela","Vietnam",
    "Yemen",
    "Zambia","Zimbabwe",
    "Other"
  ];

  var select = document.getElementById("country");
  if (select) {
    var frag = document.createDocumentFragment();
    countries.forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      frag.appendChild(opt);
    });
    select.appendChild(frag);
  }

  /* ---- Form: build an email and open the applicant's mail app on submit ---- */
  var RECIPIENT = "businesshub.comke@gmail.com";
  var form = document.getElementById("applyForm");

  if (form) {
    var postSubmit = document.getElementById("postSubmit");

    // Read a field's value by element id
    function val(id) {
      var el = document.getElementById(id);
      return el && el.value ? el.value.trim() : "";
    }
    // Read the chosen value of a radio group by its name
    function radio(name) {
      var el = form.querySelector('input[name="' + name + '"]:checked');
      return el ? el.value : "";
    }

    function buildEmail() {
      var rows = [
        ["Full Name", val("name")],
        ["Age", val("age")],
        ["Email", val("email")],
        ["Phone / WhatsApp", val("phone")],
        ["Country of Origin", val("country")],
        ["Address", val("address")],
        ["Previous Profession", val("profession")],
        ["Marketing / Other Experience", val("marketing")],
        ["How They Found Us", val("found")],
        ["Where They Learned Computer Skills", val("computer")],
        ["Online business / agent before?", radio("Online Experience")],
        ["Online experience details", val("onlineDetails")],
        ["Good with data?", radio("Good With Data")],
        ["Additional message", val("message")],
      ];

      var lines = ["BUSINESS HUB — AGENT APPLICATION", ""];
      rows.forEach(function (r) {
        lines.push(r[0] + ": " + (r[1] || "-"));
      });
      lines.push("");
      lines.push("--------------------------------------------------");
      lines.push(
        "IMPORTANT: Please attach your completed application document to this email before sending."
      );
      lines.push("Sent from the Business Hub website.");

      return {
        subject: "New Business Hub Agent Application" + (val("name") ? " — " + val("name") : ""),
        body: lines.join("\n"),
      };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation (form has novalidate so we control the messaging)
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var mail = buildEmail();
      var subjectEnc = encodeURIComponent(mail.subject);
      var bodyEnc = encodeURIComponent(mail.body);

      var mailtoURL = "mailto:" + RECIPIENT + "?subject=" + subjectEnc + "&body=" + bodyEnc;
      var gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        encodeURIComponent(RECIPIENT) +
        "&su=" + subjectEnc +
        "&body=" + bodyEnc;

      // Wire up the fallback buttons shown in the panel
      var gmailLink = document.getElementById("gmailLink");
      var mailtoLink = document.getElementById("mailtoLink");
      var copyBtn = document.getElementById("copyBtn");
      if (gmailLink) gmailLink.href = gmailURL;
      if (mailtoLink) mailtoLink.href = mailtoURL;
      if (copyBtn) {
        copyBtn.onclick = function () {
          var text = "To: " + RECIPIENT + "\nSubject: " + mail.subject + "\n\n" + mail.body;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
              function () { copyBtn.textContent = "✅ Copied!"; },
              function () { copyBtn.textContent = "Press Ctrl+C to copy"; }
            );
          } else {
            copyBtn.textContent = "Select the text and copy it";
          }
        };
      }

      // Reveal the fallback panel first (in case no mail app is configured)
      if (postSubmit) {
        postSubmit.hidden = false;
        postSubmit.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // Open the applicant's email app with everything pre-filled
      window.location.href = mailtoURL;
    });
  }
})();
