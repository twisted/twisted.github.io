export function tests(getMigratedURL) {
    var domain = 'https://twisted.org'
    var github_issues = 'https://github.com/twisted/twisted/issues/'

    assertEqual(getMigratedURL(domain+'/trac/ticket/1234'), github_issues+'10828')
    assertEqual(getMigratedURL(domain+'/trac/ticket/3232'), github_issues+'3232')
    assertEqual(getMigratedURL(domain+'/trac/ticket/10000#comment:2'), github_issues+'10000#note_2')
    assertEqual(getMigratedURL(domain+'/trac'), '/')
    assertEqual(getMigratedURL(domain+'/trac/'), '/')
    assertEqual(getMigratedURL(domain+'/trac/wiki'), '/')
    assertEqual(getMigratedURL(domain+'/trac/wiki/'), '/')
    assertEqual(getMigratedURL(domain+'/trac/wiki/WikiStart'), '/')
    assertEqual(getMigratedURL(domain+'/trac/timeline'), 'https://github.com/twisted/twisted/pulse')
    assertEqual(getMigratedURL(domain+'/trac/roadmap'), 'https://github.com/twisted/twisted/milestones')
    assertEqual(getMigratedURL(domain+'/trac/newticket'), 'https://github.com/twisted/twisted/issues/new')
    assertEqual(getMigratedURL(domain+'/trac/search'), 'https://github.com/twisted/twisted/issues')
    assertEqual(getMigratedURL(domain+'/trac/search?q=query'), 'https://github.com/twisted/twisted/issues')
    assertEqual(getMigratedURL(domain+'/trac/report'), 'https://github.com/twisted/twisted/issues')
    assertEqual(getMigratedURL(domain+'/trac/report/1'), 'https://github.com/twisted/twisted/issues')
    assertEqual(getMigratedURL(
        domain+'/trac/wiki/TwistedDevelopment'),
        'https://github.com/twisted/trac-wiki-archive/blob/trunk/TwistedDevelopment.mediawiki')
    console.log('tests ran')
}

function assertEqual(one, other) {
    if (one != other) {
        console.error('' + one + ' does not equal ' + other)
    }
}
