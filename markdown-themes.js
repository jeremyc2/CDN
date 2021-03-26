document.write(`<style>
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
const themes = ["splendor","retro","air","modest"];
var themeIndex = 0;
changeTheme();
function changeTheme() {
  var theme = themes[themeIndex] ?? themes[themeIndex = 0];
  history.pushState(null,null,`?theme=${theme}`);

  themeIndex++;

  var link;

  if(link = document.querySelector("#custom-style")) {
    link.href = `http://markdowncss.github.io/${theme}/css/${theme}.css`;
    return;
  }
  
  link = document.createElement("link");
  link.id = "custom-style";
  link.rel = "stylesheet";
  link.href = `http://markdowncss.github.io/${theme}/css/${theme}.css`;

  document.head.appendChild(link);
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input[disabled]").forEach(input => input.disabled = false);
  
  var button = document.createElement("button");
  button.onclick = () => changeTheme();
  button.id = "change-theme";
  document.body.appendChild(button);
  button.innerText = "Change Theme";

});
