const express = require("express");
const fetch = require("node-fetch");
const path = require("path");



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));


// Set EJS as the template engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

//Serve static files from the views folder
app.use(express.static(path.join(__dirname, 'views')));

// Route to render the input form
app.get("/", (req, res) => {
     res.render("index", { userData: null, error: null });
    //res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
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
