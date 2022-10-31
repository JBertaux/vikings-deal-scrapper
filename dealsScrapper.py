import requests
import json


def main():
    url = 'https://vikingdeals.be/api/20210707/catalog/listings/'
    response = requests.get(url)
    if response.ok:
        rawJson = response.content.decode()
        jsonDic = json.loads(rawJson)
        output = []
        for deal in jsonDic:
            dealLinks = []
            for rule in deal['cookie_rules']:
                if rule['url'] != 'https://www':
                    dealLinks.append(rule['url'])
            output.append({'title': deal['title'], 'enabled': deal['is_published'], 'urls': dealLinks})
        
        with open("data/data.json", "w") as outfile:
            outfile.write(json.dumps(output, indent=4))
    else:
        print('Error')
        print(response.text)


if __name__=="__main__":
    main()

