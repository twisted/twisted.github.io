Twisted FAQ
###########


This is a list of Frequently Asked Questions regarding Twisted.

.. contents::


General
=======

What is Twisted?
----------------

See the `Twisted Project </content/pages/Twisted/TwistedProject.html>`_

Why should I use Twisted?
-------------------------

See the `Twisted Advantage </content/pages/Twisted/TwistedAdvantage.html>`_

I have a problem getting Twisted.
---------------------------------

Did you check the `Documentation HOWTO collection? </content/pages/Documentation/Documentation.html>`_ There are so many documents there that they might overwhelm you... try starting from the index, reading through the overviews and seeing if there seems to be a chapter which explains what you need to. You can try reading the PostScript or PDF formatted books, inside the distribution. And, remember, the source will be with you... always.

How big is Twisted?
-------------------

As of Twisted 15.4, the source release archive of Twisted is about 3MB. Installed normally, uncompressed, Twisted is a bit larger - about 12MB.

Which parts of Twisted are stable?
----------------------------------

In general, everything which is part of a Twisted release is stable.  See `CompatibilityPolicy </content/pages/CompatibilityPolicy.html>`_ for details.

Why doesn't Twisted follow PEP 8?
---------------------------------

Twisted does follow much of PEP 8 (as is documented in the `Twisted coding standard <http://twistedmatrix.com/documents/current/core/development/policy/coding-standard.html#auto26>`_.  However, Twisted prefers camelCase for variables, functions, and methods (whereas PEP 8 recommends underscores) because Twisted predates PEP 8 and converting the entire codebase now is infeasible.  Twisted continues to use its existing naming convention for new APIs to retain consistency within the project (according to PEP 8's recommendation).

Installation
============

Why am I getting ImportErrors for Twisted subpackages on my 64bit installation of RedHat/Fedora/CentOS?
--------------------------------------------------------------------------------------------------------

Red Hat and derived Linux distributions arrange to have certain Python libraries installed in ``/usr/lib/`` and other parts installed in ``/usr/lib64/``  This is problematic for Twisted, since it results in some of Twisted being installed in one directory and the rest installed in another.  Python will load a package from only one directory.  You can override this default behavior when you install Twisted by supplying the ``--install-lib`` parameter when running Twisted's ``setup.py``.

Can I install Twisted using easy_install or pip?
------------------------------------------------

Yes, Twisted can be installed both using pip and easy_install, although pip is recommended.

Core Twisted
============

Why does Twisted depend on Zope?
--------------------------------

Twisted only depends on `Zope Interface <http://www.zope.org/Products/ZopeInterface>`_, an interface package which is also packaged and distributed independently from the main Zope distribution.  Twisted uses Zope Interface to define and document APIs. Packages are available for all major operating systems.

How can I access self.factory from my Protocol's __init__?
------------------------------------------------------------

You can't. A ``Protocol`` doesn't have a ``Factory`` when it is created. Instead, you should probably be doing that in your Protocol's ``connectionMade`` method.

Similarly you shouldn't be doing real work, like connecting to databases, in a Factory's ``__init__`` either. Instead, do that in ``startFactory``

See `Writing Servers <http://twistedmatrix.com/documents/current/core/howto/servers.html>`_ and `Writing Clients <http://twistedmatrix.com/documents/current/core/howto/clients.html>`_ for more details.

Where can I find out how to write Twisted servers?
--------------------------------------------------

Try `Writing Servers <http://twistedmatrix.com/documents/current/core/howto/servers.html>`_.

How do I make Twisted talk to multiple clients / connect to multiple servers?
-----------------------------------------------------------------------------

Twisted already does this.  If you want to connect to multiple servers, call ``connectTCP`` (or similar) multiple times, and each call will result in a single outgoing connection.  ``listenTCP`` will result in your factory (and therefore your protocol) being invoked for each incoming connection.

Sometimes people ask this question when they write a function that calls ``connectTCP``, then ``reactor.run()``.  You don't usually need to call ``reactor.run()`` yourself; let `twistd <http://twistedmatrix.com/documents/current/core/howto/basics.html#auto1>`_ (not "Twisted") do it.  If you do need to call it yourself, call it *just once* after your initial setup.  When ``reactor.run()`` exits, your program should too.

How do I make input on one connection result in output on another?
------------------------------------------------------------------

This seems like it's a Twisted question, but actually it's a Python question.  Each ``Protocol`` object represents one connection; you can call its ``transport.write`` to write some data to it.  These are regular Python objects; you can put them into lists, dictionaries, or whatever other data structure is appropriate to your application.

As a simple example, add a list to your factory, and in your protocol's ``connectionMade`` and ``connectionLost``, add it to and remove it from that list.  Here's the Python code:

.. code-block:: python

  from twisted.internet.protocol import Protocol, Factory
  from twisted.internet import reactor
  
  class MultiEcho(Protocol):
      def __init__(self, factory):
          self.factory = factory
  
      def connectionMade(self):
          self.factory.echoers.append(self)
  
      def dataReceived(self, data):
          for echoer in self.factory.echoers:
              echoer.transport.write(data)
  
      def connectionLost(self, reason):
          self.factory.echoers.remove(self)
  
  
  class MultiEchoFactory(Factory):
      def __init__(self):
          self.echoers = []
  
      def buildProtocol(self, addr):
          return MultiEcho(self)
  
  reactor.listenTCP(4321, MultiEchoFactory())
  reactor.run()

Why is ``protocol.dataReceived`` called with only part of the data I called ``transport.write`` with?
-----------------------------------------------------------------------------------------------------

TCP is a stream-oriented transport.  This means that when you call ``transport.write``, the data may be broken up into arbitrarily-sized chunks for transmission over the network.  There is no way for Twisted to determine how large the data originally written to the transport was.

If you want to send a message and receive it whole on the other end of a connection, you must decide on a format for the message and parse it.  For example, prefixing the message with a length or terminating it with a message boundary.  Luckily, Twisted provides many different utilities for this purpose, which can automatically divide the data stream into messages for you:

* `LineReceiver <http://twistedmatrix.com/documents/8.2.0/api/twisted.protocols.basic.LineReceiver.html>`_
* `NetstringReceiver <http://twistedmatrix.com/documents/8.2.0/api/twisted.protocols.basic.NetstringReceiver.html>`_
* `Int16StringReceiver <http://twistedmatrix.com/documents/8.2.0/api/twisted.protocols.basic.Int16StringReceiver.html>`_

These are implemented as classes you inherit from rather than ``Protocol``, and implement methods other than ``dataReceived`` (such as ``stringReceived`` or ``lineReceived``).  You may also want to consider a higher-level messaging protocol, to exchange messages with more structure than a simple collection of bytes.  For example, the `Asynchronous Messaging Protocol <http://twistedmatrix.com/documents/8.2.0/api/twisted.protocols.amp.html>`_, or `Perspective Broker <http://twistedmatrix.com/projects/core/documentation/howto/pb-intro.html>`_.

Why isn't my ``connectionLost`` method called?
----------------------------------------------

``connectionLost`` is called when the platform notifies Twisted that the TCP connection has been closed.  TCP connections are closed in one of two ways.  They can either be closed "actively" - by one side of the connection sending a close message to the other side - or they can be closed by timeout - one side deciding that the other side has taken too long to respond and interpreting this to mean that the other side is no longer paying attention to the connection.  However, for the timeout case, it is important to understand that if an application is not sending data over the connection, **there is no response** to *take too long* so no timeout will ever occur.  This means that if a network error disrupts a connection but the application is not sending data over it, it's possible for ``connectionLost`` to never be called.  However, if the application is sending data over it, then the timeout will eventually expire.  TCP uses very large timeouts in order to account for very poor networks.  If you rely on TCP timeouts, expect as much as two hours (the precise amount is platform specific) to pass between when the disruption occurs and when ``connectionLost`` is called.  If this is too long, you may want to use an application-level *keep alive* mechanism to discover lost connections earlier.  This just involves sending simple messages back and forth over a connection.  If it ever takes longer than whatever amount of time you decide is appropriate for your application to receive a response to one of these messages, consider the connection lost.

Also, keep in mind that ``transport.loseConnection()`` may not result in the connection closing immediately, e.g. if you have writes buffered. To close the connection immediately, discarding any buffered writes, call ``transport.abortConnection()``.

When I try to install my reactor, I get errors about a reactor already being installed. What gives?
---------------------------------------------------------------------------------------------------

Here's the rule - installing a reactor should always be the **first** thing you do, and I do mean first. Importing other stuff before you install the reactor can break your code.

`Tkinter <http://wiki.python.org/moin/TkInter>`_ and `wxPython <http://wxpython.org/>`_ support, as they do not install a new reactor, can be done at any point, IIRC.

``twistd`` won't load my ``tap`` file! What's this Ephemeral nonsense?
----------------------------------------------------------------------

When the pickled application state cannot be loaded for some reason, it is common to get a rather opaque error like so:

.. code-block:: console

  % twistd -f test2.tap 

  Failed to load application: global name 'initRun' is not defined


The rest of the error will try to explain how to solve this problem, but a short comment first: this error is indeed terse -- but there is probably more data available elsewhere -- namely, the ``twistd.log`` file. Open it up to see the full exception.

The error might also look like this:

.. code-block:: console

  Failed to load application: <twisted.persisted.styles.Ephemeral instance at 
  0x82450a4> is not safe for unpickling

To load a ``.tap`` file, as with any unpickling operation, all the classes used by all the objects inside it must be accessible at the time of the reload. This may require the ``PYTHONPATH`` variable to have the same directories as were available when the application was first pickled.

A common problem occurs in single-file programs which define a few classes, then create instances of those classes for use in a server of some sort. If the class is used directly, the name of the class will be recorded in the ``.tap`` file as something like ``__main__.MyProtocol``. When the application is reloaded, it will look for the class definition in ``__main__`` which probably won't have it. The unpickling routines need to know the module name, and therefore the source file, from which the class definition can be loaded.

The way to fix this is to import the class from the same source file that defines it: if your source file is called ``myprogram.py`` and defines a class called ``MyProtocol`` you will need to do a ``from myprogram import MyProtocol`` before (and in the same namespace as) the code that references the ``MyProtocol`` class. This makes it important to write the module cleanly: doing an ``import myprogram`` should only define classes, and should not cause any other subroutines to get run. All the code that builds the Application and saves it out to a .tap file must be inside an ``if __name__ == '__main__'`` clause to make sure it is not run twice (or more).

When you import the class from the module using an external name, that name will be recorded in the pickled ``.tap`` file. When the ``.tap`` is reloaded by ``twistd`` it will look for ``myprogram.py`` to provide the definition of ``MyProtocol``.

Here is a short example of this technique:

.. code-block:: console

  # file dummy.py
  from twisted.internet import protocol
  class Dummy(protocol.Protocol): pass
  if __name__ == '__main__':
      from twisted.application import service, internet
      a = service.Application("dummy")
      import dummy
      f = protocol.Factory()
      f.protocol = dummy.Dummy # Note! Not "Dummy"
      internet.TCPServer(2000, f).setServiceParent(a)
      a.save()

I get Interrupted system call errors when I use os.popen2. How do I read results from a sub-process in Twisted?
---------------------------------------------------------------------------------------------------------------

You should be using ``reactor.spawnProcess`` (see `interfaces.IReactorProcess.spawnProcess <http://twistedmatrix.com/documents/current/api/twisted.internet.interfaces.IReactorProcess.spawnProcess.html>`_ There's also a convenience function, `getProcessOutput <http://twistedmatrix.com/documents/current/api/twisted.internet.utils.getProcessOutput.html>`_, in `twisted.internet.utils <http://twistedmatrix.com/documents/current/api/twisted.internet.utils.html>`_.

Why don't my spawnProcess programs see my environment variables?
----------------------------------------------------------------

`spawnProcess <http://twistedmatrix.com/documents/current/api/twisted.internet.interfaces.IReactorProcess.spawnProcess.html>`_ defaults to clearing the environment of child processes as a security feature. You can either provide a dictionary with exactly the name-value pairs you want the child to use, or you can simply pass in ``os.environ`` to inherit the complete environment.

My exceptions and tracebacks aren't getting printed!  Or My Deferred or DeferredList seems like it never fires, so my program just mysteriously hangs! What's wrong?
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

It really depends on what your program is doing, but the most common cause is this: it is firing -- but it's an error, not a success, and you have forgotten to add an `errback <http://twistedmatrix.com/documents/current/core/howto/glossary.html#errback>`_ , so it looks like nothing happens. Always add errbacks!

The reason ``Deferred`` can't automatically show your errors is because a ``Deferred`` can still have callbacks and errbacks added to it even after a result is available -- so we have no reasonable place to put a logging call that wouldn't result in spurious tracebacks that are handled later on.  When a deferred is garbage collected with a Failure, a traceback is automatically printed.  However, if you keep a reference to your Deferred and it is never garbage collected, it's possible no traceback will be printed.  But in that case, you also have a memory leak.

For even more verbose debugging information to be printed in Failure tracebacks, set ``defer.setDebugging(True)``.

Why does it take a long time for data I send with ``transport.write`` to arrive at the other side of the connection?
--------------------------------------------------------------------------------------------------------------------

Twisted TCP, UDP, and SSL transports don't buffer data before sending it.  When you write data to a connection, it should show up on the other side as quickly as the network is capable of transporting it there. However, a couple things may prevent this from happening:

* Twisted can only send data after you give up control of execution to the reactor.  For example, if you have an infinite loop writing data to a transport, the data will never actually be sent since control will never leave your code and return to the reactor.
* Twisted APIs are largely not threadsafe.  If you call ``transport.write`` from a thread other than the reactor thread, the behavior is undefined.  This may manifest as very long delivery times, or deliveries that don't succeed until another unrelated event occurs in the system.  To use Twisted APIs from a non-reactor thread, see the documentation for ``reactor.callFromThread``.

If your program appears to send messages as expected, it might be possible that the sending program is working as expected but the receiving program is buffering the messages. Eg: your messages are buffered by a web browser, and you don't close your message. Use telnet instead. Especially as a beginner, never forget that you can only see messages indirectly through the eyes of another program. Check your receiving program!

How do I use Deferreds to make my blocking code non-blocking?
-------------------------------------------------------------

You don't. Deferreds don't magically turn a blocking function call into a non-blocking one. A Deferred is just a simple object that represents a deferred result, with methods to allow convenient adding of callbacks. (This is a common misunderstanding; suggestions on how to make this clearer in the `Deferred Execution <http://twistedmatrix.com/documents/current/core/howto/defer.html>`_ howto are welcome!)

If you have blocking code that you want to use non-blockingly in Twisted, either rewrite it to be non-blocking, or run it in a thread. There is a convenience function, `deferToThread <http://twistedmatrix.com/documents/current/api/twisted.internet.threads.deferToThread.html>`_, to help you with the threaded approach -- but be sure to read `Using Threads in Twisted <http://twistedmatrix.com/documents/current/core/howto/threading.html>`_.

I get ``exceptions.ValueError: signal only works in main thread`` when I try to run my Twisted program! What's wrong?
---------------------------------------------------------------------------------------------------------------------

The default reactor, by default, will install signal handlers to catch events like Ctrl-C, ``SIGTERM`` and so on. However, you can't install signal handlers from non-main threads in Python, which means that ``reactor.run()`` will cause an error. Pass the ``installSignalHandlers=0`` keyword argument to ``reactor.run`` to work around this.

I'm trying to stop my program with sys.exit(), but Twisted seems to catch it! How do I exit my program?
-------------------------------------------------------------------------------------------------------

Use ``reactor.stop()`` instead. This will cleanly shutdown the reactor.

How do I find out the IP address of the other end of my connection?
-------------------------------------------------------------------

The ``.transport`` object (which implements the `ITransport <http://twistedmatrix.com/documents/current/api/twisted.internet.interfaces.ITransport.html>`_ interface) offers a pair of methods named `getPeer <http://twistedmatrix.com/documents/current/api/twisted.internet.interfaces.ITransport.getPeer.html>`_ and `getHost <http://twistedmatrix.com/documents/current/api/twisted.internet.interfaces.ITransport.getHost.html>`_. ``getPeer`` will give you a tuple that describes the address of the system at the other end of the connection. For example:

.. code-block:: python

  class MyProtocol(protocol.Protocol):
      def connectionMade(self):
          print "connection from", self.transport.getPeer()

Why don't Twisted's network methods support Unicode objects as well as strings?
-------------------------------------------------------------------------------

In general, such methods (e.g. `FileDescriptor <http://twistedmatrix.com/documents/current/api/twisted.internet.abstract.FileDescriptor.html>`_ 's write) are designed to send bytes over the network. These methods use non-Unicode string objects as a container for the bytes that they send and receive.

Unicode objects are not byte-based and are an abstraction used for representing strings of human readable text. In order to send Unicode strings using these methods, you should explicitly specify a byte-based encoding for them, for example: ``s.encode("utf-8")`` and explicitly decode them at the receiving end.

Twisted cannot choose an encoding for you at this level: your encoding choice will be protocol specific and may need to be specified in the message you send (for example, HTTP headers include a encoding specification).

For a more complete discussion of the distinction between Unicode strings and specific encodings of Unicode strings, see the following articles:

* Glyph's `Implicit encoding is bad example <http://twistedmatrix.com/pipermail/twisted-python/2005-October/011573.html>`_
* Dan Sugalski's `What the heck is: A string; <http://www.sidhe.org/~dan/blog/archives/000255.html>`_
* Joel Spolsky's `The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!) <http://www.joelonsoftware.com/articles/Unicode.html>`_.

Why do I get a *Permission denied* error trying to write `.../site-packages/twisted/plugins/dropin.cache.new` when I use ``twistd`` or ``trial`` or some other Twisted program?
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Twisted's plugin system uses certain cache files to improve performance.  These cache files are automatically updated as necessary.  However, when a Twisted installation is used by processes without write permission to it (as is commonly the case for a site-wide installation), if this cache file is not up to date, attempts to rewrite it will result in this error.  The solution is for the administrator (whoever performed the site install) to generate the cache.  See the `Plugin Caching <http://twistedmatrix.com/projects/core/documentation/howto/plugin.html#auto3>`_ section of the plugin documentation for details on how to regenerate this cache.

Why can't the Twisted's reactor be restarted?
---------------------------------------------

There is no interesting reason. This is mainly a limitation of the current implementation, and a lack of interest on this particular feature. It's just a matter of someone spending the time on it.

What's the best way of integrating Twisted with pygame?
-------------------------------------------------------

Take a look at `game <https://launchpad.net/game>`_ to see an example of the world's best practice for integrating pygame and Twisted.

Perspective Broker
==================

How can I get the reference to a client from a Perspective?
-----------------------------------------------------------

Firstly, the client must send a reference when it connects to the perspective broker. This can be done by passing the reference as a parameter to `pb.connect <http://twistedmatrix.com/documents/current/api/twisted.spread.pb.connect.html>`_.

At the server end, you must override the `Perspective.attach <http://twistedmatrix.com/documents/current/api/twisted.spread.pb.Perspective.attach.html>`_, which is called when a client attaches to a perspective. The first argument of this method is a remote reference to the client object that was passed to `pb.connect <http://twistedmatrix.com/documents/current/api/twisted.spread.pb.connect.html>`_.

Note that a single perspective can have many attached clients. For further information, see `Managing Clients of Perspectives <http://twistedmatrix.com/documents/current/core/howto/pclients.html>`_ HOWTO and the `twisted.spread.pb <http://twistedmatrix.com/documents/current/api/twisted.spread.pb.html>`_ API docs.

Requests and Contributing
=========================

Twisted is cool, but I need to add more functionality.
------------------------------------------------------

Great! Read `our docs </content/pages/Documentation/Documentation.html>`_, and if you're feeling generous, contribute patches.

I have a patch. How do I maximize the chances the Twisted developers will include it?
-------------------------------------------------------------------------------------

There are several steps you can take to increase the chances of inclusion into Twisted:

#. Be sure you have read and are familiar with the information and linked material `here </content/pages/Twisted/TwistedDevelopment.html>`__ and `here </content/pages/ContributingToTwistedLabs.html>`_.
#. `Open a ticket <http://twistedmatrix.com/fixme/trac/newticket>`_ for the feature you wish to add.
#. Get feedback from others on your ideas and thoughts.
#. Write ``trial`` tests for your code!
#. When providing a patch, use unified ``diff`` Either use ``svn diff`` or, better yet, make a clean checkout and use ``diff -urN`` between them. Make sure your patch applies cleanly. 
#. If you post the patch to the mailing list, make sure it is inlined and without any word wrapping.

And to whom do I send it?
-------------------------

`Open a ticket <http://twistedmatrix.com/fixme/trac/newticket>`_ , and if it's an urgent or important issue you may want to tell the `mailing list <http://twistedmatrix.com/cgi-bin/mailman/listinfo/twisted-python>`_ about the issue you added.

My company would love to use Twisted, but it's missing feature X, can you implement it?
---------------------------------------------------------------------------------------

You have 3 options:

#. Pay one of the Twisted developers to implement the feature.
#. Implement the feature yourself.
#. Add a feature request to our bug tracker. We will try to implement the feature, but there are no guarantees when and if this will happen.

Documentation
=============

Twisted really needs documentation for X, Y or Z - how come it's not documented?.
---------------------------------------------------------------------------------

Twisted's documentation is a work in progress, and one that we would appreciate assistance with. If you notice a gap or flaw in the documentation, please file a bug in the `Twisted Issue tracker <http://twistedmatrix.com/trac/report>`_ and mark it as having topic 'documentation'. Patches appreciated. Unit tests even more so.

Communicating with us
=====================

There's a bug in Twisted. Where do I report it?
-----------------------------------------------

Unless it is a show-stopper bug, we usually won't roll out a new release with a fix it if it's already fixed in `Git <https://github.com/twisted/twisted>`_, so check if it is fixed there. If it is not fixed in Git, you should add it to the `issue tracker <http://twistedmatrix.com/trac/newticket>`_, including pertinent information about the bug (hopefully as much information needed to reproduce it: OS, Git versions of any important files, Python version, code you wrote or things you did to trigger the bug, etc. If the bug appears to be severe, you should also raise it on the `mailing list <http://twistedmatrix.com/cgi-bin/mailman/listinfo/twisted-python>`_, with a pointer to the issue already filed in the bug tracker.

Where do I go for help?
-----------------------

Ask for help `where the Twisted team hangs out </content/pages/Twisted/TwistedCommunity.html>`_.

How do I e-mail a Twisted developer?
------------------------------------

First, note that in many cases this is the wrong thing to do: if you have a question about a part of Twisted, it's usually better to e-mail the mailing list. However, the preferred e-mail addresses for all Twisted developers are listed in the CREDITS file in the Subversion repository.
