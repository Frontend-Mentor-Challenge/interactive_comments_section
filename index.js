let data = [];
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    data.push(jsonData);

    for (let i = 0; i < jsonData.comments.length; i++) {
      let content = `
          <div class="card">
              <div class="upvotes-section">
                  <div class="upvotes-inner">
                      <img src="images/icon-plus.svg"/>
                      <p>${jsonData.comments[i].score}</p>
                      <img src="images/icon-minus.svg"/>
                  </div>
              </div>
              <div>
                  <div class="card-top-info">
                      <img class="avatar-icon" src="${jsonData.comments[i].user.image.png}"><p class="username">${jsonData.comments[i].user.username}</p><p class="message-time">${jsonData.comments[i].createdAt}</p></img>
                      <button><img class="reply-icon" src="images/icon-reply.svg" alt="Reply Button"></img>Reply</button>
                  </div>
                  <p class="message-text">${jsonData.comments[i].content}</p>
              </div>
          </div>`;

      if (jsonData.comments[i].replies.length) {
        for (let j = 0; j < jsonData.comments[i].replies.length; j++) {
          let replyContent = `
            <div class="card-reply">
                <div class="upvotes-section">
                    <div class="upvotes-inner">
                        <img src="images/icon-plus.svg"/>
                        <p>${jsonData.comments[i].replies[j].score}</p>
                        <img src="images/icon-minus.svg"/>
                    </div>
                </div>
                <div>
                    <div class="card-top-info">
                        <img class="avatar-icon" src="${jsonData.comments[i].replies[j].user.image.png}">
                            <p class="username">${jsonData.comments[i].replies[j].user.username}</p>
                            <p class="message-time">${jsonData.comments[i].replies[j].createdAt}</p>
                        </img>
                        <button><img class="reply-icon" src="images/icon-reply.svg" alt="Reply Button"></img>Reply</button>
                    </div>
                    <p class="replyingto-text">@${jsonData.comments[i].replies[j].replyingTo}<p class="message-text">${jsonData.comments[i].replies[j].content}</p></p>
                </div>
            </div>`;

          content += replyContent;
        }
      }
      document.getElementById("content").innerHTML += content;
    }

    const userSection = `
        <div class="card">
            <div>
                <div class="card-top-info">
                    <img class="avatar-icon" src="${jsonData.currentUser.image.png}"/>
                    <textarea rows="4" cols="50">Add a comment...</textarea>
                    <button>SEND</button>
                </div>
            </div>
        </div>`;

    document.getElementById("content").innerHTML += userSection;

    // document.getElementsByClassName("username")[0].innerHTML =
    //   jsonData.comments[0].user.username;
  });
