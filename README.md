# CMPSCI 326 Web Programming
## Code Examples

- **db** shows you how to connect to a postgres database using
the [node-postgres][pg] library.
- **fs** demonstrates the `fs` module in node.js.
- **iframe** demonstrates the use of an iframe element to accomplish
Ajax calls to the server.
- **script** demonstrates the use of a script element to accomplish
Ajax calls to the server.
- **pairs** shows the use of the XMLHttpRequest object to make
same-origin requests to the server.
- **polling** shows the use [jQuery's Ajax][jajax] support for making
same-origin requests to the server. This example also demonstrates
Ajax polling using the `setInterval` client-side function to enable
communication between multiple browsers. We also demonstrate the use
of the `dataType` property for [jQuery][jquery] Ajax requests to allow
*cross-site* scripting to communicate to the [Twitter JSON API][twitter].

[twitter]: https://dev.twitter.com/docs/api/1/get/search
[jquery]: http://jquery.com
[jajax]: http://api.jquery.com/category/ajax
[pg]: https://github.com/brianc/node-postgres
