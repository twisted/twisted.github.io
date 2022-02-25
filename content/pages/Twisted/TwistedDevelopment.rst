Twisted Development
###################


`Contribute </content/pages/ContributingToTwistedLabs.html>`_ > Twisted Development

.. contents::

Contributing
============

Twisted uses the `The Ultimate Quality Development System </content/pages/UltimateQualityDevelopmentSystem.html>`_, in addition to this ReviewProcess.

If you want to become a developer, it is important to understand that all your contributions (including those initial patches you send to the bug tracker) will have to be licenced under the `MIT License <https://opensource.org/licenses/mit-license.php>`_.

Getting the source code
-----------------------

You can get Twisted's source code here:

``git clone https://github.com/twisted/twisted.git Twisted``

If you intend to contribute to Twisted via Git, but do not have write access to the Twisted repository, you should instead fork the project by going to https://github.com/twisted/twisted and clicking on "fork".
Then set up your local repository:

.. code-block:: console

  git clone https://github.com/<yourusername>/twisted.git Twisted
  cd Twisted
  git remote add upstream https://github.com/twisted/twisted.git
  git fetch upstream
  git branch -u upstream/trunk trunk

NOTE for experienced Git users: for historical reasons, Twisted's main branch is currently named "trunk", instead of the usual "master".

.. _creatingyourworkenvironment:

Creating your work environment
------------------------------

Twisted development does not enforce any specific work/build environment.

Twisted uses Tox for managing the environment used in the continuous testing systems (GitHub Actions, Circle CI, Travis-CI, Appveyor).


With Tox
~~~~~~~~

You will need Tox version at least 2.4. (On Ubuntu 16.04 you have 2.3.1).

See README.md and tox.ini comments for more details. Note that some environments are for CI systems and not designed for local runs.

Here is an example for running the test in a specific environment:

.. code-block:: console

  $ tox -e alldeps-nocov twisted.conch.test.test_transport
  $ tox -e lint,black,newsfragment,manifest-checker

You can also use tox just to initialize the dev virtual environment and then manually active and use it:

.. code-block:: console

  tox -e nodeps-nocov-posix --develop
  . build/nodeps-nocov-posix/bin/active
  trial twisted.conch.test.test_transport


Without Tox
~~~~~~~~~~~

For faster runs, you can skip tox and build a custom working environment.

For your convenience, the setup.py file defined optional components, `dev` component being one of them.

Here is an example of creating an environment using virtualenv.

.. code-block:: console

  # Create base environment.
  virtualenv build/
  # For Unix
  . build/bin/activate
  # For windows (replace .bat with .ps1 for powershell)
  build/Scripts/activate.bat 
  pip install pypiwin32

  # Install dev dependencies, also forcing upgrade of existing versions.
  pip install -U -e '.[dev]'
  # At least on my Ubuntu 16.06 the install_requires were not correctly installed,
  # so I am doing a manual install based on the content of src/twisted/python/_setup.py.
  pip install automat incremental constantly diff_cover
  
  # Use the dev tools.
  # Prefix this with the path to python.exe on Windows
  trial twisted.conch.test.test_transport
  
  # Using the coding standard guidelines validation tool... will get a lot of false positives
  twistedchecker twisted.conch.ssh.transport
  # On Linux/OSX there is a helper to only raise error for the diff
  ./.travis/twistedchecker-trunk-diff.sh src/twisted/
  
  # Static code analysis and checkers (see tox.ini for inspiration)
  pyflakes twisted/conch/ssh/transport.py
  git diff trunk... | admin/pycodestyle-twisted.py --diff
  ./bin/admin/check-newsfragment src/twisted/
  check-manifest --ignore "docs/_build*,docs/historic/*,admin*,bin/admin*,twisted/topfiles/*.Old"

Submitting a Patch
------------------

Here's a quick step-by-step guide to getting from an idea for an improvement to Twisted to something that we can integrate.  First, I'll explain just the mechanics of getting your code into review, not what the code itself should do.  If you actually want us to be able to use your code, you will also want to read the section below on getting your patch accepted, too!

#. For the patch you are submitting, make sure that a `ticket exists using the "search" field above <https://twistedmatrix.com/trac/report>`_, and Google for the patch which you are submitting.

   #. If you can't find one, file a new ticket using the `new ticket <https://twistedmatrix.com/trac/newticket>`_ link above. See: `Tickets Management </content/pages/Twisted/TwistedDevelopment.html#tickets-management>`__.

#. Create a `fork on GitHub <https://help.github.com/articles/fork-a-repo/>`_ and clone it (see `Getting the source code <#getting-the-source-code>`_ above).

#. Create a branch in git for your code.  If your ticket is **1234** and your GitHub ID is **myuserid**, you can create a branch like:

.. code-block:: console

  git checkout trunk
  git pull
  git checkout -b 1234-myuserid-mychange

#. Edit the code in the branch that you just checked out, making your awesome change to Twisted.

#. Make sure that your patch fulfills all of the requirements of the `ReviewProcess </content/pages/ReviewProcess.html>`_, so you don't need to submit your patch many repeated times. Run ``tox -e black-reformat`` to automate the formatting.

#. Every patch needs a `topfile news fragment </content/pages/ReviewProcess.html#newsfiles>`_ to tell the user what was changed

#. Commit your changes 
     ``git commit -am "Changed some stuff"``

#. Push your changes to GitHub
     ``git push 1234-myuserid-mychange``

#. Create a `GitHub pull request <https://help.github.com/articles/creating-a-pull-request/>`_ for the **my-new-change** branch.  Make sure that in the pull request, you put a link to the ticket that you filed above. 

#. In your ticket, put a link to the GitHub pull request.

#. Put the ticket into review.  This is accomplished by doing the following:

   #. enter the word **"review"** into the **"Keywords"** field of the ticket.  (If there are other keywords already there, just add a space to separate the keyword.)

   #. Click on the "reassign to" radio button.

   #. Select the topmost, blank entry from the "reassign to" button.

   #. Optionally, add a comment explaining which patch you would like reviewed (if there are already other attached files), and explaining **what** your change does (as opposed to the **why** you want it done, which you should have put into the ticket's summary and description).

   #. Hit "submit changes".

#. At this point, you need to wait for feedback.  If your patch is very good, very simple, and obviously correct, we may just apply it, but it is ''very unlikely'' that the first draft of a patch will be accepted as-is.  When a Twisted developer reviews your patch, they will re-assign the ticket to you; you can `see the list of tickets assigned to you by clicking here <http://twistedmatrix.com/trac/report/7>`_. Unfortunately, the time it takes us to deal with a ticket submitted for review is highly variable, and depends on how many other tickets are waiting review, the amount of free time that the Twisted core development team has, and how many resources we have available for `sponsored development <http://labs.twistedmatrix.com/>`_.

#. When you do receive a review comment, push changes to your branch which address that feedback, then place the ticket back in review.

#. When placing the ticket back for review, make sure your branch is up to date with latest trunk, and that there will be no merge conflicts.

#. Don't push your changes by rewriting the history, merge trunk into your branch.


Getting Your Patch Accepted
---------------------------

If you are interested in contributing to Twisted for the first time, consider working on an existing ticket rather than contributing a new feature.  Fixes for existing problems or implementations of already-requested features will generally take priority over new ideas.  Consider discussing the work you want to do with `other Twisted developers first </content/pages/Twisted/TwistedCommunity.html>`_.

Familiarize yourself with project policies and coding standards and make sure your full contribution (code, test, documentation, design) adheres to it. See: `Policies <#policies>`__.

There are a couple of tools to help with automatic policy checks.
Make sure there are no errors when running these tox environments (or equivalent checks):

``$ tox -e lint,black,newsfragment,manifest-checker``

Make sure that you have written unit tests and docstrings for all code which has changed in your patch.  It works best if you use test-driven development to write your patch initially, and write your tests before your code.  (Believe me, if you write your tests after you write your code, we ''will'' know.  It's more obvious than you think.)

Run the full test suite ''before'' submitting your patch, and fix any problems you discover.  If a reviewer notices failing tests, they may not give your code a deep look, and you may have to wait longer for a second review. See: `Tools for development <#tools-for-development>`__.

Some users may discover that their system is unusual and Twisted's test suite **does not pass** "out of the box".  If this is the case, just make sure that the **same** tests are failing for you in a pristine checkout of trunk and with your changes applied.  Then, in addition to submitting your patch, please let us know about the problem with the test suite!

Tools for Development
=====================

There are a few useful tools for developing Twisted. Some of them are included with Twisted, some are third-party dependencies.

Command from this section assume that you run them from withing Twisted source code checkout root.

To run the tests, simply run `trial twisted`. Make sure you run trial command that comes with twisted source code and not the one provided by your operating system.

To generate the narrative documentation or API documentation, see `the wiki page on Twisted documentation </content/pages/ReviewingDocumentation.html>`_.

After every commit to Twisted, the buildbot runs all the unit tests and reports `test results on several platforms <http://buildbot.twistedmatrix.com/>`_.  Here is a page showing only the `test results on supported platforms <http://buildbot.twistedmatrix.com/boxes-supported>`_. All tests on supported platforms always pass. Watch the buildbot. Because sometimes, the buildbot watches back.

Runtime and development dependencies
====================================

Required and optional dependencies are now documented inside the source code _EXTRAS_REQUIRE variable

Some optional dependencies are not yet documented and they are presented here:

* pygtk (or pygi or pygobject or something) is required for the gtk class of reactors
* wxpython is required for wxsupport / wxreactor
* gadfly, sqlite, pypgsql, psycopg, mysqldb, kinterbasdb (at least one) are required for twisted.enterprise.adbapi
* SOAPpy is required for Twisted Web's SOAP support
* pypam is required for twisted.cred PAM integration

And there are some additional development tools:

* subunit is required for trial's subunit output plugin
* cython is required to update iocpreactor and some Failure unit tests

Tickets management
==================

All changes to source code require a ticket.

If you file a new ticket, please start with a clear description of **why** such a change is desirable.
We can read your attached code to find out **what** you are doing, but we can't read your mind to figure out why you want it done!

A Twisted ticket can be of one of three types.

* **Enhancements** are used for feature additions.  These typically take the form of a new API or an expansion of an existing API.  Enhancement tickets should clearly describe the desired feature.  The more well specified a feature is, the more likely it is to be implemented (and importantly, the more likely it is that what is implemented will actually be what the reporter wanted!) and the easier it is to implement.  Remember that the ticket is possibly the only persistent record of the feature request.  If it is not self-contained and sufficiently detailed, then it will likely fail to communicate the reporter's idea, diminishing its value (possibly all the way down to zero).

* **Defects** are used to track bugs in existing APIs.  Defect tickets are easier to specify than enhancements.  A defect should briefly describe the problem, but the bulk of the ticket should be a runnable program (ideally in the form of a unit test) which demonstrates the bug.

* **Regressions** are similar to defects, but are for bugs which are introduced into APIs in newer releases of Twisted.  Like defect tickets, regression tickets should have a runnable program attached to demonstrate the problem.

* **Release blocker: regression** a ticket which blocks the release of the next Twisted version due to a regression.

* **Release blocker: wrong release notes** a ticket which blocks the release of the next Twisted version due to a problem in the release notes.

* **Release blocker: release process bug** a ticket which blocks the release of the next Twisted version due to a problem/issue/defect in the release process itself.

A ticket can have attached the following official tags `BugKeywords </content/pages/BugKeywords.html>`_.

There are some UsefulQueries for finding issues in the tracker.

.. _policies:

Policies
========

This series of documents is designed for people who wish to contribute to the Twisted codebase.

* `Development policies <http://twistedmatrix.com/documents/current/core/development/policy>`_

* `Naming Conventions <http://twistedmatrix.com/documents/current/core/development/naming.html>`_

* `Epytext <http://epydoc.sourceforge.net/epytext.html>`_ for docstrings format

* `ReStructuredText and Sphinx <http://sphinx-doc.org/rest.html>`_ for narrative documentation.

* `Security </content/pages/Security.html>`_

* `Philosophy <http://twistedmatrix.com/documents/current/core/development/philosophy.html>`_

* `Review Process </content/pages/ReviewProcess.html>`_

* `Contributor Advancement Path </content/pages/ContributorAdvancementPath.html>`_


Wiki pages maintenance
======================

Changes to wiki pages don't require a ticket.

To prevent spam-bots, newly registered accounts don't have write access for wiki pages.

If you want to edit wiki pages, ask for write permission via one of `community communication channel </content/pages/Twisted/TwistedCommunity.html>`_ . Please mention your Trac username.


Win32 development
=================

If you want to hack Twisted on Win32, see Ying Li's `short tutorial on setting up a Twisted win32 development environment <http://blog.ying.li/2012/03/twisted-development-on-windows-v2.html>`_; but note that it describes getting the code with Subversion and you will currently need to use Git.

Twisted Maintenance
===================

You might be interested in learning about tasks related to maintaining this website? or for `releasing Twisted <http://twisted.readthedocs.org/en/latest/core/development/policy/release-process.html>`_.
