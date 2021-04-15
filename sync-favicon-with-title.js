syncFaviconWithTitle();

function syncFaviconWithTitle() {
    new MutationObserver(function(mutations) {
        const newTitle = mutations[0].target.innerText;
        buildFavicon(newTitle);
    }).observe(
        document.querySelector('title'),
        { subtree: true, characterData: true, childList: true }
    );
    buildFavicon(document.title);
}

function buildFavicon(char, color = "red", resolution = 1000) {

    if(typeof char !== "string") {
        throw "Invalid Char";
    }

    char = char.charAt(0).toUpperCase(char);

    var faviconLink = document.querySelector("link[rel=icon]");

    if(!faviconLink) {
        faviconLink = document.createElement("link");
        faviconLink.rel = "icon";
        faviconLink.type = "image/png";
        document.head.appendChild(faviconLink);
    }

    const canvas = document.createElement("canvas");

    canvas.width = canvas.height = resolution;

    const context = canvas.getContext("2d");

    context.font = `${resolution}px "helvetica", sans-serif`;

    const metrics = context.measureText(char);
    const width = Math.abs(metrics.actualBoundingBoxLeft) + 
                Math.abs(metrics.actualBoundingBoxRight);
    const height = Math.abs(metrics.actualBoundingBoxAscent) + 
                Math.abs(metrics.actualBoundingBoxDescent);

    canvas.width = canvas.height = Math.max(width, height);

    context.font = `${resolution}px "helvetica", sans-serif`;
    context.fillStyle = color;
    context.textAlign = "center";

    context.fillText(char, canvas.width / 2.0, height); 

    // Replace favicon
    faviconLink.href = canvas.toDataURL("image/png");

}
