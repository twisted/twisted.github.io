export function tests(getMigratedURL) {
    var domain = 'https://twisted.org'
    var github_issues = 'https://github.com/twisted/twisted/issues/'

    assertEqual(getMigratedURL(domain+'/trac/ticket/1234'), github_issues+'10828')
    assertEqual(getMigratedURL(domain+'/trac/ticket/3232'), github_issues+'3232')
    assertEqual(getMigratedURL(domain+'/trac/ticket/10000#comment:2'), github_issues+'10000#note_2')
    assertEqual(getMigratedURL(domain+'/trac'), '/')
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
