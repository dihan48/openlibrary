
export function fetchSearch(value = '') {
    return new Promise((resolve) => {
      fetch('http://openlibrary.org/search.json?q='+encodeURI(value))
      .then(response => response.json())
      .then(data => {
        resolve({ data: data?.docs, value })
      });
    });
}
  