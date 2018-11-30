const sql = require("sqlite");
sql.open("./database/registrosdb.sql");

class registros {

    static checkDatabase() {
        sql.run("CREATE TABLE IF NOT EXISTS registervalDatabase (username TEXT, userID TEXT, guildID TEXT, registers INTEGER)").catch(function(error) {
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

    static increaseregisters(userID, username, guildID, value = 1) {
        this.checkDatabase();
        this.checkUser(userID).then(function(result) {
            if (!result) {
                sql.run("INSERT INTO registervalDatabase (username, userID, guildID, registers) VALUES (?, ?, ?, ?)", 
                [username, guildID, userID, 1]).catch(error => console.error(error));
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

    static decreaseregisters(userID, guildID, value = 1) {
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
                sql.run("INSERT INTO registervalDatabase (username, userID, guildID, registers) VALUES (?, ?, ?, ?)", 
                [username, userID, guildID, -1]).catch(error => console.error(error));
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

module.exports = registros;