$(function(){
  function buildHTML(message){
    let image = message.image ? `<img class='' src='${message.image}' >` : '';
    let html =  `<div class='chat'>
                  <div class='chat__upbox'>
                    <p class='chat__upbox__user'>
                      ${message.user_name}
                    </p>
                    <p class='chat__upbox__time'>
                      ${message.created_at}
                    </p>
                  </div>
                  <p class='chat__text'>
                    ${message.content}
                  </p>
                  ${image}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    let url = window.location.href;
    let formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      let html = buildHTML(data);
      $('.chats').append(html);
      $(function() {
        $('.chats').animate({
          scrollTop: $('.chats')[0].scrollHeight
        });
      });
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    })
  })
});
