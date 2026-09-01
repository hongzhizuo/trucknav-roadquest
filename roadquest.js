/*!
 * RoadQuest — a configurable "checkpoint quiz" journey engine.
 * MIT License. See LICENSE for details.
 *
 * RoadQuest turns any set of questions into a small road-trip themed
 * game: each correct answer drives the truck forward to the next
 * checkpoint. It has no built-in subject matter — you supply a config
 * object describing your brand, theme colours, and questions, and
 * RoadQuest renders the rest.
 *
 * Usage:
 *   RoadQuest.init(document.getElementById('quest'), config);
 *
 * See README.md for the full config schema, and /examples for
 * ready-to-copy configs.
 */
(function (global) {
  'use strict';

  const DEFAULT_THEME = {
    ink: '#181a1d',
    muted: '#626970',
    paper: '#f1f3f2',
    accent: '#f5c62f',
    good: '#19744a',
    bad: '#b64327',
    sky: '#a3daf0',
    grass: '#5c9956',
    road: '#4a4f52',
    line: '#d4d9d6'
  };

  function el(tag, attrs, html) {
    const node = document.createElement(tag);
    if (attrs) for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (html != null) node.innerHTML = html;
    return node;
  }

  function applyTheme(root, theme) {
    const merged = Object.assign({}, DEFAULT_THEME, theme || {});
    for (const key in merged) {
      root.style.setProperty('--rq-' + key, merged[key]);
    }
  }

  function validateConfig(config) {
    if (!config || !Array.isArray(config.checkpoints) || config.checkpoints.length === 0) {
      throw new Error('RoadQuest: config.checkpoints must be a non-empty array');
    }
    config.checkpoints.forEach((c, i) => {
      if (!c.question || !Array.isArray(c.options) || typeof c.correctIndex !== 'number') {
        throw new Error('RoadQuest: checkpoint ' + i + ' is missing question/options/correctIndex');
      }
    });
  }

  class RoadQuestGame {
    constructor(root, config) {
      validateConfig(config);
      this.root = root;
      this.config = Object.assign({
        distanceUnit: 'km',
        stageLength: 100,
        brand: {},
        hero: {},
        cta: null,
        onComplete: null
      }, config);

      this.level = 0;
      this.score = 0;
      this.streak = 0;
      this.firstTry = 0;
      this.missedThisLevel = false;

      applyTheme(this.root, this.config.theme);
      this._render();
      this._bind();
    }

    _totalDistance() {
      return this.config.checkpoints.length * this.config.stageLength;
    }

    _render() {
      const c = this.config;
      const brand = c.brand || {};
      const hero = c.hero || {};
      const cta = c.cta;

      this.root.classList.add('rq-root');
      this.root.innerHTML = `
        <header class="rq-top">
          <div class="rq-topin">
            <div class="rq-brand">
              <div class="rq-mark">${brand.iconSvg || defaultMark()}</div>
              <div><b>${escapeHtml(brand.name || 'RoadQuest')}</b><small>${escapeHtml(brand.tagline || '')}</small></div>
            </div>
            ${cta ? `<a class="rq-btn" href="${escapeAttr(cta.href)}" target="_blank" rel="noopener">${escapeHtml(cta.label || 'Visit')}</a>` : ''}
          </div>
        </header>
        <main class="rq-main">
          <section class="rq-hero">
            <div>
              <p class="rq-eye">${escapeHtml(hero.eyebrow || (c.checkpoints.length + ' checkpoints'))}</p>
              <h1>${escapeHtml(hero.title || 'RoadQuest')}</h1>
              <p>${escapeHtml(hero.description || '')}</p>
            </div>
            ${hero.image ? `<img src="${escapeAttr(hero.image)}" alt="${escapeAttr(hero.imageAlt || '')}">` : ''}
          </section>
          ${c.notice ? `<div class="rq-notice">${escapeHtml(c.notice)}</div>` : ''}

          <section class="rq-hud">
            <div class="rq-route">
              <div class="rq-route-label"><strong data-rq="routeName"></strong><span data-rq="distance"></span></div>
              <div class="rq-track"><span data-rq="progress"></span></div>
            </div>
            <div class="rq-stat"><b data-rq="score">0</b><small>Points</small></div>
            <div class="rq-stat"><b data-rq="streak">0×</b><small>Streak</small></div>
          </section>

          <section class="rq-game" data-rq="game" aria-label="Animated road challenge">
            <div class="rq-world">
              <div class="rq-sun"></div>
              <div class="rq-cloud rq-c1"></div><div class="rq-cloud rq-c2"></div>
              <div class="rq-hill"></div><div class="rq-hill rq-two"></div>
              <div class="rq-ground"></div><div class="rq-road"></div><div class="rq-lanes"></div>
              <div class="rq-sign" data-rq="sign"><span>START</span></div>
              <div class="rq-truck">
                <div class="rq-trailer"><b>${escapeHtml((brand.name || 'GO').slice(0, 8).toUpperCase())}</b></div>
                <div class="rq-cab"><div class="rq-window"></div></div>
                <div class="rq-wheel rq-w1"></div><div class="rq-wheel rq-w2"></div>
              </div>
            </div>
            <div class="rq-pop" data-rq="pop" role="status">Checkpoint cleared!</div>

            <div class="rq-panel rq-start" data-rq="start">
              ${startIcon()}
              <h2>${escapeHtml(hero.startTitle || 'Ready to start?')}</h2>
              <p>${escapeHtml(hero.startDescription || 'Each checkpoint tests one question. A correct answer moves you closer to the finish.')}</p>
              <button class="rq-btn" data-rq="startBtn">Start</button>
            </div>

            <div class="rq-panel rq-quiz" data-rq="quiz" hidden>
              <div class="rq-qtop"><span class="rq-checkpoint" data-rq="checkpoint"></span><span class="rq-topic" data-rq="topic"></span></div>
              <h2 data-rq="question"></h2>
              <div class="rq-answers" data-rq="answers"></div>
              <div class="rq-feedback" data-rq="feedback" aria-live="polite"></div>
              <div class="rq-actions"><button class="rq-btn" data-rq="next" hidden>Continue</button></div>
            </div>

            <div class="rq-panel rq-finish" data-rq="finish" hidden>
              ${finishIcon()}
              <h2>${escapeHtml(hero.finishTitle || 'Quest complete')}</h2>
              <p>${escapeHtml(hero.finishDescription || '')}</p>
              <div class="rq-results">
                <div><b data-rq="finalScore">0</b><small>final score</small></div>
                <div><b data-rq="accuracy">0%</b><small>first-try accuracy</small></div>
              </div>
              <div class="rq-finish-actions">
                <button class="rq-btn rq-alt" data-rq="restart">Play again</button>
                ${cta ? `<a class="rq-btn" href="${escapeAttr(cta.href)}" target="_blank" rel="noopener">${escapeHtml(cta.finishLabel || cta.label || 'Learn more')}</a>` : ''}
              </div>
            </div>
          </section>

          ${Array.isArray(c.facts) && c.facts.length ? `
          <details class="rq-facts">
            <summary>${escapeHtml(c.factsLabel || 'View details')}</summary>
            <div class="rq-facts-grid">
              ${c.facts.map(f => `<div class="rq-fact"><b>${escapeHtml(f.label)}</b><small>${escapeHtml(f.value)}</small></div>`).join('')}
            </div>
          </details>` : ''}

          ${c.footer ? `<footer class="rq-footer">${escapeHtml(c.footer)}</footer>` : ''}
        </main>`;

      this.$ = {};
      this.root.querySelectorAll('[data-rq]').forEach(node => {
        this.$[node.getAttribute('data-rq')] = node;
      });
      this._hud();
    }

    _hud() {
      const c = this.config;
      this.$.score.textContent = this.score;
      this.$.streak.textContent = this.streak + '×';
      this.$.distance.textContent = (this.level * c.stageLength) + ' / ' + this._totalDistance() + ' ' + c.distanceUnit;
      this.$.progress.style.width = (this.level / c.checkpoints.length * 100) + '%';
      const stage = c.routeStages && c.routeStages[Math.min(this.level, c.routeStages.length - 1)];
      this.$.routeName.textContent = stage || '';
    }

    _showCheckpoint() {
      const q = this.config.checkpoints[this.level];
      this.$.checkpoint.textContent = 'Checkpoint ' + (this.level + 1) + ' of ' + this.config.checkpoints.length;
      this.$.topic.textContent = q.topic || '';
      this.$.question.textContent = q.question;
      this.$.sign.innerHTML = '<span>' + escapeHtml(q.badge || String(this.level + 1)) + '</span>';
      this.$.answers.innerHTML = q.options.map((opt, i) =>
        `<button class="rq-answer" data-i="${i}"><span class="rq-letter">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt)}</button>`
      ).join('');
      this.$.feedback.className = 'rq-feedback';
      this.$.feedback.textContent = 'Choose the best answer to clear the checkpoint.';
      this.$.next.hidden = true;
      this.missedThisLevel = false;
      this.$.quiz.hidden = false;
      this.$.answers.querySelectorAll('.rq-answer').forEach(b => b.onclick = e => this._onAnswer(e));
    }

    _onAnswer(e) {
      const i = +e.currentTarget.dataset.i;
      const q = this.config.checkpoints[this.level];
      if (i === q.correctIndex) {
        if (!this.missedThisLevel) this.firstTry++;
        this.streak++;
        this.score += 100 + Math.min((this.streak - 1) * 20, 80);
        this.$.answers.querySelectorAll('.rq-answer').forEach(b => {
          b.disabled = true;
          if (+b.dataset.i === q.correctIndex) b.classList.add('rq-good');
        });
        this.$.feedback.className = 'rq-feedback rq-good';
        this.$.feedback.innerHTML = '<b>Correct — checkpoint cleared.</b>' + escapeHtml(q.explanation || '');
        this.$.next.hidden = false;
        this.$.next.focus();
      } else {
        this.missedThisLevel = true;
        this.streak = 0;
        this.score = Math.max(0, this.score - 25);
        e.currentTarget.classList.add('rq-bad');
        e.currentTarget.disabled = true;
        this.$.feedback.className = 'rq-feedback rq-bad';
        this.$.feedback.innerHTML = '<b>Not quite. Try another answer.</b>' + escapeHtml(q.explanation || '');
        this._hud();
      }
    }

    _drive() {
      this.$.quiz.hidden = true;
      this.$.game.classList.add('rq-driving');
      this.$.pop.classList.add('rq-show');
      setTimeout(() => this.$.pop.classList.remove('rq-show'), 850);
      this._timer = setTimeout(() => {
        this.level++;
        this._hud();
        this.$.game.classList.remove('rq-driving');
        if (this.level === this.config.checkpoints.length) this._done();
        else this._showCheckpoint();
      }, 1100);
    }

    _done() {
      this.$.finalScore.textContent = this.score;
      this.$.accuracy.textContent = Math.round(this.firstTry / this.config.checkpoints.length * 100) + '%';
      this.$.finish.hidden = false;
      this.$.sign.innerHTML = '<span>FINISH</span>';
      if (typeof this.config.onComplete === 'function') {
        this.config.onComplete({ score: this.score, accuracy: this.firstTry / this.config.checkpoints.length });
      }
    }

    _reset() {
      clearTimeout(this._timer);
      this.level = this.score = this.streak = this.firstTry = 0;
      this.missedThisLevel = false;
      this.$.game.classList.remove('rq-driving');
      this.$.finish.hidden = true;
      this.$.start.hidden = false;
      this.$.sign.innerHTML = '<span>START</span>';
      this._hud();
    }

    _bind() {
      this.$.startBtn.onclick = () => {
        this.$.start.hidden = true;
        this.$.game.classList.add('rq-driving');
        setTimeout(() => {
          this.$.game.classList.remove('rq-driving');
          this._showCheckpoint();
        }, 850);
      };
      this.$.next.onclick = () => this._drive();
      this.$.restart.onclick = () => this._reset();
    }
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }
  function escapeAttr(s) { return escapeHtml(s); }
  function defaultMark() { return '&#9679;'; }
  function startIcon() { return '<div class="rq-icon" aria-hidden="true">&#9873;</div>'; }
  function finishIcon() { return '<div class="rq-badge" aria-hidden="true">&#127942;</div>'; }

  global.RoadQuest = {
    init(root, config) {
      if (typeof root === 'string') root = document.querySelector(root);
      return new RoadQuestGame(root, config);
    }
  };
})(window);
