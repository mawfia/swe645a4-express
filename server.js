const express = require('express');
const request = require('request');
const got = require('got');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const api = process.env.PROD ? "http://10.100.113.23:8080/swe645a4/api" : "http://localhost:8080/swe645a4/api";


app.get('/proxy/surveys', (req, res) => {
  (async () => {
      try {
          const response = await got.get(`${api}/surveys`);
          //console.log(response.body);
          res.json({'surveys' : JSON.parse(response.body)});
          //=> '<!doctype html> ...'
      } catch (error) {
          console.log(error.response.body);
          return res.status(500).json({ type: 'error', message: error.response.body });
          //=> 'Internal server error ...'
      }
  })();

});

app.post('/proxy/create', (req, res) => {

  //console.log(req.body.survey);

  (async () => {
      try {
          const response = await got.post(`${api}/survey`, {json: req.body.survey, responseType: 'json'});
          //console.log(response.body);
          //return res.json({"success":response.body});
          return res.status(200).json(response.body);
          //return;
          //return res.status(200).json({success:"Survey created"});
      } catch (error) {
          console.log(error.response.body);
          return res.status(500).json({ error: error.response.body });
          //=> 'Internal server error ...'
      }
  })();

});

app.get('/proxy/test_proxy', (req, res) => {
  return res.status(200).json({happy:"Good test"});
})

app.get('/proxy/test_api', (req, res) => {
  (async () => {
      try {
          const response = await got.get(`${api}/test`);
          //console.log(response.body);
          //res.status(200).send(response.body);
          res.status(200).json({'api response' : response.body});
          //=> '<!doctype html> ...'
      } catch (error) {
          console.log(error.response.body);
          return res.status(500).json({ type: 'error', message: error.response.body });
          //=> 'Internal server error ...'
      }
  })();
})

app.post('/proxy/survey', (req, res) => {

  (async () => {
      try {
          const response = await got.get(`${api}/survey/${req.body.id}`);
          //console.log(response.body);
          return res.status(200).json({success:JSON.parse(response.body)});
          //=> '<!doctype html> ...'
      } catch (error) {
          console.log(error.response.body);
          return res.status(500).json({ error: error.response.body });
          //=> 'Internal server error ...'
      }
  })();

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
