const express = require("express");
const Fixture = require("../models/fixture");

const router = new express.Router();

// Your code goes here
// Write a route to get fetch the matches i.e., GET /fixtures
// You should also implement below filters
//   * filter to list matches that will be held between given start and end date
//   * filter for venue
router.get("/fixtures", async (req, res) => {
  try {
    const { start_date, end_date, venue } = req.query;
    const matches = await Fixture.find();
    if (start_date == undefined && end_date == undefined && venue == undefined) {
      return res.status(200).send({
        count: matches.length,
        records: matches
      });
    }
    let arr = [];
    matches.forEach(e => {
      if (start_date && end_date && venue) {
        const start = new Date(start_date);
        const end = new Date(end_date);
        if (e.date >= start && e.date <= end && e.venue == venue) {
          arr.push(e);
        }
      } else if (start_date && end_date) {
        const start = new Date(start_date);
        const end = new Date(end_date);
        if (e.date >= start && e.date <= end) {
          arr.push(e);
        }
      } else if (start_date) {
        const start = new Date(start_date);
        if (e.date >= start) {
          arr.push(e);
        }
      } else if (end_date) {
        const end = new Date(end_date);
        if (e.date <= end) {
          arr.push(e);
        }
      } else if (venue && venue == e.venue) {
        arr.push(e);
      }
    });
    const result = {
      count: arr.length,
      records: arr
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
})

// Write a route to create a match fixture i.e., POST /fixtures
// POST route will take all of these below params
//   * team1
//   * team2
//   * venue
//   * date

router.post("/fixtures", async (req, res) => {
  try {
    const match = await Fixture(req.body).save();
    res.status(200).send(match);
  } catch (err) {
    res.status(400).send(err);
  }
})


module.exports = router;