const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.db"
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log(err.message)
        throw err
    }
    else{
        console.log('Connected to the SQlite database.')
    }
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => res.send('Eat shit and die :D'))
//adds players to tge database//
app.post('/add', function(req, res){
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var result = req.body.result

    db.run(`INSERT INTO results (result, first_name, last_name) VALUES('${result}','${firstName}','${lastName}')`, function(err){
        if(err){
            console.log(err.message)
        }
        else{
            console.log(`Added User: ${fn} ${ln}!`)
            res.redirect('/users.html')
        }
    })
})

app.get('/get', function(req, res){
    db.all('SELECT * FROM results', (err, rows) => {
        if(err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
})

app.listen(port, () => console.log(`app listening on port ${port}!`))