# jQuery file upload

#### $('#element').upload(url, [fnData], [maximumFiles])

```html
<input type="file" name="my-file" id="my-file" />
```

```js
$('#my-file').upload('/upload/');

// OR

$('#my-file').upload('/upload/', function(fd) {
	fd.append('myparam1', '1');
	fd.append('myparam2', '2');
});
```

## Drag & Drop files

#### $('#element').dragdrop(url, [cssClassDragOver], [fnData], [maximumFiles])

```html
<div id="dragdrop">
	<br />
	<br />
	<br />
	<br />
	Drag &amp; Drop files
	<br />
	<br />
	<br />
	<br />
</div>
```

```js
$('#dragdrop').dragdrop('/upload/', 'css-class-dragover');

// OR

$('#dragdrop').dragdrop('/upload/', 'css-class-dragover', function(fd) {
	fd.append('myparam1', '1');
	fd.append('myparam2', '2');
});
```


## Events

#### $('#my-file,#dragdrop').on('upload-begin');

> On begin upload.

```js
$('#my-file,#dragdrop').on('upload-begin', function(e) {
	// your code here
});
```

#### $('#my-file,#dragdrop').on('upload-end');

> On end upload.

```js
$('#my-file,#dragdrop').on('upload-end', function(e, isUploaded, data) {

	if (data === null) {
		// error
		return;
	}

	// your code here
});
```

#### $('#my-file,#dragdrop').on('upload-error');

> On upload error.

```js
$('#my-file,#dragdrop').on('upload-error', function(e, err, status) {
	// your code here
	console.log(err, status);
});
```

#### $('#my-file,#dragdrop').on('upload-progress');

> On upload progress.

```js
$('#my-file,#dragdrop').on('upload-progress', function(e, percentage, transferSpeed, timeRemaining) {

	// your code here

});
```