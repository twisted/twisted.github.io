/*
404 page

Show link to redirect to correct page and redirect.
*/

(function(exports){

// This is poor man's hack to have the same code available in browser and
// nodejs without webpack or other tools.
const redirect_trac_tickets = require(
    './redirect_trac_tickets', 'redirect_trac_tickets')


// Redirection rules.
// This is a mapping from a regex to a redirection URL.
const regex_redirects = [
    ['.*/trac$', '/'],
    ['.*/trac/$', '/'],
    ['.*/trac/wiki$', '/'],
    ['.*/trac/wiki/$', '/'],
    ['.*/trac/wiki/WikiStart$', '/'],
    ['.*/trac/timeline$', 'https://github.com/twisted/twisted/pulse'],
    ['.*/trac/roadmap$', 'https://github.com/twisted/twisted/milestones'],
    ['.*/trac/newticket$', 'https://github.com/twisted/twisted/issues/new'],
    ['.*/trac/search.*', 'https://github.com/twisted/twisted/issues'],
    ['.*/trac/report.*', 'https://github.com/twisted/twisted/issues?q=is%3Aopen+label%3Aneeds-review+sort%3Aupdated-asc'],
    ['.*/trac/wiki/(.+)', 'https://github.com/twisted/trac-wiki-archive/blob/trunk/$1.mediawiki'],
];

function getRegexRedirectPath(regex_redirects, old_url) {
    var matching_pair = regex_redirects.find(function(pair) {
        var regex_path = new RegExp(pair[0])
        return old_url.match(regex_path)
    })

    if(matching_pair) {
        return old_url.replace(new RegExp(matching_pair[0]), matching_pair[1])
    }
}

function getFirstMatch(rule_map, key) {
    if (rule_map.has(key)) {
        return rule_map.get(key)
    }
    return false
}

const twisted_url = 'https://github.com/twisted'

exports.getMigratedURL = (old_url) => {
    var ticket_regex_path = new RegExp('/trac/ticket/(.+)')
    if (old_url.match(ticket_regex_path)) {

        var new_url = twisted_url + '/twisted/issues/'
        var trac_id = old_url.match(ticket_regex_path)[1]
        var new_id = getFirstMatch(
            redirect_trac_tickets.trac_to_github, parseInt(trac_id))

        // #comment:2 -> #note_2
        var new_anchor = ''
        var anchor = old_url.match(/#comment:[0-9]+/gi)
        if (anchor) {
            new_anchor = '#note_' + anchor[0].match(/[0-9]+/)[0]
        }

        if (new_id) {
            new_url = new_url + new_id + new_anchor
            return new_url
        }
    }
    return getRegexRedirectPath(regex_redirects, old_url)
}

}(typeof exports === 'undefined' ? this.redirect = {} : exports))

// Run the redirection when loaded from the browser.
if (typeof exports === 'undefined') {

    var new_url = redirect.getMigratedURL(window.location.href)
    if (new_url) {
        document.getElementById('js-redirection-link').setAttribute('href', new_url)
        document.getElementById('js-redirection').classList.remove('tw-hidden')
        window.location = new_url
    }
}
