# Guide for translators

## Introduction

First of all, thank you very much for willing to translate the Stop Mod Reposts plugins! With modders coming from all across the globe, it's important that our plugins are available in as many languages as possible. However, the plugin developer doesn't speak all of the world's languages, so we need _your_ help translating! This guide will tell you which files you need to edit and what changes need to be done in order for the translation into your language to go live. Please make sure you read through the entire guide *before* you start translating in order to avoid problems that will delay the inclusion of your translation into the plugins. You must be highly skilled in the language you are translating to, or (preferably) be a native speaker of that language, to be considered.

## Files to translate

There are two files you need to translate in order for the translation to be included into the extensions. You can find the base files (the ones you should translate from) in [this directory](https://github.com/VictiniX888/Illegal-Mod-Sites/blob/master/plugins/i18n/lang/en).

### messages.json

This file contains the strings used in the extensions themselves. The file is in JSON format (JavaScript Object Notation), and each entry in the base file, English, consists of the actual string that is displayed in the extension (`message`) and a description of what that entry does in the extension (`description`), designed to help you as a translator. An example entry might look like this:

```json
"appdesc": {
    "message": "Detects and warns against sites known to illegally repost Minecraft mods.",
    "description": "The description of the extension as it appears when searching in Chrome Web Store."
},
```

You do not need to (and you should not) translate the `description` tag of the entry, only the data after the `message` tag, and within quotes. The `description` tag should not be present in the translated file, though if you forget to remove them, we won't reject your translation because of it. If you remove it, please remember to also remove the comma trailing the `message` tag, otherwise the file may not properly validate as valid JSON. In this case the string you need to translate is:

> Detects and warns against sites known to illegally repost Minecraft mods.

Sometimes, the message contains a word enclosed in dollar signs `$` and has an accompanying `placeholders` block. The dollar-enclosed word **must not be translated** as it is a placeholder that will be replaced with something else in the extension. Here's an example of such an entry:

```json
"this_site": {
    "message": "Rating for $site$",
    "description": "Shown above the ratings for this site.",
    "placeholders": {
        "site": {
            "content": "$1",
            "example": "example.com"
        }
    }
},
```

In the above example, `$site$` is a placeholder, and you can have a look in the `placeholders` block to see what it stands for. In this case, `$site$` will be replaced with a domain name when displayed, and an example has been given. That means when you translate, you would translate `message` as it would be if you assume `$site$` means "example.com". Please also keep in mind that if a `placeholders` block is present, you **must not translate it**, you must **only** translate the `message` tag. The original `placeholders` block should also be present in the translated file. Important: The trailing comma after the `message` tag must not be removed if a placeholder block is present.

### storedesc.txt

This file contains the description of the Stop Mod Reposts extension as it appears when opening it in the extension store. It is quite long, but chances are you will only ever have to translate it once. The entire file must be translated.

## What you shouldn't translate

* **Names**  
In both files, you will find references to Stop Mod Reposts, Minecraft and other entities. It is very important that you do not translate any of these names, including "Stop Mod Reposts" as it is the name of the campaign. You will also find references to the IRC channel `#stopmodreposts`, and references to various Twitter accounts. Take care to avoid translating these names.

* **Links and domains**  
There will be references to StopModReposts.org in the extension's data files, and links to this GitHub repository. Do not translate these.

* **Email addresses**  
There will be reference to at least one email address in obfuscated form: "marius (at) varden (dot) info". This string should not generally be translated as it falls under the names and domains sections above. However, if you in your language pronounce email addresses with something other than "at" and "dot", these must be reflected in the translation. Important: Do not deobfuscate the address, i.e. do not use the actual `@` and `.` signs in the translation. It is done that way to prevent spam.

## Submitting translations

When you have finished translating the files, you should put the files in a new directory under `plugins/i18n/lang` named after the [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) representing your language. Please note that the extensions only support languages [listed on this page](https://developer.chrome.com/webstore/i18n#localeTable), and that if you submit a language not on this list, it will not be included in the plugin. You may still submit them, but they will not be added in the plugin until Chrome, Firefox or Opera adds support for them.

We will not add your language to the plugins unless **both** files are fully translated. We will also reject your submission if:

* The files are machine-translated (e.g. with Google Translate), or
* The translation does not convey the same message as the original English translation, or
* The `messages.json` file does not validate as valid JSON.

**We *will* check every submitted translation to ensure that they adhere to these rules.**

Once you have made sure that the files are fully translated, you are free to submit a pull request to this repository with your translation. Please be aware that any contribution to this repository, including translations, are covered under the [contributor license agreement](https://github.com/VictiniX888/Illegal-Mod-Sites/blob/master/CONTRIBUTING.md) and you may not contribute translations if you do not accept the terms outlined in that agreement. If you find it difficult to submit translations through GitHub, you may choose to send the files via email instead to marius (at) varden (dot) info, and we will review it and publish it for you. Please note that the contributor license agreement still applies.

If the translation is accepted, the changes will be reflected in the Chrome and Opera versions of the plugin. We will also add all of the translations to Firefox at some point, but at the moment, [Firefox does not support translation](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/l10n#Limitations) of the UI functions the plugin uses.

Thank you for contributing, and happy translation!
