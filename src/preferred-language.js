'use strict';

function evaluate(RED, node, msg, field) {
    let ret;
    RED.util.evaluateNodeProperty(node[field], node[field + 'Type'], node, msg, (err, value) => {
        if (err) {
            throw new Error(`Unable to evaluate '${field}'`);
        } else ret = value;
    });

    return ret;
}

module.exports = function (RED) {
    function preferredLanguageNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.preferredLanguages = config.preferredLanguages || '';
        node.preferredLanguagesType = config.preferredLanguagesType || 'str';
        node.availableLanguages = config.availableLanguages || '{}';
        node.availableLanguagesType = config.availableLanguagesType || 'json';
        node.defaultLanguage = config.defaultLanguage;
        node.defaultLanguageType = config.defaultLanguageType || 'str';

        node.on('input', function (msg, send, done) {
            msg.language = undefined; // clear

            let prefLang, availLang, defaultLang;
            try {
                defaultLang = evaluate(RED, node, msg, 'defaultLanguage');

                if (!defaultLang || typeof defaultLang !== 'string') {
                    throw new Error('Default Language not defined!');
                }

                prefLang = evaluate(RED, node, msg, 'preferredLanguages');
                if (!prefLang || typeof prefLang !== 'string')
                    if (msg.req && msg.req.headers && msg.req.headers['accept-language']) {
                        // use HTML header Accept-Language string instead
                        prefLang = msg.req.headers['accept-language'];
                    }

                availLang = evaluate(RED, node, msg, 'availableLanguages');
                if (availLang) {
                    if (typeof availLang === 'string') availLang = availLang.split(',');

                    if (!Array.isArray(availLang)) {
                        if (Object.keys(availLang).length === 0) availLang = [defaultLang];
                    }
                } else availLang = [defaultLang];
            } catch (err) {
                node.status({ fill: 'red', shape: 'dot', text: err });
                done(err);
                return msg;
            }

            if (prefLang) {
                prefLang = prefLang.split(',');

                // enhance to full prefLang array with quantity
                prefLang.forEach(function (item, idx, arr) {
                    const langDef = item.split(';');
                    if (langDef.length === 1) langDef.push('q=1.0');
                    arr[idx] = langDef;
                });
                // sort by quantity
                prefLang.sort(function (a, b) {
                    if (a[1] < b[1]) return 1;
                    else if (a[1] > b[1]) return -1;
                    else return 0;
                });

                // search language plus region
                for (const lang in prefLang) {
                    selLang = availLang.find((x) => x.toLowerCase() === prefLang[lang][0].toLowerCase());
                    if (selLang) {
                        msg.language = selLang;
                        break;
                    }
                }

                if (!msg.language) {
                    // if here, no full definition had been found, so search first two language chars only
                    for (const lang in prefLang) {
                        selLang = availLang.find(
                            (x) => x.substr(0, 2).toLowerCase() === prefLang[lang][0].substr(0, 2).toLowerCase()
                        );
                        if (selLang) {
                            msg.language = selLang;
                            break;
                        }
                    }
                }
            }

            if (!msg.language) {
                // if here, no language found at all, so use default language
                msg.language = defaultLang;
            }

            node.status({ fill: 'yellow', shape: 'ring', text: 'language: ' + msg.language });

            send(msg);
            done();
        });
    }

    RED.nodes.registerType('ba47-preferred-language', preferredLanguageNode);
};
