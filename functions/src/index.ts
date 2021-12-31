import * as functions from "firebase-functions";
import initPlanningCenter from "./planningCenter";
import app from "./app";

const { planningcenter } = functions.config();
const planningCenter = initPlanningCenter({
  baseUrl: planningcenter.baseurl,
  applicationId: planningcenter.applicationid,
  secret: planningcenter.secret,
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
// eslint-disable-next-line import/prefer-default-export
export const v1 = functions.https.onRequest(app(planningCenter));
