/*
404 page
Show link to redirect to correct page and redirect.
*/
import {to_homepage} from "./redirect_rules.mjs"
import {rules} from "./redirect_rules.mjs"
import {regex_redirects} from "./redirect_rules.mjs"
import {migrated_tickets} from "./redirect_rules.mjs"

const github = 'https://github.com/twisted'
const github_issues = github + '/issues/'

var path = window.location.pathname
var path_simple = stripTrailingSlash(path)
var new_url = '/';



if (path.match('/trac/ticket/.+')) {
    new_url = github_issues
    var r = path_simple.split('/')
    var trac_id = r[r.length - 1]

    var new_id = getNewURL(migrated_tickets, parseInt(trac_id))

    // #comment:2 -> #note_2
    var new_anchor = ''
    var anchor = window.location.href.match(/#comment:[0-9]+/gi)[0]
    new_anchor = '#note_' + anchor.match(/[0-9]+/)[0]

    if (new_id) {
        new_url = new_url + new_id + new_anchor

        $('#js-redirection a').text('GitHub issue')
        $('#js-redirection a').attr('href', new_url)
        $('#js-redirection').removeClass('tw-hidden')

        window.location = new_url
    }
}

to_homepage.forEach(function(p) {
    if (path_simple.match(p)){
        window.location = new_url
    }
})

new_url = getNewURL(rules, path_simple)
if (new_url) {
    window.location = github + new_url
}

// Method to convert the Trac ID to GitHub.
function getNewURL(rule_map, key) {
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
