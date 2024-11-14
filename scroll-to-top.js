'use strict';

const $body = document.querySelector( 'body' );

// $body.innerHTML += '<div class="evo-scroll-to-top"><i class="fa-solid fa-arrow-up"></i></div>';

const $scrollToTopBtn = document.querySelector( '.evo-scroll-to-top' );

document.onscroll = () => {
  scrollToTop( $scrollToTopBtn )
};

document.onreadystatechange = () => {
  scrollToTop( $scrollToTopBtn )
};

$scrollToTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToTop( scrollBtn ) {
  let scrollY = window.scrollY;
  if ( scrollY >= 500 ) {
    scrollBtn.classList.add( 'is-visible' );
  } else {
    scrollBtn.classList.remove( 'is-visible' );
  }
}