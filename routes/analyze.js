
const express = require('express');
const router = express.Router();

//password analysis function (needs to be worked on)
const analyzePassword = (password) => {
    const result = {
        length: password.length,
        hasLowerCase: /[a-z]/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        strength: ''
    };

    if (result.length < 8) {
        result.strength = 'Very Weak';
    } else if (result.length >= 8 && result.length < 12) {
        if (result.hasLowerCase && result.hasUpperCase && result.hasNumbers && result.hasSpecialChars) {
            result.strength = 'Strong';
        } else if (Object.values(result).filter(Boolean).length >= 2) {
            result.strength = 'Moderate';
        } else {
            result.strength = 'Weak';
        }
    } else if (result.length >= 12 && result.length <= 16) {
        if (result.hasLowerCase && result.hasUpperCase && result.hasNumbers && result.hasSpecialChars) {
            result.strength = 'Very Strong';
        } else {
            result.strength = 'Strong';
        }
    } else {
        result.strength = 'Strong';
    }

    return result;
};

//home page render
router.get('/', (req, res) => {
    res.render('index', {analysis: null, newPassword: null});
});

//password analyzed route render
router.post('/analyze', (req, res) => {
    const { password } = req.body;
    const analysis = analyzePassword(password);
    res.render('index', { analysis, newPassword:null });
});

//password generator route
router.get('/generate', (req, res) => {
    const generatePassword = () => {
        const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerChars = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()";

        const length = Math.floor(Math.random() * (16 - 12 + 1)) + 12;
        let password = '';

        password += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
        password += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

        const allChars = upperChars + lowerChars + numbers + specialChars;
        let numCount = 1; 
        let specialCount = 1; 

        for (let i = password.length; i < length; i++) {
            const randomChar = allChars.charAt(Math.floor(Math.random() * allChars.length));
            
            if (numbers.includes(randomChar)) {
                if (numCount < 3) {
                    password += randomChar;
                    numCount++;
                } else {
                    i--;
                }
            } else if (specialChars.includes(randomChar)) {
                if (specialCount < 2) {
                    password += randomChar;
                    specialCount++;
                } else {
                    i--;
                }
            } else {
                password += randomChar;
            }
        }

        password = password.split('').sort(() => Math.random() - 0.5).join('');

        return password;
    };

    const newPassword = generatePassword();
    res.render('index', { analysis: null, newPassword });
});

module.exports = router;