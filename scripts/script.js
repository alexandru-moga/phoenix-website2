document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('project-slider');
  if (!slider) return;

  // Duplicate the slider content if not already duplicated to allow seamless looping
  if (!slider.dataset.duplicated) {
    slider.innerHTML += slider.innerHTML;
    slider.dataset.duplicated = 'true';
  }

  let baseSpeed = 0.5;
  let currentSpeed = baseSpeed;
  let pos = 0;

  // Slow down sliding when hovering over the slider container
  slider.addEventListener('mouseenter', () => { currentSpeed = baseSpeed / 3; });
  slider.addEventListener('mouseleave', () => { currentSpeed = baseSpeed; });

  function animate() {
    pos -= currentSpeed;
    const totalWidth = slider.scrollWidth / (slider.dataset.duplicated ? 2 : 1); // original content width
    if (Math.abs(pos) >= totalWidth) {
      pos = 0;
    }
    slider.style.transform = `translateX(${pos}px)`;

    // Fade logic: adjust opacity for each project card based on its position within the viewport
    const containerRect = slider.parentElement.getBoundingClientRect();
    slider.querySelectorAll('.project-card').forEach(card => {
      const cardRect = card.getBoundingClientRect();
      // Calculate distance from card center to container center
      const cardCenter = cardRect.left + cardRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      const maxDistance = containerRect.width / 2;
      const opacity = 1 - Math.min(distance / maxDistance, 1);
      card.style.opacity = opacity;
    });

    requestAnimationFrame(animate);
  }
  animate();
});

