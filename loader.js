function loadMission(id) {
  return new Promise(function(resolve, reject) {
    fetch('missions/' + id + '.json')
      .then(function(response) {
        if (!response.ok) {
          reject(new Error('Network error: ' + response.status));
          return;
        }
        return response.json();
      })
      .then(function(raw) {
        var mission = unwrapMission(raw);
        if (!mission) {
          reject(new Error('Mission data not found'));
          return;
        }
        var check = validateMission(mission);
        if (!check.ok) {
          reject(new Error('Missing field: ' + check.field));
          return;
        }
        resolve(mission);
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function unwrapMission(raw) {
  if (!raw) return null;
  if (raw.mission_id) return raw;
  if (Array.isArray(raw.missions) && raw.missions.length > 0) {
    return raw.missions[0];
  }
  return null;
}
