var PageTransitions = (function() {

    var $main = $( '#main' ),
        $pages = $main.children( 'div.gu-page' ),
        $iterate = $( '#iterateEffects' ),
        $text = $("#text"),
        animcursor = 1,
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    function init() {

        $pages.each( function() {
            var $page = $( this );
            $page.data( 'originalClassList', $page.attr( 'class' ) );
        } );

        $pages.eq( current ).addClass( 'current' );

        $iterate.on( 'click', function() {
            if( isAnimating ) {
                return false;
            }
            if( animcursor > 22 ) {
                animcursor = 1;
            }
            nextPage( animcursor );
            ++animcursor;
        } );

    }

    function nextPage( animation ) {
        if( isAnimating ) {
            return false;
        }

        isAnimating = true;
        
        var $currPage = $pages.eq( current );

        if( current < pagesCount - 1 ) {
            ++current;
        } else {
            current = 0;
        }

        var $nextPage = $pages.eq( current ).addClass( 'current' ),
            outClass = '', inClass = '';

        switch( animation ) {

            case 1:
                outClass = 'fade-out';
                inClass = 'fade-in-up';
                break;
            case 2:
                outClass = 'fade-in-right';
                inClass = 'fade-in-up';
                break;
            case 3:
                outClass = 'fade-in-left';
                inClass = 'fade-in-up';
                break;
            case 4:
                outClass = 'fade-in-up';
                inClass = 'fade-in-down';
                break;
            case 5:
                outClass = 'fade-out-down';
                inClass = 'fade-in-up';
                break;
            case 6:
                outClass = 'fade-out-left';
                inClass = 'fade-in-up';
                break;
            case 7:
                outClass = 'fade-in-left';
                inClass = 'elastic-x';
                break;
            case 8:
                outClass = 'elastic-in-down';
                inClass = 'elastic-in-up';
                break;
            case 9:
                outClass = 'fade-out';
                inClass = 'flip-in-x';
                break;
            case 10:
                outClass = 'fade-out';
                inClass = 'flip-in-y';
                break;
            case 11:
                outClass = 'roll-in-left';
                inClass = 'roll-in-right';
                break;
            case 12:
                outClass = 'fade-out';
                inClass = 'speed-in-right';
                break;
            case 13:
                outClass = 'fade-out-left';
                inClass = 'rotate-in-down-right';
                break;
            case 14:
                outClass = 'fade-out';
                inClass = 'zoom-in-down';
                break;
            case 15:
                outClass = 'fade-out';
                inClass = 'zoom-in-up';
                break;
            case 16:
                outClass = 'fade-out';
                inClass = 'flash';
                break;
            case 17:
                outClass = 'fade-out';
                inClass = 'shake';
                break;
            case 18:
                outClass = 'shake';
                inClass = 'pulse';
                break;
            case 19:
                outClass = 'fade-out-left';
                inClass = 'stretch';
                break;
            case 20:
                outClass = 'fade-out-left';
                inClass = 'extrusion';
                break;
            case 21:
                outClass = 'fade-out-left';
                inClass = 'swing';
                break;
            case 22:
                outClass = 'fade-out-left';
                inClass = 'sling';
                break;
        }

        $currPage.addClass( outClass ).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        });

        $nextPage.addClass( inClass ).on( animEndEventName, function() {
            $nextPage.off( animEndEventName );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        });

    }

    function onEndAnimation( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;
    }

    function resetPage( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' current' );
    }

    return { init : init };

})();
