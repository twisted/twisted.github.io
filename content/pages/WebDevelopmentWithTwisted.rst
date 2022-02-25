Web Development with Twisted
############################


There are a number of packages in and around Twisted that do things with the web:

* `Twisted Web <http://twistedmatrix.com/documents/current/web/>`_ provides a simple, stable HTTP server, suitable for all types of web apps and web services. It provides a flexible resource publishing API, and implements HTTP 1.0 with some 1.1 features.  **Twisted Web is extremely stable.**
* `Divmod Nevow <https://launchpad.net/divmod.org>`_ is a templating toolkit that provides its own resource model and simple application server API.  It requires Twisted, is fully integrated with the Twisted reactor, provides mechanisms for asynchronous page rendering, and an event-driven `COMET <http://en.wikipedia.org/wiki/COMET_(programming)>`_ /AJAX implementation called `"Nevow Athena" <http://divmod.readthedocs.org/en/latest/products/nevow/athena/index.html>`_.  Nevow uses Twisted Web, but provides its own request objects and resource model on top of it.
* `Divmod Mantissa <https://launchpad.net/divmod.org>`_ is a full-featured multi-protocol application server, with a built-in object database, authentication model based on Twisted Cred, a capability-based security model, and many more features.  It integrates Nevow (and therefore Twisted Web) and a number of other Twisted-related technologies to provide a full-featured system.

So You Want To Be A Web Developer
=================================

Having reviewed this list, the obvious question is, *which of these tools should I use for my application???*  The short answer is: "It depends."

You can always ask about these kinds of issues on the `Twisted Web mailing list <http://twistedmatrix.com/cgi-bin/mailman/listinfo/twisted-web>`_, but here's a cheat-sheet that you may want to read in advance, listing some of the things that you might want to be doing with Twisted and the consensus as to the correct (or multiple possible correct) solutions for each case.


I want a container for my WSGI application
------------------------------------------

In this case, **use the Twisted Web (8.2 or newer) WSGI module** (``twistd web --wsgi=application``).

I want a web UI for my existing Twisted networking application
--------------------------------------------------------------

Assuming that your networking application has its own data persistence, or does not require persistence, and needs a web-based control panel or monitoring UI, you probably want to **use Nevow**  Nevow provides backwards compatibility between releases (as does Twisted Web, on which it is built), just like all Twisted projects.  It also provides a templating system  which makes implementing user interfaces that integrate with the event loop much easier than coding directly to the Twisted Web API.  Nevow also has support for the AJAX and COMET, via Nevow Athena.  Athena lets you take advantage of the event loop on multiple levels; you can push events from network triggers straight out to a web page.

I want to write a REST / WS-* interface to my Twisted application
-----------------------------------------------------------------

In this case your best bet is to **use Twisted Web** directly.  You won't need XHTML templating, so Nevow buys you little extra.

Twisted Web already has basic support for XMLRPC and SOAP, and it is fairly straightforward to set up a web service.  Twisted Web also provides various facilities for being set up behind a reverse-proxy, which is the suggested mechanism to integrate your Twisted application with an existing site.

I Want a Web Framework
----------------------

AKA

I want to write a Wiki
~~~~~~~~~~~~~~~~~~~~~~
I want to write a blog
~~~~~~~~~~~~~~~~~~~~~~
I want something to compare to Flask or Django or Ruby on Rails
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The short version is that this is more complicated in Twisted than in other tools at the moment.  Sadly, you aren't going to find a straight-up competitor  with the sort of polished web presence and easy instant integration with your SQL database and existing environment that the aforementioned products offer.

`Divmod Mantissa <https://launchpad.net/divmod.org>`_ is a full-featured Twisted-powered application server and will likely appeal to you if you want an integrated database and other high-level framework support.
