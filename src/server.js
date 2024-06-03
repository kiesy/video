"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var remotion_1 = require("remotion");
var wowzaDealVideo_1 = require("./wowzaDealVideo.tsx");
var app = (0, express_1.default)();
app.post('/render-video', function (req, res) {
    var _a = req.body, composition = _a.composition, dealsData = _a.dealsData;
    var props = {
        dealsData: dealsData,
    };
    var Component;
    switch (composition) {
        case 'WowzaDealVideo':
            Component = wowzaDealVideo_1.WowzaDealVideo;
            break;
        case 'AnotherComposition':
            break;
        default:
            res.status(400).send('Invalid composition');
            return;
    }
    (0, remotion_1.render)({
        component: Component,
        props: props,
    }, {
        // Render options (e.g., output file, codec)
        output: 'output.mp4',
        codec: 'libx264',
    }).then(function (video) {
        // Handle the rendered video
        res.set('Content-Type', 'video/mp4');
        res.send(video);
    }).catch(function (error) {
        // Handle any errors that occurred during rendering
        console.error(error);
        res.status(500).send('Error rendering video');
    });
});
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
