Committer Checklist
###################



These are things that developers with commit access to the Twisted source repository should know.  The first list is of policy items (i.e., things you should or should not try to do).

#. All development is done in branches.
#. All code committed to trunk must go through the `Review Process </content/pages/ReviewProcess.html>`_ .
#. trunk commit messages must follow the format described on `Review Process </content/pages/ReviewProcess.html>`_ so that various pieces of automation can work.
#. If you check in something that breaks `trunk <http://buildbot.twistedmatrix.com/boxes-supported?branch=trunk&num_builds=20>`_ , revert it
#. Everything you check in to Git is licensed under `Twisted's license <https://github.com/twisted/twisted/blob/trunk/LICENSE>`_
#. Be in the IRC channel, at least when you're going to be committing to trunk (don't feel bad about avoiding the distraction when you're trying to get stuff done though).
#. Have fun, but not too much.

This second list includes various technical details about how you might go about doing Twisted development (and has overlap for organizational purposes):

#. All development is done in branches

   #. Branch names must follow the naming convention so that various pieces of automation can work.

#. trunk commit messages must follow the format described on `Review Process </content/pages/ReviewProcess.html>`_ so that various pieces of automation can work.

   #. If you check in something that breaks `trunk <http://buildbot.twistedmatrix.com/boxes-supported?branch=trunk&num_builds=20>`_ , revert it

      #. If the bad revision was 07c854353d,

         #. ``cd ~/Projects/Twisted``
         #. ``git revert -m 1 07c854353d .``

      #. Use "Reopens ticket:NNNN" in the commit message to re-open the corresponding ticket
      #. Explain what broke and how and perhaps on which platform in the commit message

   #. If you need to re-merge the reverted branch, revert the reversion.

      #. Create a new branch or merge trunk into your branch with was previously reverted.
      #. Revert again the commit containing the revert and commit the reversion: `git revert REVERT-SHA`.
      #. Make your changes.
      #. Push the changes for re-review

#. If you are merging a branch into trunk, you must commit exactly the merge.  You may not make extra changes in the trunk working copy after the merge.  It's easiest to do this if you merge changes via the Github pull request UI.

Other documents that overlap and supplement this information include:

* `Working from Twisted's Code repository <http://twistedmatrix.com/documents/current/core/development/policy/svn-dev.html>`_
* `Review Process </content/pages/ReviewProcess.html>`_
