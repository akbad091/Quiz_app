/* =========================
   SAFE HTML FUNCTION
========================= */
function escapeHTML(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/* =========================
   SELECTORS
========================= */
const section = document.querySelector("section");
const headerTitle = document.querySelector("header div h2");
const headerContainer = document.querySelector("header div");

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let selected = null;

/* =========================
   QUIZ DATA
========================= */
const quizzes = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyper Text Marketing Language",
        "Hyper Tool Multi Language",
      ],
      answer: 1,
    },
    {
      question: "Which tag is used for images?",
      options: ["<img>", "<image>", "<pic>", "<src>"],
      answer: 0,
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<nav>"],
      answer: 1,
    },
    {
      question: "Which tag is for paragraphs?",
      options: ["<p>", "<text>", "<para>", "<section>"],
      answer: 0,
    },
    {
      question: "Which tag is used for headings?",
      options: ["<h1>", "<header>", "<head>", "<title>"],
      answer: 0,
    },
    {
      question: "Where does metadata go?",
      options: ["<body>", "<footer>", "<head>", "<meta>"],
      answer: 2,
    },
    {
      question: "Which tag creates a list item?",
      options: ["<li>", "<ul>", "<ol>", "<list>"],
      answer: 0,
    },
    {
      question: "Which attribute specifies an image source?",
      options: ["href", "src", "link", "alt"],
      answer: 1,
    },
    {
      question: "Which tag is used for forms?",
      options: ["<form>", "<input>", "<label>", "<button>"],
      answer: 0,
    },
    {
      question: "Which tag is semantic?",
      options: ["<div>", "<span>", "<section>", "<b>"],
      answer: 2,
    },
  ],

  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: 2,
    },
    {
      question: "Which property changes text color?",
      options: ["font", "color", "background", "text-style"],
      answer: 1,
    },
    {
      question: "Which property controls spacing inside?",
      options: ["margin", "padding", "border", "gap"],
      answer: 1,
    },
    {
      question: "Which property sets background color?",
      options: ["bg", "background-color", "color", "fill"],
      answer: 1,
    },
    {
      question: "Which display is default?",
      options: ["block", "inline", "flex", "grid"],
      answer: 0,
    },
    {
      question: "Flexbox direction property?",
      options: ["flex-align", "flex-direction", "flex-order", "justify"],
      answer: 1,
    },
    {
      question: "Which unit is relative?",
      options: ["px", "em", "cm", "mm"],
      answer: 1,
    },
    {
      question: "Which property controls text size?",
      options: ["font-size", "text-size", "size", "font-style"],
      answer: 0,
    },
    {
      question: "Which value centers flex items?",
      options: ["start", "center", "end", "space"],
      answer: 1,
    },
    {
      question: "Which property controls margin outside?",
      options: ["padding", "margin", "border", "gap"],
      answer: 1,
    },
  ],

  js: [
    {
      question: "Which keyword declares a variable?",
      options: ["var", "int", "string", "define"],
      answer: 0,
    },
    {
      question: "Which symbol is used for comments?",
      options: ["//", "<!-- -->", "#", "**"],
      answer: 0,
    },
    {
      question: "Which is a JavaScript type?",
      options: ["number", "float", "decimal", "char"],
      answer: 0,
    },
    {
      question: "Which function logs to console?",
      options: ["print()", "log()", "console.log()", "write()"],
      answer: 2,
    },
    {
      question: "Which operator compares value AND type?",
      options: ["==", "=", "===", "!="],
      answer: 2,
    },
    {
      question: "Which keyword creates a function?",
      options: ["def", "func", "function", "method"],
      answer: 2,
    },
    {
      question: "Array is defined using?",
      options: ["{}", "[]", "()", "<>"],
      answer: 1,
    },
    {
      question: "Which is NOT a loop?",
      options: ["for", "while", "loop", "do...while"],
      answer: 2,
    },
    {
      question: "DOM stands for?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Display Object Mode",
        "Document Order Method",
      ],
      answer: 0,
    },
    {
      question: "Which method selects element?",
      options: ["getElementById", "querySelector", "Both", "None"],
      answer: 2,
    },
  ],

  accessibility: [
    {
      question: "Minimum WCAG contrast ratio?",
      options: ["4.5:1", "3:1", "2.5:1", "5:1"],
      answer: 0,
    },
    {
      question: "Alt text is used for?",
      options: ["SEO", "Accessibility", "Design", "Layout"],
      answer: 1,
    },
    {
      question: "ARIA stands for?",
      options: [
        "Accessible Rich Internet Applications",
        "Advanced UI Rules",
        "Accessibility Interface API",
        "None",
      ],
      answer: 0,
    },
    {
      question: "Keyboard navigation is for?",
      options: ["Developers", "Accessibility", "SEO", "Styling"],
      answer: 1,
    },
    {
      question: "Screen readers read?",
      options: ["Images", "HTML structure", "CSS", "Animations"],
      answer: 1,
    },
    {
      question: "Semantic HTML improves?",
      options: ["Speed", "Accessibility", "Color", "Layout"],
      answer: 1,
    },
    {
      question: "Label tag is used for?",
      options: ["Buttons", "Forms", "Images", "Links"],
      answer: 1,
    },
    {
      question: "Tab key is used for?",
      options: ["Refresh", "Navigation", "Delete", "Zoom"],
      answer: 1,
    },
    {
      question: "Accessible color contrast helps?",
      options: ["Design", "Visibility", "Speed", "Layout"],
      answer: 1,
    },
    {
      question: "Focus state is important for?",
      options: ["Mouse", "Keyboard users", "Images", "CSS"],
      answer: 1,
    },
  ],
};

/* =========================
   START QUIZ
========================= */
let currentSubjectName = "";
let currentSubjectIcon = "";

document.querySelectorAll("[data-subject]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const subject = btn.dataset.subject;

    currentSubjectName = btn.querySelector("h2").textContent.trim();
    let subjectIcon = btn.querySelector("img")
    currentSubjectIcon = subjectIcon ? subjectIcon.outerHTML : ""

    currentQuiz = quizzes[subject];
    currentIndex = 0;
    score = 0;

    headerContainer.classList.remove("invisible");
    headerTitle.textContent = currentSubjectName;

    renderQuestion();
  });
});

/* =========================
   RENDER QUESTION
========================= */
function renderQuestion() {
  selected = null;
  const q = currentQuiz[currentIndex];

  section.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-12 w-full">

      <!-- LEFT -->
      <div class="lg:w-1/2 space-y-6">
        <p class="text-[#ABC1E1] italic">
          Question ${currentIndex + 1} of ${currentQuiz.length}
        </p>

        <h2 class="text-white text-3xl leading-[40px]">
          ${q.question}
        </h2>

        <div class="w-full bg-[#3B4D66] h-2 rounded-full">
          <div class="bg-[#A729F5] h-2 rounded-full transition-all duration-300"
            style="width: ${((currentIndex + 1) / currentQuiz.length) * 100}%">
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="lg:w-1/2 space-y-4">
        ${q.options
          .map(
            (opt, i) => `
          <button class="option flex items-center gap-4 bg-[#3B4D66] p-4 rounded-xl w-full text-left"
            data-index="${i}">
            
            <div class="w-[40px] h-[40px] flex items-center justify-center bg-[#626C7F] text-white rounded-lg">
              ${String.fromCharCode(65 + i)}
            </div>

            <span class="text-white">${escapeHTML(opt)}</span>
          </button>
        `,
          )
          .join("")}

        <button id="submitBtn"
          class="bg-[#A729F5] text-white p-4 rounded-xl w-full mt-4">
          Submit Answer
        </button>

        <p id="error" class=" text-center text-white space-x-2 hidden ">
          <span class="border text-red-500 border-red-500 px-[5px] max-w-[30px] rounded-full text-center ">x</span>
          Please select an answer
        </p>
      </div>

    </div>
  `;

  const options = document.querySelectorAll(".option");

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      selected = Number(btn.dataset.index);

      options.forEach((o) =>
        o.classList.remove("border-2", "border-[#A729F5]"),
      );
      btn.classList.add("border-2", "border-[#A729F5]");
    });
  });

  document.getElementById("submitBtn").addEventListener("click", submitAnswer);
}

/* =========================
   SUBMIT ANSWER
========================= */
function submitAnswer() {
  const error = document.getElementById("error");

  if (selected === null) {
    error.classList.remove("hidden");
    return;
  }

  error.classList.add("hidden");

  const correct = currentQuiz[currentIndex].answer;
  const options = document.querySelectorAll(".option");
  const isCorrect = selected === correct;

  options.forEach((btn, i) => {
    btn.disabled = true;
    const letterBox = btn.querySelector("div");

    // CORRECT
    if (i === correct) {
      btn.classList.add("border-2", "border-green-400");
      letterBox.classList.replace("bg-[#626C7F]", "bg-green-400");
      btn.insertAdjacentHTML(
        "beforeend",
        `<span class="ml-auto w-6 h-6 flex items-center justify-center border-2 border-green-400 rounded-full text-green-400 text-sm">✓</span>`,
      );
    }

    if (i === selected && !isCorrect) {
      btn.classList.add("border-2", "border-red-400");
      letterBox.classList.replace("bg-[#626C7F]", "bg-red-400");
      btn.insertAdjacentHTML(
        "beforeend",
        `<span class="ml-auto w-6 h-6 flex items-center justify-center border-2 border-red-400 rounded-full text-red-400 text-sm">✕</span>`,
      );
    }

  });

  if (isCorrect){
    score++;
    setTimeout(() => {
      currentIndex++;

      if (currentIndex < currentQuiz.length) {
        renderQuestion();
      } else {
        renderScore();
      }
      }, 1200);
    } else {
      setTimeout(() => {
      renderScore();
    }, 1200);
  }
}

/* =========================
   SCORE SCREEN
========================= */
function renderScore() {
  section.className = "container mx-auto px-[24px] pt-[32px] space-y-[40px] section-tablet section-desk flex flex-col lg:flex-row justify-between items-start";

  section.innerHTML = `
    <div class="space-y-[16px] lg:space-y-[48px]">
      <div class="space-y-[8px] pr-[44px]">
        <span class="text-4xl md:text-6xl font-light text-white leading-none">Quiz completed</span>
        <h1 class="text-4xl md:text-6xl font-medium text-white leading-none">You scored...</h1>
      </div>
    </div>

    <div class="space-y-[12px] md:space-y-[24px] lg:w-[564px] w-full">
      <div class="bg-[#3B4D66] rounded-xl lg:rounded-3xl flex flex-col items-center p-[32px] md:p-[48px] w-full shadow-lg">
        
        <div class="text-xl font-medium text-white flex items-center gap-[16px] mb-[16px] md:mb-[40px]">
          ${currentSubjectIcon}
          <h2 class="text-2xl md:text-3xl">${currentSubjectName}</h2>
        </div>

        <p class="font-medium text-[88px] md:text-[144px] text-white leading-none">${score}</p>
        <span class="text-[#ABC1E1] text-xl md:text-[24px] mt-[16px]">out of ${currentQuiz.length}</span>
      </div>

      <button
        id="restart"
        class="bg-[#A729F5] hover:bg-[#A729F5]/80 transition-colors text-white font-medium text-xl p-[16px] md:p-[24px] rounded-xl lg:rounded-3xl w-full"
      >
        Play Again
      </button>
    </div>
  `;

  document.getElementById("restart").addEventListener("click", () => {
    location.reload();
  });
}
