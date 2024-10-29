const notFound = (req,res)=> res.status(404).send('You Lost: Route does not exist');
module.exports = notFound;