const linkDesc = document.getElementById('linkDesc');
linkDesc.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('sort');
    url.searchParams.set('sort', 'desc');
    linkDesc.href = url.href;
});
const linkAsc = document.getElementById('linkAsc');
linkAsc.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('sort');
    url.searchParams.set('sort', 'asc');
    linkAsc.href = url.href;
});

const catHome = document.getElementById('catHome');
catHome.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('query');
    url.searchParams.set('query', 'muebles');
    catHome.href = url.href;
});

const catGarden = document.getElementById('catGarden');
catGarden.addEventListener('click', () => {
    let url = new URL(window.location.href);
    url.searchParams.delete('query');
    url.searchParams.set('query', 'mueblesjardin');
    catGarden.href = url.href;
});
