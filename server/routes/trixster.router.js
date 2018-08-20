const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/',  (req, res) => {
    console.log('get Questions');
        console.log(req.query);
        let userInput = req.query.search
        let searchText = '%' + userInput + '%';
        let queryText = `SELECT * FROM "questions" WHERE question_text ILIKE  $1`;
        // let queryText = `SELECT * FROM "questions" WHERE question_text LIKE `;
        pool.query(queryText, [searchText])
        .then((results) => {
            res.send(results.rows)
            console.log(results.rows);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        }) 
});

router.get('/response/:id', (req, res) => {
        console.log(req.params.id);
        
    let queryText = `SELECT * FROM "response" WHERE "questions_id" = $1;`
    pool.query(queryText, [req.params.id]).then((results) => {
        res.send(results.rows)
        console.log(results.rows);
        
    }).catch((err) =>{
        console.log(err);
        res.sendStatus(500)
    })
});



router.get('/question/:id', (req, res) => {
        console.log(req.params.id);
        
        const queryText = `SELECT * FROM "questions" WHERE id= $1;`;
        pool.query(queryText, [req.params.id])
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);
                
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500)
            })
})



/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('got to post', req.body);
    if(req.isAuthenticated){
        const newQuestion = req.body
        const queryText = `INSERT INTO "questions" ("question_text", "type_of_sport", "question_title", "person_id") VALUES ($1, $2, $3, $4)`
        pool.query(queryText, [newQuestion.question_text, newQuestion.type_of_sport, newQuestion.question_title, req.user.id ])
            .then(() => {
                res.sendStatus(200);
            })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)
                })
    }else{
        res.sendStatus(403)
    }
});

router.post('/answer', (req, res) => {
    console.log(req.body);
    if(req.isAuthenticated){
        const answer = req.body
        const queryText = `INSERT INTO "response" ("comments", "questions_id", "person_id") VALUES ($1, $2, $3)`
        pool.query(queryText, [answer.state.comments, answer.id, req.user.id])
        .then(() => {
            res.sendStatus(201)
        }).catch((err) => {
            console.log(err);
        })
    }
})

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.user.id);
    
    
    if (req.isAuthenticated){
        const queryText = `DELETE FROM "questions" WHERE questions."id" = $1 AND "person_id" = $2;`;
        pool.query(queryText,[req.params.id , req.user.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log('error deleting', err);
            res.sendStatus(500)
        })
    }
})

router.put('/profilePic/:id', (req, res) => {
    console.log('got to put', req.body);
    if(req.isAuthenticated()){
        const queryText = `UPDATE "person" SET "profile_picture"= $1 WHERE "id" = $2;`;
        pool.query(queryText, [req.body.profile_picture,req.params.id])
        .then(() => {res.sendStatus(200); })
        .catch((err) => {
            console.log('Error updating Profile', err);
            res.sendStatus(500)
        })
    }else{
        res.sendStatus(403);
    }
})

module.exports = router;