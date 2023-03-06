# Preferred Language

This node determines the preferred language from an 'Accept-Language' type string, as it is given by HTTP req.headers.  
E.g. something like `de-CH;q=0.7,de;q=0.8,en;q=0.5,de-DE;q=0.9,fr;q=0.3`.

It is intended to be used for multilingual flows that need to determine the preferred language of the caller, e.g. a web site user. The node expects a list of languages supported by the flow to choose from.

## Nodes

-   preferred language  
    ![preferred language](/images/prefLang.png)

## Example:

```
[{"id":"5d7f6eaeed32b11c","type":"http in","z":"b38f670dac5c2381","name":"","url":"/api/myapi","method":"get","upload":false,"swaggerDoc":"","x":240,"y":180,"wires":[["8e71f3708e810eae"]]},{"id":"18ea5aa0de994861","type":"http response","z":"b38f670dac5c2381","name":"","statusCode":"","headers":{},"x":710,"y":180,"wires":[]},{"id":"7be06ee01a6d1a5f","type":"debug","z":"b38f670dac5c2381","name":"language","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"language","targetType":"msg","statusVal":"","statusType":"auto","x":720,"y":240,"wires":[]},{"id":"d596356f45541a0d","type":"inject","z":"b38f670dac5c2381","name":"simulation","props":[{"p":"req.headers.accept-language","v":"de-CH;q=0.7,de;q=0.8,en;q=0.5,de-DE;q=0.9,fr;q=0.3","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":240,"y":140,"wires":[["8e71f3708e810eae"]],"info":"`req.headers.accept-language` usually comes from an http request."},{"id":"8e71f3708e810eae","type":"preferred-language","z":"b38f670dac5c2381","name":"","preferredLanguages":"","preferredLanguagesType":"str","availableLanguages":"[\"en-US\",\"en\",\"de-DE\",\"de\",\"fr\"]","availableLanguagesType":"json","defaultLanguage":"en","defaultLanguageType":"str","x":490,"y":180,"wires":[["18ea5aa0de994861","7be06ee01a6d1a5f"]]}]
```

## References

-   [Accept-Language documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) - Mozilla docs
-   [Wikipedia - List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) - language codes

# License

[MIT License](LICENSE).
