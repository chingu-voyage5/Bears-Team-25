let Applet = require("./models/applet");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You are not logged in!");
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: false, status: "You are not logged in!" });
  }
}

function addToSubscribedRemoveFromNotSubscribed(serviceName, isWebhooks,
    isActions, servicesSubscribed, servicesNotSubscribed) {
      let index = servicesSubscribed.map(service => service.service).indexOf(serviceName);
      if (index === -1)  servicesSubscribed.push({service: serviceName, isWebhooks, isActions});
      index = servicesNotSubscribed.indexOf(serviceName);
      if (index !== -1) servicesNotSubscribed.splice(index, 1) ;
    }

function addToNotSubscribedRemoveFromSubscribed(serviceName, 
  servicesSubscribed, servicesNotSubscribed) {
    let index = servicesSubscribed.map(service => service.service).indexOf(serviceName);
    if (index !== -1)  servicesSubscribed.splice(index, 1);
    index = servicesNotSubscribed.indexOf(serviceName);
    if (index === -1) servicesNotSubscribed.push(serviceName);   
      }

function deleteApplets(service, user, res, next) {
  addToNotSubscribedRemoveFromSubscribed(
    service,
    user.servicesSubscribed,
    user.servicesNotSubscribed
  );
  Applet.deleteMany({
    user: user._id,
    $or: [{ "option.watchFrom": service }, { "option.watchTo": service }]
  }).exec(function(err, applets) {
    if (err) {
      console.log(err);
      return next(err);
    }
    applets = user.appletIds;
    appletsExcludingService = applets.filter(
      applet =>
        applet.option.watchFrom !== service && applet.option.watchTo !== service
    );
    user.appletIds = appletsExcludingService;
    user.save().then(
      user => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        const { servicesNotSubscribed, servicesSubscribed } = user;
        res.json({ servicesNotSubscribed, servicesSubscribed });
        return;
      },
      err => {
        console.log(err);
        return next(err);
      }
    );
  });
}     


exports.deleteApplets = deleteApplets;
exports.isLoggedIn = isLoggedIn;
exports.addToSubscribedRemoveFromNotSubscribed = addToSubscribedRemoveFromNotSubscribed;
exports.addToNotSubscribedRemoveFromSubscribed = addToNotSubscribedRemoveFromSubscribed;