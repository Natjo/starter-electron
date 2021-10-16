module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: "3.6.5",
                modules: false,
            },
        ],
    ],
};
