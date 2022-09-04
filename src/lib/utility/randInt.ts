const randInt = (min: number, max: number) => {
    const rand = Math.random();
    return Math.floor(rand * (max - min + 1)) + min;
};

export default randInt;