const router = require('express').Router();

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            alert('There was an error logging you out!');
            console.error('Error destroying session:', err);
            return res.status(500).json({error: "Failed to logout"});
        }
        res.redirect('/');
    });
});

module.exports = router;