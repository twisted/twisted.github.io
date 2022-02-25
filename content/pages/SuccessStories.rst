SuccessStories
##############


**Have a success story for Twisted? Let us know! Contact success at twistedmatrix dot com**

`ZONT Online <https://zont-online.ru/>`_
========================================

ZONT Online is an online platform for monitoring and control of internet-connected smart devices. We use Twisted from the first days in 2011 to power our fully-asynchronous python backend.

Twisted powers a wide range of our server-side tasks: user-facing and API web servers, websockets, queue workers, custom TCP/IP servers, email and push sending, 3rd-party API integrations and so on.

We found Twisted to be mature, well-designed and having batteries included. Its networking primitives are flexible enough to build a wide range of services and to integrate with both blocking and non-blocking libraries.

Special mention should be made about how carefully Twisted team documents its releases and maintains backward-compatibility. During the 10 years of our work with Twisted we continuously migrated through almost all Python versions from 2.7 to 3.9 and Twisted versions from 11.0.0 to 21.7.0 without notable surprises.

-- Ilya Skriblovsky, Lead of Online Services Development, ZONT Online Ltd.

`Battlehouse Games <https://www.battlehouse.com>`_
==================================================

Battlehouse creates and operates massively-multiplayer strategy games for browser and desktop platforms. Our most popular titles are nearly 10 years old and have served over 4 million users.

Twisted plays an important role in our Python-based server stack. We use Twisted to handle many protocols including HTTP, WebSockets, and SQL. The asynchronous coroutine model helps us deliver low-latency gameplay without adding too much complexity to the codebase. Across 10 years of continuous evolution, Twisted has proven to be the most stable, well-documented, and flexible low-level networking library for Python.

-- Dan Maas, CTO, Battlehouse Games

`LabRAD <https://github.com/labrad>`_
=====================================

`LabRAD <https://github.com/labrad>`_ is an RPC system designed for use in scientific research labs, presently in use by `more than a dozen academic and industrial labs around the world <https://github.com/labrad/labrad/wiki/Who-uses-LabRAD>`_.

The labrad python API has used Twisted for networking and asynchrony since around 2005, and Twisted continues to serve our needs well. Most of our servers use Python, and most LabRAD users use Python to run experiments; Twisted is an essential component for us on both the client and server sides. We particularly like the explicit coroutine style of asynchronous code made possible by the @inlineCallbacks decorator.

-- Daniel Sank, LabRAD Project

`Lucasfilm <http://lucasfilm.com/>`_
====================================

Lucasfilm has used Twisted in its business-critical production
processes since 2004. In 2009 we became sponsors of the project.

We use Twisted to proxy database connections for our render farm,
which runs 24/7/365. In continuous deployment for six years, our
Twisted daemons have served many billions of queries. Twisted's
process spawning and monitoring capabilities are also used in numerous
automation and queuing services. In addition, its excellent,
full-featured Jabber implementation supports our person-to-person and
application-to-application messaging services.

As a large and diverse enterprise, a key to our success with Twisted
is the professional way in which it is maintained. With a large body
of unit tests and rigorous code reviews, Twisted provides a smooth
upgrade path so that old features to continue to work and new ones
are production ready and rock-solid.

-- Dave Peticolas, Lead Python Developer, Lucasfilm Entertainment Company Limited

`FluidDB <http://fluidinfo.com/>`_
==================================

At Fluidinfo, we're heavy users of Twisted. All of our infrastructure depends on it. FluidDB, our social database, is entirely built on Twisted, and we've released several core parts of it as open source: `txAMQP <https://launchpad.net/txamqp>`_ , `txRDQ <https://launchpad.net/txrdq>`_ and `txThrift <https://issues.apache.org/jira/browse/THRIFT-148>`_. Not only that, but we have contributed to Twisted both with code and (albeit small) personal donations.

It's not just that sponsoring was the fair the thing to do, it has also produced tremendous results in a framework crucial to our business. When you donate to the TSF it's simple math that more bugs get fixed, but also the quality of the entire Twisted project is enhanced. And when that happens, all of our products are enhanced automatically without us writing one line of code. So sponsoring is not just an act of generosity, it's an investment in Fluidinfo. Using and sponsoring Twisted has been an indispensable "force multiplier" for a growing start-up like us.

-- Esteve Fernandez, CTO, Fluidinfo Inc.

At Fluidinfo we chose Twisted as the basis of all internal networking for our
distributed, shared, always-writable database, FluidDB. We threw out
a year's worth of working, debugged, tested C code in order to move to Twisted. As
I often tell people, we're using Python because of Twisted, not the other
way round. I'm an unabashed Twisted fanboy. In particular,
Twisted's Deferreds are one of the most elegant and flexible
programming constructs I've ever worked with.
Plus, the Twisted community is great - not only the core developers, 
but also the 180+ people constantly in #twisted in IRC.

-- Terry Jones, CEO, Fluidinfo Inc.

`Launchpad <http://launchpad.net/>`_
====================================

Canonical has been using Twisted as key part of Launchpad.net for over
five years now. We use Twisted to run our SSH servers, our process
pools, our package build farms, our file storage system and many other
things. Practically every time we need to glue two systems together,
we use Twisted. When we don't, we regret it later.

-- Jonathan Lange, Product Strategist, `Canonical Ltd <http://www.canonical.com/>`_

`HipChat <http://www.hipchat.com>`_
===================================

HipChat is a hosted group chat and IM service for businesses that uses the XMPP protocol behind the scenes. We use Twisted to power our fully clustered chat server and run many important job queue workers. 

Twisted's built-in XML support via the Twisted.Words and xmlstream modules have been life savers since XMPP is very XML heavy. They've been rock-solid and keep us from having to work with with XML directly which is a wonderful thing.

One of the greatest time savers is the combination of Deferreds and the @defer.inlineCallbacks decorator. These allow us to write code that is asynchronous but stays easy to read and maintain. No more getting lost in a sea of callback functions. I mention it because I truly miss them when playing with Node.js, particularly Python's 'yield' and Twisted's Deferreds! I feel crippled without them. 

Bottom line: we built and launched a successful business on Twisted & Python in 6 months with no prior knowledge of either. It's a very productive environment with great performance and maintainability. What more could you want?

-- Garret Heaton, Co-founder, `HipChat <http://www.hipchat.com>`_

`Justin.tv <http://www.justin.tv/>`_
=====================================

Justin.tv is the largest live video site on the internet.  We allow anyone to broadcast live video from their PC and chat with viewers.  Every second of every broadcast is archived so it can later be browsed, searched, or made into highlight clips.

Each of Justin.tv's half a billion monthly pageviews passes through a custom Twisted caching engine.  "Twice" is a caching reverse proxy with a basic templating engine.  It runs as a cluster of roughly 120 processes across a dozen machines and handles peak loads of 20,000 dynamic pageviews per second.  The project has been `open sourced here <http://www.kvogt.com/twice>`_

-- Kyle Vogt, VP Engineering, Justin.tv, Inc.

`TweetDeck <http://www.tweetdeck.com>`_
=======================================

TweetDeck aims to build a browser for the
real-time web. Right now we're the biggest Twitter client after the
website itself, and are rolling out full integration with Facebook and
other services. With TweetDeck you can organize real-time streams of
information into a convenient grid format that allows easy digestion.

We use Twisted to power our backend services, specifically our new
accounts system and sync functionality we introduced recently
(http://tweetdeck.com/beta/features/take-tweetdeck-with-you/). We've
deployed our Twisted services over the Amazon cloud - specifically, we
use EC2 and SimpleDB. Writing a REST api service used by hundreds of
thousands active users was a snap with Twisted. We'll continue to use
Twisted as we broaden our server-side processing goals.

-- Reza Lotun, Software Engineer, TweetDeck, Inc.

`Evennia <http://www.evennia.com/>`_
====================================

Evennia is a modern Python MUD/MUX/MU* server, aimed at the easy creation of text-based massively multi-user online games. We use Twisted for all our networking needs, along with `Django <http://www.djangoproject.com/>`_ for database abstraction and web features. The two work beautifully together.

When developing Evennia we have found that using Twisted not only gives us great performance advantages, but also helps us to easily expand on the ways people connect to Evennia-powered games. Whereas traditional MUD servers only speak telnet, Evennia additionally comes with its own browser-based client and allows for expanding with custom game protocols in any combination. Evennia also serves the MUD’s website, alleviating the need to install and set up a third-party web server. All of this is straightforward to implement and maintain thanks to Twisted!

-- Griatch, Maintainer, Evennia project

NASA
====

My team is developing a modular application to integrate CAD/CAE/CAM tools and data and to enable collaboration among distributed teams of engineers working on NASA projects. We have selected Twisted as our framework because of its pluggable, asynchronous protocols, support for multiple interfaces and protocols per service, integration with PostgreSQL, and just generally excellent layered architecture.

-- Stephen C. Waterbury, NASA

`Shared Solar <http://www.sharedsolar.org/>`_
=============================================

`Shared Solar <http://www.sharedsolar.org/>`_ is a rural electrification
project providing over 3000 people with electricity in sub-Saharan
Africa (Mali and Uganda) with proposed deployments in Kenya and Haiti.
Due to the nature of the physical environments, and the model of
distributed generation, we need to have local intelligence at our
sites for the distribution of prepaid electricity and management of
the deployed infrastructure.

This distributed/local intelligence is built using Twisted. Twisted
has helped me prototype and deploy rapidly, learn and react quickly to
on-the-ground issues as they arise, and adapt the service to
configurations using different hardware and protocols. Without the
services built around Twisted, I'm certain the project would not be as
successful - it has helped us turn otherwise static infrastructure
into something much more in very short time.

Huge thanks to the Twisted community for their great work and making
this possible. I'd also like to acknowledge the wonderful support by
the folks on irc:#twisted.

-- Rajesh Menon, Software Engineer, SharedSolar

`HybridLogic <http://www.hybrid-cluster.com/>`_
===============================================

`Hybrid Web Cluster <http://www.hybrid-cluster.com/>`_ is a load-balanced and redundant web cluster built in Twisted which supports all standard LAMP websites.

The web cluster uses ZFS on FreeBSD for its unique ability to efficiently send differential snapshots over a network. But it is Twisted that has enabled us to turn that capability into a cluster filesystem. Everything is asynchronous, for example:

* polling "zfs list" and "zfs mount" for filesystem state
* communicating with other nodes via XML over Spread
* reconfiguring distributed servers on-the-fly
* handling thousands of internally proxied requests over thousands of sockets simultaneously.

Without Twisted we'd have to rely on threads, or spend valuable time writing an event loop that wouldn't be anywhere near as spectacular as Twisted's. Twisted has enabled us to focus on building phenomenal features (like seamlessly moving websites and databases between servers) instead of wasting precious resources re-inventing wheels.

Using Twisted has been massively beneficial for us. Not only have the
experts been always on-hand in real-time on IRC, but the code quality
and the expressive power of the library is unparalleled. In particular
the combination of Perspective Broker with Deferreds make expressing
otherwise tricky distributed algorithms a pleasure.

Twisted has been crucial at Hybrid Logic for making an awesome Hybrid Web Cluster platform that guarantees our customers' sites are fast and their data is safe at all times.

Thank you Twisted!

-- Luke Marsden, CTO, HybridLogic Ltd.

PowerCard
=========

PowerCard is the software platform we developed for `PowerCard Rewards <http://www.powercard.com/>`_ and the Original Rewards program for `Original Restaurants <http://originalrestaurants.com/>`_. Original Restaurants promotes unique, local restaurants by providing cooperative marketing, customer sharing, and a distinctive Rewards Card program.

We use Twisted extensively for back-end transaction services for the loyalty rewards and gift card programs. We also used Twisted in our client-side applications installed in demanding restaurant environments. Twisted was crucial in our ability to craft solutions to interoperate with multiple restaurant POS vendors (Micros, Aloha/Radiant, Squirrel, etc.), each with differing protocols and access methods. Our choice of Python and Twisted allows us to rather easily extend our system to support new features and requests with limited amount of developer time and budget.

Key features for us:

* Easy implementation of custom and existing network protocols
* Consistent APIs for code sharing between client and server implementations
* Windows integration
* Client GUI applications
* Services are a snap to implement
* Community support is very helpful

-- Lucas Taylor, CTO, PowerCard

`Botonomy LLC <http://botonomy.com/>`_
======================================

Botonomy LLC is a small software firm in the Philadelphia area. We help small teams solve large problems.

Our first application, `ProjectPipe <http://www.projectpipe.com/>`_ , is a hosted project management solution that provides midsize teams with everything that they need to manage IT projects. We have built our hosted application infrastructure atop Twisted, Nevow, PostgreSQL, and Jabber/XMPP. Twisted's multi-protocol support has been one of the key enablers of the unique technical architecture that we employ in our product offerings.

The core Twisted development team consistently demonstrates a strong commitment to delivering robust, high quality software. Twisted's documentation is accurate and concise, and the expertise and helpfulness of the larger developer community is second-to-none.

When evaluating the technologies on which you are staking your business, you need to evaluate both the code and the community that surrounds it. Twisted passes with flying colors in both regards.

-- Christian Simms, Botonomy LLC

`Reflexions Data <http://www.reflexionsdata.com/>`_
===================================================

At Reflexions Data, we provide custom development services for a wide variety of clients. We recently completed work on a project for a new client; the timeframe available required us to expedite every step of the development process. Twisted allowed us to quickly implement a custom client/server protocol with a wide variety of extra functionality for free.

The quality of the Twisted networking core is unmatched in the open- or closed-source arenas. Due largely to its asynchronous networking model, we were able to ensure our clients scalability needs would be met.

Our experiences with the Twisted developer community were top- notch; the turnaround time on questions posted to the developer mailing list was simply amazing. We were so pleased with the results of our first professional use of the Twisted core that we plan on investigating how we can make use of the other facets of the Twisted project.

-- Phil Christensen, Senior Developer, Reflexions Data, LLC

`Masters of Branding <http://www.mastersofbranding.com/>`_
==========================================================

At Masters of Branding we use Twisted as the networking core for all of our client and server RFID software. It was by far the easiest framework to develop with, debug under, and extend for our purposes to support protocols such as SOAP, HTTP, and Macromedia Flash-compatible XML Sockets. The API and event model are both very well thought out and has accommodated all of our networking needs from database-heavy server software on Linux to (py)OpenGL visualization applications on win32.

The ease and power of Python and Twisted really showed through when we took one of our applications developed in and for Linux and ported it to run as a Windows NT service in less than day. New users to the framework will not only be impressed by the power of the software, but also that the developer/user community responsible for it are incredibly helpful and often provide much better support in minutes or hours than you'll see from commercial shops given days or weeks.

-- Bob Ippolito, CTO, Masters of Branding Inc.

`Adelux <http://www.adelux.fr/>`_
=================================

Adelux develops custom internet applications such as portals, network security tools, communication-related programs, and software that leverages other systems.

We discovered Twisted 10 months ago, and now it is a key element of our development strategy. We have successfully used Twisted on several projects, of very different problem domains.

We developed a highly scalable realtime application for customer support, which serves web-based clients as well as clients implemented in any of the many protocols supported by Twisted. Twisted was also used to develop targeted proxies for various applications supporting more than 15.000 users. Twisted handles the charge with no problem.

We intend to continue using Twisted on upcoming projects, especially since integrated support for databases and new services are being added very quickly.

We found Twisted to be powerful, comprehensible, well documented, and backed by a good helpful community. We'll use it on our next products for sure!

-- Luc Stepniewski, Head Engineer, Adelux, France

MC-Foo and Ldaptor
==================

I was writing `MC Foo <http://mc-foo.sf.net/>`_ , a networked multiuser learning Ogg/MP3 jukebox application, in C, and was frustrated about the amount of time it took to debug. I decided I should use a higher-level language. I liked how Python felt, but had never written a single line of Python. I decided it was time to learn. Five hours later, the core of my application was rewritten in Python, using Twisted for main loop and networking. Another five hours later, I had replaced my oversimplistic line-based protocols with PB, the Twisted RPC protocol. Twisted has also enabled me to easily add features such as implicit persistence into MC Foo. And it even has nice GUI integration, allowing one to do sane networking in a GUI application.

Since then, I have created `Ldaptor <http://www.inoi.fi/open/trac/ldaptor/>`_, a pure-Python LDAP library, utilities and a web interface, as a data structure library, Twisted protocol and Twisted applications. The way how the web interface plugs in with the LDAP protocol handling still manages to amaze me.

The developer community behind Twisted is just great, and the IRC channel is a great source of information. All in all, I feel Twisted is one of the most interesting projects on the net.

-- Tommi Virtanen
