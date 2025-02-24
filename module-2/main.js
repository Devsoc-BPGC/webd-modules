const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set("view engine", "ejs");

//Serve static files from the views folder
app.use(express.static("views"));

// Route to render the input form
app.get("/", (req, res) => {
    res.render("index", { userData: null, error: null });
});

// Route to handle the GitHub API request
app.post("/fetch-github", async (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.render("index", { userData: null, error: "Please enter a username!" });
    }

    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GitHub user not found!`);
        }

        const data = await response.json();
        res.render("index", { userData: data, error: null });
    } catch (error) {
        res.render("index", { userData: null, error: error.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
