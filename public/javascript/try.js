const db = [];

function addObject(shorten_index, url) {
  const objects = {};
  objects.shorten = shorten_index;
  objects.url = url;
  db.push(objects);
}
addObject("dNH5v7", "https://www.google.com");
addObject("cbd6546", "https://www.google.com/95+95");

console.log(db);
