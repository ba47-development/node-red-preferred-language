# Preferred Language

This node determines the preferred language from an 'Accept-Language' type string, as it is available in HTTP headers.

It is intended to be used for multilingual flows that need to determine the preferred language of the caller, e.g. a web site user.

## Nodes

-   preferred language

## Example:

```
[{"id":"d596356f45541a0d","type":"inject","z":"0c56c2f737866dc4","name":"simulation","props":[{"p":"req.headers.accept-language","v":"de-CHq=0.7,de;q=0.8,en;q=0.5,de-DE;q=0.9,fr;q=0.3","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":160,"y":1200,"wires":[["68810c8243217d88"]],"info":"`req.headers.accept-language` usually comes from an http request."},{"id":"68810c8243217d88","type":"ba47-preferred-language","z":"0c56c2f737866dc4","name":"","preferredLanguages":"","preferredLanguagesType":"str","availableLanguages":"[\"de-DE\",\"de-CH\",\"en-UK\",\"fr-FR\"]","availableLanguagesType":"json","defaultLanguage":"DEFAULT_LANGUAGE","defaultLanguageType":"env","x":370,"y":1260,"wires":[["a28f76799215a813"]]},{"id":"a28f76799215a813","type":"debug","z":"0c56c2f737866dc4","name":"language","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"language","targetType":"msg","statusVal":"","statusType":"auto","x":580,"y":1260,"wires":[]},{"id":"c643712d5fe62f2e","type":"http in","z":"0c56c2f737866dc4","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":160,"y":1260,"wires":[["68810c8243217d88"]]}]
```

## References

-   [Accept-Language documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) - Mozilla docs
-   [Wikipedia - List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) - language codes
