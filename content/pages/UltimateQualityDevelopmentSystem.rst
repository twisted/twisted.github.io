Ultimate Quality Development System (UQDS)
##########################################


Divmod has been developing software for several years, and over the course of that time, we have developed a methodology, which involves a ticket discipline and a suggested use for a version control system.  It is extremely lightweight and "agile", and can be combined as a component of any other methodology which breaks down work into individual tasks.

The briefest summary of the requirements for UQDS is that every task has 3 absolutely required steps.

* A task is created in an issue tracker and assigned to a worker.
* The worker does work, and creates a change-set to be applied to the mainline revision control system.  (This can be represented as either a branch or a patch file.)
* A reviewer reviews the completed work, and provides feedback: at least one good thing about the work, at least one area that needs improvement,  and a judgement as to whether the good qualities ultimately outweigh the bad, i.e. whether the branch should be merged.

The principles involved are:

* Most importantly, **all** work on a project must be reviewed by at least one person.  In conjunction with XP's PairProgramming, this provides a minimum of 3 involved parties to every change.  Especially on small teams, this eliminates the possibility of finger-pointing, and increases the whole team's awareness of the project in general.  Also, it addresses an area of code-review that PairProgramming does not: i.e. a decision might make sense at the time in the microcosm of some problem being solved, but be hard to explain or justify in the context of the larger project.  This provides an after-the-fact opportunity to verify that public methods are documented, debug prints are removed, and comments actually make sense to someone who wasn't present when the code is being written.
* **All** work on a project must be represented as changes to a version control system.  This most popularly applies to code, but in an ideal application of this methodology, designs, documentation and even plans could be added to the repository.  We are currently not quite so strict.
* **All** work on a project must be represented by tickets in a ticket tracker.  If it's not in the tracker, you shouldn't be working on it.  This provides a way to manage distractions and continuously re-focus on what's really important.
* **All** development is done on branches - no development is done on the ``trunk``. The ``trunk`` can be used to see branch differences, run test suites, build distributions, etc., but is not used for development. This may seem odd, but there are numerous reasons why it is a good idea (see below).

The lifetime of a task in UQDS in practice (using `Git <https://git-scm.com/>`_ and `Trac <https://trac.edgewall.org/>`_) looks something like this, with a developer ``dev`` and a reviewer ``rev``.

* A ticket is created in the issue tracker.
* For features, a specification is attached to the ticket.  For defects, reproduction instructions.
* The developer who is assigned the task "accepts" the task, by changing its state to "accepted".
* A branch is created in Git.  The branch is named with the convention <descriptive word>-<issue number>[-<branch number>].  (For smaller patches, or work done by non-committer developers, this and the next step can be omitted.  The developer can attach a patch to the ticket instead of creating a branch.)

.. code-block:: console

   dev@strange$ git checkout -b 123-sprocket-fire trunk

* Development occurs to implement the feature or resolve the defect in the branch.
* When the code is deemed ready by the developer, the developer checks in their changes **on the branch** (not the trunk).
* The branch is then assigned to another developer for review. The ticket should be given the keyword "review", assigned to the reviewer and the priority set to "highest".
* The reviewer switches to the branch, then merges it locally, to review it in the context of how it will change trunk.

.. code-block:: console

   rev@charm$ git checkout trunk
   rev@charm$ git pull
   rev@charm$ git merge --no-ff --no-commit 123-sprocket-fire
   rev@charm$ git diff --staged

* (If the patch does not merge cleanly, the reviewer may reassign to the developer to merge/rebase before reviewing again.  Branches and patches must always be sufficiently recent that they will apply cleanly to trunk in order to be considered for review).
* The reviewer runs all automated tests.

.. code-block:: console

   rev@charm$ trial twisted

* The reviewer verifies that the code makes sense, has unit tests, has documentation, updates any existing documentation that is affected, and actually resolves the issue in question.
* If any more work is required, the reviewer reassigns to the developer explaining what else needs to be done in a ticket comment.  The reviewer can use ``git merge --abort`` to back out of the merge if the branch changes are not acceptable. When this process has been repeated enough times that all the tests pass and the reviewer is satisfied, they re-assign to the developer for merging, and the developer merges.

.. code-block:: console

   dev@strange$ git commit -m "
   A brief description of the sprocket feature.
   
   Author: dev
   
   Reviewer: rev
   
   Fixes #123
   
   A detailed description of the sprocket feature.
   "
   
   dev@strange$ git branch -d 123-sprocket-fire
   dev@strange$ git push -d origin 123-sprocket-fire

* the "fixes" note in the commit message automatically resolves the ticket with a status of "fixed".  Voila!  Our feature is implemented and ready in trunk.

Branch lifetimes should be short.  If trunk moves very far from the branch, the branch should be rebased or merged to pick up bug fixes and feature enhancements which might be useful.  Doing this also makes the final merge easier, by keeping conflicts small and bringing them to the developer's attention before they become unmanageable.

Why Branches ?
==============

The most recent version of source code in the repository should always be working.  That makes it a lot easier to deploy fixes and tweaks quickly.  However, sometimes you need to check in code to test it on a different machine, or show it to a different developer.  A version control system is useful in many ways, and if you only have one branch, these purposes conflict.

Here are some of its features.

Keep ``trunk`` Working
----------------------

The most recent revision of a piece of software, that is, ``trunk@HEAD`` should always work.  Any new developer should be able to check out the most recent version and immediately start working, without worrying that the build is broken this week.

With branch-based development, features are only merged to trunk after they have been tested and reviewed by at least one other developer.

Switch Developers Mid-Feature
-----------------------------

If a developer gets stuck because it turns out that part of a feature is outside their expertise, they can easily put code that they know is broken into a branch, then indicate that branch to another developer and reassign the ticket, without breaking trunk.

Provide Useful Progress Information to Management
-------------------------------------------------

Branches directly correspond to user-facing tasks.  A quick look at the list of branches should indicate to managers what is actually going on.  If there are a lot of branches (more than twice the number of developers, let's say), that means that the team's efforts are getting diffuse and they need to focus more and get branches merged.  If branches are being turned over quickly, it means that tasks are being completed quickly.

Mechanism for Code Review
-------------------------

Usually `CodeReview </content/pages/CodeReview.html>`_ is done by module, and only after the fact.  While this practice is useful, it only raises problems that already exist, it doesn't prevent them.

By reviewing each branch as a change, rather than a module, problems are spotted earlier on, and developers can work on any modules that are necessary for a particular task, with no worries that the maintainer won't notice - on a larger team, any module maintainers should be asked for review.

This is also a low-friction review process.  Rather than submitting a branch for review and discussing it interactively, a developer may accept a ticket, start a branch, commit a few times, finish, put the ticket into review, move on to an unrelated branch, repeat, put that branch into review, then check their assigned tickets at the end of the day and merge any branches which have been accepted before finishing for the day.

Generate a Meaningful Changelog
-------------------------------

Often, source control logs are riddled with nonsensical, tiny changes.  "twiddled whitespace", "added a few docstrings", etc.  Because it's good to commit frequently to avoid losing too much work or generating monolithic changes, this is hard to avoid.  Commit messages generate a bottleneck to getting work into the repository, which is bad.

If every branch has a clear purpose, then only ''merges'' need have useful, descriptive commit messages, and since no code is changing when a developer is doing a merge to trunk, they can take all the time they need to come up with a good message.  This means that the changelog generated directly from a revision log of trunk (as opposed to the whole repository) is likely to be useful as a changelog.

Tangentially related, commit messages for merges should include at least three pieces of information:

* The author of the branch.
* The reviewer of the branch.
* The tickets which the branch resolves or relates to.

Revert Useful Units
-------------------

If something ''does'' break trunk, you can revert it with one command, rather than sifting through piles of related commit messages and trying to assemble a useful revert.  It's "revision 1234", not "revision 1232, 1237, 1239, 1246, and I think maybe 1255 too, you should run the tests both ways".

Merge When You're Merging, Not When You're Hacking
--------------------------------------------------

If you are working directly in trunk, any update may cause conflicts which you have to immediately resolve before you can continue working.  With branches, a smaller number of developers can work on a branch, knowing that their changes won't conflict, and update regularly.

That means you are never interrupted with an unpleasant required merge.  Your code is always in the repository ''before'' you worry about merging it with other people's changes, so there is no concern that although your code was working before you were ready to commit, the merge went badly and you never committed in a working state.

Develop on a Preferred Platform, Test on Another, Disturbing No-one
-------------------------------------------------------------------

If a developer prefers to code in a Unix environment but needs to add a feature for Windows, they can create a branch, happily work on it under Unix, commit the changes (to the branch), go to a Windows machine and update the branch, test it, repeat etc. This allows one developer to work in private on several machines, using the revision control system in a disciplined and effective way that precludes accidents passing patches or updates between machines, and which has no impact on other developers.

Cover yourself
--------------

If adding a feature or fixing a bug takes a significant amount of time, at some point you're going to want to make sure your changes so far
are backed up. If you're working on the trunk you clearly can't check them in. So you're forced to take a more manual and probably
more error-prone approach to make a backup of your local changes. If instead you're working in a branch, you can just check in your
changes so far - without disturbing the trunk. Of course if there are multiple developers working on one branch, you'll need to do something
else (like work on a branch of a branch). In the simple situation where you're alone on a branch, you can easily save your progress
so far back to the repository and have it be the backup of your work to date on the branch.

Some Thoughts on Things I Don't Know Anything About
---------------------------------------------------

While this process works very well for us on Python code, more heavyweight development environments might find it even more valuable.  For example, if it takes an hour-long build process and 20 minutes of testing to determine whether trunk is in a good state, branch-based development could be even more valuable.

Even if you already have awesome automated tests, branches can speed things up immensely.  Let's say Foo Co. has 30 developers and an hour long build and 20 minutes of unit tests.  Jethro checks in some broken core header file to trunk and goes to lunch.  The automated tests start building and running.  Alice, preparing to commit, updates.  She receives Jethro's broken changes.  Alice, being a better developer than Jethro, runs the tests.  She waits 20 minutes.  The build is broken!  She can't commit, since she doesn't want to break trunk.  (All this while, precious hours of work are sitting on Alice's disk, not backed up in the repository...)

Meanwhile, everyone else in the company has updated, and jethro returns from his early lunch.  Thus far, 30 developers * (1 hour of build + 20 minutes of tests) = 40 man hours have been wasted.  Everyone knows it was Jethro when he gets back because the build indicates failure on a revision he checks in, but now all 30 developers are standing behind his desk, waiting for him to get trunk back into a working state and test the fix so they can get back to work.  That requires ''at least'' another 1:20 of time waiting for the automated tests before Alice can commit her changes.

Much of this waiting could have been circumvented if Jethro had checked his changes into a branch, and then asked the automated test system to run tests for him, and maybe had one other developer review it for him.  By the way, Buildbot has this feature, as do many other CI systems.

Questions
=========

* "Why branches" isn't as interesting to me (''meaning Jonathan Lange'') as "Why tickets". One of the things about UQDS that surprises people who do branch-based development is that it insists on putting all information about a change in a single ticket. Why not have feature discussion and code reviews on mailing lists, and then link to those discussions from the ticket? Or perhaps the ticket thing isn't as "core" to UQDS as branches?
   * This needs to be integrated more clearly into the body of the document, but actually, tickets are ''more'' core to UQDS than branches.  This is one of the reasons I changed the name from "branch based development" to "UQDS".  Branches are just a mechanism for sharing work that's in progress; you can still more or less follow the ''process'' (while still taking the greater risk of losing work) just by exchanging and reviewing patches.  The ticket/not-a-ticket distinction, however, is key; it's the way the whole process starts.

   At some point, someone in "management" needs to decide that it's worth spending development resources on a particular task.  The particulars of who can make this decision, how it is made, when it is scheduled (etc, etc, etc) can differ in the extreme from project to project, but at some point it does need to be made.  Tickets are an explicit way of recording "this is work that should happen".  It's important to have an explicit, single mechanism for making this distinction, between "stuff we're just talking about" and "stuff somebody should really do some work on", specifically because of the huge number of differences between the way that these discussions are carried out on different projects.  Mailing lists are good because at least the discussion is recorded, but when you are communicating with people via mailing lists, via comments on tickets, via commit messages, via IRC, via phone conversations and via in-person meetings, everyone can have a different interpretation of what should be worked on and when.

   A ticket tracker (whatever its form) is a single unambiguous place where a unit of work can be named and identified, committed to, and tracked.  If your team has conventions for making these decisions on a mailing list crystal clear, and unambiguous terminology or conventions for identifying tasks, then your mailing list ''is'' a ticket tracker.  On a consulting project, clarity becomes especially critical, because the client is always hoping that they can get a few extra features in for free, and will ambiguously talk in meetings about features that have not been agreed upon.  In a community project it seems that vagueness is a problem that you can live with, since anyone can file tickets and decide to do some work on their own anyway; however, I've found that once you start doing the rest of UQDS, this clarity becomes especially important because it becomes more likely that someone will go off and implement something on their own, then file a ticket and not understand why it's getting rejected.  A ticket provides a much clearer record of the proposal and the rejection for future developers to look at than a mailing list discussion, because structured information accompanies the comments.

   As far as your question about why to actually record these things in a specific ticket tracker, like Trac, rather than using mailing lists for the discussion and then linking to it, this is simply an issue with deficiencies of the technologies.  Trac is a pain in the ass, Pipermail is a pain in the ass, bugzilla is a pain in the ass, launchpad is a pain in the ass, reviewboard is a pain in the ass, IRC log bots are a pain in the ass.  Web browsers in general are a pain in the ass.  These things have slightly varying levels of terribleness, but we can cope.  However, the more of them that you pile on top of each other, the worse the tangle becomes.

   If you're running a UQDS project on SVN and Trac, let's say, your users must already be proficient with their web browser, the trac UI, SVN commands, 'patch' and 'diff', just to deal with the basics of the process, let alone the skills they need to actually work on the code.

   Adding a mailing list to this process means that you have now added ''at least'' an email client, the mailman UI, the pipermail UI, and a way to get from the email client UI to the message archive UI to generate links, plus some new magical markup in trac to generate appropriate-looking hyperlinks between ticket comments and email messages.  (Plus, you need a new username and password!)  Given a bunch of poor choices for what to do about reviews, putting discussions into the body of trac comments seems the least poor to me.

   As far as I'm concerned, though, you could follow UQDS to a T and get all the concomitant process benefits with separate technologies for tracking tasks, discussions, reviews, and specificationsm, and linking them all together.  In fact, ideally, that is how it would be done, but building such a system is highly challenging, and doing it so that I'd actually think the UI was any good would probably involve being an IDE-integrated piece of client software with a very discoverable UI that offers frequent, subtle suggestions for the next thing to do.  I would hope that web access to such a thing would be entirely read-only - if I fill out one more HTML form in my life, it will be too many times. --Glyph
