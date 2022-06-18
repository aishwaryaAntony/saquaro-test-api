const express = require('express');
const router = express.Router();
const cp = require('child_process');
const path = require("path");
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config/config.js')[env];

router.get('/internal/healthcheck', async (req, res, next) => {
    res.status(200).json({
        status: 'success',
    });
});

router.post('/internal/run-script', async (req, res, next) => {
    try {
        // const { filename } = req.params;
        const { filename } = req.body;

        if(filename !== undefined && filename !== null && filename !== "" ){
            // let path = __dirname;
            let filepath = path.join(__dirname, `../../../../dbscripts/${filename}`);
            console.log(`Current path => ${filepath}`);
            cp.exec(`sh ${filepath}`, function(err, stdout, stderr) {
                // handle err, stdout, stderr
                let message = null;
                if (stderr) {
                    console.error(`error==> ${stderr}`);
                    message = stderr;
                }
                console.log(`success===> ${stdout}`);
                message = stdout;
                res.status(200).json({
                    status: 'success',
                    message: message
                });
            });
        }else{
            console.log("Error while running script file ==> " + error);
            res.status(500).json({
                status: "failed",
                payload: {},
                message: "Error while running script file",
            });
        }
        
    } catch (error) {
        console.log("Error while running script file ==> " + error);
        res.status(500).json({
            status: "failed",
            payload: {},
            message: "Error while running script file",
        });
    }
});

router.get('/internal/db-check', async (req, res, next) => {
    let sequelize = new Sequelize(config.database, config.username, config.password, config);

    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err)
        res.status(500).json({
            status: 'failed'
        });
    }
});

module.exports = router