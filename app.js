// sound effects using Web Audio API (no external files needed!)
const SoundEffects = {
    ctx: null,
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playCorrect() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1); // E5
        
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    },
    playWrong() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime); // A3
        osc.frequency.setValueAtTime(147, this.ctx.currentTime + 0.15); // D3
        
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
    },
    playSwipe() {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }
};

// Region Mapping for SVG highlights
const REGION_SVG_MAPPING = {
    "Auvergne-Rhône-Alpes": "FR-ARA",
    "Bourgogne-Franche-Comté": "FR-BFC",
    "Bretagne": "FR-BRE",
    "Centre-Val de Loire": "FR-CVL",
    "Grand Est": "FR-GES",
    "Hauts-de-France": "FR-HDF",
    "Île-de-France": "FR-IDF",
    "Nouvelle-Aquitaine": "FR-NAQ",
    "Normandie": "FR-NOR",
    "Occitanie": "FR-OCC",
    "Provence-Alpes-Côte d'Azur": "FR-PAC",
    "Pays de la Loire": "FR-PDL",
    "Corse": "FR-20R",
    "Guadeloupe": "FR-971",
    "Martinique": "FR-972",
    "Guyane": "FR-973",
    "La Réunion": "FR-974",
    "Mayotte": "FR-976"
};

// Department to SVG elements helper
function getSvgElementsForDept(code) {
    if (code === "69") return ["FR-69", "FR-69M"];
    if (code === "75") return ["FR-75C"];
    return [`FR-${code}`];
}

// Game State
const QuizGame = {
    settings: {
        mode: "mixed", // "mixed", "depts", "regions", "cities"
        mechanic: "qcm", // "qcm", "click"
        totalQuestions: 20
    },
    state: {
        active: false,
        questions: [],
        currentIndex: 0,
        score: 0,
        answered: false,
        userHistory: [] // list of { question, userIndex, isCorrect }
    },

    init() {
        this.bindEvents();
        this.initTheme();
        this.setupInteractiveMap();
    },

    initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
        this.updateThemeIcon(savedTheme);
    },

    updateThemeIcon(theme) {
        const themeBtn = document.getElementById("theme-toggle");
        if (theme === "light") {
            themeBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`;
        } else {
            themeBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm-12.37 1.06c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.06 1.06c.39.39.39 1.03 0 1.41s-1.03.39-1.41 0l-1.06-1.06zm12.37-12.37c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.06 1.06c.39.39.39 1.03 0 1.41s-1.03.39-1.41 0l-1.06-1.06z"/></svg>`;
        }
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        this.updateThemeIcon(newTheme);
    },

    bindEvents() {
        document.getElementById("theme-toggle").addEventListener("click", () => this.toggleTheme());
        document.getElementById("btn-start-game").addEventListener("click", () => this.startGame());
        document.getElementById("btn-next").addEventListener("click", () => this.nextQuestion());
        document.getElementById("btn-restart").addEventListener("click", () => this.showStartScreen());

        // Settings cards clicks
        document.querySelectorAll(".setting-card").forEach(card => {
            card.addEventListener("click", (e) => {
                const parent = card.closest(".settings-options");
                parent.querySelectorAll(".setting-card").forEach(c => c.classList.remove("active"));
                card.classList.add("active");
                
                const settingType = card.dataset.setting;
                const value = card.dataset.value;
                this.settings[settingType] = value;

                // Dynamic UI: Dim and disable categories if warmup is selected
                if (settingType === "mechanic") {
                    const modeGroup = document.querySelector(".settings-group:nth-of-type(2)");
                    if (modeGroup) {
                        if (value === "warmup") {
                            modeGroup.style.opacity = "0.35";
                            modeGroup.style.pointerEvents = "none";
                        } else {
                            modeGroup.style.opacity = "1";
                            modeGroup.style.pointerEvents = "auto";
                        }
                    }
                }
            });
        });
    },

    setupInteractiveMap() {
        const map = document.querySelector(".france-map");
        const tooltip = document.getElementById("map-tooltip");

        // We target only elements representing departments (metropolitan, DOM, special statuts)
        const paths = map.querySelectorAll(".subtype-dm, .subtype-cdom, .subtype-ctuom, .subtype-cmst");
        
        paths.forEach(el => {
            el.classList.add("hoverable");

            el.addEventListener("mouseenter", (e) => {
                const deptCode = el.id.replace("FR-", "").replace("C", "").replace("M", "");
                const deptData = DEPARTMENTS_DATA.find(d => d.code === deptCode);

                if (this.state.active) {
                    if (this.state.answered || this.settings.mechanic === "warmup") {
                        // Show details post-answer or during warmup
                        if (deptData) {
                            tooltip.innerHTML = `<strong>${deptData.name} (${deptData.code})</strong><br>Pref: ${deptData.prefecture}<br>Région: ${deptData.region}`;
                            tooltip.style.opacity = 1;
                        }
                    } else {
                        // Hide tooltip during active quiz to prevent cheating
                        tooltip.style.opacity = 0;
                    }
                } else {
                    // Show full info in training mode
                    if (deptData) {
                        tooltip.innerHTML = `<strong>${deptData.name} (${deptData.code})</strong><br>Pref: ${deptData.prefecture}<br>Région: ${deptData.region}`;
                        tooltip.style.opacity = 1;
                    } else {
                        const desc = el.getAttribute("aria-description");
                        if (desc) {
                            tooltip.innerHTML = `<strong>${desc}</strong>`;
                            tooltip.style.opacity = 1;
                        }
                    }
                }
            });

            el.addEventListener("mousemove", (e) => {
                const mapRect = map.getBoundingClientRect();
                const x = e.clientX - mapRect.left + map.scrollLeft;
                const y = e.clientY - mapRect.top + map.scrollTop;
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });

            el.addEventListener("mouseleave", () => {
                tooltip.style.opacity = 0;
            });
            
            el.addEventListener("click", () => {
                if (this.state.active && !this.state.answered) {
                    if (this.settings.mechanic === "click") {
                        this.handleMapClick(el);
                    } else if (this.settings.mechanic === "warmup") {
                        // In warmup mode, clicking the map triggers card swipe and goes to the next
                        this.state.answered = true;
                        const card = document.querySelector(".tinder-card");
                        if (card) {
                            card.classList.add("swipe-right");
                        }
                        SoundEffects.playSwipe();
                        setTimeout(() => {
                            this.nextQuestion();
                        }, 350);
                    }
                }
            });
        });
    },

    showStartScreen() {
        document.getElementById("modal-end").classList.remove("active");
        document.getElementById("modal-start").classList.add("active");
    },

    startGame() {
        this.state.active = true;
        this.state.currentIndex = 0;
        this.state.score = 0;
        this.state.userHistory = [];
        this.state.answered = false;

        document.getElementById("modal-start").classList.remove("active");
        
        // Generate question set
        this.generateQuestions();
        this.showQuestion();
    },

    generateQuestions() {
        if (this.settings.mechanic === "warmup") {
            const shuffled = [...DEPARTMENTS_DATA].sort(() => Math.random() - 0.5);
            this.settings.totalQuestions = shuffled.length;
            this.state.questions = shuffled.map(dept => ({
                type: "WARMUP",
                dept: dept,
                correctAnswer: dept.name,
                highlightCode: dept.code,
                isRegionHighlight: false
            }));
            return;
        }

        const pool = [];
        const signatures = new Set();
        
        // Types we can generate based on mode selection
        let allowedTypes = ["MAP_DEPT", "MAP_REGION", "PREFECTURE", "CODE_DEPT", "CITY_TO_DEPT"];
        if (this.settings.mode === "depts") {
            allowedTypes = ["MAP_DEPT", "CODE_DEPT"];
        } else if (this.settings.mode === "regions") {
            allowedTypes = ["MAP_REGION"];
        } else if (this.settings.mode === "cities") {
            allowedTypes = ["PREFECTURE", "CITY_TO_DEPT"];
        }

        // Region mode unique limit (18 regions)
        let targetCount = 20; // Default questions count
        if (this.settings.mode === "regions") {
            const uniqueRegionsCount = new Set(DEPARTMENTS_DATA.map(d => d.region)).size;
            targetCount = Math.min(20, uniqueRegionsCount); // Capped at 18
        }
        this.settings.totalQuestions = targetCount;

        let attempts = 0;
        while (pool.length < targetCount && attempts < 2000) {
            attempts++;
            const deptIndex = Math.floor(Math.random() * DEPARTMENTS_DATA.length);
            const dept = DEPARTMENTS_DATA[deptIndex];
            const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
            
            // Build temporary question
            const q = this.buildQuestion(type, dept);
            
            // Deduplicate logic via signature
            let sig = "";
            if (type === "MAP_REGION") {
                sig = `REGION_${dept.region}`;
            } else if (type === "CODE_DEPT") {
                const isCodeToName = q.questionText.includes("porte le numéro");
                sig = `CODE_${dept.code}_${isCodeToName ? "C2N" : "N2C"}`;
            } else if (type === "PREFECTURE") {
                const isSub = q.questionText.includes("sous-préfecture");
                sig = `PREF_${dept.code}_${isSub ? "SUB" : "MAIN"}`;
            } else {
                sig = `${type}_${dept.code}`;
            }
            
            if (!signatures.has(sig)) {
                signatures.add(sig);
                pool.push(q);
            }
        }

        // Fallback safety to fill the pool if we exhaust attempts (should not happen in ordinary cases)
        while (pool.length < targetCount) {
            const dept = DEPARTMENTS_DATA[Math.floor(Math.random() * DEPARTMENTS_DATA.length)];
            const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
            pool.push(this.buildQuestion(type, dept));
        }

        this.state.questions = pool;
    },

    buildQuestion(type, dept) {
        let questionText = "";
        let correctAnswer = "";
        let options = [];
        let highlightCode = dept.code;
        let isRegionHighlight = false;

        if (type === "MAP_DEPT") {
            questionText = `Quel est le nom du département mis en surbrillance ?`;
            correctAnswer = dept.name;
            // Distractors: other departments from the same region
            const sameRegion = DEPARTMENTS_DATA.filter(d => d.region === dept.region && d.name !== dept.name);
            const others = DEPARTMENTS_DATA.filter(d => d.region !== dept.region);
            
            let pool = sameRegion.sort(() => Math.random() - 0.5).slice(0, 3);
            while (pool.length < 3) {
                const randomDept = others[Math.floor(Math.random() * others.length)];
                if (!pool.includes(randomDept) && randomDept.name !== dept.name) {
                    pool.push(randomDept);
                }
            }
            options = [dept.name, ...pool.map(d => d.name)];
        } 
        
        else if (type === "MAP_REGION") {
            isRegionHighlight = true;
            highlightCode = REGION_SVG_MAPPING[dept.region] || dept.region;
            questionText = `Quel est le nom de la région mise en surbrillance ?`;
            correctAnswer = dept.region;
            
            const allRegions = [...new Set(DEPARTMENTS_DATA.map(d => d.region))].filter(r => r !== dept.region);
            const pool = allRegions.sort(() => Math.random() - 0.5).slice(0, 3);
            options = [dept.region, ...pool];
        } 
        
        else if (type === "PREFECTURE") {
            // Always ask for prefecture (subprefectures removed)
            questionText = `Quelle est la préfecture du département : ${dept.name} (${dept.code}) ?`;
            correctAnswer = dept.prefecture;
            
            // Distractors: other prefectures
            const otherPrefs = DEPARTMENTS_DATA.filter(d => d.code !== dept.code).map(d => d.prefecture);
            const pool = otherPrefs.sort(() => Math.random() - 0.5).slice(0, 3);
            options = [dept.prefecture, ...pool];
        } 
        
        else if (type === "CODE_DEPT") {
            const askCodeToName = Math.random() > 0.5;
            if (askCodeToName) {
                questionText = `Quel département porte le numéro (code) ${dept.code} ?`;
                correctAnswer = dept.name;
                const otherNames = DEPARTMENTS_DATA.filter(d => d.code !== dept.code).map(d => d.name);
                const pool = otherNames.sort(() => Math.random() - 0.5).slice(0, 3);
                options = [dept.name, ...pool];
            } else {
                questionText = `Quel est le numéro (code) du département : ${dept.name} ?`;
                correctAnswer = dept.code;
                const otherCodes = DEPARTMENTS_DATA.filter(d => d.code !== dept.code).map(d => d.code);
                const pool = otherCodes.sort(() => Math.random() - 0.5).slice(0, 3);
                options = [dept.code, ...pool];
            }
        } 
        
        else if (type === "CITY_TO_DEPT") {
            // Pick only the prefecture (subprefectures removed)
            const chosenCity = dept.prefecture;
            
            questionText = `Dans quel département se situe la ville de ${chosenCity} ?`;
            correctAnswer = `${dept.name} (${dept.code})`;
            
            const otherDepts = DEPARTMENTS_DATA.filter(d => d.code !== dept.code);
            const pool = otherDepts.sort(() => Math.random() - 0.5).slice(0, 3);
            options = [`${dept.name} (${dept.code})`, ...pool.map(d => `${d.name} (${d.code})`)];
        }

        // Shuffle options
        options = options.sort(() => Math.random() - 0.5);

        return {
            type,
            questionText,
            correctAnswer,
            options,
            highlightCode,
            isRegionHighlight,
            dept
        };
    },

    clearMapHighlights() {
        const map = document.querySelector(".france-map");
        map.querySelectorAll(".highlighted, .correct-highlight, .wrong-highlight, .region-context").forEach(el => {
            el.classList.remove("highlighted", "correct-highlight", "wrong-highlight", "region-context");
        });
    },

    highlightMap(code, isRegion, className = "highlighted", clearFirst = true) {
        if (clearFirst) {
            this.clearMapHighlights();
        }
        
        if (isRegion) {
            // Find all paths that belong to this region in the SVG
            // Region is represented by the group ID e.g. "FR-IDF"
            const group = document.getElementById(code);
            if (group) {
                group.classList.add(className);
                // Also highlight its children
                group.querySelectorAll("path, polygon").forEach(el => {
                    el.classList.add(className);
                });
            }
        } else {
            // Highlight a single department
            const elementIds = getSvgElementsForDept(code);
            elementIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.classList.add(className);
                }
            });
        }
    },

    showQuestion() {
        this.state.answered = false;
        
        const q = this.state.questions[this.state.currentIndex];
        
        // Update stats
        document.getElementById("curr-question").textContent = this.state.currentIndex + 1;
        document.getElementById("total-questions").textContent = this.settings.totalQuestions;
        
        // Dynamic dashboard labels
        const scoreLabel = document.querySelector(".dashboard .dash-item:nth-of-type(4) .dash-label");
        if (scoreLabel) {
            scoreLabel.textContent = this.settings.mechanic === "warmup" ? "Mode" : "Score";
        }
        document.getElementById("score-value").textContent = this.settings.mechanic === "warmup" ? "Découverte" : `${this.state.score} / ${this.state.currentIndex}`;
        
        // Progress bar
        const progressPercent = ((this.state.currentIndex) / this.settings.totalQuestions) * 100;
        document.getElementById("progress-bar").style.width = `${progressPercent}%`;

        // Render question details
        const typeBadge = document.getElementById("question-badge");
        typeBadge.textContent = this.settings.mechanic === "warmup" ? "Découverte" : (this.settings.mechanic === "click" ? "Localisation" : q.type.replace("_", " "));
        
        const grid = document.getElementById("options-grid");
        grid.innerHTML = "";

        if (this.settings.mechanic === "warmup") {
            // Warmup mode: Tinder-like memo card
            document.getElementById("question-text").textContent = "Fiche d'échauffement :";

            const container = document.createElement("div");
            container.className = "tinder-card-wrapper";
            container.style.cssText = "perspective: 1000px; width: 100%; display: flex; justify-content: center; margin: 0.5rem 0;";
            
            container.innerHTML = `
                <div class="tinder-card" style="width: 100%; background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; display: flex; flex-direction: column; gap: 1.25rem; align-items: center; box-shadow: var(--shadow-lg); cursor: pointer; user-select: none; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: var(--accent-glow); filter: blur(50px); opacity: 0.15; border-radius: 50%; pointer-events: none;"></div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                        <div style="width: 54px; height: 54px; border-radius: 50%; background: var(--accent-color); color: #fff; font-size: 1.6rem; font-weight: 800; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);">
                            ${q.dept.code}
                        </div>
                        <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin: 0.25rem 0 0 0; letter-spacing: -0.02em;">
                            ${q.dept.name}
                        </h2>
                    </div>
                    <div style="width: 100%; display: flex; flex-direction: column; gap: 0.85rem; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 1.25rem 0;">
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem;">
                            <span style="color: var(--text-secondary); font-weight: 500;">Préfecture :</span>
                            <span style="color: var(--text-primary); font-weight: 700;">${q.dept.prefecture}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem;">
                            <span style="color: var(--text-secondary); font-weight: 500;">Région :</span>
                            <span style="color: var(--text-primary); font-weight: 700; text-align: right;">${q.dept.region}</span>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; width: 100%;">
                        <button class="btn-primary" style="width: 100%; justify-content: center; gap: 0.5rem;">
                            <span>Suivant</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
                        </button>
                        <span style="font-size: 0.75rem; color: var(--text-secondary); opacity: 0.7; font-style: italic;">(ou cliquez sur la carte pour passer au suivant)</span>
                    </div>
                </div>
            `;

            // Bind card swipe event
            const cardEl = container.querySelector(".tinder-card");
            cardEl.addEventListener("click", () => {
                if (this.state.answered) return;
                this.state.answered = true;
                cardEl.classList.add("swipe-right");
                SoundEffects.playSwipe();
                setTimeout(() => {
                    this.nextQuestion();
                }, 350);
            });

            grid.appendChild(container);
            
            // Highlight map: first clear, then draw the region context, and finally draw the department on top
            this.clearMapHighlights();
            const regionCode = REGION_SVG_MAPPING[q.dept.region];
            if (regionCode) {
                this.highlightMap(regionCode, true, "region-context", false);
            }
            this.highlightMap(q.highlightCode, false, "highlighted", false);

        } else if (this.settings.mechanic === "click") {
            // Click mode: Clear map highlights (the user must find the target)
            this.clearMapHighlights();
            
            // Build a descriptive target label and name
            let targetLabel = "";
            let targetVal = "";
            if (q.type === "MAP_DEPT") {
                targetLabel = "le département";
                targetVal = q.correctAnswer;
            } else if (q.type === "MAP_REGION") {
                targetLabel = "la région";
                targetVal = q.correctAnswer;
            } else if (q.type === "PREFECTURE") {
                const isSub = q.questionText.includes("sous-préfecture");
                targetLabel = isSub ? "la sous-préfecture" : "la préfecture";
                targetVal = q.correctAnswer;
            } else if (q.type === "CODE_DEPT") {
                targetLabel = "le département ayant le numéro (code)";
                targetVal = q.dept.code;
            } else if (q.type === "CITY_TO_DEPT") {
                const matches = q.questionText.match(/ville de ([^?]+)\?/);
                const city = matches ? matches[1].trim() : "";
                targetLabel = "le département de la ville";
                targetVal = city;
            }

            document.getElementById("question-text").textContent = "Cliquez sur la carte pour situer :";

            const container = document.createElement("div");
            container.className = "click-target-container";
            container.style.cssText = "text-align: center; padding: 2rem 1.5rem; border: 2px dashed var(--border-color); border-radius: var(--radius-sm); background: rgba(255,255,255,0.02); display: flex; flex-direction: column; gap: 0.5rem; width: 100%;";
            container.innerHTML = `
                <span style="font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">${targetLabel}</span>
                <span style="font-size: 2rem; font-weight: 800; color: var(--accent-color);">${targetVal}</span>
            `;
            grid.appendChild(container);

        } else {
            // QCM mode
            document.getElementById("question-text").textContent = q.questionText;

            q.options.forEach((opt, idx) => {
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                const btn = document.createElement("button");
                btn.className = "option-btn";
                btn.innerHTML = `
                    <span>${opt}</span>
                    <span class="option-badge">${letter}</span>
                `;
                btn.addEventListener("click", () => this.checkAnswer(opt, btn));
                grid.appendChild(btn);
            });

            // Highlight map (with clue)
            this.highlightMap(q.highlightCode, q.isRegionHighlight, "highlighted");
        }

        // Hide next button & feedback panel
        document.getElementById("btn-next").style.display = "none";
        document.getElementById("feedback-panel").style.display = "none";
    },

    checkAnswer(selectedOption, clickedButton) {
        if (this.state.answered) return;
        this.state.answered = true;

        const q = this.state.questions[this.state.currentIndex];
        const isCorrect = selectedOption === q.correctAnswer;
        
        if (isCorrect) {
            this.state.score++;
            clickedButton.classList.add("correct");
            this.highlightMap(q.highlightCode, q.isRegionHighlight, "correct-highlight");
            SoundEffects.playCorrect();
            
            // Auto transition to next question after 1 second for correct answers
            setTimeout(() => {
                this.nextQuestion();
            }, 1000);
        } else {
            clickedButton.classList.add("wrong");
            this.highlightMap(q.highlightCode, q.isRegionHighlight, "wrong-highlight");
            SoundEffects.playWrong();
            
            // Highlight the correct button
            const buttons = document.querySelectorAll(".option-btn");
            buttons.forEach(btn => {
                const optText = btn.querySelector("span").textContent;
                if (optText === q.correctAnswer) {
                    btn.classList.add("correct");
                }
            });

            // Show feedback details only for incorrect answers
            const feedbackPanel = document.getElementById("feedback-panel");
            const feedbackTitle = document.getElementById("feedback-title");
            const feedbackText = document.getElementById("feedback-text");

            feedbackPanel.style.display = "flex";
            feedbackTitle.className = "feedback-title wrong";
            feedbackTitle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
                Incorrect
            `;

            // Informative breakdown
            let info = "";
            if (q.dept) {
                info = `Le département <strong>${q.dept.name} (${q.dept.code})</strong> est situé dans la région <strong>${q.dept.region}</strong>. Sa préfecture est <strong>${q.dept.prefecture}</strong>.`;
            }
            feedbackText.innerHTML = info;

            // Show next button
            document.getElementById("btn-next").style.display = "flex";
        }

        // Disable all buttons
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.classList.add("disabled");
        });

        // Log history
        this.state.userHistory.push({
            question: q,
            isCorrect: isCorrect,
            selected: selectedOption
        });
        
        // Live update score
        document.getElementById("score-value").textContent = `${this.state.score} / ${this.state.currentIndex + 1}`;
    },

    handleMapClick(el) {
        if (this.state.answered) return;
        this.state.answered = true;

        const q = this.state.questions[this.state.currentIndex];
        const clickedCode = el.id.replace("FR-", "").replace("C", "").replace("M", "");
        const clickedDept = DEPARTMENTS_DATA.find(d => d.code === clickedCode);
        
        let isCorrect = false;
        if (q.isRegionHighlight) {
            isCorrect = clickedDept && (clickedDept.region === q.correctAnswer);
        } else {
            isCorrect = clickedDept && (clickedCode === q.dept.code);
        }

        if (isCorrect) {
            this.state.score++;
            this.highlightMap(q.highlightCode, q.isRegionHighlight, "correct-highlight");
            SoundEffects.playCorrect();
            
            // Auto transition to next question after 1 second for correct answers
            setTimeout(() => {
                this.nextQuestion();
            }, 1000);
        } else {
            SoundEffects.playWrong();
            
            // Highlight correct one in green
            this.highlightMap(q.highlightCode, q.isRegionHighlight, "correct-highlight");
            
            // Highlight clicked one in red
            const clickedIds = getSvgElementsForDept(clickedCode);
            clickedIds.forEach(id => {
                const cel = document.getElementById(id);
                if (cel) cel.classList.add("wrong-highlight");
            });

            // Show feedback details only for incorrect answers
            const feedbackPanel = document.getElementById("feedback-panel");
            const feedbackTitle = document.getElementById("feedback-title");
            const feedbackText = document.getElementById("feedback-text");

            feedbackPanel.style.display = "flex";
            feedbackTitle.className = "feedback-title wrong";
            feedbackTitle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
                Incorrect
            `;

            let clickedNameText = clickedDept ? `${clickedDept.name} (${clickedDept.code})` : "hors de la zone";
            let details = `Vous avez cliqué sur : <strong>${clickedNameText}</strong>.<br>`;
            
            if (q.dept) {
                details += `La bonne réponse était <strong>${q.dept.name} (${q.dept.code})</strong> (préfecture : ${q.dept.prefecture}, région : ${q.dept.region}).`;
            } else if (q.isRegionHighlight) {
                details += `La bonne réponse était la région <strong>${q.correctAnswer}</strong>.`;
            }
            
            feedbackText.innerHTML = details;

            // Show next button
            document.getElementById("btn-next").style.display = "flex";
        }

        // Log history
        this.state.userHistory.push({
            question: q,
            isCorrect: isCorrect,
            selected: clickedDept ? `${clickedDept.name} (${clickedDept.code})` : "Clic hors cible"
        });
        
        // Live update score
        document.getElementById("score-value").textContent = `${this.state.score} / ${this.state.currentIndex + 1}`;
    },

    nextQuestion() {
        this.state.currentIndex++;
        if (this.state.currentIndex < this.settings.totalQuestions) {
            this.showQuestion();
        } else {
            this.endGame();
        }
    },

    endGame() {
        this.state.active = false;
        this.clearMapHighlights();
        
        // Progress bar fully filled
        document.getElementById("progress-bar").style.width = "100%";

        // Restore score label for next games
        const scoreLabel = document.querySelector(".dashboard .dash-item:nth-of-type(4) .dash-label");
        if (scoreLabel) {
            scoreLabel.textContent = "Score";
        }

        const modalEnd = document.getElementById("modal-end");
        modalEnd.classList.add("active");

        const isWarmup = this.settings.mechanic === "warmup";
        
        // Custom header titles based on mode
        const modalTitle = document.querySelector("#modal-end .modal-title");
        const scoreSubtitle = document.querySelector("#modal-end p");
        const recapSection = document.getElementById("recap-section");
        const finalScore = document.getElementById("final-score");
        const ratingMessage = document.getElementById("rating-message");

        if (isWarmup) {
            if (modalTitle) modalTitle.textContent = "Échauffement Terminé !";
            if (scoreSubtitle) scoreSubtitle.textContent = "Fiches parcourues :";
            finalScore.textContent = "101 / 101";
            ratingMessage.innerHTML = "<strong>Félicitations ! Vous avez révisé avec succès l'intégralité des 101 départements français. 🏆</strong>";
            if (recapSection) recapSection.style.display = "none";
        } else {
            if (modalTitle) modalTitle.textContent = "Partie Terminée !";
            if (scoreSubtitle) scoreSubtitle.textContent = "Votre score final :";
            finalScore.textContent = `${this.state.score} / ${this.settings.totalQuestions}`;
            if (recapSection) recapSection.style.display = "block";

            // Display Performance Rating message
            const rate = this.state.score / this.settings.totalQuestions;
            let ratingText = "";
            if (rate >= 0.9) {
                ratingText = "Excellent ! Un génie de la cartographie française ! 🏆";
            } else if (rate >= 0.7) {
                ratingText = "Très bien ! Vos connaissances sont solides. 👍";
            } else if (rate >= 0.5) {
                ratingText = "Pas mal ! Encore un peu d'entraînement. 📖";
            } else {
                ratingText = "Peut mieux faire... Continuez à réviser la carte ! 🗺️";
            }
            ratingMessage.innerHTML = `<strong>${ratingText}</strong>`;

            // Render Review / Recap list
            const recapList = document.getElementById("recap-list");
            recapList.innerHTML = "";

            this.state.userHistory.forEach((h, idx) => {
                const row = document.createElement("div");
                row.className = "recap-row";
                
                const indicatorClass = h.isCorrect ? "correct" : "wrong";
                const indicatorSymbol = h.isCorrect ? "✓" : "✗";
                
                row.innerHTML = `
                    <div>
                        <strong>Q${idx + 1}:</strong> ${h.question.questionText}
                        <br>
                        <small style="color: var(--text-secondary)">Attendu: ${h.question.correctAnswer} | Choisi: ${h.selected}</small>
                    </div>
                    <div class="recap-indicator ${indicatorClass}">${indicatorSymbol}</div>
                `;
                
                // Allow clicking row to show that department highlighted on map (post-game review)
                row.addEventListener("click", () => {
                    this.highlightMap(h.question.highlightCode, h.question.isRegionHighlight, h.isCorrect ? "correct-highlight" : "wrong-highlight");
                });
                recapList.appendChild(row);
            });
        }
    }
};

// Initialize when page loads
window.addEventListener("DOMContentLoaded", () => {
    QuizGame.init();
});
