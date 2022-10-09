class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=8762f11543c70f04f20cda54a0417a6e";
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _ifEmptyProp = (prop) => {
    if (!prop) {
      return "not found :(";
    } else if (Array.isArray(prop) && prop[0] === "") {
      return "not found :(";
    } else {
      return prop;
    }
  };

  _transformCharacter = (char) => {
    return {
      name: this._ifEmptyProp(char.name),
      description: this._ifEmptyProp(char.description),
      thumbnail: this._ifEmptyProp(
        char.thumbnail.path + "." + char.thumbnail.extension
      ),
      homepage: this._ifEmptyProp(char.urls[0].url),
      wiki: this._ifEmptyProp(char.urls[1].url),
    };
  };
}

export default MarvelService;
