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


exports.isLoggedIn = isLoggedIn;
exports.addToSubscribedRemoveFromNotSubscribed = addToSubscribedRemoveFromNotSubscribed;