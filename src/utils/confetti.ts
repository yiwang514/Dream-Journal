import confetti from 'canvas-confetti'

export function fireConfetti() {
  const duration = 2500
  const end = Date.now() + duration
  const colors = ['#FFD93D', '#FF8C42', '#6BCB77', '#FFB3A7', '#A78BFA', '#F472B6']

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
      gravity: 0.8,
      scalar: 1.2,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
      gravity: 0.8,
      scalar: 1.2,
    })
    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }())

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 0.5, y: 0.4 },
      colors,
      gravity: 0.5,
      scalar: 1.5,
      ticks: 150,
      startVelocity: 30,
    })
  }, 300)
}
