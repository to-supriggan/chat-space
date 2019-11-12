  json.content  @message.content
  json.image  @message.image.url
  json.user_name  @message.user.name
  json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.group_id  @group.id
  json.id @message.id
