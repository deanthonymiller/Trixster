const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/',  (req, res) => {
    console.log('get Router');
    if(req.isAuthenticated()){
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
    }

    
    
});

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