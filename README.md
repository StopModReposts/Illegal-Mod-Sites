StopModReposts
==============
StopModReposts is a movement against illegal redistribution of Minecraft content, mainly focused on mods. The movement consists of a [website](http://stopmodreposts.org/), a [Twitter campaign](https://twitter.com/search?q=%23StopModReposts&src=savs), a [list of illegal mod mirrors](http://git.io/jaBI), and several browser plugins. We also have an [IRC channel](http://webchat.esper.net/?nick=WebUser....&channels=StopModReposts&prompt=0) and a [Twitter profile](https://twitter.com/StopModReposts).

To report a site that might be illegally redistributing mods, please open an issue in our [issue tracker](http://git.io/jaB7) or submit a pull request. We do currently target reposts of the following content types: mods, resource packs, maps, and modpacks. In addition, we target websites providing malicious Minecraft content.

# Submitting Translations

We also allow translations to be submitted now. Please see [TRANSLATING.md](https://github.com/VictiniX888/Illegal-Mod-Sites/blob/master/plugins/i18n/TRANSLATING.md) for more information.

# Serialized Formats

StopModReposts provides its site list in various data formats that may be useful for developers. These list formats are available by querying an external API. We ask API users to be mindful about their request volume and to cache the site list. Please do not request the list more than once every 12 hours if possible. You may embed the list in your application if you find this to be a feasible approach. An identifying user-agent (preferrably with some kind of contact information included) is required for all API requests.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">The StopModReposts list</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://stopmodreposts.org/" property="cc:attributionName" rel="cc:attributionURL">StopModReposts</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="http://git.io/jaBI" rel="dct:source">http://git.io/jaBI</a>.

## JavaScript Object Notation (JSON)

### Request

**Method 1**

https://api.varden.info/smr/sitelist.php

Headers:
    
    Accept: application/json

**Method 2**

https://api.varden.info/smr/sitelist.php?format=json

### Response

```json
[
    {
        "domain": "example.com",
        "path": "\/",
        "pattern": "https?:\\\/\\\/([^\\s\\.]+\\.)*example\\.com(\\\/[^\\s]*)?",
        "advertising": 3,
        "redistribution": 4,
        "miscellaneous": 5,
        "notes": "**Malware alert!**"
    },
    ...
]
```

## Extensible Markup Language (XML)

### Request

**Method 1**

https://api.varden.info/smr/sitelist.php

Headers:
    
    Accept: application/xml

**Method 2**

https://api.varden.info/smr/sitelist.php?format=xml

### Response

```xml
<sites>
    <site>
        <domain>example.com</domain>
        <path>/</path>
        <pattern>https?:\/\/([^\s\.]+\.)*example\.com(\/[^\s]*)?</pattern>
        <advertising>3</advertising>
        <redistribution>4</redistribution>
        <miscellaneous>5</miscellaneous>
        <notes>**Malware alert**</notes>
    </site>
    ...
</sites>
```

## Named Binary Tag (NBT)

The returned file is not gzip-compressed.

### Request

**Method 1**

https://api.varden.info/smr/sitelist.php

Headers:
    
    Accept: application/x-nbt

**Method 2**

https://api.varden.info/smr/sitelist.php?format=nbt

### Response

```
root
└ [TAG_List] "sites"
  ├ [TAG_Compound]
  │ ├ [TAG_String] "domain"         → example.com
  │ ├ [TAG_String] "path"           → /
  │ ├ [TAG_String] "pattern"        → https?:\/\/([^\s\.]+\.)*example\.com(\/[^\s]*)?
  │ ├ [TAG_Byte]   "advertising"    → 3
  │ ├ [TAG_Byte]   "redistribution" → 4
  │ ├ [TAG_Byte]   "miscellaneous"  → 5
  │ └ [TAG_String] "notes"          → **Malware alert**
  ├ ...
  └ ...
```

## Plain text

### Request

**Method 1**

https://api.varden.info/smr/sitelist.php

Headers:
    
    Accept: text/plain

**Method 2**

https://api.varden.info/smr/sitelist.php?format=text

### Response

```
example.com
example.net
example.org
...
```
