import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './strings.en.json';
import kr from './strings.kr.json';
import jp from './strings.jp.json';
import vn from './strings.vn.json';
import cn from './strings.cn.json';

// Setup languages
i18n.fallbacks = true;
i18n.translations = {
    en,
    kr,
    jp,
    vn,
    cn
};
i18n.locale = Localization.locale;

export function translate(key, params, options) {
    options = Object.assign(options || {}, { defaultValue: key });
    let text = i18n.t(key, options);

    // Format
    if (params) {
        if (Array.isArray(params)) {
            for (let i = 0; i < params.length; i++) {
                text = text.replace('{' + i + '}', params[i]);
            }
        } else {
            text = text.replace('{0}', params);
        }
    }

    return text;
}
