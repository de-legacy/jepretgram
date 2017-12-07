const statusModel = require('../models/statusModel');
const ObjectId = require('mongodb').ObjectID;

const findAll = (req, res) => {
  statusModel.find()
  .then(statuses => {
    res.status(200).send(statuses)
    
  }).catch(err => res.status(500).send({ message: err.message }));
}

const findById = (req, res) => {
  statusModel.findOne({ _id: ObjectId(req.params.statusId) })
  .then(status => {
    if (status) {
      res.status(200).send(status);
    } else {
      res.status(500).send({message: 'Not found'});
    }
    
  }).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));
}

const create = (req, res) => {
  if (req.body.caption !== null && typeof req.body.caption !== 'undefined') {
    let status = new statusModel({
      caption: req.body.caption || null,
      owner: req.body.owner || null,
      image: req.file.cloudStoragePublicUrl !== null && typeof req.file.cloudStoragePublicUrl !== 'undefined' ? req.file.cloudStoragePublicUrl : '',
      createdAt: new Date(),
      likelist: req.body.likelist,
      commentlist: req.body.commentlist
    })
    
    status.save()
      .then(newStatus => {
        res.status(200).send({ status: newStatus, message: 'Status Created'});
        
      }).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));
    
  } else {
    res.status(500).send({message: 'Fill the data'});
  }
}

const update = (req, res) => {
  statusModel.findOne({ _id: ObjectId(req.params.statusId) }).then(status => {
    if (status) {
      // Update
      status.caption = req.body.caption || status.caption;
      status.likelist = req.body.likelist || status.likelist;

      status.save()
        .then(newstatus => {
          res.status(200).send({ status: newstatus, message: 'status Updated' });

        }).catch(err => res.status(500).send({ message: 'Something wrong new Updated', error: err.message }));

    } else {
      res.status(500).send({ message: "status not found" });
    }

  }).catch(err => res.status(500).send({ message: err.message }));
}

const likeStatus = (req, res) => {
  statusModel.findOne({ _id: ObjectId(req.params.statusId) }).then(status => {
    if (status) {
     
      if (status.owner !== req.params.accountId) {
        status.likelist.push(req.params.accountId)
        
        status.save()
          .then(newstatus => {
            res.status(200).send({ status: newstatus, message: 'status liked' });

          }).catch(err => res.status(500).send({ message: 'Something wrong new Updated', error: err.message }));
      } else {
        res.status(500).send({message: "Status Owner"});
      }

    } else {
      res.status(500).send({ message: "status not found" });
    }

  }).catch(err => res.status(500).send({ message: err.message }));
}

const destroy = (req, res) => {
 statusModel.findByIdAndRemove(ObjectId(req.params.statusId), (err,statusDeleted) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).send({
        message: 'Status deleted',
        status:statusDeleted
      });
    }

  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
  likeStatus
}