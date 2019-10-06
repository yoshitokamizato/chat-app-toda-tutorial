class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    puts "テスト：#{data['current_user_id']}"
    message = Message.create!(content: data['message'], user_id: data['current_user_id'])
    template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message, current_user_id: data['current_user_id']})
    ActionCable.server.broadcast 'room_channel', template
  end
end
