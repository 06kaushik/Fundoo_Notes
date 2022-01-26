import sqlite from "react-native-sqlite-storage";
import {View,Text,Stylesheet} from "react-native";


const db = sqlite.openDatabase({
    name: 'MainDB',
    location: 'default',

},
     () => { },
     error => { console.log(error); }

);
const TABLE_NAME = "SqlUser"
const SELECT_DATA = `SELECT * FROM ${TABLE_NAME}`
const INSERT_DATA = `INSERT INTO ${TABLE_NAME} (id,title,description) VALUES (?,?,?)`


export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + TABLE_NAME 
            +" (ID TEXT PRIMARY KEY, TITLE TEXT, NOTE TEXT)",
            [],
            (tx,results) => {
                console.log("table created successfully", results);
            },
            error => {
                console.log("error on creating table", error.message)

            }
        )
    })
}


const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
            });
    });
});

// Insert Data
export const insertValues = async (id,noteData) => {
    console.log("note data...", noteData);
    const params = [id, noteData.title, noteData.description]
    try {
        const result = await ExecuteQuery(INSERT_DATA, params)
        console.log('value inserted successfully', result);
    }
    catch (error) {
        console.log(error.message);
    }
}

// getData
export const getSqliteData = async () => {
    try {
        const result = await ExecuteQuery(SELECT_DATA)
        var rows = result.rows;
        console.log("result is", result.rows.item(0));
        let arr = [];
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            console.log(item);
            item.noteId = item.ID
            item.note = item.NOTE
            item.title = item.TITLE
            arr.push(item)
        }
        return arr;
    }
    catch (error) {
        console.log(error.message);
    }
}