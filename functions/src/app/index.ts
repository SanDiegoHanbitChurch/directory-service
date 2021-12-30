import * as express from "express";
import * as cors from "cors";
import Members from "./members";
import { PlanningCenterInterface } from "../planningCenter";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

export default (planningCenter: PlanningCenterInterface): any => {
  const { getMemberById, getAllMembers, searchMembers } =
    Members(planningCenter);

  // build multiple CRUD interfaces:
  app.get("/members/:id", async (req, res) => {
    const member = await getMemberById(req.params.id);
    if (member) {
      res.set("Cache-Control", "public, max-age=300, s-maxage=600");
      res.send(member);
    } else {
      res.sendStatus(404);
    }
  });
  app.get("/members/", async (req, res) => {
    let members = [];

    if (req.query.query) {
      const { query } = req.query;
      members = await searchMembers(query as string);
    } else {
      const { offset } = req.query;
      members = await getAllMembers(parseInt(offset as string));
    }

    res.set("Cache-Control", "public, max-age=300, s-maxage=600");
    res.send(members);
  });

  return app;
};
