let questions = [
    {
        name: "AWS Cloud Practitioner",
        questionArr: [
            {
                question: "Which AWS service provides virtual servers in the cloud?",
                options: ["EC2", "S3", "Lambda", "RDS"],
                correctAnswer: 0
            },
            {
                question: "Which AWS service is used for object storage?",
                options: ["EBS", "S3", "EFS", "Glacier Vault"],
                correctAnswer: 1
            },
            {
                question: "What pricing model allows you to pay only for what you use?",
                options: ["Reserved", "OnDemand", "Dedicated Host", "Spot Block"],
                correctAnswer: 1
            },
            {
                question: "Which service is serverless compute?",
                options: ["EC2", "Lambda", "Elastic Beanstalk", "Lightsail"],
                correctAnswer: 1
            },
            {
                question: "What does IAM manage?",
                options: ["Storage buckets", "Virtual machines", "User access and permissions", "Billing reports"],
                correctAnswer: 2
            },
            {
                question: "Which service monitors AWS resources?",
                options: ["CloudTrail", "CloudWatch", "Trusted Advisor", "Inspector"],
                correctAnswer: 1
            },
            {
                question: "Which AWS service provides a managed relational database?",
                options: ["DynamoDB", "Redshift", "RDS", "Aurora Serverless"],
                correctAnswer: 2
            },
            {
                question: "Which AWS support plan provides 24/7 technical support and a TAM?",
                options: ["Basic", "Developer", "Business", "Enterprise"],
                correctAnswer: 3
            },
            {
                question: "Which AWS service helps with DDoS protection?",
                options: ["Shield", "WAF", "Inspector", "Macie"],
                correctAnswer: 0
            },
            {
                question: "Which pillar is NOT part of the AWS Well-Architected Framework?",
                options: ["Security", "Reliability", "Scalability", "Performance Efficiency"],
                correctAnswer: 2
            }
        ]
    },

    {
        name: "GCP Cloud Digital Leader",
        questionArr: [
            {
                question: "Which GCP service provides virtual machines?",
                options: ["Cloud Functions", "Compute Engine", "App Engine", "Cloud Run"],
                correctAnswer: 1
            },
            {
                question: "What is Google Cloud's object storage service?",
                options: ["Cloud Storage", "BigQuery", "Filestore", "Spanner"],
                correctAnswer: 0
            },
            {
                question: "Which service is a fully managed data warehouse?",
                options: ["BigQuery", "Cloud SQL", "Firestore", "Dataproc"],
                correctAnswer: 0
            },
            {
                question: "Which service is serverless container platform?",
                options: ["GKE", "Cloud Run", "Compute Engine", "Dataplex"],
                correctAnswer: 1
            },
            {
                question: "What does IAM control in GCP?",
                options: ["Networking speed", "User access and roles", "Storage encryption only", "Billing tiers"],
                correctAnswer: 1
            },
            {
                question: "Which service provides Kubernetes management?",
                options: ["Anthos", "GKE", "Cloud Functions", "Cloud Build"],
                correctAnswer: 1
            },
            {
                question: "Which pricing model offers automatic sustained use discounts?",
                options: ["On-demand", "Committed use", "Sustained use", "Spot VMs"],
                correctAnswer: 2
            },
            {
                question: "Which tool monitors GCP resources?",
                options: ["Cloud Monitoring", "Cloud Trace", "Security Command Center", "Cloud Armor"],
                correctAnswer: 0
            },
            {
                question: "Which service is used for AI/ML APIs?",
                options: ["Vertex AI", "Bigtable", "Dataprep", "Cloud CDN"],
                correctAnswer: 0
            },
            {
                question: "What is the top-level GCP resource hierarchy element?",
                options: ["Project", "Folder", "Organization", "Resource"],
                correctAnswer: 2
            }
        ]
    },

    {
        name: "Azure Fundamentals AZ-900",
        questionArr: [
            {
                question: "Which Azure service provides virtual machines?",
                options: ["Azure App Service", "Azure Virtual Machines", "Azure Functions", "Azure Logic Apps"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service is used for object storage?",
                options: ["Azure Blob Storage", "Azure Files", "Azure Disk", "Cosmos DB"],
                correctAnswer: 0
            },
            {
                question: "Which service is serverless compute in Azure?",
                options: ["Azure VM", "Azure Functions", "Azure Kubernetes Service", "Azure DevOps"],
                correctAnswer: 1
            },
            {
                question: "What does Azure Active Directory manage?",
                options: ["Networking", "Identity and Access", "Storage", "Billing"],
                correctAnswer: 1
            },
            {
                question: "Which service is a NoSQL database?",
                options: ["Azure SQL Database", "Cosmos DB", "Azure Synapse", "Azure Table Storage"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service helps monitor resources?",
                options: ["Azure Monitor", "Azure Advisor", "Azure Policy", "Azure Sentinel"],
                correctAnswer: 0
            },
            {
                question: "Which pricing feature helps reduce costs with long-term commitment?",
                options: ["Pay-as-you-go", "Reserved Instances", "Spot Pricing", "Free Tier"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service manages Kubernetes clusters?",
                options: ["AKS", "App Service", "Virtual WAN", "DevTest Labs"],
                correctAnswer: 0
            },
            {
                question: "What is Azure Policy used for?",
                options: ["Monitoring", "Governance and compliance", "Load balancing", "Encryption keys only"],
                correctAnswer: 1
            },
            {
                question: "Which Azure service provides DDoS protection?",
                options: ["Azure Firewall", "Azure Sentinel", "Azure DDoS Protection", "Azure Defender"],
                correctAnswer: 2
            }
        ]
    }
];

const state = {
  currentQuiz: null,
  currentQuestion: 0,
  score: 0,
  timer: 30,
  interval: null,
  selected: null
};

const quizButtons = document.getElementById("quiz-buttons");
const quizSelection = document.getElementById("quiz-selection");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const endBtn = document.getElementById("end-btn");
const timeEl = document.getElementById("time");
const scoreDisplay = document.getElementById("score-display");
const resultText = document.getElementById("result-text");
const highScoreText = document.getElementById("high-score-text");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");


questions.forEach((quiz, index) => {
  const btn = document.createElement("button");
  btn.textContent = quiz.name;
  btn.classList.add("primary");
  btn.addEventListener("click", () => startQuiz(index));
  quizButtons.appendChild(btn);
});

function startQuiz(index) {
  state.currentQuiz = index;
  state.currentQuestion = 0;
  state.score = 0;

  quizSelection.classList.add("hidden");
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  updateScore();
  loadQuestion();
}

function loadQuestion() {
  clearInterval(state.interval);
  state.selected = null;
  state.timer = 30;
  timeEl.textContent = state.timer;
  nextBtn.disabled = true;

  const quiz = questions[state.currentQuiz];
  const questionObj = quiz.questionArr[state.currentQuestion];

  questionEl.textContent =
    `Q${state.currentQuestion + 1}/${quiz.questionArr.length}: ${questionObj.question}`;

  optionsEl.innerHTML = "";

  questionObj.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.addEventListener("click", () =>
      selectAnswer(btn, index, questionObj.correctAnswer)
    );

    optionsEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

function selectAnswer(button, index, correctIndex) {
  if (state.selected !== null) return;

  state.selected = index;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === index && i !== correctIndex) btn.classList.add("wrong");
  });

  if (index === correctIndex) {
    state.score++;
    updateScore();
  }

  nextBtn.disabled = false;
}

function startTimer() {
  state.interval = setInterval(() => {
    state.timer--;
    timeEl.textContent = state.timer;

    if (state.timer <= 0) {
      clearInterval(state.interval);
      goNext();
    }
  }, 1000);
}

function goNext() {
  const quiz = questions[state.currentQuiz];

  if (state.currentQuestion < quiz.questionArr.length - 1) {
    state.currentQuestion++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(state.interval);

  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const total = questions[state.currentQuiz].questionArr.length;
  const percent = Math.round((state.score / total) * 100);

  resultText.textContent =
    `You scored ${state.score} / ${total} (${percent}%)`;

  const key = "quiz_" + state.currentQuiz;
  const stored = localStorage.getItem(key);

  if (!stored || state.score > stored) {
    localStorage.setItem(key, state.score);
  }

  highScoreText.textContent =
    `High Score: ${localStorage.getItem(key)} / ${total}`;
}

restartBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  quizSelection.classList.remove("hidden");
  progressBar.style.width = "0%";
});

nextBtn.addEventListener("click", goNext);
endBtn.addEventListener("click", endQuiz);

function updateScore() {
  scoreDisplay.textContent = `⭐ ${state.score}`;
}

function updateProgress() {
  const total = questions[state.currentQuiz].questionArr.length;
  const percent = ((state.currentQuestion + 1) / total) * 100;
  progressBar.style.width = percent + "%";
}
