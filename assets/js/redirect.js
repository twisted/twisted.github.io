/*
404 page
Show link to redirect to correct page.
*/

// JS is enbled
$('#js-enable-js').addClass('tw-hidden')
// Show link to page
$('#js-redirection').removeClass('tw-hidden')

var p = window.location.pathname
var new_url = 'https://github.com/twisted/twisted-trac-migration-3/issues/'
if (p.match('/trac/ticket/')) {
    p = window.location.pathname
    var r = p.split('/')
    var t = r[r.length - 1]
    if(t == '') {
        t = r[r.length - 2]
    }
    new_url = new_url + t
}

$('#js-link').attr("href", new_url)
