module.exports.getDate = function ()
{
    let today = new Date();

let options = { 
    month: "long",
    weekday: "long",
    day : "numeric",
    year: "numeric"
};
    return today.toLocaleDateString("en-US", options);
}

module.exports.getDay = getDay;
function getDay()
{
    let theDay = new Date();

    let options= {
        weekday: "long"
    };

    return theDay.toLocaleDateString("en-US",options);
}