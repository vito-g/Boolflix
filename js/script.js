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
-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
*/

new Vue({
  el: '#app',
  data: {
    textSearched: ' ',
    obj: [],
    voteArray: [],
    roundedVoteArray: []
  },

  methods: {

    searchForTextFx: function() {
      //Per bypassare lo scope interno alla FX del then
      const self = this;

      axios.get('https://api.themoviedb.org/3/search/movie?api_key=1eab81ae7f08840126e340e60ce049eb&query=' + this.textSearched)
      .then(function(resp) {
      console.log(resp);
      self.obj = resp.data.results;
      // console.log(self.obj);

      self.obj.forEach((element) => {
        // self.voteArray.push(element.vote_average / 2);
        // self.roundedVoteArray.push(Math.ceil(element.vote_average / 2));
        // console.log('vote average Array: ', self.voteArray);
        // console.log('vote rounded Array: ', self.roundedVoteArray);
        element.vote_average = Math.ceil(element.vote_average / 2);

      });
      // console.log(self.obj);
    });
  }
  }


});
Vue.config.devtools = true;
