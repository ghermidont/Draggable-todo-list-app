import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4000;

let lists = [
    {
        id: "0",
        text: "To Do",
        tasks: [{ id: "c0", text: "Generate app scaffold" }]
    },
    {
        id: "1",
        text: "In Progress",
        tasks: [{ id: "c2", text: "Learn Typescript" }]
    },
    {
        id: "2",
        text: "Done",
        tasks: [{ id: "c3", text: "Begin to use static typing" }]
    }
];

app.post("/save", function (req, res) {
    lists = req.body.lists;
    return res.json({ success: true });
});

app.get("/load", function (req, res) {
    return res.json({lists});
});

app.listen(PORT, function () {
    return console.log("Server running on port: " + PORT + "!");
});