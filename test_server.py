#
# A simple server to replicate the GitHub Pages 404 behaviour.
#
import os
import http.server # Our http server handler for http requests
import socketserver # Establish the TCP Socket connections

PORT = 9000

class RequestHandlerWith404(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path):
            self.path = '404.html'
        return super().do_GET()


with socketserver.TCPServer(("", PORT), RequestHandlerWith404) as httpd:
    print("Http Server Serving at port", PORT)
    httpd.serve_forever()