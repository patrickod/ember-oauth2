describe("ember-oauth2", function() {

  window.App = Ember.Application.create({
    NAME: 'test-app'    
  });


  describe("Create Namespaces and configure object", function() {
    it("should create a OAuth2 object", function() {
      expect(Ember.OAuth2).toBeDefined();
    });

    it("should create a configuration object for Ember.OAuth2", function() {
      expect(Ember.OAuth2.config).toBeDefined();
    });
  });

  describe("It should setup the authorization url", function() {
    var authorizeUri;
    beforeEach(function() {
      var authBaseUri = 'https://foobar.dev/oauth/authorize';
      var redirectUri = 'https://qux.dev/oauth/callback';
      var clientId = '12345';
      var scope = 'public';
      var state = '6789';
      Ember.OAuth2.config = {
        test_auth: {
          clientId: clientId,
          authBaseUri: authBaseUri,
          redirectUri: redirectUri,
          scope: scope,
          state: state
        }
      };
      App.oauth = Ember.OAuth2.create(Ember.OAuth2.config.test_auth);
      authorizeUri = authBaseUri + '?response_type=token' + '&redirect_uri=' + redirectUri + '&client_id=' + clientId + '&state=' + state + '&scope=' + scope;
    });

    afterEach(function() {
      authorizeUri = null;
    });

    it("should setup the url", function() {
      expect(App.oauth.authUri()).toEqual(authorizeUri)
    });
  });
});
