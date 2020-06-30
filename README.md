# ![Thunderstorm icon](rep-resources/images/thunderstorm.png) ThunderStorm

## Tips, Tricks &amp; Examples for Thunderbird E-mail New Add-On Development

The goal of this repository is to provide examples in order to better "weather"
the transition to Thunderbird's new extension structure. The new paradigm follows
the *WebExtension* standard followed by most browsers these days.

Obviously Thunderbird has different requirements from a browser extension even if
Thunderbird relies and is based on Mozilla's Gecko core framework. Focus will be on
the differences and transition issues. The new structure adapted to Thunderbird is
termed *MailExtension*.

To get started with MailExtensions, we suggest to check out these resources first:
* [Comparison between XUL/XPCOM Extensions and WebExtensions](https://extensionworkshop.com/documentation/develop/comparison-with-xul-xpcom-extensions/)
* [Thunderbird Add-On Developer Guide](https://developer.thunderbird.net/add-ons/about-add-ons)
* [MailExtension API Documentation](https://thunderbird-webextensions.readthedocs.io/en/latest/)

The approach I have taken is not so much a tutorial, but rather a set of references
including working examples and other transition information.
Hopefully this approach will help both new and seasoned developers.  For both,
pointers to other tutorials or related documentation is also included.

## Organization

- Examples:
  - [TB78 Examples - How to get things done][MailExtensionExamples]
  - [TB60 to TB68 Conversion Examples][TB68Conversion]
  - [Scaffolding: Bare metal folder & file structures - Copy and go!][Scaffolding]





## Credits
<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

[MailExtensionExamples]:/examples/MailExtensionExamples/README.md
[TB68Conversion]:/examples/TB68Conversions/README.md
[Scaffolding]:/examples/scaffolds/README.md
