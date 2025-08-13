document.addEventListener("DOMContentLoaded", () => {
  let isWorkTime = true;
  let timeLeft = 30 * 60; // 30 minutos en segundos
  let timerId = null;

  const timer = document.getElementById("timer");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const status = document.getElementById("status");
  const energyBar = document.getElementById("energyBar");

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    const totalTime = isWorkTime ? 30 * 60 : 5 * 60;
    const percentage = (timeLeft / totalTime) * 100;
    energyBar.style.setProperty("--energy", `${percentage}%`);

    // Actualizar las llamas
    const flames = document.querySelectorAll(".flame");
    flames.forEach((flame, index) => {
      flame.style.animation = `flameWave 0.8s infinite ${index * 0.2}s`;
      // Ajustar opacidad basada en el porcentaje de tiempo restante
      flame.style.opacity = percentage < 30 ? "0.5" : "1";
    });
  }

  function toggleTimer() {
    if (timerId === null) {
      startButton.textContent = "Pausar";
      timerId = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
          if (isWorkTime) {
            timeLeft = 5 * 60; // 5 minutos de descanso
            isWorkTime = false;
            status.textContent = "¡Descanso!";
          } else {
            timeLeft = 30 * 60; // 30 minutos de trabajo
            isWorkTime = true;
            status.textContent = "¡Tiempo de trabajo!";
          }
        }
      }, 1000);
    } else {
      clearInterval(timerId);
      timerId = null;
      startButton.textContent = "Iniciar";
    }
  }

  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 30 * 60;
    startButton.textContent = "Iniciar";
    status.textContent = "¡Listo para comenzar!";
    updateTimer();
  }

  startButton.addEventListener("click", toggleTimer);
  resetButton.addEventListener("click", resetTimer);
  updateTimer();
});
startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
updateTimer();
