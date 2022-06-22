/*
404 page
Show link to redirect to correct page and redirect.
*/

var p = window.location.pathname

if (p.match('/trac/ticket/')) {
    var new_url = 'https://github.com/twisted/twisted-trac-migration-3/issues/'
    p = window.location.pathname
    var r = p.split('/')
    var t = r[r.length - 1]

    if(t == '') {
        t = r[r.length - 2]
    }

    new_url = new_url + t

    $('#js-redirection a').text('GitHub issue')
    $('#js-redirection a').attr('href', new_url)
    $('#js-redirection').removeClass('tw-hidden')

    window.location = new_url
}
