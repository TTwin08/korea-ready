var currentGoal = 'common';
var beginnerMode = false;

function showScreen(id) {
  var sections = document.querySelectorAll('.screen-section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active');
  }
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function showHome() {
  renderDashboard();
  showScreen('screen-home');
}

function showEntryChoice() {
  showScreen('screen-entry');
}

function chooseBeginner() {
  beginnerMode = true;
  document.getElementById('mission-list-goal').textContent = 'Foundation (Level 0)';
  renderMissionList('foundation');
  showScreen('screen-missions');
}

function chooseKnowHangul() {
  beginnerMode = false;
  showGoals();
}

function showGoals() {
  showScreen('screen-goals');
}

function showMissions(goal) {
  currentGoal = goal;
  var name = goal.charAt(0).toUpperCase() + goal.slice(1);
  document.getElementById('mission-list-goal').textContent = name + ' Missions';
  renderMissionList(goal);
  showScreen('screen-missions');
}

function backFromMissions() {
  if (beginnerMode) {
    showEntryChoice();
  } else {
    showGoals();
  }
}

function renderMissionList(goal) {
  var container = document.getElementById('mission-list-container');
  container.innerHTML = '';

  fetch('missions/index.json?v=4')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var list = data.missions || [];
      var shown = 0;

      for (var i = 0; i < list.length; i++) {
        var m = list[i];

        if (goal === 'foundation') {
          if (m.level !== 0) continue;
        } else if (goal === 'common') {
          if (m.goal !== 'common') continue;
          if (m.level === 0) continue;
        } else if (goal === 'work') {
          if (m.goal !== 'work') continue;
        } else if (goal === 'study') {
          if (m.goal !== 'study') continue;
        } else if (goal === 'both') {
          if (m.goal !== 'work' && m.goal !== 'study') continue;
        } else {
          continue;
        }

        shown++;
        var complete = isMissionComplete(m.mission_id);
        var btn = document.createElement('button');
        btn.className = 'goal-btn';
        btn.textContent = (complete ? '✅ ' : '📄 ') +
          m.mission_id + '\n' +
          m.title.en + ' · ' + m.estimated_minutes + ' min';
        btn.onclick = (function(mid) {
          return function() { openMission(mid); };
        })(m.mission_id);
        container.appendChild(btn);
      }

      if (shown === 0) {
        var empty = document.createElement('p');
        empty.className = 'description';
        empty.textContent = 'No missions in this goal yet.';
        container.appendChild(empty);
      }
    })
    .catch(function(err) {
      var errEl = document.createElement('p');
      errEl.className = 'description';
      errEl.textContent = '⚠ Could not load mission list.';
      container.appendChild(errEl);
    });
}

function openMission(missionId) {
  loadMission(missionId)
    .then(function(data) { startMission(data); })
    .catch(function(err) { alert('Error: ' + err.message); });
}

function exitMission() {
  pendingRetry = null;
  currentMission = null;
  if (beginnerMode) {
    document.getElementById('mission-list-goal').textContent = 'Foundation (Level 0)';
    renderMissionList('foundation');
  } else {
    renderMissionList(currentGoal);
  }
  showScreen('screen-missions');
}

function renderDashboard() {
  fetch('missions/index.json?v=4')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var list = data.missions || [];
      var total = list.length;
      var completed = 0;

      for (var i = 0; i < list.length; i++) {
        if (isMissionComplete(list[i].mission_id)) completed++;
      }

      var score = total === 0 ? 0 : Math.round((completed / total) * 100);

      var completedEl = document.getElementById('dash-completed');
      var scoreEl = document.getElementById('dash-score');
      if (completedEl) completedEl.textContent = completed + '/' + total;
      if (scoreEl) scoreEl.textContent = score + '%';
    })
    .catch(function(err) {
      var completedEl = document.getElementById('dash-completed');
      if (completedEl) completedEl.textContent = '⚠ error';
    });
}

document.addEventListener('DOMContentLoaded', function() {
  renderDashboard();
});
