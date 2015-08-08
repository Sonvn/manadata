var _ = require('underscore');
var ManaData = require('./manadata.js');

/*test*/
console.log('test manadata');
//simple data
var datas = [4, 6, 7, 12, 13, 3, 71];
var test = new ManaData(datas);

function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    var m = Math.sqrt(n);
    for (var i = 2; i <= m; i++) if (n % i == 0) return false;
    return true;
}

console.log('test find by function');
console.log(test.findByFunc(isPrime));

//big data
var otherDatas = [
    {n: 4, c: 'e', d: 'g'},
    {n: 4, c: 'e', d: 'd'},
    {n: 6, c: 'e', d: '34'},
    {n: 7, c: 'e', d: 'b'},
    {n: 12, c: 'd', d: 'f'},
    {n: 13, c: 'a', d: 'fg'},
    {n: 4, c: 'b', d: 'b'},
    {n: 4, c: 'e', d: 'b'},
    {n: 34, c: 'f', d: '5'}
];
var otherDatas2 = [
    {n: 4, c: 'f', d: 'g'},
    {n: 4, c: 'e', d: 'd'},
    {n: 6, c: 'e', d: '34'},
    {n: 7, c: 'e', d: 'b'},
    {n: 12, c: 'd', d: 'f'},
    {n: 13, c: 'a', d: 'fg'},
    {n: 4, c: 'b', d: 'b'},
    {n: 4, c: 'e', d: 'b'},
    {n: 34, c: 'f', d: '5'}
];

var test2 = new ManaData(otherDatas);

console.log('test find by property');
console.log(test2.findByProperty({n: 4, c: 'e'}));

console.log('test exist');
console.log(test2.exist({n: 6, c: 'e', d: '34'}));

//console.log('test group by key');
//console.log(JSON.stringify(test2.groupByKey(['n', 'c'])));

console.log('test equal data');
console.log(test2.isEqual(otherDatas2));

console.log('test count by key');
console.log(JSON.stringify(test2.countByKey(['n', 'c'])));

console.log('test get value of key');
console.log(JSON.stringify(test2.valuesOfOneKey('n')));

console.log('test update');
console.log(JSON.stringify(test2.update({n: 6, c: 'e', d: '34'}, function (item) {
    item.d = 345345;
})));





console.log('\n\ntest underscorejs');

//test underscorejs
console.log(_.pick(otherDatas2, 'n', 'c'));

var stooge = {name: 'moe', age: 32, m: 90};
console.log(_.isMatch(stooge, {age: 32, m: 12}));
