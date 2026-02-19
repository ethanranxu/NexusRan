export interface UAResult {
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    deviceType: 'desktop' | 'mobile' | 'tablet';
}

export function parseUserAgent(ua: string): UAResult {
    const result: UAResult = {
        browser: 'Unknown',
        browserVersion: '',
        os: 'Unknown',
        osVersion: '',
        deviceType: 'desktop'
    };

    // Device Type
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        result.deviceType = 'tablet';
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        result.deviceType = 'mobile';
    }

    // Browser & Version
    const browserRegexs = [
        { name: 'Edge', regex: /edg\/([\d\.]+)/i },
        { name: 'Chrome', regex: /chrome\/([\d\.]+)/i },
        { name: 'Firefox', regex: /firefox\/([\d\.]+)/i },
        { name: 'Safari', regex: /version\/([\d\.]+).*safari/i },
        { name: 'Opera', regex: /(?:opera|opr)\/([\d\.]+)/i },
        { name: 'IE', regex: /(?:msie |rv:)([\d\.]+)/i }
    ];

    for (const b of browserRegexs) {
        const match = ua.match(b.regex);
        if (match) {
            result.browser = b.name;
            result.browserVersion = match[1].split('.')[0]; // Major version
            break;
        }
    }

    // OS & Version
    const osRegexs = [
        { name: 'Windows', regex: /windows nt ([\d\.]+)/i },
        { name: 'Mac OS', regex: /mac os x ([\d_\.]+)/i },
        { name: 'iOS', regex: /os ([\d_\.]+) like mac os x/i },
        { name: 'Android', regex: /android ([\d\.]+)/i },
        { name: 'Linux', regex: /linux/i }
    ];

    for (const o of osRegexs) {
        const match = ua.match(o.regex);
        if (match) {
            result.os = o.name;
            if (o.name === 'Windows') {
                // Map NT versions to Windows versions
                const ver = match[1];
                if (ver === '10.0') result.osVersion = '10/11';
                else if (ver === '6.3') result.osVersion = '8.1';
                else if (ver === '6.2') result.osVersion = '8';
                else if (ver === '6.1') result.osVersion = '7';
                else result.osVersion = ver;
            } else {
                result.osVersion = match[1]?.replace(/_/g, '.') || '';
            }
            break;
        }
    }

    return result;
}
