App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    console.log('connected')
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(message) {
    console.log('received')
    const messages = document.getElementById('messages')
    messages.innerHTML += `<p>${message}</p>`

    messages.scrollTop = messages.scrollHeight;
  },

  speak: function(content) {
    return this.perform('speak', {message: content});
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('chat-input')
  const button = document.getElementById('button')
  input.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      const content = input.value
      App.room.speak(content)
      input.value = ''
    }
  })

  const messages = document.getElementById('messages');
  messages.scrollTop = messages.scrollHeight;
})
