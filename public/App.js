const element = React.createElement("div", {
  title: "Outer div"
}, React.createElement("h1", null, "Hello World!"));
ReactDOM.render(element, document.getElementById('contents'));