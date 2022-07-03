const redirect = require('./redirect');


test('getMigratedURL', () => {
    var domain = 'https://twisted.org'
    var github_issues = 'https://github.com/twisted/twisted/issues/'

    expect(redirect.getMigratedURL(domain+'/trac/ticket/1234')).toEqual(github_issues+'10828')
    expect(redirect.getMigratedURL(domain+'/trac/ticket/3232')).toEqual(github_issues+'3232')
    expect(redirect.getMigratedURL(domain+'/trac/ticket/10000#comment:2')).toEqual(github_issues+'10000#note_2')
    expect(redirect.getMigratedURL(domain+'/trac')).toEqual('/')
    expect(redirect.getMigratedURL(domain+'/trac/')).toEqual('/')
    expect(redirect.getMigratedURL(domain+'/trac/wiki')).toEqual('/')
    expect(redirect.getMigratedURL(domain+'/trac/wiki/')).toEqual('/')
    expect(redirect.getMigratedURL(domain+'/trac/wiki/WikiStart')).toEqual('/')
    expect(redirect.getMigratedURL(domain+'/trac/timeline')).toEqual('https://github.com/twisted/twisted/pulse')
    expect(redirect.getMigratedURL(domain+'/trac/roadmap')).toEqual('https://github.com/twisted/twisted/milestones')
    expect(redirect.getMigratedURL(domain+'/trac/newticket')).toEqual('https://github.com/twisted/twisted/issues/new')
    expect(redirect.getMigratedURL(domain+'/trac/search')).toEqual('https://github.com/twisted/twisted/issues')
    expect(redirect.getMigratedURL(domain+'/trac/search?q=query')).toEqual('https://github.com/twisted/twisted/issues')
    expect(redirect.getMigratedURL(domain+'/trac/report')).toEqual('https://github.com/twisted/twisted/issues')
    expect(redirect.getMigratedURL(domain+'/trac/report/1')).toEqual('https://github.com/twisted/twisted/issues')
    expect(redirect.getMigratedURL(
        domain+'/trac/wiki/TwistedDevelopment')).toEqual(
        'https://github.com/twisted/trac-wiki-archive/blob/trunk/TwistedDevelopment.mediawiki')
})
