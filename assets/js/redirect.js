/*
404 page
Show link to redirect to correct page and redirect.
*/
import {to_homepage} from "./redirect_rules.mjs"
import {rules} from "./redirect_rules.mjs"
import {migrated_tickets} from "./redirect_rules.mjs"

const github = 'https://github.com/twisted/twisted'
const github_issues = github + '/issues/'

var path = window.location.pathname
var path_simple = stripTrailingSlash(path)

var new_url = ''

for (p in to_homepage) {
    if (path_simple.match(p)){
        window.location = '/'
    }
}

if (path.match('/trac/ticket/')) {
    new_url = github_issues
    p = window.location.pathname
    var r = p.split('/')
    var trac_id = r[r.length - 1]

    if (trac_id == '') {
        trac_id = r[r.length - 2]
    }

    var new_id = getNewURL(migrated_tickets, parseInt(trac_id))
    if (new_id) {
        new_url = new_url + new_id

        $('#js-redirection a').text('GitHub issue')
        $('#js-redirection a').attr('href', new_url)
        $('#js-redirection').removeClass('tw-hidden')

        window.location = new_url
    }
}

new_url = getNewURL(rules, path_simple)
if (new_url) {
    window.location = github + new_url
}

// Method to convert the Trac ID to GitHub.
function getNewURL(rules, key) {
    if (rules.has(key)) {
        return rules.get(key)
    }
    return false
}

function stripTrailingSlash(str) {
    if(str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}
