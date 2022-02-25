Cancellable Deferred Use Cases
##############################



* ``twisted.web._newclient.Request.writeTo`` returns a ``Deferred`` which fires when the request has been completely written to the transport.  If the connection is lost and a request is in the process of writing itself out, it should be told to stop.  This could be done by canceling the ``Deferred`` returned by ``writeTo``.  It is currently done by having a separate method on ``Request`` (requiring extra state tracking).
