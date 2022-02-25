Building Twisted on Windows
###########################



This contains information for building Twisted on Windows


Installation requirements
=========================

You will need a standard Python 3 dev environment. See the official documentation at https://docs.python.org/3/using/windows.html

Download Visual Studio Installer and get the following components for C++ build tools (might use newer versions):

* MSVC v142 - VS 2019 C++ build tools
* Windows 10 SDK

You can get Python 3 via nuget.

Also get Git for Windows.

Dev process
===========

Make sure pip script is installed with ``python -m pip install -U pip`` as the default python might be created with only the pip module and without the pip script.

Then you can do the standard ``pip install -e .[dev]``
