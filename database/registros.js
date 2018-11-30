const sql = require("sqlite");
sql.open("./database/regdatabase.sql");

class RegisterValue {

    static checkDatabase() {
        sql.run("CREATE TABLE IF NOT EXISTS registervalDatabase (username TEXT, userID TEXT, registers INTEGER)").catch(function(error) {
            console.error(error);
        });
    };

    static checkUser(userID) {
        this.checkDatabase();
        return new Promise(function(resolve, reject) {
            sql.get(`SELECT * FROM registervalDatabase WHERE userID = "${userID}"`).then(function(row) {
                if (row) resolve(true);
                else resolve(false);
            }).catch(error => reject(error));
        });
    };

    static increaseregisters(userID, username, value = 1) {
        this.checkDatabase();
        this.checkUser(userID).then(function(result) {
            if (!result) {
                sql.run("INSERT INTO registervalDatabase (username, userID, registers) VALUES (?, ?, ?)", 
                [username, userID, 1]).catch(error => console.error(error));
            } else {
                sql.get(`SELECT * FROM registervalDatabase WHERE userID = "${userID}"`).then(function(row) {
                    const newregisters = row.registers += value;
                    sql.run(`UPDATE registervalDatabase SET registers = ${newregisters} WHERE userID = "${userID}"`).catch(function(error) {
                        console.error(error);
                    });
                });
            };
        });
    }; 

    static decreaseregisters(userID, value = 1) {
        this.checkDatabase();
        this.checkUser(userID).then(function(result) {
            if (result) {
                sql.get(`SELECT * FROM registervalDatabase WHERE userID = "${userID}"`).then(function(row) {
                    const newregisters = row.registers -= value;
                    sql.run(`UPDATE registervalDatabase SET registers = ${newregisters} WHERE userID = "${userID}"`).catch(function(error) {
                        console.error(error);
                    });
                });
            } else {
                sql.run("INSERT INTO registervalDatabase (username, userID, registers) VALUES (?, ?, ?)", 
                [username, userID, -1]).catch(error => console.error(error));
            };
        });
    };

    static returnUserInformation(userID) {
        this.checkDatabase();
        sql.get(`SELECT * FROM registervalDatabase WHERE userID = "${userID}"`).then(function(row) {
            return row ? `Usuário: ${row.username} | ID = ${row.userID} | Registros: ${row.registers}` : "Esse usuário não está registrado no banco de dados!";
        });
    };

};

module.exports = RegisterValue;
