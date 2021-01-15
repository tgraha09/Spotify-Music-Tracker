    //FILE FROM SPOTIFY GITHUB - USED FOR AUTH. REROUTED FOR PROJECT 2
    var stateKey = 'spotify_auth_state';
    
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
      //localStorage.clear();
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    function generateRandomString(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

       

    var params = getHashParams();

    //EDITED
    //storing keys into local storage for later use
    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(stateKey);
        localStorage.setItem("stateKey" ,storedState);
        localStorage.setItem("access_token", access_token);
        

    if (access_token && (state == null || state !== storedState)) {
      //console.log('There was an error during the authentication');
    } else {
     // localStorage.removeItem(stateKey);
      if (access_token) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
              
            }
        });
      } else {

      }
     
      document.getElementById('login-button').addEventListener('click', function() {
        let local = 'http://localhost:3000';
        let banjo = 'https://people.rit.edu/tkg3369/235/project2/index.html';
        var client_id = 'f4f54fd086fb4c92968284b4ede9720a'; // Your client id
        var redirect_uri = local; //https://people.rit.edu/tkg3369/235/project2/index.html

        var state = generateRandomString(16);

        localStorage.setItem(stateKey, state);
        
        var scope = 'app-remote-control streaming user-read-private user-read-email user-read-recently-played user-library-read user-library-modify playlist-modify-public';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        
        window.location = url;
        
      }, false);
    }
