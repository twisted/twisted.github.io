How to Apply for Commit Privileges
##################################


To request commit privileges, please submit an application to commit@twistedmatrix.com (you must be logged in to trac in order to view this email address). The application should contain a list of 10 tickets, at least 5 of which are patches you've submitted, and at least 5 of which are code reviews you've done which have been accepted by a committer. At least 2 of your authored patches should have gone all of the way through the review process to be landed. Once you've sent in your application, a group of core contributors will review it and decide whether to grant you commit privileges.

The following is an example application using some of glyph's commit history:

.. code-block::

  Hi Twisted committers,
  
  I would like to apply for commit privileges. My trac username is glyph.
  
  Code Reviews Performed
  ----------------------
  7176 - Use twisted.python.runtime in twisted.internet.serialport
  7485 - Porting t.w._newclient and t.w.t.test_newclient to Python 3
  7624 - @inlineCallbacks ignores return values in Python3.3 and greater
  7684 - twisted.internet.endpoints._parseSSL defaults to SSLv23_METHOD, should default to None
  7702 - Remove twisted.application.internet.UDPClient.
  
  Patches Submitted
  -----------------
  4900 - twisted.web server sends responses without explicit Content-Type; potential XSS
  5572 - twisted.internet.tcp.Connector.getDestination has invalid epytext in it
  6751 - twisted.web._newclient.Response leaves its transport in an unpredictable state depending on how large the response body is
  7836 - LoopingCall.withCount countCallable called with 0
  7878 - twisted.internet.process raises an exception when encoding tracebacks that occur post-fork/pre-exec and include non-ASCII characters
  
  Patches Accepted
  ----------------
  4900 - twisted.web server sends responses without explicit Content-Type; potential XSS
  5572 - twisted.internet.tcp.Connector.getDestination has invalid epytext in it
  
  Thanks!

Directions for the Review Committee
===================================

The committee will use the following process when deciding to grant commit privileges:

#. Once at least 1 committee member sponsors the application, other committers have 7 days to object to the application.

#. If no objections are received within the 7 day period, any member of the committee may grant the applicant commit privileges.

#. If the committee decides to grant privileges to the applicant, a committee member will make an announcement on the mailing list welcoming the new committer. If the application is denied, then the applicant will be notified privately and given an explanation.
