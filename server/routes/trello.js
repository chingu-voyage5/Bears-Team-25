const axios = require("axios");
var passport = require("passport");
var express = require("express");
var router = express.Router();
var isLoggedIn = require("../commonFunctions").isLoggedIn;
var deleteApplets = require("../commonFunctions").deleteApplets;
var baseURL = require('../config/baseUrl')

API_KEY = JSON.parse(process.env.trello).consumerKey;

router.get(
  "/auth",
  passport.authorize("trello", {
    scope: {
      read: "true",
      write: "true"
    },
    expiration: "never",
    name: "AutoApplet"
  })
);

router.get(
  "/auth/callback",
  passport.authenticate("trello", {
    failureRedirect: baseURL + "error/Something went wrong."
  }),
  (req, res) =>
    res.redirect(baseURL + "success/Trello successfully connected.") // Successful authentication, redirect home.
);

router.get("/disconnect", isLoggedIn, (req, res, next) => {
  var user = req.user;
  user.trello = undefined;
  deleteApplets("Trello", user, res, next);
});

router.get("/fetchBoards", isLoggedIn, (req, res, next) => {
  var token = req.user.trello.token;
  axios
    .get(
      "https://api.trello.com/1/member/me/boards/?actions=all" +
        `,url&key=${API_KEY}&token=${token}`
    )
    .then(response => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        boards: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

const fetchListsOfBoard = (token, boardID) =>
  axios.get(
    `https://api.trello.com/1/boards/${boardID}/lists?actions=all` +
      `,url&key=${API_KEY}&token=${token}`
  );

const createList = (token, listName, boardID) =>
  axios.post(
    "https://api.trello.com/1/lists" + `?url&key=${API_KEY}&token=${token}`,
    {
      name: listName,
      idBoard: boardID
    }
  );

const postCard = (token, cardTitle, listID, position, description) =>
  axios.post(
    "https://api.trello.com/1/cards" + `?url&key=${API_KEY}&token=${token}`,
    {
      name: cardTitle,
      idList: listID,
      pos: position,
      desc: description
    }
  );

async function postCardLogic(trelloConfig) {
  try {
    const lists = (await fetchListsOfBoard(
      trelloConfig.token,
      trelloConfig.boardID
    )).data;
    listID = null;
    // if board contains provided listName, add a new card there
    if (
      lists.some(element => {
        id = element.id;
        return element.name === trelloConfig.listName;
      })
    ) {
      listID = id;
    }
    // if board doesn't containt provided listName, create new list with provided name
    // to add card there
    else {
      listID = (await createList(
        trelloConfig.token,
        trelloConfig.listName,
        trelloConfig.boardID
      )).data.id;
    }
    let newCard = (await postCard(
      trelloConfig.token,
      trelloConfig.cardTitle,
      listID,
      trelloConfig.position,
      trelloConfig.description
    )).data;
    return newCard;
  } catch (err) {
    return err.response.data;
  }
}

exports.trelloRouter = router;
exports.postCard = postCardLogic;
