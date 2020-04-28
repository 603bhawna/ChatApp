$(function(){
 var socket = io.connect('http://localhost:2345')
 
 var window = $("#chatroom")
 var user = $("#send_username")
 var feed = $("#feedback")
 var msg = $("#message")
 var username = $("#username")
 var send = $("#send_message")

 send.click(function(){
     socket.emit('new_message', {message : msg.val()})
 })

 user.click(function(){
    socket.username = "Unknown"
     socket.emit('change_username', {username : username.val()})
 })

 socket.on("new_message", (data) => {
    window.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
})

socket.on('typing', (data) => {
    feed.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
})

 msg.bind("keypress", () => {
     socket.emit('typing')
 })

});