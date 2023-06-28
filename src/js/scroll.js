function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const scrollLinks = document.querySelectorAll('.js-scroll-link');

  scrollLinks.forEach(function (scrollLink) {
    scrollLink.addEventListener('click', function (event) {
      event.preventDefault();
      const target = scrollLink.getAttribute('href');
      const elementId = target.substring(1); // Видаляємо початковий символ "#"
      smoothScrollTo(elementId);
    });
  });
});
