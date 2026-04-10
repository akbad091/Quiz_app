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
   QUIZ DATA (10 questions each)
========================= */
const quizzes = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyper Text Marketing Language",
        "Hyper Tool Multi Language"
      ],
      answer: 1
    },
    {
      question: "Which tag is used for images?",
      options: ["<img>", "<image>", "<pic>", "<src>"],
      answer: 0
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<nav>"],
      answer: 1
    },
    {
      question: "Which tag is for paragraphs?",
      options: ["<p>", "<text>", "<para>", "<section>"],
      answer: 0
    },
    {
      question: "Which tag is used for headings?",
      options: ["<h1>", "<header>", "<head>", "<title>"],
      answer: 0
    },
    {
      question: "Where does metadata go?",
      options: ["<body>", "<footer>", "<head>", "<meta>"],
      answer: 2
    },
    {
      question: "Which tag creates a list item?",
      options: ["<li>", "<ul>", "<ol>", "<list>"],
      answer: 0
    },
    {
      question: "Which attribute specifies an image source?",
      options: ["href", "src", "link", "alt"],
      answer: 1
    },
    {
      question: "Which tag is used for forms?",
      options: ["<form>", "<input>", "<label>", "<button>"],
      answer: 0
    },
    {
      question: "Which tag is semantic?",
      options: ["<div>", "<span>", "<section>", "<b>"],
      answer: 2
    }
  ],

  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      answer: 2
    },
    {
      question: "Which property changes text color?",
      options: ["font", "color", "background", "text-style"],
      answer: 1
    },
    {
      question: "Which property controls spacing inside?",
      options: ["margin", "padding", "border", "gap"],
      answer: 1
    },
    {
      question: "Which property sets background color?",
      options: ["bg", "background-color", "color", "fill"],
      answer: 1
    },
    {
      question: "Which display is default?",
      options: ["block", "inline", "flex", "grid"],
      answer: 0
    },
    {
      question: "Flexbox direction property?",
      options: ["flex-align", "flex-direction", "flex-order", "justify"],
      answer: 1
    },
    {
      question: "Which unit is relative?",
      options: ["px", "em", "cm", "mm"],
      answer: 1
    },
    {
      question: "Which property controls text size?",
      options: ["font-size", "text-size", "size", "font-style"],
      answer: 0
    },
    {
      question: "Which value centers flex items?",
      options: ["start", "center", "end", "space"],
      answer: 1
    },
    {
      question: "Which property controls margin outside?",
      options: ["padding", "margin", "border", "gap"],
      answer: 1
    }
  ],

  js: [
    {
      question: "Which keyword declares a variable?",
      options: ["var", "int", "string", "define"],
      answer: 0
    },
    {
      question: "Which symbol is used for comments?",
      options: ["//", "<!-- -->", "#", "**"],
      answer: 0
    },
    {
      question: "Which is a JavaScript type?",
      options: ["number", "float", "decimal", "char"],
      answer: 0
    },
    {
      question: "Which function logs to console?",
      options: ["print()", "log()", "console.log()", "write()"],
      answer: 2
    },
    {
      question: "Which operator compares value AND type?",
      options: ["==", "=", "===", "!="],
      answer: 2
    },
    {
      question: "Which keyword creates a function?",
      options: ["def", "func", "function", "method"],
      answer: 2
    },
    {
      question: "Array is defined using?",
      options: ["{}", "[]", "()", "<>"],
      answer: 1
    },
    {
      question: "Which is NOT a loop?",
      options: ["for", "while", "loop", "do...while"],
      answer: 2
    },
    {
      question: "DOM stands for?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Display Object Mode",
        "Document Order Method"
      ],
      answer: 0
    },
    {
      question: "Which method selects element?",
      options: ["getElementById", "querySelector", "Both", "None"],
      answer: 2
    }
  ],

  accessibility: [
    {
      question: "Minimum WCAG contrast ratio?",
      options: ["4.5:1", "3:1", "2.5:1", "5:1"],
      answer: 0
    },
    {
      question: "Alt text is used for?",
      options: ["SEO", "Accessibility", "Design", "Layout"],
      answer: 1
    },
    {
      question: "ARIA stands for?",
      options: [
        "Accessible Rich Internet Applications",
        "Advanced UI Rules",
        "Accessibility Interface API",
        "None"
      ],
      answer: 0
    },
    {
      question: "Keyboard navigation is for?",
      options: ["Developers", "Accessibility", "SEO", "Styling"],
      answer: 1
    },
    {
      question: "Screen readers read?",
      options: ["Images", "HTML structure", "CSS", "Animations"],
      answer: 1
    },
    {
      question: "Semantic HTML improves?",
      options: ["Speed", "Accessibility", "Color", "Layout"],
      answer: 1
    },
    {
      question: "Label tag is used for?",
      options: ["Buttons", "Forms", "Images", "Links"],
      answer: 1
    },
    {
      question: "Tab key is used for?",
      options: ["Refresh", "Navigation", "Delete", "Zoom"],
      answer: 1
    },
    {
      question: "Accessible color contrast helps?",
      options: ["Design", "Visibility", "Speed", "Layout"],
      answer: 1
    },
    {
      question: "Focus state is important for?",
      options: ["Mouse", "Keyboard users", "Images", "CSS"],
      answer: 1
    }
  ]
};

/* =========================
   START QUIZ
========================= */
document.querySelectorAll("[data-subject]").forEach(btn => {
  btn.addEventListener("click", () => {
    const subject = btn.dataset.subject;

    currentQuiz = quizzes[subject];
    currentIndex = 0;
    score = 0;

    headerContainer.classList.remove("invisible");
    headerTitle.textContent = btn.innerText;

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
    <div class="flex flex-col gap-8 w-full">
      
      <div class="space-y-4">
        <p class="text-[#ABC1E1] italic">
          Question ${currentIndex + 1} of ${currentQuiz.length}
        </p>

        <h2 class="text-white text-3xl">
          ${q.question}
        </h2>
      </div>

      <div class="space-y-4">
        ${q.options.map((opt, i) => `
          <button class="option flex items-center gap-4 bg-[#3B4D66] p-4 rounded-xl w-full text-left"
            data-index="${i}">
            
            <div class="w-[40px] h-[40px] flex items-center justify-center bg-[#626C7F] text-white rounded-lg">
              ${String.fromCharCode(65 + i)}
            </div>

            <span class="text-white">${escapeHTML(opt)}</span>
          </button>
        `).join("")}
      </div>

      <button id="submitBtn"
        class="bg-[#A729F5] text-white p-4 rounded-xl">
        Submit Answer
      </button>

      <p id="error" class="text-red-400 hidden">
        Please select an answer
      </p>
    </div>
  `;

  const options = document.querySelectorAll(".option");

  options.forEach(btn => {
    btn.addEventListener("click", () => {
      selected = Number(btn.dataset.index);

      options.forEach(o => o.classList.remove("border-2", "border-[#A729F5]"));
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

  options.forEach((btn, i) => {
    btn.disabled = true;

    if (i === correct) {
      btn.classList.add("border-2", "border-green-400");
    }

    if (i === selected && selected !== correct) {
      btn.classList.add("border-2", "border-red-400");
    }
  });

  if (selected === correct) score++;

  setTimeout(() => {
    currentIndex++;

    if (currentIndex < currentQuiz.length) {
      renderQuestion();
    } else {
      renderScore();
    }
  }, 1200);
}

/* =========================
   SCORE SCREEN
========================= */
function renderScore() {
  section.innerHTML = `
    <div class="text-center space-y-8">
      <h2 class="text-white text-3xl">Quiz completed</h2>

      <div class="bg-[#3B4D66] p-8 rounded-xl">
        <p class="text-[#ABC1E1]">Your score</p>
        <p class="text-white text-6xl font-bold">${score}</p>
      </div>

      <button id="restart"
        class="bg-[#A729F5] text-white px-8 py-4 rounded-xl text-xl">
        Play Again
      </button>
    </div>
  `;

  document.getElementById("restart").addEventListener("click", () => {
    location.reload();
  });
}