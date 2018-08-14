Console / Dashboard 

this connects to a websocket, and pushed commands through it.

there is a 2 way communication with the infrastructure through the websocket through a redis server.

communication pattern is based on a pub/sub system.

example : 
sub to : command.*
onmessage, we have this key : command.aspecialcommand
so we actually grab the key command.aspecialcommand using hgetall

The websocket just forwards everything you are subbed to.

a lot of components are getting updated on websocket events.

This UI is about 50% finished with a lot of placeholders pending styling / logic.
