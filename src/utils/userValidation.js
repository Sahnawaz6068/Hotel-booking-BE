import validator from "validator";

const userDataValidation = (req, res, next) => {
    const { name, email, password } = req.body;

    console.log("Ye bhi dekh le Bhai");

    if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: "Name must be at least 2 characters." });
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email." });
    }

    if (!password || password.length < 6||!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Plese make Password Strong" });
    }

    next(); 
};

const signInDataValidation = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email." });
    }

    if (!password || password.length < 6||!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Plese make Password Strong" });
    }

    next(); 
};

export { userDataValidation,signInDataValidation };
