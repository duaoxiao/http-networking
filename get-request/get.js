// url
const url = "https://api.datamuse.com/words?sl=";
//输入框
const inputField = document.querySelector("#input");
// 提交按钮
const submit = document.querySelector("#submit");
//响应
const responseField = document.querySelector("#responseField");

const getSuggestions = () => {
  //需要查找的词
  const wordQuery = inputField.value;
  //拼接起来,目的是向这个网站查找指定的词
  const endpoint = `${url}${wordQuery}`;
  //.then() 方法接受两个参数：一个成功回调函数和一个失败回调函数。
  /*
  Promise.then(
    () => {},
    () => {}
  );
  */
  fetch(endpoint, { cache: "no-cache" })
    .then(
      (response) => {
        //判断返回的response
        if (response.ok) {
          return response.json();
        }
        //不是ok,抛出错误
        throw new Error("Request failed!");
      },
      (networkError) => {
        console.log(networkError.message);
      }
    )
    //处理 GET 请求
    .then((jsonResponse) => {
      //调用 renderRawResponse() 函数并将jsonResponse作为参数传入
      renderRawResponse(jsonResponse);

      //也可以用格式化后的函数处理数据
      //   renderResponse(jsonResponse);
    });
};
const displaySuggestions = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestions();
};

submit.addEventListener("click", displaySuggestions);
