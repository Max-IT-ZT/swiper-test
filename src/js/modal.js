!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  function closeModal() {
    var activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
    }
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      modalElem.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      closeModal();
    });
  });

  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {
      closeModal();
    }
  });

  overlay.addEventListener('click', function () {
    closeModal();
  });

  var forms = document.querySelectorAll('.modal form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Зупиняє перезавантаження сторінки

      if (!form.checkValidity()) {
        var validationMessage = form.validationMessage;
        var tooltip = form.querySelector('.tooltip');
        tooltip.textContent = validationMessage;
        tooltip.classList.add('active');
      } else {
        var parentModal = form.closest('.modal');
        parentModal.classList.remove('active');
        closeModal();
      }
    });
  });

  var phoneInputs = document.querySelectorAll('.modal-tel-form');
  var cardInputs = document.querySelectorAll('.modal-card-form');

  function formatInputValue(input, regex, separator) {
    var formattedValue = '';
    var groups = input.match(regex);

    for (var i = 1; i <= 4; i++) {
      if (groups[i]) {
        formattedValue += groups[i];
        if (i < 4) {
          formattedValue += separator;
        }
      }
    }

    return formattedValue;
  }

  phoneInputs.forEach(function (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var input = this.value.replace(/\D/g, ''); // Видаляємо всі символи, крім цифр
      var formattedInput = formatInputValue(
        input,
        /^(\d{2})(\d{0,3})(\d{0,2})(\d{0,2})/,
        '-'
      );

      this.value = formattedInput;
    });
  });

  cardInputs.forEach(function (cardInput) {
    cardInput.addEventListener('input', function () {
      var input = this.value.replace(/\D/g, ''); // Видаляємо всі символи, крім цифр
      var formattedInput = formatInputValue(
        input,
        /^(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/,
        '-'
      );

      this.value = formattedInput;
    });
  });
});
