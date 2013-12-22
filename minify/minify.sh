ECHO "[COMPILING]"
cd ..
uglifyjs jquery.upload.js -o jquery.upload.min.js
cd minify
node minify.js ../jquery.upload.min.js