const booksBtn = document.querySelector('#booksBtn');

const getBookDetails = async () => {
  try {
    const bookData = await axios
      .get('https://anapioficeandfire.com/api/books')
      .then((res) => res.data)
      .then((data) => {
        data.map((bookStats) => {
          getStats(bookStats);
        });
        return data;
      });
  } catch (error) {
    console.error(error);
  }
};

const getMainContainer = document.querySelector('#mainContainer');
const getStats = async (book) => {
  try {
    const inBookStats = await axios
      .get(book.url)
      .then((res) => res.data)
      .then((data) => {
        const bookChars = data.characters;
        const fetchChar = async () => {
          try {
            for (let i = 0; i < 4; i++) {
              const res = await fetch(bookChars[i]);
              const data = await res.json();
              const inChar = data.name;
              return inChar;
            }
          } catch (error) {
            console.error(error);
          }
        };

        async function inBookChar() {
          let result = await fetchChar();
          return result;
        }

        const card = document.createElement('div');
        card.className = 'card';
        const h2Name = document.createElement('li');
        h2Name.textContent = 'Book Name: ' + data.name;
        const h2Isbn = document.createElement('li');
        h2Isbn.textContent = 'Book ISBN: ' + data.isbn;
        const h2Pages = document.createElement('li');
        h2Pages.textContent = 'No. of Pages: ' + data.numberOfPages;
        const h2Authors = document.createElement('li');
        h2Authors.textContent = 'Authors: ' + data.authors;
        const h2Publisher = document.createElement('li');
        h2Publisher.textContent = 'Publisher: ' + data.publisher;
        const h2Char = document.createElement('li');
        h2Char.textContent =
          'Characters: ' +
          `${bookChars[0]},${bookChars[1]},${bookChars[2]},${bookChars[3]},${bookChars[4]}`;

        // h2Char.textContent = 'Characters: ' + fetchChar();
        // h2Char.textContent = 'Characters: ' + inBookChar();
        const h2Break = document.createElement('hr');
        card.append(
          h2Name,
          h2Isbn,
          h2Pages,
          h2Authors,
          h2Publisher,
          h2Char,
          h2Break
        );
        getMainContainer.append(card);
      });
    // .then((data) => {
    //   data.characters.map((charStat) => {
    //     console.log(charStat);
    //   });
    // });
  } catch (error) {
    console.error(error);
  }
};

booksBtn.addEventListener('click', getBookDetails);
