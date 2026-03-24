// Text-to-Speech utility supporting Hindi and English
const TTS = {
  speaking: false,
  currentUtterance: null,

  speak(text, lang = 'en-IN') {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-Speech not supported');
      return false;
    }

    // Stop any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find an appropriate voice
    const voices = speechSynthesis.getVoices();
    const langVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (langVoice) utterance.voice = langVoice;

    utterance.onstart = () => { this.speaking = true; };
    utterance.onend = () => { this.speaking = false; this.currentUtterance = null; };
    utterance.onerror = () => { this.speaking = false; this.currentUtterance = null; };

    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
    return true;
  },

  stop() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    this.speaking = false;
    this.currentUtterance = null;
  },

  toggle(text, lang = 'en-IN') {
    if (this.speaking) {
      this.stop();
      return false;
    }
    this.speak(text, lang);
    return true;
  },

  // Generate scheme description text for TTS
  schemeToSpeech(scheme, lang = 'en') {
    if (lang === 'hi') {
      return `योजना का नाम: ${scheme.name}। विवरण: ${scheme.description}। लाभ: ${scheme.benefits?.join(', ')}। पात्रता: ${scheme.eligibility?.join(', ')}।`;
    }
    return `Scheme name: ${scheme.name}. Description: ${scheme.description}. Benefits include: ${scheme.benefits?.join(', ')}. Eligibility: ${scheme.eligibility?.join(', ')}.`;
  }
};

export default TTS;
