<!-- Create new file -->

node index.js --action create --fileName hello.js --content HelloWorld

<!--  Get file-->

node index.js --action get

<!-- Get informations about file -->

node index.js --action getInfo --fileName hello.js

<!-- Change file -->

node index.js --action changeFile --fileName hello.js --content HelloMe

<!-- Rename file -->

node index.js --action reName --fileName hello.js --newName hello1.js

<!-- Delete file -->

node index.js --action deleteFile --fileName hello.js
