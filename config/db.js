let msyql = require('mysql'); 
let connection = msyql.createConnection({
host: 'localhost',
user:'root',
password: '',
database:'vlo'
});

connection.connect(function (error) {
if(!!error) {
console.log(error)
}else{
    console.log('Koneksi berhasil');

}
})
 module.exports = connection;