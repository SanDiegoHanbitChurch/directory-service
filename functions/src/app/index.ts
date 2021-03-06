import * as express from "express";
import * as cors from "cors";
import middlewares from "./middlewares";
import initMembers from "./members";
import { PlanningCenterInterface } from "../planningCenter";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
middlewares.map((middleware) => app.use(middleware));
// app.use(myMiddleware);

export default (
  planningCenter: PlanningCenterInterface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const { getMemberById, getAllMembers, searchMembers } =
    initMembers(planningCenter);

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
      members = await getAllMembers(parseInt(offset as string, 10));
    }

    res.set("Cache-Control", "public, max-age=300, s-maxage=600");
    res.send(members);
  });

  return app;
};
