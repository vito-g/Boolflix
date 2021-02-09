// https://api.themoviedb.org/3/search/movie?api_key=1eab81ae7f08840126e340e60ce049eb

/*Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
1.	Titolo
2.	Titolo Originale
3.	Lingua
4.	Voto*/

new Vue({
  el: '#app',
  data: {
    textSearched: '',
    obj: [],
    found: false
  },
  mounted() {
    const self = this;
    console.log('ho montato l\'app');

      axios.get('https://api.themoviedb.org/3/search/movie?api_key=1eab81ae7f08840126e340e60ce049eb?query=' + self.textSearched)
      .then(function(resp) {
        self.obj = resp.data.results;
        console.log('risposta vue', self.obj);
      });
  },
  methods: {
    searchForTextFx: function() {
    this.obj.forEach((element) => {
      if (element.original_title.toLowerCase().includes(this.textSearched.toLowerCase())) {
        this.found = true;
      } else {
        this.found = false;
      }
    });
  }
  }


});
Vue.config.devtools = true;
