const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isOpen = answer.style.display === 'block';
    // closing other answers
    faqButtons.forEach((btn) => {
      const otherAnswer = btn.nextElementSibling;
      const otherIcon = btn.querySelector('i');

      otherAnswer.style.display = 'none';
      otherIcon.classList.remove('fa-xmark');
      otherIcon.classList.add('fa-plus');
    });
    // making sure two answers is not opened
    if (!isOpen) {
      answer.style.display = 'block';
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-xmark');
    }
  });
});

console.log(screen.width);
console.log(screen.height);
