// import fetch from 'node-fetch';
if (typeof axios === 'undefined') {
    console.error("Axios failed to load.");
}
async function generateMetaTags() {
        const fxEmbedApi = `https://api.fxtwitter.com/${(window.location.pathname.split("/")[1])}/${(window.location.pathname.split("/")[2])}/${(window.location.pathname.split("/")[3])}`;
        const response = await axios.get(fxEmbedApi);
        if (response.status !== 200) {
            return `<h1>${response.code} : An Error Occurred!</h1>
            <p> ${response.message}
            `
            throw new Error(`FxEmbed API error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.tweet.media.all[0].thumbnail_url)
        const metaTags = `
<meta property="og:title" content="${escapeHtml(data.tweet?.author?.screen_name || '')}">
<meta property="og:description" content="${escapeHtml(data.tweet?.text || '')}">
<meta property="og:image" content="${escapeHtml(data.tweet?.media?.all[0].thumbnail_url || '')}">
<meta property="og:url" content="${escapeHtml(data.tweet.url)}">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="Refresh" content="1; url='${data.tweet.url}'" />
        `.trim();
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(data.tweet?.author?.screen_name || 'Embed')}</title>
${metaTags}
</head>
<body>
<h1>@${escapeHtml(data.tweet?.author?.screen_name || '')}</h1>
<p>${escapeHtml(data.tweet?.text || '')}</p>
<img src="${escapeHtml(data.tweet?.media?.all[0].thumbnail_url || '')}" alt="Preview">
</body>
</html>
        `.trim();
        return html;
}
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
