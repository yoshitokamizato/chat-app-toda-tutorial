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

  speak: function(content, current_user_id) {
    console.log(current_user_id)

    return this.perform('speak', {message: content, current_user_id: current_user_id});
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('chat-input')
  const current_user_id = document.getElementById('current-user-id')

  input.addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      const content = input.value
      App.room.speak(content, current_user_id.value)
      input.value = ''
    }
  })

  const messages = document.getElementById('messages');
  messages.scrollTop = messages.scrollHeight;
})
