import http.server
import socketserver
import webbrowser
import os

# Configuration
PORT = 8000
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

# Create the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"\n✅ Server started at: http://localhost:{PORT}")
    print("❌ Press Ctrl+C to stop the server.\n")
    
    # Optional: Automatically open the browser
    # webbrowser.open(f"http://localhost:{PORT}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped.")
