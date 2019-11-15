$(function(){
  function buildHTML(message){
    let image = message.image ? `<img class='' src='${message.image}' >` : '';
    let html =  `<div class='chat' data-id=` + message.id + `>
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
    e.preventDefault()
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

  let reloadMessages = function() {
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.chat:last').data('id');
      let url = 'api/messages';
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = "";
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.chats').append(insertHTML);
        });
        $('.chats').animate({
          scrollTop: $('.chats')[0].scrollHeight
        });
      })
      .fail(function() {
        alert('メッセージ受信に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});
