import { DateTime } from "luxon";
let noOfHitsForEachIP = {};
const timeLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = DateTime.now();
  
    if (noOfHitsForEachIP[ip]) {
      const timeDiff = now.diff(noOfHitsForEachIP[ip].firstRequestTime, 'seconds').seconds;
  
      if (timeDiff < 60 && noOfHitsForEachIP[ip].count >= 5) {
        return res.status(429).json("Multiple User inputs, please wait");
      } else if (timeDiff < 60) {
        noOfHitsForEachIP[ip].count += 1;
      } else {
        noOfHitsForEachIP[ip].count = 1;
        noOfHitsForEachIP[ip].firstRequestTime = now;
      }
    } else {
      noOfHitsForEachIP[ip] = {
        count: 1,
        firstRequestTime: now
      };
    }
  
    // Log current state (for debug)
    console.log(noOfHitsForEachIP);
    
  next(); // move to the actual route handler
}
export default timeLimiter;