$.fn.upload = function (url, fnData) {

    var self = this;

    if (self.data('a') === 1)
        return;

    self.data('a', 1);
    self.bind('change', function(e) {

        if (self.data('b') === 1)
            return;

        var files = self.files;
        var fd = new FormData();

        for (var i = 0; i < files.length; i++)
            fd.append('file' + (i + 1), files[i]);

        if (typeof(fnData) === 'function')
            fnData.call(self, fd);

        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function () {
            self.data('b', 0);
            self.trigger('end', [true, this.responseText]);
        }, false);

        xhr.upload.addEventListener('upload-progress', function (evt) {
            var percentage = 0;
            if (evt.lengthComputable)
                percentage = Math.round(evt.loaded * 100 / evt.total);
            self.trigger('progress', [percentage, evt.transferSpeed, evt.timeRemaining]);
        }, false);

        xhr.addEventListener('error', function (e) {
            self.data('b', 0);
            self.trigger('error', e);
            self.trigger('end', [false, null]);
        }, false);

        xhr.addEventListener('abort', function () {
            self.data('b', 0);
            self.trigger('end', [false, null]);
        }, false);

        self.data('b', 1);
        self.trigger('begin');

        xhr.open('POST', url);
        xhr.send(fd);
    });

    return true;
};

$.fn.dragdrop = function (url, cls, fnData) {

    var self = $(this);

    if (self.data('a') === 1)
        return self;

    if (typeof(cls) === 'function') {
        var tmp = fnData;
        fnData = cls;
        cls = tmp;
    }

    self.data('a', 1);

    self.bind('dragenter dragover dragexit drop dragleave', function(e) {

        var el = $(this);
        var selected = e.type === 'dragenter';

        if (e.type !== 'dragover' && typeof(cls) === 'string')
            el.toggleClass(cls, selected);

        switch (e.type) {
            case 'dragenter':
            case 'dragover':
            case 'dragexit':
            case 'dragleave':
                e.stopPropagation();
                e.preventDefault();
                return;
            case 'drop':
                e.stopPropagation();
                e.preventDefault();
                break;
        }


        var files = e.originalEvent.dataTransfer.files;
        var count = files.length;
        if (count === 0)
            return;

        if (self.data('b') === 1)
            return;

        var fd = new FormData();

        for (var i = 0; i < files.length; i++)
            fd.append('file' + (i + 1), files[i]);

        if (typeof(fnData) === 'function')
            fnData.call(self, fd);

        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', function () {
            self.data('b', 0);
            self.trigger('end', [$.parseJSON(this.responseText)]);
        }, false);

        xhr.upload.addEventListener('upload-progress', function (evt) {
            var percentage = 0;
            if (evt.lengthComputable)
                percentage = Math.round(evt.loaded * 100 / evt.total);
            self.trigger('progress', [percentage, evt.transferSpeed, evt.timeRemaining]);
        }, false);

        xhr.addEventListener('error', function (e) {
            self.data('b', 0);
            self.trigger('error', e);
            self.trigger('end', [null]);
        }, false);

        xhr.addEventListener('abort', function () {
            self.data('b', 0);
            self.trigger('end', [null]);
        }, false);

        self.data('b', 1);
        self.trigger('begin');

        xhr.open('POST', url);
        xhr.send(fd);
    });

    return self;
};