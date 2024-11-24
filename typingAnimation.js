export function animateText() {
  const MESSAGES = [
    { delay: 0, text: "I've missed you.😳" },
    { delay: 1200, text: "Can we go back to the way things were?" },
    
  ];

  const container = document.getElementById("container");
  const messageContainer = document.getElementById("message");
  const animateButton = document.getElementById("animate");
  let paragraphs = [];

  const scramble = (element, text, options) => {
    const defaults = {
      probability: 0.2,
      glitches: '-|/\\',
      blank: '',
      duration: text.length * 40,
      delay: 0.0
    };

    const settings = { ...defaults, ...options };
    const shuffle = () => (Math.random() < 0.5 ? 1 : -1);
    const wrap = (text, classes) => `<span class="${classes}">${text}</span>`;

    const glitchCharacters = settings.glitches.split('');
    const textCharacters = text.split('');
    const textLength = textCharacters.length;

    const order = Array.from({ length: textLength }, (_, i) => i).sort(shuffle);
    const output = Array(textLength).fill(settings.blank);

    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= textLength) {
        clearInterval(interval);
        element.innerHTML = text;
        return;
      }

      const index = order[progress];
      output[index] = textCharacters[index];
      element.innerHTML = output.join('');
      progress++;
    }, settings.duration / textLength);
  };

  const animate = () => {
    MESSAGES.forEach((data, index) => {
      const element = paragraphs[index];
      element.innerText = '';
      scramble(element, data.text, { delay: data.delay });
    });
  };

  const initialise = () => {
    MESSAGES.forEach(() => {
      const p = document.createElement("p");
      messageContainer.appendChild(p);
      paragraphs.push(p);
    });
    animate();
  };

  initialise();
}
