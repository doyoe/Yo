var PageTransitions = (function() {

    var $main = $( '#main' ),
        $pages = $main.children( 'div.gu-page' ),
        $iterate = $( '#iterateEffects' ),
        $outClass = $('#outClass'),
        $inClass = $('#inClass'),
        animcursor = 1,
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'animation' : 'animationend'
        };
        // animation end event name
    function init() {

        $pages.each( function() {
            var $page = $( this );
            $page.data( 'originalClassList', $page.attr( 'class' ) );
        } );

        $pages.eq( current ).addClass( 'current' );

        $iterate.on( 'click', function(e) {
            if( isAnimating ) {
                return false;
            }
            nextPage($outClass.val(),$inClass.val());
        } );

    }

    function nextPage( outClass,inClass ) {
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

        var $nextPage = $pages.eq( current ).addClass( 'current' );

        $currPage.addClass( outClass ).on( "webkitAnimationEnd animationEnd", function() {
            $currPage.off( "webkitAnimationEnd animationEnd" );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        });

        $nextPage.addClass( inClass ).on( "webkitAnimationEnd animationEnd", function() {            
            $nextPage.off( "webkitAnimationEnd animationEnd" );
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

    var TAGNAMES = {
            'select': 'input', 'change': 'input',
            'submit': 'form', 'reset': 'form',
            'error': 'img', 'load': 'img', 'abort': 'img'
    };
    
    return { init : init };

})();
