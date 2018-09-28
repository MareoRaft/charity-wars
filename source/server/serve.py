#!/usr/bin/env python3
import json

from tornado.web import RequestHandler
from tornado.websocket import WebSocketHandler
from tornado.web import Application
from tornado.web import url
from tornado.ioloop import IOLoop
from tornado.log import enable_pretty_logging

from config import PORT_NUMBER

# MAIN
class MyHandler (RequestHandler):


	def get(self):
		# machine_id = self.get_argument('id', strip=True)
		# self.write(response_string)


def make_app():
	return Application(
		[
			url(r'/thang.*', MyHandler),
		],
		# settings
		debug = True,
	)

def server_kickoff():
	enable_pretty_logging()
	application = make_app()
	application.listen(PORT_NUMBER)
	IOLoop.current().start()

def main():
	server_kickoff()

if __name__ == "__main__":
	main()
