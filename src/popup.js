summarization_server_url = "http://localhost:8000/summarize/"

async function summarize(text, summarization_server_url) {
    if (text.length < 60) {
        alert('Your text is too short!');

    } else {
        window.document.querySelector ("#text").innerHTML = text;
        let res = await fetch(summarization_server_url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({text: text})
          })
          let data = await res.json();
          return data.summarized_text.replace(/\{|\}|\"/gm,'');
    }
}

chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, async function(selection) {
    let result = await summarize(selection[0], summarization_server_url);
    // console.log(window.document.querySelector("#summarized-text").innerHTML)
    window.document.querySelector("#summarized-text").innerHTML = result;

})