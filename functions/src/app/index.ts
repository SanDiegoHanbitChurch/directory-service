import * as express from "express";
import * as cors from "cors";
import { getAllMembers, getMemberById } from "./members";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get("/members/:id", (req, res) => {
  const member = getMemberById(req.params.id);
  if (member) {
    res.send(getMemberById(req.params.id));
  } else {
    res.sendStatus(404);
  }
});
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
app.get("/members/", (req, res) => res.send(getAllMembers()));

export default app;
