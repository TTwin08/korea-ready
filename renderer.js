function renderCurrentActivity() {
  var activity = getCurrentActivity();
  if (!activity) { showScreen('screen-home'); return; }

  document.getElementById('activity-counter').textContent =
    'Activity ' + (currentActivityIndex + 1) + ' of ' + currentMission.activities.length;

  var textEl = document.getElementById('activity-text');
  var choicesEl = document.getElementById('activity-choices');
  textEl.textContent = '';
  choicesEl.innerHTML = '';

  if (activity.type === 'branch_dialogue') {
    if (!currentDialogueNodeId) currentDialogueNodeId = activity.entry_node;
    renderBranchDialogue(activity);
  } else if (activity.type === 'listen_choose') {
    renderListenChoose(activity);
  } else if (activity.type === 'speak') {
    renderSpeak(activity);
  } else if (activity.type === 'type_answer') {
    renderTypeAnswer(activity);
  }

  showScreen('screen-activity');
}

function makeSpeakButton(text) {
  var btn = document.createElement('button');
  btn.className = 'speak-btn';
  btn.textContent = '🔊 Play';
  btn.onclick = function() { speakKorean(text); };
  return btn;
}

function renderBranchDialogue(activity) {
  var textEl = document.getElementById('activity-text');
  var choicesEl = document.getElementById('activity-choices');

  if (currentDialogueNodeId === 'END') { nextActivity(); return; }

  var node = findNode(activity, currentDialogueNodeId);
  if (!node) { textEl.textContent = '⚠ Node not found'; return; }

  textEl.textContent = node.ko + '\n\n' + node.my;
  choicesEl.appendChild(makeSpeakButton(node.ko));

  for (var i = 0; i < node.choices.length; i++) {
    var choice = node.choices[i];
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.ko + '\n' + choice.my;
    btn.onclick = (function(c) {
      return function() { selectChoice(activity, c); };
    })(choice);
    choicesEl.appendChild(btn);
  }
}

function selectChoice(activity, choice) {
  if (choice.correct === true) recordCorrect();
  if (choice.correct === false) recordWrong();
  if (choice.correct === false && choice.feedback_ref) {
    showFeedback(choice.feedback_ref, function() {
      currentDialogueNodeId = choice.next;
      renderBranchDialogue(activity);
    });
    return;
  }
  currentDialogueNodeId = choice.next;
  renderBranchDialogue(activity);
}

function renderListenChoose(activity) {
  var textEl = document.getElementById('activity-text');
  var choicesEl = document.getElementById('activity-choices');

  textEl.textContent = activity.prompt.ko + '\n\n' + activity.prompt.my;
  choicesEl.appendChild(makeSpeakButton(activity.prompt.ko));

  for (var i = 0; i < activity.options.length; i++) {
    var opt = activity.options[i];
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = opt.ko + '\n' + opt.my;
    btn.onclick = (function(o) {
      return function() { selectOption(activity, o); };
    })(opt);
    choicesEl.appendChild(btn);
  }
}

function selectOption(activity, option) {
  if (option.correct) {
    recordCorrect();
    nextActivity();
  } else {
    recordWrong();
    showFeedback(activity.explanation_ref, function() {
      renderListenChoose(activity);
    });
  }
}

function renderSpeak(activity) {
  var textEl = document.getElementById('activity-text');
  var choicesEl = document.getElementById('activity-choices');

  textEl.textContent =
    activity.prompt.ko + '\n\n' + activity.prompt.my +
    '\n\n🎯 ' + activity.target_ko;

  choicesEl.appendChild(makeSpeakButton(activity.target_ko));

  var btn = document.createElement('button');
  btn.className = 'btn-primary';
  btn.textContent = '✅ Done';
  btn.onclick = function() { recordCorrect(); nextActivity(); };
  choicesEl.appendChild(btn);
}

function renderTypeAnswer(activity) {
  var textEl = document.getElementById('activity-text');
  var choicesEl = document.getElementById('activity-choices');

  textEl.textContent = activity.prompt.ko + '\n\n' + activity.prompt.my;

  var hint = document.createElement('p');
  hint.className = 'subtitle';
  hint.textContent = 'Hint: ' + activity.answer;
  hint.style.marginBottom = '12px';
  choicesEl.appendChild(hint);

  var input = document.createElement('input');
  input.type = 'text';
  input.className = 'answer-input';
  input.id = 'answer-input';
  input.placeholder = '한국어로 입력';
  choicesEl.appendChild(input);

  var btn = document.createElement('button');
  btn.className = 'btn-primary';
  btn.textContent = 'Submit';
  btn.onclick = function() { checkAnswer(activity); };
  choicesEl.appendChild(btn);

  var skipBtn = document.createElement('button');
  skipBtn.className = 'btn-secondary';
  skipBtn.textContent = 'Show Answer & Continue';
  skipBtn.onclick = function() { recordCorrect(); nextActivity(); };
  choicesEl.appendChild(skipBtn);
}

function checkAnswer(activity) {
  var input = document.getElementById('answer-input');
  var val = (input.value || '').trim();

  var answers = [activity.answer];
  if (activity.accept_alt) {
    for (var i = 0; i < activity.accept_alt.length; i++) answers.push(activity.accept_alt[i]);
  }

  var ok = false;
  for (var j = 0; j < answers.length; j++) {
    if (val === answers[j]) { ok = true; break; }
  }

  if (ok) {
    recordCorrect();
    nextActivity();
  } else {
    recordWrong();
    showFeedback(activity.explanation_ref, function() {
      renderTypeAnswer(activity);
    });
  }
}

var pendingRetry = null;

function showFeedback(refId, onRetry) {
  var feedback = currentMission.feedback[refId];
  if (!feedback) { onRetry(); return; }
  pendingRetry = onRetry;
  document.getElementById('feedback-why').textContent =
    feedback.why_wrong.ko + '\n\n' + feedback.why_wrong.my;
  document.getElementById('feedback-retry').textContent = feedback.retry_phrase;
  showScreen('screen-feedback');
}

function retryFromFeedback() {
  if (pendingRetry) {
    var r = pendingRetry;
    pendingRetry = null;
    r();
  }
}

function showEndScreen() {
  markMissionComplete(currentMission.mission_id);
  document.getElementById('end-score').textContent = calculateScore() + '%';
  document.getElementById('end-activities').textContent =
    currentMission.activities.length + '/' + currentMission.activities.length;
  showScreen('screen-end');
}
