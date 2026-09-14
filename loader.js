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
      .then(function(data) {
        var check = validateMission(data);
        if (!check.ok) {
          reject(new Error('Missing field: ' + check.field));
          return;
        }
        resolve(data);
      })
      .catch(function(err) {
        reject(err);
      });
  });
}
