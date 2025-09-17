function getPosts(c) {
  let request = new XMLHttpRequest();

  //send request

  request.open("GET", "https://jsonplaceholder.typicode.com/posts");
  request.responseType = "json";
  request.send();

  request.onload = function () {
    let r = request.response;

    r.forEach((element) => {
      if (c === element.userId) {
        console.log("The request status is ", request.status);
        console.log("liste of users ", request.response);
        console.log(element.title);
        console.log(element.body);

        //creation of html elemnts
        let div = document.getElementById("left");
        let title = document.createElement("h4");
        let bod = document.createElement("h4");
        let btn = document.createElement("button");
        let right = document.getElementById("right");
        title.append(element.title);
        bod.append(element.body);

        btn.append(title);
        btn.append(bod);
        right.append(btn);

        document.body.append(document.createElement("br"));
      }
    });
  };
}

/*************************** */
function getUsers() {
  let request = new XMLHttpRequest();

  //send request

  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();

  request.onload = function () {
    let r = request.response;

    r.forEach((element) => {
      console.log("The request status is ", request.status);
      console.log("liste of users ", request.response);
      console.log(r.name);
      console.log(r.email);
      console.log("ttttttttttttttttrr " + element.email);
      //creation of html elemnts
      let title = document.createElement("h4");
      let bod = document.createElement("h4");
      let btn = document.createElement("button");
      let right = document.getElementById("right");
      let left = document.getElementById("left");
      title.append(element.name);
      bod.append(element.email);

      btn.append(title);
      btn.append(bod);

      document.body.append(document.createElement("br"));

      btn.addEventListener("click", function () {
        right.textContent = "";
        getPosts(element.id);
        btn.className = "btn btn-success m-2";
      });

      left.append(btn);
    });
  };
}

getUsers();
