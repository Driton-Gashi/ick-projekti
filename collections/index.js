const fetchCollections = async () => {
  try {
    const response = await fetch('/data/collections.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'Something happened while trying to fetch collections:',
      error
    );
    return [];
  }
};

const loadCollections = async () => {
  const collectionContainer = document.querySelector('.collectionList');

  const collections = await fetchCollections();

  collections.forEach(collection => {
    collectionContainer.innerHTML += `
      <my-collection-card
        image1="${collection.image1}"
        image2="${collection.image2}"
        image3="${collection.image3}"
        name="${collection.name}"
      ></my-collection-card>
  `;
  });
};

loadCollections();
