Reviewing and Adding Documentation
##################################


The documentation may need help if:

* Explanations are unclear
* Examples don't work or have become outdated
* The overall structure or the order in which information is presented is unintuitive 
* Examples for major concepts are missing

Note that the `example and howto documentation on the website <https://twistedmatrix.com/documents/current/core/howto/index.html>`_ may be outdated, as it is only updated from trunk on releases. The `latest build on Read the Docs reflects current trunk <https://twisted.readthedocs.io/en/latest/>`_.

Editing example and howto documentation
=======================================

These narrative docs live in `reStructuredText <http://docutils.sourceforge.net/rst.html>`_ (``.html``) files in subdirectories of `docs/ <https://github.com/twisted/twisted/tree/trunk/docs>`_. Twisted uses the document generator `Sphinx <https://sphinx.readthedocs.io/en/stable/>`_ to generate the HTML files you see on the web from these ``.html`` files. After adding your changes, it's important to review your changes for correctness and to preview how they will look on the website.

#. If you haven't already, `create your Twisted work environment </content/pages/Twisted/TwistedDevelopment.html#creating-your-work-environment>`_.

#. Make sure you have the latest version of the code

#. Edit away!

#. Preview your changes with Sphinx

For example, if I made changes to `docs/core/howto/choosing-reactor.html`, I should

``tox -e narrativedocs``

This generates `docs/_build/core/howto/choosing-reactor.html`, which you can view in a web browser with the command:

``python -m webbrowser docs/_build/core/howto/choosing-reactor.html``

If everything looks good, submit a patch to the `.html` as described `here </content/pages/Twisted/TwistedDevelopment.html#submitting-a-patch>`_.

Editing API Docs
================

The API docs are generated from the doc strings in the code by `pydoctor <https://github.com/twisted/pydoctor>`_ , so to update what will be displayed in the API docs just update the doc strings. After making your changes, generate a test set of API docs to preview how they will look.

#. If you haven't already, `create your Twisted work environment </content/pages/Twisted/TwistedDevelopment.html#creating-your-work-environment>`_.

#. Make sure you have the latest version of the code

#. Edit away! Be sure to adhere to the docstring guidelines in the `Twisted coding standard <https://twistedmatrix.com/documents/current/core/development/policy/>`_.

#. Preview your changes with pydoctor

Generate the docs with the build-apidocs admin script like so:

``tox -e apidocs``

The above produces a folder called `apidocs` in your current working directory. You can then open the docs in a web browser with the command:

``python -m webbrowser apidocs/index.html``

If everything looks good, submit a patch as described `here </content/pages/Twisted/TwistedDevelopment.html#submitting-a-patch>`_.

More
====

See also `DocumentationAnalysis </content/pages/Documentation/Analysis/DocumentationAnalysis.html>`_ from an old Twisted documentation sprint.
