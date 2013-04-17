# ce-images

Drag and drop image upload for [content-element](https://github.com/manuelstofer/content-element)

## Installation

```bash
$ component install manuelstofer/ce-images
```

### Server

ce-images provides a connect/express middleware to receive uploaded images

```Javascript
var ceImages = require('ce-images'),
    path     = require('path');

[..snip..]
// launch connect or express
[..snip..]

app.use('/uploads', ceImages({
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    uploadUrl: '/uploads/'
}));
```


### Client

``Javascript
require('manuelstofer-ce-images')({uploadUrl: '/uploads/'});
```


## License

  MIT
