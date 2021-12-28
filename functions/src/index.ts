import * as functions from "firebase-functions";
import app from "./app";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
exports.v1 = functions.https.onRequest(app);
