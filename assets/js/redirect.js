/*
404 page
Show link to redirect to correct page.
*/

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
    window.location.href = new_url
}
