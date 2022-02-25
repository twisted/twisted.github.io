Twisted API Documentation
#########################


This page describes how to generate the API docs for the Twisted web site.

You will need the latest Twisted release unpacked and the latest version of pydoctor

Steps
=====

1. Modify template.tpl to include the Google Analytics JavaScript (which can be found in the source of any trac page).
2. Run an interactive Python session that goes something like this:

.. code-block:: python

        >>> from twisted.python._release import APIBuilder
	>>> from twisted.python.filepath import FilePath
	>>> APIBuilder().build('Twisted', 'http://twistedmatrix.com/trac', 
        	'http://twistedmatrix.com/trac/browser/tags/releases/twisted-8.2.0',
        	FilePath('Twisted-8.2.0/twisted'), FilePath('apidocs'))

Be sure to use the tag which corresponds to the version of Twisted the docs are being generated for.  Note that if your working is the Twisted source directory you checked out, then ''that'' version of `APIBuilder` will be used!

3. Upload the resulting ``apidocs`` directory to www-data@cube.  Use ``tar cx apidocs | ssh www-data@twistedmatrix.com tar xv`` or something.
4. Put the apidocs directory into the appropriate location beneath vhosts/twistedmatrix.com/documents/ (eg 8.2.0/api)
5. If desired, update the ``current`` symlink.
