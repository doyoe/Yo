/**
 * Created by qingguo.xu on 2016/11/2.
 */

function resize() {
    var sidenavWidth = $('.ydoc-container-content').width() * 0.2;
    $('.docs-sidenav').css({ width: parseInt(sidenavWidth) });
}

$(document).ready(function () {
    resize();
    $(window).on('resize', function () {
        resize();
    });
});

$(window).on('scroll', function () {
    resize();
});