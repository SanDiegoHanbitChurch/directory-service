import * as functions from "firebase-functions";
import PlanningCenter from "./planningCenter";
import app from "./app";

const { planningcenter } = functions.config();
const planningCenter = PlanningCenter({
  baseUrl: planningcenter.baseurl,
  applicationId: planningcenter.applicationid,
  secret: planningcenter.secret,
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
exports.v1 = functions.https.onRequest(app(planningCenter));
