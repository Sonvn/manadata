if (typeof require !== "undefined") {
    var _ = require('underscore');
}

(function () {


    var root = this;

    var indexOf = function (array, item) {
        var index = _.findIndex(array, function (itemFormDatas) {
            return _.isEqual(itemFormDatas, item);
        });
        return index;
    };


    var _push = function (array, datas) {
        if (Array.isArray(datas)) {
            array = array.concat(datas);
        } else {
            array.push(datas);
        }
        return array;
    };

    var createGroup = function (data, attrs) {
        var group = {};
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            group[attr] = data[attr];
        }
        return group;
    };

    var isInGroup = function (data, group, attrs) {
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (data[attr] != group[attr]) {
                return false;
            }
        }
        return true;
    };

    var groupBy = function (datas, attrs, func) {
        var groups = [];

        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];

            var added = false;
            for (var j = 0; j < groups.length; j++) {
                var group = groups[j];
                if (isInGroup(data, group, attrs)) {
                    if (func) {
                        func(data, group);
                    }
                    added = true;
                    break;
                }
            }

            if (!added) {
                var group = createGroup(data, attrs);
                if (func) {
                    func(data, group);
                }
                groups.push(group);
            }
        }
        return groups;
    };

    var ManaData = function (datas) {
        //this.rawData = [];
        this.datas = [];
        //this.rawData = _push(this.datas, datas);
        this.datas = _push(this.datas, datas);
    };

    ManaData.prototype.isEmpty = function () {
        return this.datas == null || this.datas.length == 0;
    };

    ManaData.prototype.insert = function (datas) {
        this.datas = _push(this.datas, datas);
    };

    ManaData.prototype.update = function (item, options) {
        var index = this.exist(item);
        if (index != -1) {
            _.extendOwn(this.datas[index], options);
        }
        return this.datas[index];
    };

    ManaData.prototype.deleteOne = function (item) {
        var index = this.exist(item);
        if (index == -1) {
            return false;
        }
        this.datas.splice(index, 1);
        return true;
    };

    ManaData.prototype.deleteBy = function (func) {
        for (var i = 0; i < this.datas.length; i++) {
            var obj = this.datas[i];
            if (func(obj)) {
                this.datas.splice(i, 1);
                i--;
            }
        }
    };

    ManaData.prototype.findByFunc = function (func) {

        var result = [];
        for (var i = 0; i < this.datas.length; i++) {
            var item = this.datas[i];
            if (func(item)) {
                result.push(item);
            }
        }
        return result;
    };


    ManaData.prototype.findByProperty = function (findOptions) {
        if (typeof findOptions == "undefined") {
            throw 'findOptions is undefined';
        } else {
            var result = [];
            this.datas.forEach(function (item) {
                var correct = true;
                for (var key in findOptions) {
                    if (item[key] != findOptions[key]) {
                        correct = false;
                        break;
                    }
                }
                correct ? result.push(item) : '';
            });
            return result;
        }
    };

    ManaData.prototype.filter = function (filterFunc) {
        var result = [];
        this.datas.forEach(function (item) {
            if (filterFunc(item)) {
                result.push(item);
            }
        });
        return result;
    };

    ManaData.prototype.unique = function () {
        var result = [];
        this.datas.forEach(function (item) {
            if (indexOf(result, item) == -1) {
                result.push(item);
            }
        });
        return result;
    };

    ManaData.prototype.removeDuplicate = function () {
        this.datas = this.unique();
    };


    ManaData.prototype.exist = function (item) {
        return indexOf(this.datas, item);
    };

    ManaData.prototype.groupByKey = function (listKeys) {
        return groupBy(this.datas, listKeys, function (data, group) {
            if (typeof group.children == 'undefined') {
                group.children = [];
            }
            group.children.push(data);
        });
    };

    ManaData.prototype.isEqual = function (other) {
        return _.difference(this.datas, other).length == 0 ? true : false;
    };

    ManaData.prototype.countByKey = function (listKeys) {
        return groupBy(this.datas, listKeys, function (data, group) {
            if (typeof group.count == 'undefined') {
                group.count = 1;
            } else {
                group.count++;
            }
        });
    };

    ManaData.prototype.sumByKey = function (listKeys, sumKey) {
        var attr = 'sum_' + sumKey;
        return groupBy(this.datas, listKeys, function (data, group) {
            if (typeof group[attr] == 'undefined') {
                group[attr] = data[sumKey];
            } else {
                group[attr] += data[sumKey];
            }
        });
    };

    ManaData.prototype.valuesOfOneKey = function (aKey) {
        var preResult = groupBy(this.datas, aKey);

        var result = [];

        preResult.forEach(function (item) {
            result.push(item[aKey]);
        });

        return result;
    };

    ManaData.prototype.listDataOfKeys = function (listKeys) {
        return groupBy(this.datas, listKeys);
    };

    //export
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ManaData;
        }
    } else {
        root.manadata = ManaData;
    }
})();

