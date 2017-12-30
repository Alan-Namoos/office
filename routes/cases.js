const express = require('express');
const router = express.Router();
const Client = require('../models/client');


// render Add Case Form
router.get('/add/case/:clientID', function(req, res){
  let clientID = req.params.clientID;
  Client.findById({_id: clientID}).then(function(client){
      res.render('add-case', {
          pageTitle: 'Add Case',
          pageID: 'addCase',
          client: client
      });
  });
});

// Save new Case to existing Client
router.post('/save/case/:clientID', function(req, res){
  let clientID = req.params.clientID;
  let newCase = {
    case_type: req.body.case_type,
    case_number: req.body.case_number,
    case_priority: req.body.case_priority,   
    case_status: req.body.case_status
  };

  Client.findByIdAndUpdate({'_id': clientID}, {$push: {cases: newCase}}).then(function(client){
    res.redirect('/client/' + clientID);
  });
});

// render Edit Case Form
router.get('/edit/case/:caseID/:clientID/:caseIndex', function(req, res){
  let caseIndex = req.params.caseIndex;
  let caseID = req.params.caseID;
  let clientID = req.params.clientID;
  Client.findById({_id: clientID}).then(function(client){
    clientCase = client.cases[caseIndex];
    // res.json(clientCase);
    res.render('edit-case', {
        pageTitle: 'Edit Case',
        pageID: 'editCase',
        client: client,
        clientCase: clientCase,
        caseIndex: caseIndex
    });
  });
});

// UPDATE Case data for existing Client
router.post('/update/case/:caseID/:clientID/:caseIndex', function(req, res){
  var caseID = req.params.caseID;
  var clientID = req.params.clientID;
  var caseIndex = req.params.caseIndex;

  var updatedCase = {
      case_type: req.body.case_type,
      case_number: req.body.case_number,
      case_priority: req.body.case_priority,   
      case_status: req.body.case_status
  };

  //var doc = client.cases.id(_id);

  let data = {
    CaseID: caseID, ClientID: clientID, CaseIndex: caseIndex, UpdatedCase: updatedCase
  }
  //res.send(data);

  // Client.findById(clientID).then(function(client){
  //   res.send(client.cases[caseIndex]);
  // });

  Client.update({"_id": clientID}, {$set: {"client.cases[caseIndex]": updatedCase}}).exec();
    //res.send(client);
    res.redirect('/client/' + clientID);

});

module.exports = router;