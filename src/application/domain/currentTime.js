function gmt7(){
    const currentTime = new Date();
    const offset = 420;
    return currentTime.setMinutes(currentTime.getMinutes() + offset);
}

module.exports = {
    gmt7
}

