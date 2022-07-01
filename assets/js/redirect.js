/*
404 page
Show link to redirect to correct page and redirect.
*/
import {to_homepage} from "./redirect_rules.mjs"
import {rules} from "./redirect_rules.mjs"
import {regex_redirects} from "./redirect_rules.mjs"
import {migrated_tickets} from "./redirect_rules.mjs"

const github = 'https://github.com/twisted'
const github_issues = github + '/twisted/issues/'

var path = window.location.pathname
var path_simple = stripTrailingSlash(path)


to_homepage.forEach(function(p) {
    if (path_simple.match(p)){
        window.location = '/';
    }
})

if (path.match('/trac/ticket/.+')) {
    var new_url = github_issues
    var r = path_simple.split('/')
    var trac_id = r[r.length - 1]

    var new_id = getFirstMatch(migrated_tickets, parseInt(trac_id))

    // #comment:2 -> #note_2
    var new_anchor = ''
    var anchor = window.location.href.match(/#comment:[0-9]+/gi)[0]
    new_anchor = '#note_' + anchor.match(/[0-9]+/)[0]

    if (new_id) {
        new_url = new_url + new_id + new_anchor
        setLink(new_url)
        window.location = new_url
    }
}

var new_url = getFirstMatch(rules, path_simple)
if (new_url) {
    setLink(new_url)
    window.location = github + new_url
}

goToRegexRedirectPath(regex_redirects, path_simple)


function goToRegexRedirectPath(regex_redirects, path_simple) {
    regex_redirects.forEach(function(pair) {
        var regex_path = new RegExp(pair[0], 'gi')

        if (path_simple.match(regex_path)) {
            new_url = github + path_simple.replace(regex_path, pair[1])
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
