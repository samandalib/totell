fetch("http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=jsonfm&formatversion=2&titles=Main%20Page"){
    .then(res => res.json())
    .then(data => console.log(data))
}
