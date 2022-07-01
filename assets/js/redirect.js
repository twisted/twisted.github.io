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
    ['.*/trac$', '/'],
    ['.*/trac/$', '/'],
    ['.*/trac/wiki$', '/'],
    ['.*/trac/wiki/$', '/'],
    ['.*/trac/wiki/WikiStart$', '/'],
    ['.*/trac/timeline$', 'https://github.com/twisted/twisted/pulse'],
    ['.*/trac/roadmap$', 'https://github.com/twisted/twisted/milestones'],
    ['.*/trac/newticket$', 'https://github.com/twisted/twisted/issues/new'],
    ['.*/trac/search$', 'https://github.com/twisted/twisted/issues'],
    ['.*/trac/report.*', 'https://github.com/twisted/twisted/issues'],
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

function setLink(url) {
    $('#js-redirection a').attr('href', url)
    $('#js-redirection').removeClass('tw-hidden')
}

const twisted_url = 'https://github.com/twisted'

function getMigratedURL(old_url) {
    var ticket_regex_path = new RegExp('/trac/ticket/(.+)')
    if (old_url.match(ticket_regex_path)) {

        var new_url = twisted_url + '/twisted/issues/'
        var trac_id = old_url.match(ticket_regex_path)[1]
        var new_id = getFirstMatch(migrated_tickets, parseInt(trac_id))

        // #comment:2 -> #note_2
        var new_anchor = ''
        var anchor = old_url.match(/#comment:[0-9]+/gi)
        if (anchor) {
            new_anchor = '#note_' + anchor[0].match(/[0-9]+/)[0]
        }

        if (new_id) {
            new_url = new_url + new_id + new_anchor
            setLink(new_url)
            return new_url
        }
    }
    return getRegexRedirectPath(regex_redirects, old_url)
}

function assertEqual(one, other) {
    if (one != other) {
        console.error('' + one + ' does not equal ' + other)
    }
}

function tests() {
    var domain = 'https://twisted.org'
    var github_issues = 'https://github.com/twisted/twisted/issues/'

    assertEqual(getMigratedURL(domain+'/trac/ticket/1234') , github_issues+'10828')
    assertEqual(getMigratedURL(domain+'/trac/ticket/3232') , github_issues+'3232')
    assertEqual(getMigratedURL(domain+'/trac/ticket/10000#comment:2') , github_issues+'10000#note_2')
    assertEqual(getMigratedURL(domain+'/trac'), '/')
    assertEqual(getMigratedURL(domain+'/trac/wiki/TwistedDevelopment'), 'https://github.com/twisted/trac-wiki-archive/blob/trunk/TwistedDevelopment.mediawiki')
    console.log('tests ran')
}
tests()

var new_url = getMigratedURL(window.location.href)
if (new_url) {
    setLink(new_url)
    window.location = new_url
}
