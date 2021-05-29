
export function fetchSearch(value = '') {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: value }), 0)
    );
}
  