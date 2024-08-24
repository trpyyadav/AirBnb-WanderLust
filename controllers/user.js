const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try{
        let {username, email, password} = req.body;
    const newUser = new User({
        username: username,
        email: email,
    });
    const registreredUser = await User.register(newUser, password);
    console.log(registreredUser);
    req.login(registreredUser, (err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "You are now Logged Out!");
        res.redirect("/listings");
    });
};