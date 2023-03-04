const apiKey = "92a0d4fcee2846e090dc395bdb622ac8";
const url = "https://api.rebrandly.com/v1/links";

const inputField = document.querySelector("#input");
const shortenButton = document.querySelector("#shorten");
const responseField = document.querySelector("#responseField");



const shortenUrl = () => {
  const urlToShorten = inputField.value;
  //数据变量将用于将需要采用字符串格式的信息发送到请求正文。
  //对象转换成 JSON 字符串
  const data = JSON.stringify({ destination: urlToShorten });
  //第二个参数,
  //添加第一个对象,键是method,值是post
  //第二个对象,描述headers
  //第三个对象,body
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      apikey: apiKey
    },
    body: data
  })
    //处理请求
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      renderResponse(jsonResponse);
    })
};

const displayShortUrl = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
};

shortenButton.addEventListener("click", displayShortUrl);
