'use strict';

evo.querySelector( '.user-has-new-messages', function ( element ) {
  const evo_PMCookie = document.cookie.match( 'evo_PMCookie' );

  /**
   * If the cookie exists, just exit right away.
   *
   * @note Cookie will expire when the current session expires.
   */
  if ( evo_PMCookie ) return;

  const el = element[0];
        el.classList.add( 'evo-private-message-alert-show' );

  const $body = document.querySelector( 'body' );

  const alertOverlay = document.createElement( 'div' );
        alertOverlay.classList.add( 'evo-private-message-alert-overlay' );

  const alertTemplate = document.createElement( 'div' );
        alertTemplate.classList.add( 'evo-private-message-alert-wrap' );

  const alertTemplateInner = `
    <a class="evo-private-message-alert-inner" href="modules.php?name=Private_Messages">
      <span class="evo-private-message-alert-message">You have ${user_pm_count} new messages.</span>
    </a>`;

  $body.appendChild( alertOverlay );
  $body.appendChild( alertTemplate );
  alertTemplate.innerHTML = alertTemplateInner;

  alertOverlay.onclick = function () {
    alertOverlay.style.display = 'none';
    alertTemplate.style.display = 'none';
  }

  /**
   * Set a session cookie, so the user is not spammed with notification.
   *
   * @note Cookie will expire when the current session expires.
   */
  document.cookie = "evo_PMCookie = 1;";
} );