import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: '212.1.208.151',
    user: 'u661936104_bilkadev',
    database: 'u661936104_hosting',
    password: '12345678aA',
    namedPlaceholders: true,
});