const logger = (req, res, next) => {
    const time = new Date().toLocaleDateString();
    console.log(`Request received at ${time}`);
    next();
}
module.exports = logger;