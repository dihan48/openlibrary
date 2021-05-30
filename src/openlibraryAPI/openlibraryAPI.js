
export function fetchSearch(value = '', page = 1) {
  return new Promise((resolve) => {
    fetch('http://openlibrary.org/search.json?q=' + encodeURI(value) + '&page=' + page)
      .then(response => response.json())
      .then(data => {
        resolve({ data: data?.docs, value, page, start: data.start })
      })
      .catch(err => {
        console.error(err)
        resolve({ err: err.toString() })
      });
  });
}