var STORAGE_KEY = 'korea_ready_progress';

function getProgress() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function markMissionComplete(missionId) {
  var progress = getProgress();
  progress[missionId] = {
    completed: true,
    completedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function isMissionComplete(missionId) {
  var progress = getProgress();
  return !!(progress[missionId] && progress[missionId].completed);
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
