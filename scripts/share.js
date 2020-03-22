const handler = function() {
  const $shares = document.querySelectorAll('[data-clipboard]')

  $shares.forEach(($shareEl) => {
    const $button = document.createElement('button');
    $button.innerHTML = 'Partager';
    $shareEl.parentNode.append($button);

    $button.addEventListener(
      'click',
      share.bind(this, $shareEl)
    );
  });
}

const share = function($shareEl) {
  navigator
  .share({
    title: $shareEl.getAttribute('data-share-title'),
    text: $shareEl.getAttribute('data-share-text'),
    url: $shareEl.getAttribute('data-share-url'),
  })
}

if(navigator.share) {
  handler()
} else {
  console.warn("Web Share API not supported")
}