function speakKorean(text) {
  if (!text) return;

  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech not supported on this device.');
    return;
  }

  window.speechSynthesis.cancel();

  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  var voices = window.speechSynthesis.getVoices();
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].lang.indexOf('ko') === 0) {
      utterance.voice = voices[i];
      break;
    }
  }

  window.speechSynthesis.speak(utterance);
}
