The Twisted Advantage
#####################


Flexibility
===========

Twisted's codebase is small and it contains many hooks for dynamic content. With the source code and an open license, you know you'll never be in a position where you can't add a feature you need.

Security
========

Twisted is written in `Python a high-level language </content/pages/PythonAdvantage.html>`_, rendering it immune to the most common class of security flaw in network software, the "buffer overflow": buffer overflows have allowed worms and crackers to tamper with or disable internet servers. Twisted also takes advantage of operating-system security features whenever possible, delegating responsibility for tasks to the appropriate user to make the system more difficult to exploit.

Stability
=========

Thanks again to `Python's </content/pages/PythonAdvantage.html>`_ error handling mechanisms, the Twisted server framework is extremely stable. Even the most bleeding-edge development servers -- those we run here at http://twistedmatrix.com -- don't crash, and rarely (if ever) need to be restarted.

But where do these advantages help you directly? Twisted can do a lot, so it depends on what you're using it for. Let's take a look at some potential applications you might have in mind...

Publish a Web Site
==================

The twisted.web webserver is a scalable, small-footprint web server that's easy to configure. It's efficient enough to serve a high-traffic website, completely dynamic and reconfigureable on the fly, and simple enough to configure that you can have it set up and running in just minutes after you've downloaded it. It's also portable, so you can easily share your web content between Windows, Unix, Macintosh, and other systems, all running twisted.web. It also shares the security advantages of the rest of Twisted.

Twisted Web scales down as well as up. Use it to share files with your friends at home or to publish large files on your enterprise intranet.

Develop Servers at Lightning Speed...
=====================================

Twisted integrates a large number of consistent APIs for developing new Internet services. This translates to a wide number of protocols and components that are ready to work with your new server before you've written the first line of code.

In addition to legacy protocol support, the twisted.spread package allows developers to quickly develop new protocols and services with arbitrarily complex interfaces, prototyping new client functionality on the fly.

What does this mean in terms of development time? If you're developing a new server, it could take literally a year off of your implementation time -- and that's just now. Twisted development is proceeding at a rapid pace, and by the time you've finished your development you may find a host of new features that you didn't have to spend a moment thinking about!

Twisted comes under a relatively non-restrictive open-source license, making it suitable for both commercial and open-source development.

... And Clients Too
===================

Unlike some other server frameworks, Twisted makes it simple to develop a client using the same code-base. Whether you are developing both a client and server in tandem with the twisted.spread package, or independently developing a client for an existing protocol, Twisted's integration with a wide variety of different graphical toolkits will allow you to run any common code completely unchanged from your server environment.

Engage an Active Community
==========================

Twisted has a knowledgeable, energetic, and growing developer community. Members of this community have concern over issues like those you will be facing in your custom server development and have solved those issues for themselves already within the Twisted framework.

We (the developers of Twisted) try to use every piece of the software we write ourselves -- after all, the reason we wrote it was that we needed it! This means that if there's a bug, we're concerned about it. Twisted comes with a full set of automated acceptance tests and unit tests.
