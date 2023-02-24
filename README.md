# Preferred Language

This node determines the preferred language from an 'Accept-Language' type string, as it is given by HTTP headers.

It is intended to be used for multilingual flows that need to determine the preferred language of the caller, e.g. a web site user. The node expects a list of languages supported by the flow to choose from.

## Nodes

-   preferred language  
    ![preferred language](/images/prefLang.png)

## Example:

```
[{"id":"57d41efe57b1f0bf","type":"ba47-preferred-language","z":"4deb3ee328afd338","name":"","preferredLanguages":"","preferredLanguagesType":"str","availableLanguages":"[\"en-US\",\"en\",\"fr\",\"de-DE\",\"de\"]","availableLanguagesType":"json","defaultLanguage":"DEFAULT_LANGUAGE","defaultLanguageType":"env","x":390,"y":320,"wires":[["18ea5aa0de994861","7be06ee01a6d1a5f"]]},{"id":"5d7f6eaeed32b11c","type":"http in","z":"4deb3ee328afd338","name":"","url":"/api/myapi","method":"get","upload":false,"swaggerDoc":"","x":140,"y":320,"wires":[["57d41efe57b1f0bf"]]},{"id":"18ea5aa0de994861","type":"http response","z":"4deb3ee328afd338","name":"","statusCode":"","headers":{},"x":610,"y":320,"wires":[]},{"id":"7be06ee01a6d1a5f","type":"debug","z":"4deb3ee328afd338","name":"language","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"language","targetType":"msg","statusVal":"","statusType":"auto","x":620,"y":380,"wires":[]},{"id":"d596356f45541a0d","type":"inject","z":"4deb3ee328afd338","name":"simulation","props":[{"p":"req.headers.accept-language","v":"de-CH;q=0.7,de;q=0.8,en;q=0.5,de-DE;q=0.9,fr;q=0.3","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":140,"y":280,"wires":[["57d41efe57b1f0bf"]],"info":"`req.headers.accept-language` usually comes from an http request."}]
```

## References

-   [Accept-Language documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) - Mozilla docs
-   [Wikipedia - List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) - language codes

# License

[MIT License](LICENSE).
