require("./config");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(session({ secret: "cats" }))
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn (req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.get("/", (req, res)=> {
    res.send("<a href='/auth/google'>Authenticate with Google</a>");
})

app.get("/protected", isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
})

app.get("/auth/google", passport.authenticate("google", {
    scope: ["email", "profile"],
}));

app.get("/auth/failure", (req, res) => {
    res.send("Something went wrong")
})

app.get("/auth/google/redirect", passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "auth/failure"
}));

app.get("/logout", (req, res) => {
    req.logout((err) => {
        err ? next(err) : res.send("Bye!")
    });
})

app.listen(3000, () => {
    console.log("ok")
})