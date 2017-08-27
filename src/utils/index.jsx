// 获取url的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

// build参数
export const buildQueryString = (data) => {
    let ret = [];
    for (let d in data) {
        if (data[d] !== undefined) {
            if (Array.isArray(data[d])) {
                for (var i in data[d]) {
                    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d][i]));
                }
            } else {
                ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            }
        }
    }
    return ret.join('&');
};
