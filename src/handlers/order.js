const { Order } = require("../models");

function list(req, res) {
    Order.find({})
        .then(orders => {
            res.json({ ok: true, payload: orders });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function create(req, res) {
    if (!req.body.name) {
        res.json({
            ok: false,
            payload: 'Must provide an object like: {name: "xxxx"}'
        });
    }
    const name = req.body.name;
    const order = new Order({ name: name });
    order
        .save()
        .then(order => {
            res.json({ ok: true, payload: order });
        })
        .catch(err => {
            res.json({ ok: false, payload: err.message || "FAILED" });
        });
}

function remove(req, res) {
    const order = req.params.id;
    Order.deleteOne({
        _id: order
    })
    .then(() => {
        res.json({ok:true, payload:null});
    })
    .catch(err => {
        res.json({ok:false, payload:err.message || "FAILED"})
    })
  }

  function put(req, res){
    const order = req.params.id;
    Order.updateOne({
        _id: order
    })
    .then(() => {
        res.json({ok:true, payload:null});
    })
    .catch(err => {
        res.json({ok:false, payload:err.message || "FAILED"})
    })

  }


  module.exports = {
    list,
    create,
    remove,
    put,
};