print("[...] Initializing static generator")

import os
import yaml
from datetime import datetime
from lxml import objectify, etree
import json
import time

start_time = time.time()
all_lists = os.listdir("lists")
current_time = datetime.now()

print("[ ✓ ] Initialized static generator")

print(f"..... Found {all_lists} ({len(all_lists)}) lists")

print("[...] Creating directory structure")
os.mkdir("dist")
os.mkdir("dist/stats")
for item in all_lists:
    os.mkdir("dist/" + item.replace(".yaml", ""))
print("[ ✓ ] Created directory structure")

# ---------------------------------------------------- sites.yaml
# Generates the YAML version of the lists
print("[1/8] Generating YAML")

print("..... Generating master (sites.yaml) list")
previous_dict = None
for item in all_lists:
    with open("lists/" + item, "r") as f:
        r = f.read()
    if previous_dict is None:
        previous_dict = next(yaml.load_all(r, Loader=yaml.FullLoader))
    else:
        current_dict = next(yaml.load_all(r, Loader=yaml.FullLoader))
        previous_dict.extend(current_dict)
        previous_dict = list(dict.fromkeys(previous_dict))
        
with open("dist/sites.yaml", "w", encoding="utf-8") as f:
    f.write(yaml.dump(previous_dict))

for item in all_lists:
    game = item.replace(".yaml", "")
    print(f"..... Generating {game}/sites.yaml list")
    with open("lists/" + item, "r") as f1:
        with open("dist/" + game + "/sites.yaml", "w", encoding="utf-8") as f2:
            f2.write(f1.read())


# ---------------------------------------------------- sites.json
# Generates the JSON version of the lists
print("[2/8] Generating JSON")

print("..... Generating master (sites.json) list")
with open("dist/sites.yaml", "r") as f1:
    with open("dist/sites.json", "w", encoding="utf-8") as f2:
        f2.write(json.dumps(next(yaml.load_all(f1.read(), Loader=yaml.FullLoader))))
        
for item in all_lists:
    game = item.replace(".yaml", "")
    print(f"..... Generating {game}/sites.json list")
    with open("lists/" + item, "r") as f1:
        with open("dist/" + game + "/sites.json", "w", encoding="utf-8") as f2:
            f2.write(json.dumps(next(yaml.load_all(f1.read(), Loader=yaml.FullLoader))))

      
# ---------------------------------------------------- sites.txt
# Generates the TXT version of the lists
print("[3/8] Generating TXT")

def convertToTXT(contents):
    data = next(yaml.load_all(contents, Loader=yaml.FullLoader))
    txt = ""
    for item in data:
        if item["path"] != "/":
            path = item["path"]
        else:
            path = ""
        txt = txt + item["domain"] + path + "\n"
    return txt

print("..... Generating master (sites.txt) list")
with open("dist/sites.yaml", "r") as f1:
    with open("dist/sites.txt", "w", encoding="utf-8") as f2:
        f2.write(convertToTXT(f1.read()))

for item in all_lists:
    game = item.replace(".yaml", "")
    print(f"..... Generating {game}/sites.txt list")
    with open("lists/" + item, "r") as f1:
        with open("dist/" + game + "/sites.txt", "w", encoding="utf-8") as f2:
            f2.write(convertToTXT(f1.read()))


# ---------------------------------------------------- hosts.txt
# Generates the Hosts version of the lists
print("[4/8] Generating HOSTS")

def convertToHOSTS(contents):
    data = next(yaml.load_all(contents, Loader=yaml.FullLoader))
    with open("templates/hosts.txt", "r") as f:
        hosts = f.read().format(str(current_time))
    hosts = hosts + "\n \n"
    wwwhosts = ""
    for item in data:
        if item["path"] == "/":
            hosts = hosts  + "0.0.0.0 " + item["domain"] + "\n" 
            wwwhosts = wwwhosts + "0.0.0.0 " + "www." + item["domain"] + "\n" 
    hosts = hosts + wwwhosts + "\n" + "# === End of StopModReposts site list ==="
    return hosts

print("..... Generating master (hosts.txt) list")
with open("dist/sites.yaml", "r") as f1:
    with open("dist/hosts.txt", "w", encoding="utf-8") as f2:
        f2.write(convertToHOSTS(f1.read()))

for item in all_lists:
    game = item.replace(".yaml", "")
    print(f"..... Generating {game}/hosts.txt list")
    with open("lists/" + item, "r") as f1:
        with open("dist/" + game + "/hosts.txt", "w", encoding="utf-8") as f2:
            f2.write(convertToHOSTS(f1.read()))


# ---------------------------------------------------- uBlacklist
# Generates the uBlacklist version of the lists
print("[5/8] Generating UBLACKLIST")

def convertToUBLACKLIST(contents):
    data = next(yaml.load_all(contents, Loader=yaml.FullLoader))
    blacklist = ""
    for item in data:
        if item["path"] != "/":
            path = item["path"] + "/*"
        else:
            path = "/*"
        blacklist = blacklist + "*://*." + item["domain"] + path + "\n"
    return blacklist
        
print("..... Generating master (ublacklist.txt) list")
with open("dist/sites.yaml", "r") as f1:
    with open("dist/ublacklist.txt", "w", encoding="utf-8") as f2:
        f2.write(convertToUBLACKLIST(f1.read()))

for item in all_lists:
    game = item.replace(".yaml", "")
    print(f"..... Generating {game}/ublacklist.txt list")
    with open("lists/" + item, "r") as f1:
        with open("dist/" + game + "/ublacklist.txt", "w", encoding="utf-8") as f2:
            f2.write(convertToUBLACKLIST(f1.read()))



# ---------------------------------------------------- sites.xml
# Generates the XML version of the lists
print("[6/8] Generating XML")

def convertToXML(contents):
    data = next(yaml.load_all(contents, Loader=yaml.FullLoader))
    sites = objectify.Element("sites", nsmap='', _pytype='')

    for item in data:
        site = objectify.Element("site", nsmap='', _pytype='')
        site.domain = item["domain"]
        site.notes = item["notes"]
        site.path = item["path"]
        site.reason = item["reason"]

        sites.append(site)
        
    objectify.deannotate(sites)
    etree.cleanup_namespaces(sites)
    return str(etree.tostring(sites, pretty_print=True, xml_declaration=True, with_tail=False), "utf-8")

print("..... Generating master (sites.xml) list")
with open("dist/sites.yaml", "r") as f1:
    with open("dist/sites.xml", "w", encoding="utf-8") as f2:
        f2.write(convertToXML(f1.read()))

for item in all_lists:
    game = item.replace(".yaml", "")
    print(f"..... Generating {game}.xml list")
    with open("lists/" + item, "r") as f1:
        with open("dist/" + game + "/sites.xml", "w", encoding="utf-8") as f2:
            f2.write(convertToXML(f1.read()))


# ---------------------------------------------------- shields
# Generates Shields which display stats
print("[7/8] Generating SHIELDS")

print("..... Generating total shield")
with open("dist/sites.yaml", "r") as f1:
    with open("dist/stats/total.json", "w", encoding="utf-8") as f2:
        data = next(yaml.load_all(f1.read(), Loader=yaml.FullLoader))
        sites = len(data)
        total = {"schemaVersion": 1,
                 "label": "sites",
                 "message": str(sites),
                 "color": "blue"}
        f2.write(json.dumps(total))
        
print("..... Generating refreshed shield")
with open("dist/stats/refreshed.json", "w", encoding="utf-8") as f:
    refreshed = {"schemaVersion": 1,
                 "label": "refreshed",
                 "message": str(current_time) + " UTC",
                 "color": "blue"}
    f.write(json.dumps(refreshed))
        
# ---------------------------------------------------- index
# Generates the main HTML frontend of the API
print("[8/8] Generating INDEX")

print("..... Generating index.html")
with open("templates/index.html", "r") as f1:
    with open("dist/index.html", "w", encoding="utf-8") as f2:
        f2.write(f1.read().replace("{0}", str(current_time)))
        
print("..... Generating _redirects")
with open("dist/_redirects", "w", encoding="utf-8") as f:
    # More info about the _redirects file: https://developers.cloudflare.com/pages/platform/redirects
    f.write("""/docs https://docs.stopmodreposts.org""")
    
print("..... Generating _headers")
with open("dist/_headers", "w", encoding="utf-8") as f:
    # More info about the _headers file: https://developers.cloudflare.com/pages/platform/headers
    f.write("""/*\n  Access-Control-Allow-Origin: *""")
    
end_time = time.time()
elapsed_time = str(end_time - start_time)

print("[ ✓ ] Generated all formats")
print(f"..... took {elapsed_time} seconds")
