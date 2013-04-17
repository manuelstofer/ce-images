var event = require('event'),
    trigger = require('trigger-event');


module.exports = function (options) {

    event.bind(window, 'add-element', function (ev) {
        var el = ev.detail.view.el;

        event.bind(el, 'dragover', function (ev) {
            ev.preventDefault();
        });
        event.bind(el, 'drop', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            handleDrop(ev, options);
        });
    });
};

function handleDrop(ev, options) {
    var target = ev.target,
        file = ev.dataTransfer.files[0],
        previousSrc = target.getAttribute('src');


    if (target.nodeName !== 'IMG' || !file) { return; }

    if (URL.createObjectURL) target.setAttribute('src', URL.createObjectURL(file));

    upload(
        previousSrc || options.uploadUrl + file.name,
        file,
        function (response) {
            target.setAttribute('src', response.url);
            trigger(target, 'read', {bubbles: true});
        }
    );
}

function upload(destination, file, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', destination, true);
    xhr.onload = function(e) {
        if (xhr.status == 201) {
            fn(JSON.parse(this.responseText));
        }
    };
    xhr.send(file);
}