// https://api.themoviedb.org/3/search/movie?api_key=1eab81ae7f08840126e340e60ce049eb

/*Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
1.	Titolo
2.	Titolo Originale
3.	Lingua
4.	Voto
-------------------------------------------------------------------------------------
Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

link general to tv Series:
Partiamo dal link a tutte le possibili chiamate: https://developers.themoviedb.org/3/getting-started/introduction >> SEARCH >>GEt: Search Tv Show >> Try It out >>  Send Request. Questo navigare nel sito mi produrrà il link generico qui sotto:
https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
-------------------------------------------------------------------------------------
Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
-------------------------------------------------------------------------------------
Milestone 4:
Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
●	Un header che contiene logo e search bar
●	Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342)
●	Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview

-------------------------------------------------------------------------------------
Milestone 5 (Opzionale):
Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti dall’API con Nome e Cognome, e i generi associati al film con questo schema: “Genere 1, Genere 2, …”.

link general to tv MOVIES Credits(Titoli di coda):
Partiamo dal link a tutte le possibili chiamate:
https://developers.themoviedb.org/3/getting-started/introduction >> MOVIES >>GEt: Credits >> Try It out >>  Send Request. Questo navigare nel sito mi produrrà il link generico qui sotto:
https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

N.B.: In doppie graffe l'elemento che di volta in volta prendo dalla mia "Get id su obj".
Esso corrisponde alll'id identificativo del film.

-------------------------------------------------------------------------------------
*/

new Vue({



  el: '#app',
  data: {
    textSearched: ' ',
    obj: [],
    objMovies: [],
    objSeries: [],
    availableFlag: [
	'aa',
	'ab',
	'af',
	'am',
	'ar',
	'as',
	'ay',
	'az',
	'ba',
	'be',
	'bg',
	'bh',
	'bi',
	'bn',
	'bo',
	'br',
	'ca',
	'co',
	'cs',
	'cy',
	'de',
	'dz',
	'el',
  'en',
	'eo',
	'es',
	'et',
	'eu',
	'fa',
	'fi',
	'fj',
	'fo',
	'fr',
	'fy',
	'ga',
	'gd',
	'gl',
	'gn',
	'gu',
	'ha',
	'hr',
	'hu',
	'hy',
	'ia',
	'ie',
	'ik',
	'in',
	'is',
	'it',
	'iw',
	'ji',
	'jw',
	'ka',
	'kk',
	'kl',
	'km',
	'kn',
	'ks',
	'ku',
	'ky',
	'la',
	'ln',
	'lo',
	'lt',
	'lv',
	'mg',
	'mi',
	'mk',
	'ml',
	'mn',
	'mo',
	'mr',
	'ms',
	'mt',
	'my',
	'na',
	'ne',
	'nl',
	'no',
	'oc',
	'om',
	'pa',
	'pl',
	'ps',
	'pt',
	'qu',
	'rm',
	'rn',
	'ro',
	'ru',
	'rw',
	'sa',
	'sd',
	'sg',
	'sh',
	'si',
	'sk',
	'sl',
	'sm',
	'sn',
	'so',
	'sr',
	'ss',
	'st',
	'su',
	'sv',
	'sw',
	'te',
	'tg',
	'th',
	'ti',
	'tk',
	'tl',
	'tn',
	'to',
	'tr',
	'ts',
	'tt',
	'tw',
	'uk',
	'uz',
	'vi',
	'vo',
	'wo',
	'xh',
	'yo' ,
	'zu',
	],
    picturePath: 'https://image.tmdb.org/t/p/w342/',
    picturePlaceHolder: 'img/picture-placeHolder.png',
    moviesId: [],
    seriesId: [],
    allId: [],
    singleId: '',
    cast: [],
    partialCast: []
  },

  methods: {


    wholeContentFx() {
      //MERGIANDO di volta in volta le ricerche in OBJ, devo andarlo a svuotare ad ogni ricerca successiva; come nella stringa appena sotto:
      this.obj = [];
      this.allId = [];
      this.moviesId = [];
      this.seriesId = [];
      // this.actors = [];
      this.searchMoviesFx();
      this.searchSeriesFx();
    },

    searchMoviesFx() {
      //Per bypassare lo scope interno alla FX del THEN:
      // const self = this;
      // L'alternativa, qui, cmq, utilizzata è rendere la FX interna al THEN una Arrow FX (stesso approccio nel FX che segue appena dopo questa)
      // axios.get('https://api.themoviedb.org/3/search/movie?api_key=1eab81ae7f08840126e340e60ce049eb&query=' + this.textSearched + '&language=it-IT') Qui sotto la GET in codice più leggibile:
      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: '1eab81ae7f08840126e340e60ce049eb',
            query: this.textSearched,
            language: 'it-IT',
        },
      })
      .then((resp) => {
      console.log('response', resp);
      this.objMovies = resp.data.results;
      this.obj = [...this.obj, ...this.objMovies];
      console.log('objMovies',this.objMovies);
      console.log('obj',this.obj);
      const self = this;
      self.objMovies.forEach((element) => {
        // self.singleId = element.id;
        // console.log('single Movie id', self.singleId);
        self.moviesId.push(element.id);
        console.log('Movies id: ', self.moviesId);
        // let actors = [];
        // axios.get('https://api.themoviedb.org/3/movie/' + self.singleId + '/credits?api_key=1eab81ae7f08840126e340e60ce049eb&language=en-US')
        // .then((resp) => {
        // this.actors.push(resp.data.cast.name);
        // console.log(this.actors);
        // })
      })
      this.allId = [...this.allId,...this.moviesId];
      console.log('All Id', this.allId);
      });
    },

    searchSeriesFx() {
      axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: '1eab81ae7f08840126e340e60ce049eb',
            query: this.textSearched,
            language: 'it-IT',
        },
      })
      .then((resp) => {
      console.log('response', resp);
      this.objSeries = resp.data.results;
      this.obj = [...this.obj, ...this.objSeries];
      console.log('objSeries', this.objSeries);
      console.log('obj', this.obj);
      const self = this;
      self.objSeries.forEach((element) => {
        self.seriesId.push(element.id);
        console.log('Series id: ', self.seriesId);
      })
      this.allId = [...this.allId,...this.seriesId];
      console.log('All Id', this.allId);
      });
    },

    actorsFx(element) {
      this.partialCast = [];
        axios.get('https://api.themoviedb.org/3/movie/' + element.id + '/credits?api_key=1eab81ae7f08840126e340e60ce049eb&language=en-US')
        .then((resp) => {
            let cast = resp.data.cast;
            console.log(this.cast);
          for (var i = 0; i < 5; i++) {
              this.partialCast.push(cast[i]);
              console.log(this.partialCast);
            }
            // this.actors = [];
      });

    },

    getVote(vote) {
      return Math.ceil(vote / 2);
    }


  }



});
Vue.config.devtools = true;
