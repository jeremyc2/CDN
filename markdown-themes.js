document.head.insertAdjacentHTML('beforeend',`<style>
body {
  margin: 0 auto;
  max-width: 700px;
}
#change-theme {
  display: inline-block;
  padding: 0.35em 1.2em;
  border:0.1em solid white;
  background-color: black;
  color: white;
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  text-align:center;
  transition: all 0.2s;
  position: fixed;
  bottom: 10px;
  right: 10px;
}
#change-theme:hover {
  border-color:black;
  color: black;
  background-color: white;
}
@media all and (max-width:30em) {
  #change-theme {
    display:block;
    margin:0.4em auto;
  }
}
</style>`);
const themes = ["none","splendor","retro","modest"];

var searchParams = new URLSearchParams(document.location.search),
    themeIndex = 0;

if(searchParams.has("theme")) {
    themeIndex = themes.indexOf(searchParams.get("theme"));
}

setTheme();

function setTheme() {
  var theme = themes[themeIndex] ?? themes[themeIndex = 0],
    href = theme == "none"? "": `https://jeremyc2.github.io/CDN/${theme}.css`;

  history.pushState(null,null,`?theme=${theme}`);

  var link;

  if(link = document.querySelector("#custom-style")) {
    link.href = href;
    return;
  }
  
  link = document.createElement("link");
  link.id = "custom-style";
  link.rel = "stylesheet";
  link.href = href;

  document.head.appendChild(link);
}

function changeTheme() {
    themeIndex++;
    setTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input[disabled]").forEach(input => input.disabled = false);
  
  var button = document.createElement("button");
  button.onclick = () => changeTheme();
  button.id = "change-theme";
  button.innerText = "Change Theme";
  document.body.appendChild(button);

});
