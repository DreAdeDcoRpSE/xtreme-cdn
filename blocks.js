evo.querySelector('.sortable', function ( sortables ) {
  let url = '';
  for ( const sortableItem of sortables ) {
    let element = document.getElementById( sortableItem.id );
    new Sortable(element, {
      group     : 'shared',
      animation : 150,
      onEnd: function ( evt ) {
        let j         = 0;
        let string    = '';
        let container = document.querySelectorAll( '.sortable' );
        let infoOrder = document.querySelectorAll( '#order' );

        for ( let i = 0; i < container.length; i++ ) {
          let columnID = container[i].id;
          let children = container[i].children;

          j++;
          if (j > 1) {
            string += ":";
          }

          if ( columnID == 'left_col' || columnID == 'center' ) {
            url = `${admin_file}.php?op=evo-userinfo&rs=evouserinfo_write`;
          } else {
            url = `${admin_file}.php?op=blocks&rs=blocks_update`;
          }

          string += `${columnID}(`;
          // string += "(";
          for ( var c = 0; c < children.length; c++ ) {
            if (c > 0) {
              string += ",";
            }
            string += children[c].id;
          }
          string += ")";
        }

        /**
         * Evo Userinfo position array
         */
        if ( typeof infoOrder[0] !== 'undefined' ) {
          infoOrder[0].value = string;
        }

        evo.query({
          url: url + '&rsargs[]=' + string
        }).then(function ( response ) {
          // console.log( response )
        }).catch(function ( error ) {
          console.log( error );
        });
      }
    });
  }
});

evo.querySelector('.sortable-item', function ( sortableItems ) {
  for ( const sortableItem of sortableItems ) {
    sortableItem.ondblclick = () => {
      let hidden       = document.querySelector( `#status_${sortableItem.id}` )
      let status       = hidden.value
          hidden.value = ( status == 1 ) ? 0 : 1
          className    = ( status == 1 ) ? 'inactive' : 'active'

      console.log( hidden )

      sortableItem.classList.remove( "active" )
      sortableItem.classList.remove( "inactive" )
      sortableItem.classList.add( className )

      evo.query({
        url: `${admin_file}.php?op=blocks&rs=status_update&rsargs[]=${sortableItem.id}:${hidden.value}`
      }).then(function ( response ) {
        console.log( response )
      }).catch(function ( error ) {
        console.log( error )
      })
    }
  }
})

evo.querySelector('.evo-deletable-block', function ( deletables ) {
  for ( let blockItem of deletables ) {
    blockItem.onclick = ( event ) => {
      event.preventDefault();

      let id                 = blockItem.dataset.id;
      let blockItemContainer = document.querySelector( `.sortable-block-${id}` )
      blockItemContainer.remove();

      evo.query({
        url: `${admin_file}.php?op=deleteBlock&bid=${id}`
      }).then(function ( response ) {
        console.log( response )
      }).catch(function ( error ) {
        console.log( error )
      })
    }
  }
})

