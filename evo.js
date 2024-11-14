'use strict';

const evo = {
  deepExtend: function ( a, b ) {
    for ( const prop in b ) {
      if ( typeof b[prop] === 'object' ) {
        a[prop] = b[prop] instanceof Array ? [] : {};
        this.deepExtend( a[prop], b[prop] );
      } else {
        a[prop] = b[prop];
      }
    }
  },

  query: function ( options ) {
    const config = {
      method: 'GET',
      async: true,
      header: {
        type: 'Content-type',
        value: 'application/json'
      },
      data   : ''
    };

    this.deepExtend( config, options );

    return new Promise( function ( resolve, reject ) {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if ( xhttp.readyState !== 4 ) return;

        if ( xhttp.status === 200 ) {
          resolve( xhttp.responseText );
        } else {
          reject({
            status : xhttp.status,
            statusText : xhttp.statusText
          });
        }
      };

      xhttp.open( config.method, config.url, config.async );
      xhttp.setRequestHeader( config.header.type, config.header.value );

      if ( config.method === 'GET' ) {
        xhttp.send();
      } else if ( config.method === 'POST' ) {
        xhttp.send( config.data );
      }
    });
  },

  querySelector: function ( selector, callback ) {
    const el = document.querySelectorAll( selector );

    if ( el.length ) {
      callback( el );
    }
  },

  existsInDOM: function ( selector ) {
    return document.querySelectorAll( selector ).length;
  },

  liquidify: function ( el ) {
    const image    = el.querySelector( 'img' ),
          imageSrc = image.getAttribute( 'src' );

    image.style.display     = 'none';
    el.style.background     = `url("${imageSrc}") no-repeat center`;
    el.style.backgroundSize = 'cover';
  },

  liquidifyStatic: function ( figure, image ) {
    image.style.display         = 'none';
    figure.style.background     = `url("${image.getAttribute( 'src' )}") no-repeat center`;
    figure.style.backgroundSize = 'cover';
  },

  selection: function ( selector ) {
    let value = selector.value;
    let start = selector.selectionStart;
    let end   = selector.selectionEnd;

    let selection      = value.substr( start, end - start );
    let subStringStart = value.substr( 0, start );
    let subStringEnd   = value.substr( end, value.length );

    let selectionOptions = {
      start: start,
      end: end,
      value: value,
      sliceStart: value.slice( 0, start ),
      sliceEnd: value.slice( end ),
      selectedText: selection,
      subStringStart: subStringStart,
      subStringEnd: subStringEnd
    }

    return selectionOptions;
  }
};
