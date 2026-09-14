var currentMission = null;
var currentActivityIndex = 0;
var currentDialogueNodeId = null;
var scoreCorrect = 0;
var scoreWrong = 0;

function startMission(mission) {
  currentMission = mission;
  currentActivityIndex = 0;
  currentDialogueNodeId = null;
  scoreCorrect = 0;
  scoreWrong = 0;
  renderCurrentActivity();
}

function getCurrentActivity() {
  if (!currentMission) return null;
  return currentMission.activities[currentActivityIndex];
}

function findNode(activity, nodeId) {
  for (var i = 0; i < activity.nodes.length; i++) {
    if (activity.nodes[i].node_id === nodeId) return activity.nodes[i];
  }
  return null;
}

function nextActivity() {
  currentActivityIndex = currentActivityIndex + 1;
  currentDialogueNodeId = null;
  if (currentActivityIndex >= currentMission.activities.length) {
    showEndScreen();
  } else {
    renderCurrentActivity();
  }
}

function recordCorrect() { scoreCorrect = scoreCorrect + 1; }
function recordWrong() { scoreWrong = scoreWrong + 1; }

function calculateScore() {
  var total = scoreCorrect + scoreWrong;
  if (total === 0) return 100;
  return Math.round((scoreCorrect / total) * 100);
}
