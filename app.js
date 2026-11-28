(function () {
  "use strict";
  const D = window.LAK_DATA;
  if (!D) { alert("خطأ في تحميل data.js"); return; }

  const API_URL = "https://lak-api-server.vercel.app/api";
  const mem = {};
  function storeGet(k, d) { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : d; } catch (e) { return k in mem ? mem[k] : d; } }
  function storeSet(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function normModel(m) {
    if (!m || m === "gemini-2.5-flash" || m === "gemini-2.5-pro" || m === "gemini-flash-latest") return "auto";
    return m;
  }

  let currentGrade = storeGet("lak_grade", "g2");
  let studyLang = storeGet("lak_study_lang", "ar");
  let uploadedGraderImg = null, uploadedSolverImg = null;
  let lastSolverRaw = "", lastGraderRaw = "", lastTutorRaw = "", lastMonthRaw = "";
  let currentQuestions = [], userAnswers = [], testSubmitted = false, timerInt = null, timerSec = 0;

  const $ = (id) => document.getElementById(id);
  const els = {
    tabs: document.querySelectorAll(".tab-btn"), panels: document.querySelectorAll(".panel"),
    gradeG1Btn: $("gradeG1Btn"), gradeG2Btn: $("gradeG2Btn"),
    langArBtn: $("langArBtn"), langEnBtn: $("langEnBtn"), systemBadge: $("systemBadge"),
    openSettingsBtn: $("openSettingsBtn"), closeSettingsBtn: $("closeSettingsBtn"), settingsModal: $("settingsModal"),
    accessStatusBox: $("accessStatusBox"),
    apiKeyInput: $("apiKeyInput"), modelSelect: $("modelSelect"), saveSettingsBtn: $("saveSettingsBtn"),
    removeKeyBtn: $("removeKeyBtn"), apiStatusDot: $("apiStatusDot"), toggleThemeBtn: $("toggleThemeBtn"), toast: $("toast"),

    solverSubject: $("solverSubject"), solverDepth: $("solverDepth"), solverText: $("solverText"),
    solverUploadBox: $("solverUploadBox"), solverImageInput: $("solverImageInput"),
    solverPreview: $("solverPreview"), solverPreviewImg: $("solverPreviewImg"), solverImageName: $("solverImageName"),
    clearSolverImgBtn: $("clearSolverImgBtn"), runSolverBtn: $("runSolverBtn"), clearSolverBtn: $("clearSolverBtn"), solverOutput: $("solverOutput"),

    graderTrackWrap: $("graderTrackWrap"), graderTrack: $("graderTrack"), graderSubject: $("graderSubject"), graderMode: $("graderMode"),
    graderQuestion: $("graderQuestion"), graderAnswer: $("graderAnswer"),
    graderUploadBox: $("graderUploadBox"), graderImageInput: $("graderImageInput"),
    graderPreview: $("graderPreview"), graderPreviewImg: $("graderPreviewImg"), graderImageName: $("graderImageName"),
    clearGraderImageBtn: $("clearGraderImageBtn"), runGraderBtn: $("runGraderBtn"),
    copyGraderPromptBtn: $("copyGraderPromptBtn"), clearGraderBtn: $("clearGraderBtn"),
    graderOutput: $("graderOutput"), historyList: $("historyList"), clearHistoryBtn: $("clearHistoryBtn"),

    tutorTrackWrap: $("tutorTrackWrap"), tutorTrack: $("tutorTrack"), tutorSubject: $("tutorSubject"), tutorTask: $("tutorTask"),
    tutorInput: $("tutorInput"), tutorRef: $("tutorRef"),
    runTutorBtn: $("runTutorBtn"), copyTutorPromptBtn: $("copyTutorPromptBtn"), tutorOutput: $("tutorOutput"),

    currTrackWrap: $("currTrackWrap"), curriculumTrackSelect: $("curriculumTrackSelect"), curriculumGrid: $("curriculumGrid"),
    progressText: $("progressText"), progressBarFill: $("progressBarFill"),

    quizModeSelect: $("quizModeSelect"), quizSubjectSelect: $("quizSubjectSelect"),
    quizUnitWrap: $("quizUnitWrap"), quizUnitSelect: $("quizUnitSelect"),
    startOfflineTestBtn: $("startOfflineTestBtn"), startAiTestBtn: $("startAiTestBtn"),
    testArea: $("testArea"), testHeaderTitle: $("testHeaderTitle"), answeredCountBadge: $("answeredCountBadge"),
    examTimerBadge: $("examTimerBadge"), testQuestionsContainer: $("testQuestionsContainer"),
    testSubmitRow: $("testSubmitRow"), submitTestBtn: $("submitTestBtn"), testResultCard: $("testResultCard"),

    monthSelect: $("monthSelect"), monthSubjectSelect: $("monthSubjectSelect"),
    monthSummaryBox: $("monthSummaryBox"), genAiMonthBtn: $("genAiMonthBtn"), monthAiOutput: $("monthAiOutput")
  };

  function showToast(m) { els.toast.textContent = m; els.toast.classList.add("show"); setTimeout(() => els.toast.classList.remove("show"), 2600); }
  function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"); }
  function fmt(raw) {
    let s = esc(raw).replace(/```([\s\S]*?)```/g, (_, c) => "<pre>" + c.trim() + "</pre>");
    s = s.replace(/^### (.*)$/gm, "<h4>$1</h4>").replace(/^## (.*)$/gm, "<h3>$1</h3>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>");
    const lines = s.split("\n"); let h = "", inL = false;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith("- ") || l.startsWith("* ")) { if (!inL) { h += "<ul>"; inL = true; } h += "<li>" + l.slice(2) + "</li>"; }
      else { if (inL) { h += "</ul>"; inL = false; } if (l) h += (l.startsWith("<h3>") || l.startsWith("<h4>") || l.startsWith("<pre>")) ? l : "<p style='margin:5px 0'>" + l + "</p>"; }
    }
    if (inL) h += "</ul>";
    return h;
  }
  async function copyTxt(t, msg) {
    try { await navigator.clipboard.writeText(t); showToast(msg || "تم النسخ!"); }
    catch (e) { const a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select(); document.execCommand("copy"); document.body.removeChild(a); showToast(msg || "تم النسخ!"); }
  }

  function gradeLabel() { return currentGrade === "g1" ? "الصف الأول بكالوريا" : "الصف الثاني بكالوريا"; }
  function subName(s) { return (studyLang === "en" && s.nameEn) ? s.nameEn : s.name; }
  function subType(s) { return (studyLang === "en" && s.typeEn) ? s.typeEn : s.type; }
  function subUnits(s) { return (studyLang === "en" && s.unitsEn) ? s.unitsEn : s.units; }
  function trackName(t) { return studyLang === "en" ? (t.name + " / " + t.nameEn) : t.name; }
  function isEnSub(id) { return studyLang === "en" && D.EN_SUBS.indexOf(id) !== -1; }

  function getGradeSubIds(includePe) {
    return Object.keys(D.SUBJECTS).filter((id) => D.SUBJECTS[id].grade === currentGrade && (includePe || id !== "g2_pe"));
  }
  function getTrackSubIds(trackKey) {
    if (currentGrade === "g1") return getGradeSubIds(false);
    const t = D.G2_TRACKS[trackKey] || D.G2_TRACKS.medicine;
    return ["g2_arabic", "g2_english", "g2_history"].concat(t.specIds, ["g2_financial"]);
  }

  function fillAllGradeSubs(sel) {
    const prev = sel.value; sel.innerHTML = "";
    const ids = getGradeSubIds(false);
    ids.forEach((id) => { const o = document.createElement("option"); o.value = id; o.textContent = subName(D.SUBJECTS[id]); sel.appendChild(o); });
    if (ids.indexOf(prev) !== -1) sel.value = prev;
  }

  function fillTrackSub(tWrap, tSel, sSel) {
    tWrap.style.display = currentGrade === "g1" ? "none" : "block";
    if (currentGrade === "g2") {
      const pt = tSel.value || "medicine"; tSel.innerHTML = "";
      Object.keys(D.G2_TRACKS).forEach((k) => { const o = document.createElement("option"); o.value = k; o.textContent = trackName(D.G2_TRACKS[k]); tSel.appendChild(o); });
      tSel.value = D.G2_TRACKS[pt] ? pt : "medicine";
    }
    function upd() {
      const prev = sSel.value; sSel.innerHTML = "";
      const ids = getTrackSubIds(tSel.value);
      ids.forEach((id) => { const o = document.createElement("option"); o.value = id; o.textContent = subName(D.SUBJECTS[id]); sSel.appendChild(o); });
      if (ids.indexOf(prev) !== -1) sSel.value = prev;
    }
    if (!tSel.dataset.b) { tSel.addEventListener("change", upd); tSel.dataset.b = "1"; }
    upd();
  }

  function fillQuizSelectors() {
    fillAllGradeSubs(els.quizSubjectSelect);
    fillQuizUnits();
  }
  function fillQuizUnits() {
    const sid = els.quizSubjectSelect.value;
    if (!D.SUBJECTS[sid]) return;
    const units = subUnits(D.SUBJECTS[sid]), prev = els.quizUnitSelect.value || "0";
    els.quizUnitSelect.innerHTML = "";
    units.forEach((u, i) => { const o = document.createElement("option"); o.value = String(i); o.textContent = u; els.quizUnitSelect.appendChild(o); });
    if (Number(prev) < units.length) els.quizUnitSelect.value = prev;
  }
  els.quizSubjectSelect.addEventListener("change", fillQuizUnits);
  els.quizModeSelect.addEventListener("change", () => { els.quizUnitWrap.style.display = els.quizModeSelect.value === "assessment" ? "block" : "none"; });

  function refreshAllSelectors() {
    els.systemBadge.textContent = gradeLabel() + " • " + (studyLang === "en" ? "مدارس لغات (English)" : "مدارس عربي");
    els.gradeG1Btn.classList.toggle("active-lang", currentGrade === "g1");
    els.gradeG2Btn.classList.toggle("active-lang", currentGrade === "g2");
    els.langArBtn.classList.toggle("active-lang", studyLang === "ar");
    els.langEnBtn.classList.toggle("active-lang", studyLang === "en");
    els.currTrackWrap.style.display = currentGrade === "g1" ? "none" : "block";

    fillAllGradeSubs(els.solverSubject);
    fillTrackSub(els.graderTrackWrap, els.graderTrack, els.graderSubject);
    fillTrackSub(els.tutorTrackWrap, els.tutorTrack, els.tutorSubject);
    fillQuizSelectors();
    fillAllGradeSubs(els.monthSubjectSelect);
    renderCurriculum();
    renderMonthSummary();
  }

  els.gradeG1Btn.addEventListener("click", () => { currentGrade = "g1"; storeSet("lak_grade", "g1"); refreshAllSelectors(); showToast("تم التحويل للصف الأول بكالوريا"); });
  els.gradeG2Btn.addEventListener("click", () => { currentGrade = "g2"; storeSet("lak_grade", "g2"); refreshAllSelectors(); showToast("تم التحويل للصف الثاني بكالوريا"); });
  els.langArBtn.addEventListener("click", () => { studyLang = "ar"; storeSet("lak_study_lang", "ar"); refreshAllSelectors(); showToast("تم التحويل لمدارس العربي"); });
  els.langEnBtn.addEventListener("click", () => { studyLang = "en"; storeSet("lak_study_lang", "en"); refreshAllSelectors(); showToast("Switched to Language Schools (English)"); });

  function switchTab(t) {
    els.tabs.forEach((b) => b.classList.toggle("active", b.dataset.tab === t));
    els.panels.forEach((p) => p.classList.toggle("active", p.id === "panel-" + t));
  }
  els.tabs.forEach((b) => b.addEventListener("click", () => switchTab(b.dataset.tab)));

  function applyTheme() {
    const d = storeGet("lak_dark", false);
    document.body.classList.toggle("dark", Boolean(d));
    els.toggleThemeBtn.textContent = d ? "☀️ نهاري" : "🌙 ليلي";
  }
  els.toggleThemeBtn.addEventListener("click", () => { storeSet("lak_dark", !document.body.classList.contains("dark")); applyTheme(); });

  function updApi() {
    const code = storeGet("lak_access_code", "");
    const role = storeGet("lak_access_role", "free");
    const label = storeGet("lak_access_label", "");
    const m = normModel(storeGet("lak_gemini_model", "auto"));
    storeSet("lak_gemini_model", m);
    els.apiKeyInput.value = code;
    els.modelSelect.value = m;
    els.apiStatusDot.classList.add("ready");
    if (els.accessStatusBox) {
      if (code && (role === "owner" || role === "vip")) {
        els.accessStatusBox.className = "badge green";
        els.accessStatusBox.textContent = "✅ " + (label || (role === "owner" ? "حساب المدير (مفتوح بالكامل بلا حدود)" : "اشتراك VIP (مفتوح بلا حدود)"));
      } else {
        els.accessStatusBox.className = "badge";
        els.accessStatusBox.textContent = "الوضع الحالي: مجاني (3 محاولات يوميًا)";
      }
    }
  }
  els.openSettingsBtn.addEventListener("click", () => { updApi(); els.settingsModal.classList.add("open"); });
  els.closeSettingsBtn.addEventListener("click", () => els.settingsModal.classList.remove("open"));
  els.settingsModal.addEventListener("click", (e) => { if (e.target === els.settingsModal) els.settingsModal.classList.remove("open"); });

  els.saveSettingsBtn.addEventListener("click", async () => {
    const code = els.apiKeyInput.value.trim();
    const m = normModel(els.modelSelect.value);
    storeSet("lak_gemini_model", m);
    if (!code) {
      storeSet("lak_access_code", "");
      storeSet("lak_access_role", "free");
      storeSet("lak_access_label", "");
      updApi();
      els.settingsModal.classList.remove("open");
      showToast("تم حفظ الإعدادات (الوضع المجاني)");
      return;
    }
    const origText = els.saveSettingsBtn.textContent;
    els.saveSettingsBtn.disabled = true;
    els.saveSettingsBtn.textContent = "⏳ جاري التحقق...";
    const c = new AbortController(), t = setTimeout(() => c.abort(), 15000);
    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Access-Code": code },
        body: JSON.stringify({ action: "verify", code: code }),
        signal: c.signal
      });
      const j = await r.json();
      if (!r.ok || !j.ok) {
        showToast("❌ " + (j && j.error ? j.error : "الكود غير صحيح"));
        return;
      }
      storeSet("lak_access_code", code);
      storeSet("lak_access_role", j.role || "vip");
      storeSet("lak_access_label", j.label || "تم التفعيل بنجاح");
      updApi();
      els.settingsModal.classList.remove("open");
      showToast("✅ " + (j.label || "تم تفعيل الكود بنجاح!"));
    } catch (e) {
      showToast(e && e.name === "AbortError"
        ? "⏱ انتهت مهلة الاتصال بالسيرفر (جرّب 1.1.1.1 أو شبكة تانية)"
        : "⚠️ تعذر الاتصال بالسيرفر (تأكد من النت أو جرّب 1.1.1.1)");
    } finally {
      clearTimeout(t);
      els.saveSettingsBtn.disabled = false;
      els.saveSettingsBtn.textContent = origText;
    }
  });

  els.removeKeyBtn.addEventListener("click", () => {
    storeSet("lak_access_code", "");
    storeSet("lak_access_role", "free");
    storeSet("lak_access_label", "");
    updApi();
    showToast("تم إلغاء الكود والعودة للوضع المجاني");
  });

  async function callGemini(prompt, img, onStat, preferPro) {
    const code = storeGet("lak_access_code", "").trim();
    const pref = preferPro ? "pro" : normModel(storeGet("lak_gemini_model", "auto"));
    const parts = [{ text: prompt }];
    if (img && img.data) parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } });

    if (onStat) onStat("⏳ جاري المعالجة عبر السيرفر الذكي...");
    const c = new AbortController(), t = setTimeout(() => c.abort(), 50000);
    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Access-Code": code },
        body: JSON.stringify({ parts: parts, modelPref: pref, code: code }),
        signal: c.signal
      });
      let j = null;
      try { j = await r.json(); } catch (err) {}
      if (!r.ok || !j || !j.ok) {
        const msg = (j && (j.message || j.error)) ? (j.message || j.error) : ("HTTP " + r.status);
        throw new Error(msg);
      }
      if (j.remainingFree !== null && j.remainingFree !== undefined) {
        showToast("متبقي لك " + j.remainingFree + " محاولات مجانية اليوم");
      }
      return j.text;
    } catch (e) {
      if (e && e.name === "AbortError") {
        throw new Error("انتهت مهلة الاتصال بالسيرفر. جرّب تاني أو فعّل 1.1.1.1 لو الشبكة بطيئة.");
      }
      if (e && String(e.message) === "Failed to fetch") {
        throw new Error("تعذر الوصول للسيرفر من الشبكة الحالية. جرّب تفتح 1.1.1.1 WARP أو داتا الموبايل.");
      }
      throw e;
    } finally {
      clearTimeout(t);
    }
  }

  function compressImg(file, maxSide) {
    return new Promise((res, rej) => {
      const r = new FileReader(); r.onerror = () => rej(new Error("err"));
      r.onload = () => {
        const raw = String(r.result || ""), im = new Image();
        im.onload = () => {
          try {
            const ms = maxSide || 1500; let w = im.width, h = im.height;
            if (w > ms || h > ms) { if (w >= h) { h = Math.round(h * ms / w); w = ms; } else { w = Math.round(w * ms / h); h = ms; } }
            const cv = document.createElement("canvas"); cv.width = w; cv.height = h; cv.getContext("2d").drawImage(im, 0, 0, w, h);
            const cu = cv.toDataURL("image/jpeg", 0.86), ix = cu.indexOf(",");
            res({ mimeType: "image/jpeg", data: cu.slice(ix + 1), previewUrl: cu });
          } catch (e) { const ix = raw.indexOf(","); res({ mimeType: file.type || "image/jpeg", data: raw.slice(ix + 1), previewUrl: raw }); }
        };
        im.onerror = () => { const ix = raw.indexOf(","); res({ mimeType: file.type || "image/jpeg", data: raw.slice(ix + 1), previewUrl: raw }); };
        im.src = raw;
      };
      r.readAsDataURL(file);
    });
  }

  function outWithCopy(el, raw, cb) {
    el.innerHTML = "<div class='output-actions'><button type='button' class='mini-btn copy-out-btn'>📋 نسخ النتيجة لإرسالها واتساب</button></div><div>" + fmt(raw) + "</div>";
    const b = el.querySelector(".copy-out-btn"); if (b) b.addEventListener("click", cb);
  }

  // ===== 1. FULL EXAM / WORKSHEET SOLVER =====
  els.solverUploadBox.addEventListener("click", () => els.solverImageInput.click());
  els.solverImageInput.addEventListener("change", async () => {
    const f = els.solverImageInput.files && els.solverImageInput.files[0]; if (!f) return;
    try {
      const r = await compressImg(f, 1600); uploadedSolverImg = { mimeType: r.mimeType, data: r.data, name: f.name };
      els.solverPreviewImg.src = r.previewUrl; els.solverImageName.textContent = f.name + " (جودة عالية مضغوطة ✓)"; els.solverPreview.style.display = "flex";
    } catch (e) { showToast("تعذر تحميل الصورة"); }
  });
  function clrSolverImg() { uploadedSolverImg = null; els.solverImageInput.value = ""; els.solverPreview.style.display = "none"; els.solverPreviewImg.src = ""; }
  els.clearSolverImgBtn.addEventListener("click", clrSolverImg);
  els.clearSolverBtn.addEventListener("click", () => { els.solverText.value = ""; clrSolverImg(); els.solverOutput.style.display = "none"; lastSolverRaw = ""; });

  els.runSolverBtn.addEventListener("click", async () => {
    if (!els.solverText.value.trim() && !uploadedSolverImg) { showToast("ارفع صورة الورقة أو اكتب الأسئلة أولاً"); return; }
    const sid = els.solverSubject.value, useEn = isEnSub(sid), depth = els.solverDepth.value;
    const isPro = depth === "pro_detailed";
    const ln = useEn ? "طالب مدارس اللغات (English Section): اكتب الحلول والمصطلحات بالإنجليزية المعتمدة في كتاب الوزارة." : "اكتب الحل بالعربية الواضحة المطابقة لكتاب الوزارة.";
    const prompt = [
      "أنت أستاذ أول ومصحح رسمي في نظام البكالوريا المصرية (2026-2027).",
      "الصف: " + gradeLabel() + " | المادة: " + subName(D.SUBJECTS[sid]),
      ln,
      "المطلوب: اقرأ كل الأسئلة الموجودة في الورقة/الصورة أو النص بالترتيب وحلّها جميعًا بدقة 100% دون ترك أي سؤال.",
      depth === "fast" ? "اعرض رقم السؤال ثم الإجابة الصحيحة مباشرة مع سبب مختصر دقيق." : "اعرض رقم السؤال ثم الحل الكامل خطوة بخطوة مع توضيح القاعدة أو القانون المستخدم.",
      "لو في سؤال اختياري، اكتب الحرف/الاختيار الصحيح كاملًا وتأكد من المراجعة الحسابية والنحوية قبل الكتابة.",
      "", "### نص الأسئلة (إن وجد):", els.solverText.value.trim() || "(الأسئلة داخل الصورة المرفقة)"
    ].join("\n");

    els.solverOutput.style.display = "block"; els.solverOutput.innerHTML = "<p>⏳ جاري قراءة الورقة وحل كل الأسئلة بدقة...</p>"; els.runSolverBtn.disabled = true;
    try {
      const res = await callGemini(prompt, uploadedSolverImg, (m) => { els.solverOutput.innerHTML = "<p>" + esc(m) + "</p>"; }, isPro);
      lastSolverRaw = res;
      outWithCopy(els.solverOutput, res, () => copyTxt(lastSolverRaw, "تم نسخ حل الورقة بالكامل!"));
    } catch (e) {
      els.solverOutput.innerHTML = "<p style='color:var(--danger)'><strong>تنبيه:</strong> " + esc(e.message) + "</p>";
    } finally { els.runSolverBtn.disabled = false; }
  });

  // ===== 2. GRADER =====
  els.graderUploadBox.addEventListener("click", () => els.graderImageInput.click());
  els.graderImageInput.addEventListener("change", async () => {
    const f = els.graderImageInput.files && els.graderImageInput.files[0]; if (!f) return;
    try {
      const r = await compressImg(f, 1500); uploadedGraderImg = { mimeType: r.mimeType, data: r.data, name: f.name };
      els.graderPreviewImg.src = r.previewUrl; els.graderImageName.textContent = f.name + " (تم ضغطها ✓)"; els.graderPreview.style.display = "flex";
    } catch (e) { showToast("تعذر تحميل الصورة"); }
  });
  function clrGraderImg() { uploadedGraderImg = null; els.graderImageInput.value = ""; els.graderPreview.style.display = "none"; els.graderPreviewImg.src = ""; }
  els.clearGraderImageBtn.addEventListener("click", clrGraderImg);

  function buildGraderPrompt() {
    const sid = els.graderSubject.value, useEn = isEnSub(sid);
    const mm = { full: "تصحيح كامل + الدرجة من 10 + الصح والغلط + سبب الخطأ + الإجابة النموذجية.", mistakes: "استخراج الأخطاء فقط وتصويبها سريعًا.", teach: "تصحيح الواجب ثم شرح القاعدة بمثال مبسط." };
    const ln = useEn ? "طالب مدارس اللغات (English Section): اكتب التصحيح والمصطلحات بالإنجليزية المعتمدة." : "اكتب التصحيح بالعربية الواضحة المطابقة لكتاب الوزارة.";
    return ["أنت مُصحّح خبير في البكالوريا المصرية (2026-2027).", "الصف: " + gradeLabel() + " | المادة: " + subName(D.SUBJECTS[sid]), ln, "المطلوب: " + mm[els.graderMode.value], "", "### السؤال:", els.graderQuestion.value.trim() || "(في الصورة)", "### إجابة الطالب:", els.graderAnswer.value.trim() || "(في الصورة)"].join("\n");
  }
  function renderHist() {
    const l = storeGet("lak_history", []); if (!l.length) { els.historyList.innerHTML = "<span class='muted'>لا يوجد سجل محفوظ بعد.</span>"; return; }
    els.historyList.innerHTML = "";
    l.forEach((it) => {
      const d = document.createElement("div"); d.className = "history-item";
      d.innerHTML = "<div style='display:flex;justify-content:space-between;gap:8px'><strong>" + esc(it.subject) + "</strong><span class='muted'>" + esc(it.date) + "</span></div><div class='muted' style='margin:4px 0'>" + esc(it.preview) + "</div><div>" + fmt(it.result) + "</div>";
      els.historyList.appendChild(d);
    });
  }
  els.clearHistoryBtn.addEventListener("click", () => { storeSet("lak_history", []); renderHist(); showToast("تم مسح السجل"); });
  els.clearGraderBtn.addEventListener("click", () => { els.graderQuestion.value = ""; els.graderAnswer.value = ""; clrGraderImg(); els.graderOutput.style.display = "none"; lastGraderRaw = ""; });
  els.copyGraderPromptBtn.addEventListener("click", () => copyTxt(buildGraderPrompt()));
  els.runGraderBtn.addEventListener("click", async () => {
    if (!els.graderQuestion.value.trim() && !els.graderAnswer.value.trim() && !uploadedGraderImg) { showToast("اكتب الواجب أو أرفق صورة"); return; }
    els.graderOutput.style.display = "block"; els.graderOutput.innerHTML = "<p>⏳ جاري التصحيح...</p>"; els.runGraderBtn.disabled = true;
    try {
      const res = await callGemini(buildGraderPrompt(), uploadedGraderImg, (m) => { els.graderOutput.innerHTML = "<p>" + esc(m) + "</p>"; }, false);
      lastGraderRaw = res; outWithCopy(els.graderOutput, res, () => copyTxt(lastGraderRaw, "تم نسخ التصحيح!"));
      const h = storeGet("lak_history", []); h.unshift({ subject: subName(D.SUBJECTS[els.graderSubject.value]), date: new Date().toLocaleString("ar-EG"), preview: (els.graderQuestion.value.trim() || els.graderAnswer.value.trim() || "صورة واجب").slice(0, 85), result: res });
      storeSet("lak_history", h.slice(0, 10)); renderHist();
    } catch (e) {
      els.graderOutput.innerHTML = "<p style='color:var(--danger)'><strong>تنبيه:</strong> " + esc(e.message) + "</p>";
    } finally { els.runGraderBtn.disabled = false; }
  });

  // ===== 3. TUTOR =====
  function buildTutorPrompt() {
    const sid = els.tutorSubject.value, useEn = isEnSub(sid);
    const tm = { explain: "اشرح الدرس بأسلوب سهل ومنظم مع أمثلة محلولة ونقاط الامتحان.", solve: "حل السؤال خطوة بخطوة مع توضيح القانون أو القاعدة.", summary: "لخّص أهم الأفكار والقوانين في نقاط مركزة." };
    const ln = useEn ? "طالب مدارس اللغات (English Section): اشرح وحل بالإنجليزية الرسمية لمنهج البكالوريا المصرية." : "اشرح بالعربية الواضحة المطابقة لكتاب الوزارة.";
    let p = ["أنت معلم خبير في البكالوريا المصرية (2026-2027).", "الصف: " + gradeLabel() + " | المادة: " + subName(D.SUBJECTS[sid]), ln, "الموضوع: " + (els.tutorInput.value.trim() || "مقدمة"), "المطلوب: " + tm[els.tutorTask.value]].join("\n");
    if (els.tutorRef.value.trim()) p += "\n\n### النص المرجعي:\n" + els.tutorRef.value.trim();
    return p;
  }
  els.copyTutorPromptBtn.addEventListener("click", () => copyTxt(buildTutorPrompt()));
  els.runTutorBtn.addEventListener("click", async () => {
    if (!els.tutorInput.value.trim()) { showToast("اكتب اسم الدرس أو السؤال"); return; }
    els.tutorOutput.style.display = "block"; els.tutorOutput.innerHTML = "<p>⏳ جاري التحضير...</p>"; els.runTutorBtn.disabled = true;
    try {
      const res = await callGemini(buildTutorPrompt(), null, (m) => { els.tutorOutput.innerHTML = "<p>" + esc(m) + "</p>"; }, false);
      lastTutorRaw = res; outWithCopy(els.tutorOutput, res, () => copyTxt(lastTutorRaw, "تم نسخ الشرح!"));
    } catch (e) {
      els.tutorOutput.innerHTML = "<p style='color:var(--danger)'><strong>تنبيه:</strong> " + esc(e.message) + "</p>";
    } finally { els.runTutorBtn.disabled = false; }
  });

  // ===== 4. CURRICULUM =====
  function renderCurriculum() {
    const tk = els.curriculumTrackSelect.value;
    const sids = currentGrade === "g1" ? getGradeSubIds(false) : getTrackSubIds(tk).concat(["g2_pe"]);
    const prog = storeGet("lak_progress", {});
    let tot = 0, done = 0; els.curriculumGrid.innerHTML = "";
    sids.forEach((sid) => {
      const sub = D.SUBJECTS[sid], card = document.createElement("div"); card.className = "subject-card";
      const hd = document.createElement("div");
      hd.innerHTML = "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap'><strong>" + esc(subName(sub)) + "</strong><span class='badge " + esc(sub.badge) + "'>" + esc(subType(sub)) + "</span></div>";
      card.appendChild(hd);
      const uw = document.createElement("div");
      subUnits(sub).forEach((ut, idx) => {
        const k = sid + "_" + idx; tot++; if (prog[k]) done++;
        const row = document.createElement("div"); row.className = "unit-item";
        const lf = document.createElement("label"); lf.className = "unit-left"; lf.style.marginBottom = "0"; lf.style.fontWeight = "500";
        const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = Boolean(prog[k]);
        cb.addEventListener("change", () => { const p = storeGet("lak_progress", {}); p[k] = cb.checked; storeSet("lak_progress", p); updProg(); });
        const sp = document.createElement("span"); sp.textContent = ut; lf.appendChild(cb); lf.appendChild(sp);
        const btns = document.createElement("div"); btns.className = "unit-btns";
        const b1 = document.createElement("button"); b1.type = "button"; b1.className = "mini-btn"; b1.textContent = "📖 اشرح";
        b1.addEventListener("click", () => {
          if (currentGrade === "g2") { els.tutorTrack.value = tk; els.tutorTrack.dispatchEvent(new Event("change")); }
          if (sid !== "g2_pe") els.tutorSubject.value = sid;
          els.tutorTask.value = "explain"; els.tutorInput.value = ut; switchTab("tutor");
        });
        btns.appendChild(b1);
        if (sid !== "g2_pe") {
          const b2 = document.createElement("button"); b2.type = "button"; b2.className = "mini-btn green"; b2.textContent = "📝 حل تقييم الدرس";
          b2.addEventListener("click", () => {
            els.quizModeSelect.value = "assessment"; els.quizUnitWrap.style.display = "block";
            els.quizSubjectSelect.value = sid; fillQuizUnits(); els.quizUnitSelect.value = String(idx);
            switchTab("quiz"); startOfflineTest();
          });
          btns.appendChild(b2);
        }
        row.appendChild(lf); row.appendChild(btns); uw.appendChild(row);
      });
      card.appendChild(uw); els.curriculumGrid.appendChild(card);
    });
    const pct = tot ? Math.round(done / tot * 100) : 0;
    els.progressText.textContent = done + " / " + tot + " (" + pct + "%)"; els.progressBarFill.style.width = pct + "%";
  }
  function updProg() {
    const tk = els.curriculumTrackSelect.value, sids = currentGrade === "g1" ? getGradeSubIds(false) : getTrackSubIds(tk).concat(["g2_pe"]), prog = storeGet("lak_progress", {});
    let tot = 0, done = 0; sids.forEach((sid) => subUnits(D.SUBJECTS[sid]).forEach((_, i) => { tot++; if (prog[sid + "_" + i]) done++; }));
    const pct = tot ? Math.round(done / tot * 100) : 0;
    els.progressText.textContent = done + " / " + tot + " (" + pct + "%)"; els.progressBarFill.style.width = pct + "%";
  }
  els.curriculumTrackSelect.addEventListener("change", renderCurriculum);

  // ===== 5. ASSESSMENTS & HEAVY EXAMS (SOLVE FIRST -> AUTO GRADE) =====
  function stopTimer() { if (timerInt) { clearInterval(timerInt); timerInt = null; } }
  function startTimer(sec) {
    stopTimer(); timerSec = sec; els.examTimerBadge.style.display = "inline-block";
    function draw() { const m = String(Math.floor(timerSec / 60)).padStart(2, "0"), s = String(timerSec % 60).padStart(2, "0"); els.examTimerBadge.textContent = "⏱ " + m + ":" + s; }
    draw();
    timerInt = setInterval(() => {
      if (testSubmitted) { stopTimer(); return; }
      timerSec--; draw();
      if (timerSec <= 0) { stopTimer(); showToast("انتهى الوقت! جاري التصحيح التلقائي..."); gradeCurrentTest(); }
    }, 1000);
  }

  function getOfflineQuestions(mode, sid, uidx) {
    if (mode === "assessment") {
      const exact = D.ASSESSMENT_BANK[sid + "_" + uidx];
      if (exact && exact.length) return JSON.parse(JSON.stringify(exact));
    }
    let pool = [];
    Object.keys(D.ASSESSMENT_BANK).forEach((k) => { if (k.startsWith(sid + "_")) pool = pool.concat(D.ASSESSMENT_BANK[k]); });
    if (mode === "heavy_exam") {
      Object.keys(D.ASSESSMENT_BANK).forEach((k) => {
        if (k.startsWith(currentGrade + "_") && !k.startsWith(sid + "_")) {
          if (pool.length < 8) pool = pool.concat(D.ASSESSMENT_BANK[k].slice(0, 1));
        }
      });
      const mcqs = JSON.parse(JSON.stringify(pool.slice(0, 8)));
      const subT = subName(D.SUBJECTS[sid]);
      const ess = isEnSub(sid)
        ? [
          { type: "essay", q: "Explain two core concepts or laws from (" + subT + ") with a practical example.", model: "State two key laws clearly with accurate definitions and a solved example." },
          { type: "essay", q: "Compare or analyze a major problem/case you studied in (" + subT + ").", model: "Give a structured comparison mentioning conditions, formulas, and conclusions." }
        ]
        : [
          { type: "essay", q: "اشرح بأسلوبك قاعدتين أو مفهومين أساسيين في مادة (" + subT + ") مع ذكر مثال تطبيقي صحيح لكل منهما.", model: "تُذكر القاعدتان بدقة مع شروطهما وأمثلة تطبيقية صحيحة." },
          { type: "essay", q: "ما أهم استنتاج أو مهارة تطبيقية تعلمتها في منهج (" + subT + ") وكيف تُوظفها في الامتحان؟", model: "إجابة منظمة تربط الفهم بالتطبيق العلمي أو اللغوي الصحيح." }
        ];
      return mcqs.concat(ess);
    }
    return JSON.parse(JSON.stringify(pool));
  }

  function updAnswered() {
    let cnt = 0;
    currentQuestions.forEach((q, i) => {
      if (q.type === "essay") { if (userAnswers[i] && String(userAnswers[i]).trim().length > 1) cnt++; }
      else { if (userAnswers[i] !== null && userAnswers[i] !== undefined) cnt++; }
    });
    els.answeredCountBadge.textContent = "تم حل " + cnt + " من " + currentQuestions.length;
  }

  function loadTestUI(title, questions, isExam) {
    stopTimer(); currentQuestions = questions; userAnswers = new Array(questions.length).fill(null); testSubmitted = false;
    els.testArea.style.display = "block"; els.testHeaderTitle.textContent = title;
    els.testSubmitRow.style.display = questions.length ? "flex" : "none";
    els.submitTestBtn.disabled = false; els.testResultCard.style.display = "none";
    els.testQuestionsContainer.innerHTML = "";
    if (!questions.length) {
      els.testQuestionsContainer.innerHTML = "<div class='card'>اضغط <strong>«✨ توليد أسئلة تقييمات / امتحان مكثف بالـ AI»</strong> بالأعلى لتوليد أسئلة جديدة لهذا الدرس الآن!</div>";
      els.examTimerBadge.style.display = "none"; updAnswered(); return;
    }
    questions.forEach((qObj, qIdx) => {
      const box = document.createElement("div"); box.className = "quiz-q"; box.id = "qbox_" + qIdx;
      const badgeTxt = qObj.type === "essay" ? "مقالي قصير" : "اختيار من متعدد";
      box.innerHTML = "<div style='display:flex;justify-content:space-between;gap:8px;margin-bottom:6px'><strong>س" + (qIdx + 1) + ":</strong><span class='badge'>" + badgeTxt + "</span></div><div style='font-weight:700;margin-bottom:6px'>" + esc(qObj.q) + "</div>";
      if (qObj.type === "essay") {
        const ta = document.createElement("textarea"); ta.style.minHeight = "80px"; ta.placeholder = "اكتب إجابتك هنا قبل التسليم...";
        ta.addEventListener("input", () => { if (!testSubmitted) { userAnswers[qIdx] = ta.value; updAnswered(); } });
        box.appendChild(ta);
      } else {
        const optGroup = [];
        qObj.opts.forEach((ot, oi) => {
          const ob = document.createElement("div"); ob.className = "quiz-opt"; ob.textContent = ot;
          ob.addEventListener("click", () => {
            if (testSubmitted) return;
            userAnswers[qIdx] = oi; optGroup.forEach((x) => x.classList.remove("selected")); ob.classList.add("selected");
            updAnswered();
          });
          optGroup.push(ob); box.appendChild(ob);
        });
      }
      const exp = document.createElement("div"); exp.className = "quiz-exp"; exp.id = "qexp_" + qIdx; box.appendChild(exp);
      els.testQuestionsContainer.appendChild(box);
    });
    updAnswered();
    if (isExam) startTimer(questions.length * 90); else els.examTimerBadge.style.display = "none";
  }

  function startOfflineTest() {
    const mode = els.quizModeSelect.value, sid = els.quizSubjectSelect.value, uidx = els.quizUnitSelect.value || "0";
    const sName = subName(D.SUBJECTS[sid]), uName = subUnits(D.SUBJECTS[sid])[Number(uidx) || 0];
    const title = mode === "assessment" ? ("📝 تقييم: " + sName + " — " + uName) : ("🔥 امتحان شامل مكثف: " + sName);
    loadTestUI(title, getOfflineQuestions(mode, sid, uidx), mode === "heavy_exam");
  }
  els.startOfflineTestBtn.addEventListener("click", startOfflineTest);

  els.startAiTestBtn.addEventListener("click", async () => {
    const mode = els.quizModeSelect.value, sid = els.quizSubjectSelect.value, uidx = els.quizUnitSelect.value || "0";
    const sName = subName(D.SUBJECTS[sid]), uName = subUnits(D.SUBJECTS[sid])[Number(uidx) || 0], useEn = isEnSub(sid);
    els.testArea.style.display = "block"; els.testQuestionsContainer.innerHTML = "<p>⏳ جاري تجهيز بنك أسئلة مكثف مطابق لتقييمات الوزارة...</p>";
    els.testSubmitRow.style.display = "none"; els.testResultCard.style.display = "none"; els.startAiTestBtn.disabled = true;
    const langSpec = useEn ? "اكتب الأسئلة والاختيارات والشرح بالإنجليزية الرسمية لمنهج مدارس اللغات المصرية." : "اكتب الأسئلة بالعربية المطابقة لتقييمات الوزارة المصرية.";
    const reqSpec = mode === "assessment"
      ? "أنشئ 10 أسئلة تقييمات وزارة دقيقة ومتدرجة الصعوبة (8 اختيار من متعدد + 2 مقالي قصير) على درس: (" + uName + ") في مادة (" + sName + ") لـ " + gradeLabel() + "."
      : "أنشئ امتحانًا شاملًا مكثفًا من 15 سؤالًا (12 اختيار من متعدد + 3 أسئلة مقالية قصيرة بمواصفات التقييم الجديد) على منهج (" + sName + ") لـ " + gradeLabel() + ".";
    const prompt = reqSpec + "\n" + langSpec + "\nأرجع JSON Array فقط بدون أي نص خارجي:\n" + '[{"type":"mcq","q":"...","opts":["...","...","...","..."],"ans":0,"exp":"..."},{"type":"essay","q":"...","model":"الإجابة النموذجية","exp":"ملاحظة"}]';
    try {
      const raw = await callGemini(prompt, null, (m) => { els.testQuestionsContainer.innerHTML = "<p>" + esc(m) + "</p>"; }, mode === "heavy_exam");
      const match = raw.match(/\[[\s\S]*\]/); if (!match) throw new Error("تعذر قراءة الأسئلة");
      const parsed = JSON.parse(match[0]); if (!Array.isArray(parsed) || !parsed.length) throw new Error("الأسئلة فارغة");
      parsed.forEach((it) => { if (!it.type) it.type = Array.isArray(it.opts) ? "mcq" : "essay"; });
      const title = mode === "assessment" ? ("✨ تقييم مكثف AI (10 أسئلة): " + uName) : ("🔥 امتحان شامل مكثف AI (15 سؤالًا): " + sName);
      loadTestUI(title, parsed, mode === "heavy_exam");
    } catch (e) {
      els.testQuestionsContainer.innerHTML = "<p style='color:var(--danger)'><strong>تنبيه:</strong> " + esc(e.message) + "</p>";
    } finally { els.startAiTestBtn.disabled = false; }
  });

  async function gradeCurrentTest() {
    if (testSubmitted) return;
    testSubmitted = true; stopTimer(); els.submitTestBtn.disabled = true;
    let mcqTotal = 0, mcqCorrect = 0, essayIndices = [];
    currentQuestions.forEach((q, i) => {
      const box = document.getElementById("qbox_" + i), exp = document.getElementById("qexp_" + i);
      if (q.type === "essay") {
        essayIndices.push(i); const ta = box.querySelector("textarea"); if (ta) ta.disabled = true;
      } else {
        mcqTotal++;
        const opts = box.querySelectorAll(".quiz-opt"), chosen = userAnswers[i];
        opts.forEach((o) => o.classList.remove("selected"));
        if (chosen === q.ans) { mcqCorrect++; if (opts[chosen]) opts[chosen].classList.add("correct"); exp.innerHTML = "<strong>✅ إجابة صحيحة!</strong> " + esc(q.exp || ""); }
        else {
          if (chosen !== null && opts[chosen]) opts[chosen].classList.add("wrong");
          if (opts[q.ans]) opts[q.ans].classList.add("correct");
          exp.innerHTML = "<strong>❌ " + (chosen === null ? "لم تختر إجابة" : "إجابة خاطئة") + ":</strong> " + esc(q.exp || "");
        }
        exp.style.display = "block";
      }
    });

    let essayEarned = 0, essayMax = 0, essayNote = "";
    if (essayIndices.length) {
      const payload = essayIndices.map((idx) => ({ idx: idx, q: currentQuestions[idx].q, model: currentQuestions[idx].model || "", student: String(userAnswers[idx] || "").trim() }));
      els.testResultCard.style.display = "block"; els.testResultCard.innerHTML = "<p>⏳ جاري تصحيح الأسئلة المقالية بالذكاء الاصطناعي...</p>";
      try {
        const gPrompt = "صحح إجابات الطالب المقالية بدقة (كل سؤال من 2 درجة). أرجع JSON فقط:\n" + '[{"idx":0,"score":2,"feedback":"..."}]\n' + JSON.stringify(payload);
        const raw = await callGemini(gPrompt, null, null, false);
        const m = raw.match(/\[[\s\S]*\]/);
        if (m) {
          const arr = JSON.parse(m[0]);
          arr.forEach((r) => {
            const q = currentQuestions[r.idx], exp = document.getElementById("qexp_" + r.idx);
            const sc = Math.max(0, Math.min(2, Number(r.score) || 0));
            essayEarned += sc; essayMax += 2;
            if (exp) { exp.innerHTML = "<strong>درجة المقالي: " + sc + " / 2</strong> — " + esc(r.feedback || "") + "<br><strong>الإجابة النموذجية:</strong> " + esc(q.model || ""); exp.style.display = "block"; }
          });
        }
      } catch (err) { essayNote = "تم عرض الإجابة النموذجية للمقالي للمراجعة الذاتية."; }
      if (essayMax === 0) {
        essayIndices.forEach((idx) => {
          const q = currentQuestions[idx], exp = document.getElementById("qexp_" + idx);
          if (exp) { exp.innerHTML = "<strong>الإجابة النموذجية (المقالي):</strong> " + esc(q.model || q.exp || ""); exp.style.display = "block"; }
        });
        if (!essayNote) essayNote = "تم عرض الإجابات النموذجية للأسئلة المقالية.";
      }
    }

    const totalEarned = mcqCorrect + essayEarned, totalMax = mcqTotal + essayMax;
    const pct = totalMax ? Math.round(totalEarned / totalMax * 100) : 0;
    const gradeMsg = pct >= 85 ? "ممتاز جدًا! 🏆" : pct >= 70 ? "جيد جدًا! 👏" : pct >= 50 ? "جيد — راجع أخطاءك 💪" : "محتاج مراجعة تانية 📖";
    els.testResultCard.style.display = "block";
    els.testResultCard.innerHTML =
      "<div class='card' style='background:var(--surface-2);border-color:var(--primary)'>" +
      "<h3>📊 النتيجة النهائية: " + totalEarned + " من " + totalMax + " (" + pct + "%) — " + gradeMsg + "</h3>" +
      (essayNote ? "<p class='muted' style='margin-top:6px'>" + esc(essayNote) + "</p>" : "") +
      "<div class='btn-row'><button type='button' class='btn btn-primary' id='retryTestBtn'>🔄 إعادة الحل</button><button type='button' class='btn btn-secondary' id='copyScoreBtn'>📋 نسخ النتيجة</button></div>" +
      "</div>";
    $("retryTestBtn").addEventListener("click", () => loadTestUI(els.testHeaderTitle.textContent, currentQuestions, els.quizModeSelect.value === "heavy_exam"));
    $("copyScoreBtn").addEventListener("click", () => copyTxt("نتيجتي في " + els.testHeaderTitle.textContent + ": " + totalEarned + " / " + totalMax + " (" + pct + "%)", "تم نسخ النتيجة!"));
    els.testResultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  els.submitTestBtn.addEventListener("click", gradeCurrentTest);

  // ===== 6. MONTHLY SUMMARIES =====
  function renderMonthSummary() {
    const mKey = els.monthSelect.value;
    const data = (D.MONTHLY_SUMMARIES[currentGrade] && D.MONTHLY_SUMMARIES[currentGrade][mKey]) || null;
    if (!data) { els.monthSummaryBox.innerHTML = "<p class='muted'>لا يوجد ملخص مدمج لهذا الشهر.</p>"; return; }
    let html = "<h3 style='color:var(--primary);margin-bottom:10px'>" + esc(data.title) + "</h3>";
    data.items.forEach((sec) => {
      html += "<div class='card' style='background:var(--bg);margin-bottom:10px;padding:14px'><strong style='color:var(--primary)'>" + esc(sec.sub) + "</strong><ul style='padding-right:20px;margin-top:6px'>";
      sec.pts.forEach((pt) => { html += "<li style='margin-bottom:4px'>" + esc(pt) + "</li>"; });
      html += "</ul></div>";
    });
    els.monthSummaryBox.innerHTML = html;
  }
  els.monthSelect.addEventListener("change", renderMonthSummary);

  els.genAiMonthBtn.addEventListener("click", async () => {
    const mName = els.monthSelect.options[els.monthSelect.selectedIndex].textContent;
    const sid = els.monthSubjectSelect.value, useEn = isEnSub(sid);
    const sName = subName(D.SUBJECTS[sid]);
    const ln = useEn ? "اكتب الملخص بالمصطلحات الإنجليزية المعتمدة لمدارس اللغات مع توضيحات سريعة." : "اكتب الملخص بالعربية المنظمة المطابقة لكتاب الوزارة.";
    const prompt = [
      "أنت خبير مناهج البكالوريا المصرية (2026-2027).",
      "أنشئ ملخصًا مركزًا ومليئًا بكل النقاط المهمة والقوانين وأسئلة التقييمات المتوقعة لـ (" + mName + ") في مادة (" + sName + ") لـ (" + gradeLabel() + ").",
      ln,
      "رتّبه تحت عناوين: **أهم المفاهيم والقواعد**، **القوانين أو النقاط اللي بتيجي في الامتحان**، **3 تريكات وتنبيهات مهمة**."
    ].join("\n");
    els.monthAiOutput.style.display = "block"; els.monthAiOutput.innerHTML = "<p>⏳ جاري تجهيز ملخص الشهر الشامل...</p>"; els.genAiMonthBtn.disabled = true;
    try {
      const res = await callGemini(prompt, null, (m) => { els.monthAiOutput.innerHTML = "<p>" + esc(m) + "</p>"; }, false);
      lastMonthRaw = res; outWithCopy(els.monthAiOutput, res, () => copyTxt(lastMonthRaw, "تم نسخ الملخص!"));
    } catch (e) {
      els.monthAiOutput.innerHTML = "<p style='color:var(--danger)'><strong>تنبيه:</strong> " + esc(e.message) + "</p>";
    } finally { els.genAiMonthBtn.disabled = false; }
  });

  // ===== INIT =====
  applyTheme(); updApi(); refreshAllSelectors(); renderHist();
})();
