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

// const learnMore = document.getElementById('hiddenseen');
// const hiddenParagraph = document.getElementById('hiddenopen');

// learnMore.addEventListener('click', () => {
//   hiddenParagraph.classList.remove('hidden');
//   learnMore.style.display = 'none';
// });

// scroll disable
// const scrollContainerScroll = document.querySelector('.scroll-container');
// const btnLeftScroll = document.querySelector('.scroll-left');
// const btnRightScroll = document.querySelector('.scroll-right');

// function checkingArrow() {
//   const scrollLeft = scrollContainerScroll.scrollLeft;
//   const scrollWidth = scrollContainerScroll.scrollWidth;
//   const clientWidth = scrollContainerScroll.clientWidth;

//   if (scrollLeft <= 0) {
//     btnLeftScroll.classList.add('hidden');
//   } else {
//     btnLeft.classList.remove('hicdden');
//   }

//   if (scrollLeft + clientWidth >= scrollWidth - 1) {
//     btnRightScroll.classList.add('hidden');
//   } else {
//     btnRightScroll.classList.remove('hidden');
//   }
// }

// window.addEventListener('load', checkingArrow);
// scrollContainerScroll.addEventListener('scroll', checkingArrow);
