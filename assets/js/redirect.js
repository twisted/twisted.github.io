/*
404 page

Show link to redirect to correct page and redirect.
*/

// This is the Trac to GitHub issues mapping.
// Stored in a separate file for convenience.
import {migrated_tickets} from "./redirect_rules.mjs"

// Redirection rules.
// This is a mapping from a regex to a redirection URL.
const regex_redirects = [
    ['/trac$', '/'],
    ['/trac/$', '/'],
    ['/trac/wiki$', '/'],
    ['/trac/wiki/$', '/'],
    ['/trac/wiki/WikiStart$', '/'],
    ['/trac/timeline$', 'https://github.com/twisted/twisted/pulse'],
    ['/trac/roadmap$', 'https://github.com/twisted//twisted/milestones'],
    ['/trac/newticket$', 'https://github.com/twisted//twisted/issues/new'],
    ['/trac/search$', 'https://github.com/twisted//twisted/issues'],
    ['/trac/report.*', 'https://github.com/twisted/twisted/issues'],
    ['/trac/wiki/(.+)', 'https://github.com/twisted/trac-wiki-archive/blob/trunk/$1.mediawiki'],
];

var path = window.location.pathname
var path_simple = stripTrailingSlash(path)

if (path.match('/trac/ticket/.+')) {
    var gh_issues_base_url = 'https://github.com/twisted/twisted/issues/'

    var r = path_simple.split('/')
    var trac_id = r[r.length - 1]

    var new_id = getFirstMatch(migrated_tickets, parseInt(trac_id))

    // #comment:2 -> #note_2
    var new_anchor = ''
    var anchor = window.location.href.match(/#comment:[0-9]+/gi)
    if (anchor) {
        new_anchor = '#note_' + anchor[0].match(/[0-9]+/)[0]
    }

    var new_url = gh_issues_base_url + new_id + new_anchor
    setLink(new_url)
    window.location = new_url
}


goToRegexRedirectPath(regex_redirects, path_simple)


function goToRegexRedirectPath(regex_redirects, path_simple) {
    regex_redirects.forEach(function(pair) {
        var regex_path = new RegExp(pair[0], 'gi')

        if (path_simple.match(regex_path)) {
            new_url = path_simple.replace(regex_path, pair[1])
            setLink(new_url)
            window.location = new_url
        }
    })
}

function getFirstMatch(rule_map, key) {
    if (rule_map.has(key)) {
        return rule_map.get(key)
    }
    return false
}

function stripTrailingSlash(str) {
    if(str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

function setLink(url) {
    $('#js-redirection a').attr('href', url)
    $('#js-redirection').removeClass('tw-hidden')
}
