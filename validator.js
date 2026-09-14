function validateMission(data) {
  var required = [
    'mission_id',
    'title',
    'activities'
  ];

  if (!data) {
    return { ok: false, field: 'root' };
  }

  for (var i = 0; i < required.length; i++) {
    if (data[required[i]] === undefined || data[required[i]] === null) {
      return { ok: false, field: required[i] };
    }
  }

  if (!Array.isArray(data.activities) || data.activities.length === 0) {
    return { ok: false, field: 'activities' };
  }

  return { ok: true, field: null };
}
