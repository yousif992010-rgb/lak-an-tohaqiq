window.LAK_DATA = {
  GRADES: {
    g1: { name: "الصف الأول بكالوريا (2026-2027)", nameEn: "Grade 1 Baccalaureate" },
    g2: { name: "الصف الثاني بكالوريا (2026-2027)", nameEn: "Grade 2 Baccalaureate" }
  },

  G1_GROUPS: {
    core: { name: "المواد الأساسية المضافة للمجموع (600 درجة)", nameEn: "Core Subjects (600 Marks)" },
    extra: { name: "مواد خارج المجموع (نجاح ورسوب)", nameEn: "Pass/Fail Subjects (Non-Total)" }
  },

  G2_TRACKS: {
    medicine: { name: "مسار الطب وعلوم الحياة", nameEn: "Medicine & Life Sciences", specIds: ["g2_physics", "g2_math"] },
    engineering: { name: "مسار الهندسة وعلوم الحاسب", nameEn: "Engineering & Computer Science", specIds: ["g2_chemistry", "g2_programming"] },
    business: { name: "مسار الأعمال", nameEn: "Business Track", specIds: ["g2_accounting", "g2_management"] },
    arts: { name: "مسار الآداب والفنون", nameEn: "Arts & Humanities", specIds: ["g2_psychology", "g2_lang2"] }
  },

  EN_SUBS: [
    "g1_english", "g1_math", "g1_science", "g1_philosophy", "g1_programming", "g1_lang2",
    "g2_english", "g2_physics", "g2_math", "g2_chemistry", "g2_programming", "g2_accounting", "g2_management", "g2_psychology", "g2_lang2"
  ],

  SUBJECTS: {
    g1_arabic: {
      id: "g1_arabic", grade: "g1", name: "اللغة العربية (أولى)", type: "أساسية — 100 درجة", badge: "green",
      units: [
        "الوحدة 1: الحضارة والهوية (أسلوب الاستثناء بإلا وغير وسوى وعدا وخلا وحاشا)",
        "الوحدة 2: القيم والحياة (الاسم المقصور والمنقوص والممدود)",
        "الوحدة 3: التثبيت والتلخيص (إسناد الأفعال للضمائر والملحقات)",
        "الأدب والبلاغة (الجاهلي، صدر الإسلام، الأموي، التشبيه والاستعارة والكناية والمجاز)",
        "القراءة المتحررة والنصوص والقصة المقررة + التقييمات الأسبوعية"
      ]
    },
    g1_english: {
      id: "g1_english", grade: "g1", name: "اللغة الإنجليزية (أولى)", nameEn: "English 1st Lang (Grade 1)", type: "أساسية — 100 درجة", typeEn: "Core — 100 Marks", badge: "green",
      units: [
        "Term 1 Units 1-3: Eco-tourism, Supporting Community & Improving Lives",
        "Term 1 Units 4-6: Making Friends, Communication & Literature",
        "Term 2 Units 7-12 + Grammar (Conditionals, Reported Speech, Passive)",
        "Story: Treasure Island + Weekly Assessments"
      ],
      unitsEn: [
        "Term 1 Units 1-3: Eco-tourism, Community & Improving Lives",
        "Term 1 Units 4-6: Communication, Tech & Literature",
        "Term 2 Units 7-12 + Grammar (Conditionals, Reported Speech, Passive)",
        "Story: Treasure Island + Weekly Assessments"
      ]
    },
    g1_history: {
      id: "g1_history", grade: "g1", name: "التاريخ المصري (أولى)", type: "أساسية — 100 درجة", badge: "green",
      units: [
        "الوحدة 1: مدخل لدراسة حضارة مصر والعالم القديم ومصادرها",
        "الوحدة 2: حضارة مصر القديمة (الدولة القديمة والوسطى والحديثة والحياة السياسية والاقتصادية)",
        "الوحدة 3: حضارة بلاد العراق القديم وحضارة فينيقيا",
        "الوحدة 4: الحضارة اليونانية والرومانية ومصر تحت حكم البطالمة والرومان (الترم الثاني)"
      ]
    },
    g1_math: {
      id: "g1_math", grade: "g1", name: "الرياضيات (أولى)", nameEn: "Mathematics (Grade 1 Languages)", type: "أساسية — 100 درجة", typeEn: "Core — 100 Marks", badge: "green",
      units: [
        "الجبر: المعادلة التربيعية والأعداد المركبة وبحث إشارة الدالة (الترم 1)",
        "حساب المثلثات: الزاوية الموجهة والدوال المثلثية وقانون الجيب وجيب التمام",
        "الهندسة: التشابه + المتجهات وتقسيم قطعة مستقيمة ومعادلة الخط المستقيم (الترم 2)",
        "المصفوفات والمحددات والبرمجة الخطية (الترم 2)"
      ],
      unitsEn: [
        "Algebra: Quadratic Equations, Complex Numbers & Sign of Function (Term 1)",
        "Trigonometry: Directed Angle, Trig Functions & Related Angles",
        "Geometry: Similarity, Vectors & Equation of Straight Line (Term 2)",
        "Matrices, Determinants & Linear Programming (Term 2)"
      ]
    },
    g1_science: {
      id: "g1_science", grade: "g1", name: "العلوم المتكاملة (أولى)", nameEn: "Integrated Sciences (Grade 1 Languages)", type: "أساسية — 100 درجة", typeEn: "Core — 100 Marks", badge: "green",
      units: [
        "الفصل 1: النظام البيئي المائي (خواص الماء، الرابطة الهيدروجينية، التوازن المائي و pH)",
        "الفصل 2: الغلاف الجوي (طبقات الجو، الضغط الجوي، الاحتباس الحراري والأوزون)",
        "الفصل 3: التربة واستدامتها (مكونات التربة، التملح، والتلوث الزراعي)",
        "الفصل 4 + الترم الثاني: الطاقة والموارد المتجددة والاستدامة البيئية"
      ],
      unitsEn: [
        "Ch 1: Aquatic Ecosystem (Properties of Water, Hydrogen Bonding, pH & Osmosis)",
        "Ch 2: Atmosphere (Layers, Pressure, Greenhouse Effect & Ozone)",
        "Ch 3: Soil Sustainability (Composition, Salinization & Pollution)",
        "Ch 4 & Term 2: Energy Transformations, Renewable Resources & Sustainability"
      ]
    },
    g1_philosophy: {
      id: "g1_philosophy", grade: "g1", name: "الفلسفة والمنطق (أولى)", nameEn: "Philosophy & Logic (Grade 1)", type: "أساسية — 100 درجة", typeEn: "Core — 100 Marks", badge: "green",
      units: [
        "الوحدة 1: التفكير الإنساني ومبادئ التفكير الفلسفي وخصائصه ومهاراته",
        "الوحدة 2: مبادئ التفكير العلمي والتفكير الناقد والإبداعي",
        "الوحدة 3 (المنطق): مبادئ المنطق والحدود والقضايا والاستدلال والقياس (الترم 2)"
      ],
      unitsEn: [
        "Unit 1: Human Thinking & Philosophical Thinking Characteristics & Skills",
        "Unit 2: Scientific Thinking, Critical & Creative Thinking",
        "Unit 3: Principles of Logic, Propositions, Inference & Syllogism"
      ]
    },
    g1_programming: {
      id: "g1_programming", grade: "g1", name: "البرمجة والذكاء الاصطناعي (أولى)", nameEn: "Programming & AI (Grade 1)", type: "خارج المجموع — نجاح ورسوب", typeEn: "Pass/Fail — Non-Total", badge: "amber",
      units: [
        "أساسيات الخوارزميات والتفكير المنطقي وكتابة الأكواد (منصة Qureo)",
        "بناء صفحات الويب (HTML / CSS / JS) والمتغيرات والشروط والحلقات",
        "مقدمة الأمن السيبراني ومبادئ الذكاء الاصطناعي وتطبيقاته"
      ],
      unitsEn: [
        "Algorithms, Flowcharts & Coding Fundamentals (Variables, Loops, Conditions)",
        "Web Basics (HTML / CSS / JS) & Problem Solving",
        "Intro to Cybersecurity & Artificial Intelligence Applications"
      ]
    },
    g1_lang2: {
      id: "g1_lang2", grade: "g1", name: "اللغة الأجنبية الثانية (أولى)", nameEn: "2nd Foreign Language (Grade 1)", type: "خارج المجموع — نجاح ورسوب", typeEn: "Pass/Fail", badge: "amber",
      units: ["الوحدة 1 و 2: التحيات، التقديم، الأعداد، والأفعال الأساسية (الترم 1)", "الوحدة 3 و 4: المدرسة، الأسرة، الوصف، والمواقف اليومية (الترم 2)"]
    },
    g1_religion: {
      id: "g1_religion", grade: "g1", name: "التربية الدينية (أولى)", type: "خارج المجموع (نجاح من 70%)", badge: "",
      units: ["العقيدة والعبادات والقرآن/النصوص والأخلاق والقيم الإنسانية", "الموضوعات المقررة للترم الثاني والتقييمات"]
    },
    g1_civics: {
      id: "g1_civics", grade: "g1", name: "التربية الوطنية (أولى)", type: "خارج المجموع — نجاح ورسوب", badge: "",
      units: ["الشخصية المصرية والانتماء والمواطنة والدستور والحقوق والواجبات"]
    },

    g2_arabic: {
      id: "g2_arabic", grade: "g2", name: "اللغة العربية (تانية)", type: "أساسية مشتركة — 100 درجة", badge: "green",
      units: [
        "الوحدة 1: العلم والضمير (الأسماء الخمسة وشروط إعرابها)",
        "الوحدة 2: سلطان الكلمة الرقمية (الممنوع من الصرف لعلة ولعلتين)",
        "الوحدة 3: الإنسان وكرامته (التوابع: النعت والبدل والعطف)",
        "الوحدة 4: بناء الوعي",
        "الوحدة 5: فن التفاوض",
        "الوحدة 6: الثقافة أسلوب حياة",
        "كتاب القصة والأعمال الأدبية (10 قصص: كفاح طيبة، عودة الروح، وا إسلاماه...)"
      ]
    },
    g2_english: {
      id: "g2_english", grade: "g2", name: "اللغة الأجنبية الأولى (تانية)", nameEn: "English 1st Lang (Grade 2)", type: "أساسية — 100 درجة", typeEn: "Core — 100 Marks", badge: "green",
      units: [
        "Unit 1: Social Reflection & Shared Responsibility",
        "Unit 2: Leisure in a Digital World & Lifelong Activity",
        "باقي وحدات كتاب الطالب (الترم الأول والثاني)",
        "القصة المقررة (Reader Chapters) + التقييمات الأسبوعية"
      ],
      unitsEn: [
        "Unit 1: Social Reflection & Shared Responsibility",
        "Unit 2: Leisure in a Digital World & Lifelong Activity",
        "Remaining Student Book Units (Term 1 & Term 2)",
        "Prescribed Reader Chapters & Weekly Assessments"
      ]
    },
    g2_history: {
      id: "g2_history", grade: "g2", name: "التاريخ المصري (تانية)", type: "أساسية مشتركة — 100 درجة", badge: "green",
      units: [
        "الوحدة 1: مصر بين الماضي والحاضر (بناء الدولة ومقاومة الاحتلال)",
        "الوحدة 2: تحولات القوة وبناء الوعي (صمود الشعب وثورة 23 يوليو)",
        "الوحدة 3: مصر وقضايا التحرر الوطني في الوطن العربي وإفريقيا",
        "الوحدة 4: الحرب العالمية الأولى والثانية والحرب الباردة",
        "الوحدة 5: مصر والقضية الفلسطينية والتحولات الدولية"
      ]
    },
    g2_physics: {
      id: "g2_physics", grade: "g2", name: "الفيزياء (تانية)", nameEn: "Physics (Grade 2 Languages)", type: "تخصص الطب — 100 درجة", typeEn: "Medicine Elective — 100 Marks", badge: "amber",
      units: ["الفصل 1: متجهات السرعة والسرعة النسبية وتطبيقاتها", "باقي فصول الكتاب الأول والتقييمات", "كتاب الطالب الجزء الثاني (الترم الثاني)"],
      unitsEn: ["Ch 1: Velocity Vectors & Relative Velocity", "Remaining Term 1 Chapters & Assessments", "Student Book Part 2 (Term 2)"]
    },
    g2_math: {
      id: "g2_math", grade: "g2", name: "الرياضيات (تانية)", nameEn: "Mathematics (Grade 2 Languages)", type: "تخصص الطب — 100 درجة", typeEn: "Medicine Elective — 100 Marks", badge: "amber",
      units: ["الدوال الحقيقية والعمليات عليها وتركيب الدوال", "الجبر والتفاضل والمثلثات — الجزء الأول", "كتاب الطالب الجزء الثاني"],
      unitsEn: ["Real Functions, Operations & Composition", "Algebra, Calculus & Trigonometry — Part 1", "Student Book Part 2"]
    },
    g2_chemistry: {
      id: "g2_chemistry", grade: "g2", name: "الكيمياء (تانية)", nameEn: "Chemistry (Grade 2 Languages)", type: "تخصص الهندسة — 100 درجة", typeEn: "Engineering Elective — 100 Marks", badge: "amber",
      units: ["بنية الذرة وأعداد الكم ومبادئ التوزيع الإلكتروني", "الجدول الدوري والروابط الكيميائية — الجزء الأول", "كتاب الطالب الجزء الثاني"],
      unitsEn: ["Atomic Structure, Quantum Numbers & Electron Config", "Periodic Table & Chemical Bonding — Part 1", "Student Book Part 2"]
    },
    g2_programming: {
      id: "g2_programming", grade: "g2", name: "البرمجة والذكاء الاصطناعي (تانية)", nameEn: "Programming & AI (Grade 2)", type: "تخصص الهندسة — 100 درجة", typeEn: "Engineering Elective — 100 Marks", badge: "amber",
      units: ["الفصل 1: تكنولوجيا المعلومات والمجتمع وأخلاقيات AI", "الفصل 2: الأمن السيبراني (التشفير والمصادقة والشبكات)", "الفصل 3: تطبيقات الويب وبروتوكولات الاتصال", "الفصل 4 + منهج الترم الثاني"],
      unitsEn: ["Ch 1: IT, Society & AI Ethics", "Ch 2: Cybersecurity (Encryption, Auth & Networks)", "Ch 3: Web Applications & HTTP/HTTPS", "Ch 4 + Term 2 Projects"]
    },
    g2_accounting: {
      id: "g2_accounting", grade: "g2", name: "المحاسبة (تانية)", nameEn: "Accounting (Grade 2 Languages)", type: "تخصص الأعمال — 100 درجة", typeEn: "Business Elective — 100 Marks", badge: "amber",
      units: ["الجزء الأول: المفاهيم المحاسبية وتسجيل العمليات والتقارير", "الجزء الثاني: القيد المفرد، السجلات غير المكتملة، وتسوية البنك", "كتاب الأداءات والتقييمات"],
      unitsEn: ["Part 1: Accounting Concepts, Recording & Reporting", "Part 2: Single Entry, Incomplete Records & Bank Reconciliation", "Assessments & Performance Book"]
    },
    g2_management: {
      id: "g2_management", grade: "g2", name: "إدارة الأعمال (تانية)", nameEn: "Business Management (Grade 2)", type: "تخصص الأعمال — 100 درجة", typeEn: "Business Elective — 100 Marks", badge: "amber",
      units: ["وظائف الإدارة (التخطيط، التنظيم، القيادة، الرقابة)", "بيئة الأعمال واتخاذ القرارات الإدارية", "كتاب الطالب الجزء الثاني"],
      unitsEn: ["Core Functions (Planning, Organizing, Leading, Controlling)", "Business Environment & Decision Making", "Student Book Part 2"]
    },
    g2_psychology: {
      id: "g2_psychology", grade: "g2", name: "علم النفس (تانية)", nameEn: "Psychology (Grade 2 Languages)", type: "تخصص الآداب — 100 درجة", typeEn: "Arts Elective — 100 Marks", badge: "amber",
      units: ["مدارس علم النفس ومناهج البحث النفسي", "الدوافع والانفعالات والعمليات المعرفية", "كتاب الطالب الجزء الثاني"],
      unitsEn: ["Schools of Psychology & Research Methods", "Motivation, Emotions & Cognitive Processes", "Student Book Part 2"]
    },
    g2_lang2: {
      id: "g2_lang2", grade: "g2", name: "اللغة الأجنبية الثانية (تانية)", nameEn: "2nd Foreign Lang (Grade 2)", type: "تخصص الآداب — 100 درجة", typeEn: "Arts Elective — 100 Marks", badge: "amber",
      units: ["كتاب الطالب — الجزء الأول (قواعد ومواقف ومقال)", "كتاب التقييمات والأداءات — الجزء الأول", "كتاب الطالب الجزء الثاني"],
      unitsEn: ["Student Book Part 1 (Grammar, Situations & Writing)", "Assessments Part 1", "Student Book Part 2"]
    },
    g2_financial: {
      id: "g2_financial", grade: "g2", name: "الثقافة المالية (تانية)", type: "خارج المجموع — نجاح ورسوب", badge: "",
      units: ["الميزانية الشخصية والاحتياجات والرغبات والادخار", "اتخاذ القرار المالي والوعي الائتماني"]
    },
    g2_pe: {
      id: "g2_pe", grade: "g2", name: "التربية الرياضية (تانية)", type: "نشاط عملي إجباري", badge: "",
      units: ["التقييم العملي للنشاط البدني"]
    }
  },

  MONTHLY_SUMMARIES: {
    g1: {
      oct: {
        title: "ملخص شهر أكتوبر — الصف الأول بكالوريا",
        items: [
          { sub: "اللغة العربية", pts: ["الاستثناء بـ(إلا): تام مثبت ← واجب النصب | تام منفي ← جائز النصب أو بدل | ناقص منفي ← يُعرب حسب موقعه.", "غير وسوى: تأخذان إعراب ما بعد (إلا)، وما بعدهما مضاف إليه مجرور دائمًا.", "التشبيه أركانه 4؛ وحذف الأداة ووجه الشبه يعطي تشبيهًا بليغًا."] },
          { sub: "العلوم المتكاملة / Integrated Sciences", pts: ["الماء جزيء قطبي ترتبط جزيئاته بروابط هيدروجينية مسؤولة عن ارتفاع درجة غليانه (100°C) وشذوذ كثافته عند 4°C.", "Water polarity & Hydrogen bonds explain high boiling point, surface tension, and ice floating.", "pH < 7 حمضي | pH = 7 متعادل | pH > 7 قلوي."] },
          { sub: "الرياضيات / Math", pts: ["i² = -1، i³ = -i، i⁴ = 1.", "المميز Δ = b² - 4ac: موجب ← جذران حقيقيان مختلفان | صفر ← متساويان | سالب ← مركبان مترافقان."] },
          { sub: "التاريخ والفلسفة والبرمجة", pts: ["المصادر الأولية (الآثار، النقوش، البرديات) أدق من المراجع الثانوية لمعاصرتها للحدث.", "التفكير الفلسفي يتسم بالدهشة والاستقلال والتأمل والدقة المنطقية.", "الخوارزمية (Algorithm) هي خطوات متسلسلة واضحة لحل مشكلة قبل كتابة الكود."] }
        ]
      },
      nov: {
        title: "ملخص شهر نوفمبر — الصف الأول بكالوريا",
        items: [
          { sub: "اللغة العربية", pts: ["عدا وخلا وحاشا بدون (ما) ← حرف جر أو فعل ماضٍ | مع (ما عدا/ما خلا) ← فعل ماضٍ فقط وما بعدها مفعول به منصوب.", "الاسم المقصور يُعرب بحركات مقدرة كلها.", "الاستعارة المكنية: حذف المشبه به وترك صفة من لوازمه."] },
          { sub: "العلوم المتكاملة / Integrated Sciences", pts: ["طبقات الغلاف الجوي: التروبوسفير (الطقس) ← الستراتوسفير (الأوزون O₃) ← الميزوسفير ← الثيرموسفير.", "Greenhouse gases (CO₂, CH₄, H₂O vapor) trap infrared radiation causing global warming."] },
          { sub: "الرياضيات والإنجليزية", pts: ["تشابه المثلثات: AA أو SSS أو SAS.", "In English: While + Past Continuous, Past Simple / When + Past Simple."] }
        ]
      },
      dec: {
        title: "مراجعة شهر ديسمبر ونهاية الترم الأول — أولى بكالوريا",
        items: [
          { sub: "ليلة امتحان الترم الأول", pts: ["العربي: راجع المقصور والمنقوص (حذف ياء المنقوص نكرة مرفوعًا ومجرورًا مثل: قاضٍ) والممدود.", "العلوم المتكاملة: راجع التوازن المائي والغلاف الجوي والتربة وقيم pH.", "الرياضيات: تكوين المعادلة التربيعية متى عُلم جذراها: x² - (المجموع)x + (حاصل الضرب) = 0."] }
        ]
      },
      mar: {
        title: "ملخص شهر مارس (الترم الثاني) — أولى بكالوريا",
        items: [
          { sub: "الرياضيات والمنطق", pts: ["شرط ضرب مصفوفتين A(m×n) و B(n×p) أن يكون أعمدة الأولى = صفوف الثانية.", "المحدد 2×2: ad - bc | المعكوس الضربي يوجد إذا Δ ≠ 0.", "القضية الحملية تتكون من موضوع ومحمول ورابطة."] }
        ]
      },
      apr: {
        title: "ملخص شهر أبريل ومراجعة الترم الثاني — أولى بكالوريا",
        items: [
          { sub: "نقاط الترم الثاني المهمة", pts: ["المتجهات متعامدة إذا x₁x₂ + y₁y₂ = 0 ومتوازية إذا x₁y₂ - y₁x₂ = 0.", "امتزجت الحضارة المصرية بالإغريقية في العصر البطلمي لتكوين الحضارة الهلينستية.", "الحلقات التكرارية (for / while) والشروط (if / else) أساس منطق البرمجة."] }
        ]
      }
    },
    g2: {
      oct: {
        title: "ملخص شهر أكتوبر — الصف الثاني بكالوريا",
        items: [
          { sub: "اللغة العربية (الوحدة 1: العلم والضمير)", pts: ["الأسماء الخمسة (أب، أخ، حم، فو، ذو) تُرفع بالواو وتُنصب بالألف وتُجر بالياء.", "الشروط: مفردة، مكبرة، مضافة لغير ياء المتكلم، خلو (فو) من الميم، (ذو) بمعنى صاحب.", "إعراب (أخي / أبي) بحركات مقدرة لإضافتها لياء المتكلم."] },
          { sub: "اللغة الإنجليزية (Unit 1)", pts: ["Shared Responsibility: collaboration to improve community life & social reflection.", "Grammar: Neither...nor / Either...or — الفعل يتبع الفاعل الأقرب."] },
          { sub: "التاريخ المصري (الوحدة 1)", pts: ["مقاومة الشعب المصري للحملات الخارجية أثبتت أن الوعي الشعبي هو صمام الأمان للدولة المصرية."] },
          { sub: "مواد التخصص (عربي ولغات)", pts: ["الفيزياء / Physics: السرعة النسبية في نفس الاتجاه = |v₁ - v₂|، وفي عكس الاتجاه = v₁ + v₂.", "البرمجة وAI: أخلاقيات AI (الخصوصية، الشفافية، ومنع التحيز Algorithmic Bias).", "المحاسبة / Accounting: Assets = Liabilities + Equity."] }
        ]
      },
      nov: {
        title: "ملخص شهر نوفمبر — الصف الثاني بكالوريا",
        items: [
          { sub: "اللغة العربية (الوحدة 2 و 3)", pts: ["الممنوع من الصرف لعلة واحدة: صيغة منتهى الجموع (مساجد، مصابيح)، ألف التأنيث المقصورة والممدودة.", "يُجر بالفتحة إذا تجرد من (أل) والإضافة، وبالكسرة إذا عُرّف بـ(أل) أو أُضيف.", "التوابع: البدل (مطابق، بعض من كل، اشتمال) والنعت والعطف."] },
          { sub: "التاريخ والبرمجة والمحاسبة", pts: ["التاريخ (الوحدة 2): تحولات القوة وصمود الشعب وثورة 23 يوليو 1952.", "الأمن السيبراني: التشفير (Encryption) يحمي السرية، والمصادقة (Authentication + 2FA) تتحقق من الهوية.", "المحاسبة: Bank Reconciliation مطابقة رصيد الدفاتر وكشف حساب البنك."] }
        ]
      },
      dec: {
        title: "مراجعة شهر ديسمبر ونهاية الترم الأول — تانية بكالوريا",
        items: [
          { sub: "ليلة امتحان الترم الأول (50% مقالي + 50% اختياري)", pts: ["العربي: الأسماء الخمسة والممنوع من الصرف والتوابع + القصة.", "التاريخ: ركز على الأسئلة الاستنتاجية والمقالية القصيرة.", "التخصص: حل نماذج التقييمات الأسبوعية لأنها أساس الامتحان."] }
        ]
      },
      mar: {
        title: "ملخص شهر مارس (الترم الثاني) — تانية بكالوريا",
        items: [
          { sub: "نقاط الترم الثاني", pts: ["العربي: بناء الوعي وفن التفاوض والثقافة أسلوب حياة.", "التاريخ: مصر وقضايا التحرر الوطني في الوطن العربي وإفريقيا، والحرب الباردة.", "تطبيقات الويب: الفرق بين HTTP و HTTPS وأدوار Frontend و Backend."] }
        ]
      },
      apr: {
        title: "ملخص شهر أبريل ومراجعة ما قبل الامتحان — تانية بكالوريا",
        items: [
          { sub: "المراجعة النهائية", pts: ["مصر والقضية الفلسطينية (الوحدة 5) من أهم موضوعات المقالي.", "الثقافة المالية: الميزانية والتمييز بين الاحتياجات (Needs) والرغبات (Wants) والادخار أولًا."] }
        ]
      }
    }
  },

  ASSESSMENT_BANK: {
    g1_arabic_0: [
      { type:"mcq", q:"ما إعراب كلمة (طالبًا) في: (حضر الطلاب إلا طالبًا)؟", opts:["مستثنى منصوب وجوبًا","بدل مرفوع","مفعول به","خبر"], ans:0, exp:"الأسلوب تام مثبت، فما بعد (إلا) واجب النصب على الاستثناء." },
      { type:"mcq", q:"(ما نجح إلا المجتهدُ) — إعراب كلمة (المجتهدُ):", opts:["مستثنى منصوب","فاعل مرفوع","مفعول به","بدل منصوب"], ans:1, exp:"الأسلوب ناقص منفي، فتُحذف (ما) و(إلا) ويُعرب فاعلًا مرفوعًا." },
      { type:"mcq", q:"في جملة (لا ينال العلا غيرُ المجدين)، إعراب (غيرُ) و(المجدين):", opts:["مستثنى، فاعل","فاعل مرفوع، مضاف إليه مجرور بالياء","مفعول به، نعت","مبتدأ، خبر"], ans:1, exp:"(غير) تأخذ إعراب ما بعد إلا (فاعل مرفوع)، وما بعدها مضاف إليه مجرور." }
    ],
    g1_arabic_1: [
      { type:"mcq", q:"أي الكلمات الآتية تُعد اسمًا مقصورًا؟", opts:["القاضي","الصحراء","العُليا","سماء"], ans:2, exp:"الاسم المقصور ينتهي بألف لازمة مفتوح ما قبلها مثل (العُليا)." },
      { type:"mcq", q:"عند تثنية كلمة (فتى) في حالة الرفع تصبح:", opts:["فتان","فتيان","فتوان","فتين"], ans:1, exp:"الألف ثالثة وأصلها ياء فتُرد لأصلها (فتيان)." }
    ],
    g1_english_0: [
      { type:"mcq", q:"Eco-tourism aims to:", opts:["Destroy wildlife habitats","Support local communities while protecting nature","Increase air pollution","Use plastic everywhere"], ans:1, exp:"Eco-tourism promotes sustainable travel conserving nature and supporting locals." },
      { type:"mcq", q:"While I ____ to school, I met my old friend.", opts:["walk","was walking","walked","am walking"], ans:1, exp:"While + Past Continuous for an action interrupted by Past Simple." }
    ],
    g1_history_0: [
      { type:"mcq", q:"لماذا تُعد (الأوستراكا) مصدرًا مهمًا لدراسة الحياة اليومية في مصر القديمة؟", opts:["لأنها للملوك فقط","لتوافرها واستخدامها لدى العامة في الكتابة اليومية","لأنها كُتبت باللاتينية","لأنها تخص المعابد فقط"], ans:1, exp:"الأوستراكا شقفات فخار رخيصة استعملها العامة في الإيصالات والرسائل." },
      { type:"mcq", q:"تتميز المصادر الأولية عن المراجع الثانوية بأنها:", opts:["تُكتب بعد الحدث بقرون","أكثر دقة لمعاصرتها زمن وقوع الحدث","تعتمد على الخيال","أسهل في التحريف"], ans:1, exp:"المصادر الأولية وُجدت وقت وقوع الحدث." }
    ],
    g1_math_0: [
      { type:"mcq", q:"ما أبسط صورة للعدد التخيلي i²⁷؟", opts:["1","-1","i","-i"], ans:3, exp:"27 = 4×6 + 3، إذن i²⁷ = i³ = -i." },
      { type:"mcq", q:"إذا كان جذرا المعادلة x² - 6x + k = 0 متساويين، فإن k تساوي:", opts:["6","9","36","3"], ans:1, exp:"b² - 4ac = 0 ← 36 - 4k = 0 ← k = 9." },
      { type:"mcq", q:"If α and β are roots of x² - 5x + 6 = 0, find α + β and αβ:", opts:["5 and 6","-5 and 6","6 and 5","-6 and 5"], ans:0, exp:"Sum = -b/a = 5, Product = c/a = 6." }
    ],
    g1_science_0: [
      { type:"mcq", q:"يرجع ارتفاع درجة غليان الماء إلى:", opts:["كبر ذرة الهيدروجين","وجود روابط هيدروجينية بين جزيئات الماء","انعدام القطبية","كونه مركبًا أيونيًا"], ans:1, exp:"الروابط الهيدروجينية تتطلب طاقة حرارية عالية لكسرها." },
      { type:"mcq", q:"Why does ice float on liquid water?", opts:["Higher density","Open hydrogen-bonded lattice gives ice lower density","No hydrogen bonds","Zero density"], ans:1, exp:"Ice expands in an open hexagonal lattice, lowering its density." }
    ],
    g1_philosophy_0: [
      { type:"mcq", q:"رفض تقبّل معلومة إلا بعد فحص أدلتها يعبر عن:", opts:["التعصب","الشك المنهجي والتفكير الناقد","الانفعال","التسرع"], ans:1, exp:"التفكير الناقد والفلسفي يعتمد على فحص الأدلة." }
    ],
    g1_programming_0: [
      { type:"mcq", q:"الفائدة الأساسية من الحلقات التكرارية (Loops) في البرمجة:", opts:["تكرار تنفيذ الأوامر تلقائيًا دون إعادة كتابتها","إغلاق الجهاز","حذف HTML","استهلاك البطارية"], ans:0, exp:"الحلقات تختصر الكود وتنفذ التكرارات بكفاءة." }
    ],
    g2_arabic_0: [
      { type:"mcq", q:"أعرب (ذو) في: (كان أخوك ذو علم) — الصواب النحوي هو:", opts:["الجملة صحيحة","(ذا) لأنها خبر كان منصوب بالألف","(ذي)","(ذوو)"], ans:1, exp:"خبر كان منصوب بالألف لأنه من الأسماء الخمسة." },
      { type:"mcq", q:"أي جملة تُعرب فيها الكلمة بالحركات المقدرة؟", opts:["حضر أبوك","أطعتُ أبي","رأيت ذا علم","لا فض فوك"], ans:1, exp:"(أبي) مضافة لياء المتكلم فتُعرب بحركات مقدرة." },
      { type:"mcq", q:"شرط إعراب (فو) إعراب الأسماء الخمسة:", opts:["إضافتها للياء","خلوها من الميم","التثنية","الجمع"], ans:1, exp:"تُعرب بالحروف إذا خلت من الميم (فوك لا فمك)." }
    ],
    g2_arabic_1: [
      { type:"mcq", q:"أي الكلمات الآتية ممنوعة من الصرف لعلة واحدة؟", opts:["عمر","أحمد","مساجد","عثمان"], ans:2, exp:"(مساجد) صيغة منتهى الجموع." },
      { type:"mcq", q:"(مررتُ بمساجدَ كثيرة) و(مررتُ بمساجدِ القاهرة) — علامة الجر على الترتيب:", opts:["كسرة، فتحة","فتحة، كسرة","فتحة، فتحة","كسرة، كسرة"], ans:1, exp:"المجرد من أل والإضافة يُجر بالفتحة، والمضاف يُجر بالكسرة." }
    ],
    g2_arabic_2: [
      { type:"mcq", q:"(أعجبني الطالبُ خلقُه) — نوع البدل وإعرابه:", opts:["بدل بعض من كل مرفوع","بدل اشتمال مرفوع","بدل مطابق منصوب","نعت"], ans:1, exp:"الخلق مما يشتمل عليه الطالب معنويًا." }
    ],
    g2_english_0: [
      { type:"mcq", q:"Neither Ali nor his friends ____ ready for the trip.", opts:["was","were","is","has been"], ans:1, exp:"Verb agrees with the closer subject ('his friends' -> 'were')." },
      { type:"mcq", q:"Shared responsibility encourages citizens to:", opts:["Ignore challenges","Collaborate for the common good","Avoid teamwork","Work alone"], ans:1, exp:"Shared responsibility means collaborating for community wellbeing." }
    ],
    g2_history_0: [
      { type:"mcq", q:"أثبتت مقاومة الشعب المصري للاحتلال أن الحصن الحقيقي للدولة هو:", opts:["الاعتماد على الخارج","التلاحم الشعبي والوعي الوطني","العزلة","تجاهل التعليم"], ans:1, exp:"الوعي والتلاحم الوطني صمام أمان الدولة المصرية." },
      { type:"mcq", q:"من أهداف ثورة 23 يوليو 1952 الأساسية:", opts:["بقاء الاحتلال","القضاء على الاستعمار وإقامة عدالة اجتماعية وجيش وطني قوي","إلغاء التعليم","تقسيم الأراضي"], ans:1, exp:"من المبادئ الستة لثورة 23 يوليو 1952." }
    ],
    g2_physics_0: [
      { type:"mcq", q:"سيارتان في نفس الاتجاه بسرعة 90 و 60 كم/س. السرعة النسبية:", opts:["150 كم/س","30 كم/س","1.5 كم/س","90 كم/س"], ans:1, exp:"في نفس الاتجاه نطرح: 90 - 60 = 30 كم/س." },
      { type:"mcq", q:"Two trains move in opposite directions at 70 km/h and 50 km/h. Relative speed:", opts:["20 km/h","120 km/h","70 km/h","3500 km/h"], ans:1, exp:"In opposite directions: 70 + 50 = 120 km/h." }
    ],
    g2_math_0: [
      { type:"mcq", q:"If f(x) = 3x - 1 and g(x) = x², find (f ∘ g)(2):", opts:["25","11","5","12"], ans:1, exp:"g(2)=4, f(4)=11." },
      { type:"mcq", q:"The domain of f(x) = √(x - 3) is:", opts:["(-∞, 3]","[3, ∞)","R - {3}","(3, ∞)"], ans:1, exp:"x - 3 ≥ 0 gives x ≥ 3." }
    ],
    g2_chemistry_0: [
      { type:"mcq", q:"Which quantum number defines the main energy level of an electron?", opts:["Principal (n)","Azimuthal (l)","Magnetic (m_l)","Spin (m_s)"], ans:0, exp:"Principal quantum number (n) defines the main shell." },
      { type:"mcq", q:"According to Hund's rule, electrons fill degenerate orbitals:", opts:["Paired first","Singly with parallel spins before pairing","Only in s-orbital","Randomly"], ans:1, exp:"Electrons occupy orbitals singly first with parallel spins." }
    ],
    g2_programming_0: [
      { type:"mcq", q:"ما الغرض من التشفير (Encryption) في الأمن السيبراني؟", opts:["تسريع المعالج","تحويل البيانات لصيغة غير مقروءة لحماية سريتها","حذف النظام","تلوين الشاشة"], ans:1, exp:"التشفير يحمي سرية البيانات." },
      { type:"mcq", q:"Which measure adds a second verification step (password + OTP)?", opts:["Two-Factor Authentication (2FA)","Plaintext","Caching","Rendering"], ans:0, exp:"2FA verifies identity using two factors." },
      { type:"mcq", q:"Why is HTTPS preferred over HTTP?", opts:["Changes colors","Encrypts data between browser and server","Works offline","Deletes cookies"], ans:1, exp:"HTTPS uses TLS encryption." }
    ],
    g2_accounting_0: [
      { type:"mcq", q:"المعادلة المحاسبية الأساسية للميزانية هي:", opts:["الأصول = الالتزامات + حقوق الملكية","الأصول = المصروفات + الإيرادات","الإيرادات = الأصول - الخصوم","رأس المال = الأصول + الالتزامات"], ans:0, exp:"Assets = Liabilities + Owner's Equity." },
      { type:"mcq", q:"In Bank Reconciliation, unpresented cheques are deducted from:", opts:["Cash Book balance","Bank Statement balance","Capital","Sales"], ans:1, exp:"Deducted from Bank Statement balance." }
    ],
    g2_management_0: [
      { type:"mcq", q:"أول وظيفة إدارية تُحدد فيها الأهداف وخطط التنفيذ هي:", opts:["الرقابة","التخطيط (Planning)","التوجيه","التوظيف"], ans:1, exp:"التخطيط أساس العملية الإدارية." }
    ],
    g2_psychology_0: [
      { type:"mcq", q:"أي مناهج البحث يعتمد على متغير مستقل وتابع مع الضبط التجريبي؟", opts:["الإكلينيكي","المنهج التجريبي","الاستبطان","الملاحظة"], ans:1, exp:"المنهج التجريبي يدرس أثر المتغير المستقل على التابع." }
    ],
    g2_financial_0: [
      { type:"mcq", q:"التمييز السليم في التخطيط المالي يبدأ بتقديم:", opts:["الكماليات","الاحتياجات الأساسية والادخار قبل الكماليات","الديون","الصرف العشوائي"], ans:1, exp:"الأولوية للاحتياجات الأساسية والادخار." }
    ]
  }
};
