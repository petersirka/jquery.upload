# jQuery file upload

#### $('#element').upload(url, [fnData])

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

#### $('#element').dragdrop(url, [cssClassDragOver], [fnData])

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

#### $('#my-file,#dragdrop').on('begin');

> On begin upload.

```js
$('#my-file,#dragdrop').on('begin', function(e) {
	// your code here
});
```

#### $('#my-file,#dragdrop').on('end');

> On end upload.

```js
$('#my-file,#dragdrop').on('end', function(e, data) {

	if (data === null) {
		// error
		return;
	}

	// your code here
});
```

#### $('#my-file,#dragdrop').on('error');

> On upload error.

```js
$('#my-file,#dragdrop').on('end', function(e, err) {
	// your code here
	console.log(err);
});
```

#### $('#my-file,#dragdrop').on('progress');

> On upload progress.

```js
$('#my-file,#dragdrop').on('progress', function(e, percentage, transferSpeed, timeRemaining) {

	// your code here

});
```