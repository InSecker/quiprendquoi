const handler = function() {
  const $clipboards = document.querySelectorAll('[data-clipboard]')

  $clipboards.forEach(($clipboardEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Copier';
    $clipboardEl.parentNode.append($button);

    $button.addEventListener(
      'click',
      copyToClipboard.bind(this, $clipboardEl, $button)
    );
  });
}

const copyToClipboard = function($clipboardEl, $button) {
  navigator.clipboard
  .writeText($clipboardEl.getAttribute('data-clipboard'))
  .then(() => {
    $button.innerHTML = 'Copié !';
    setTimeout(() => ($button.innerHTML = 'Copier'), 2000);
  })
  .catch((err) => console.warn(err));
}

if (navigator.clipboard) {
  handler()
} else {
  console.warn("Clipboard API not supported")
}