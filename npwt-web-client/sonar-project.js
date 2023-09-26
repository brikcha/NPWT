const SonarqubeScanner = require ('sonarqube-scanner');

SonarqubeScanner({
    serverUrl : 'http://185.192.96.18:31265/',
    options : {
        'sonar.projectDescription': 'npwt-client-web Sonar Analysis ',
        'sonar.projectName':'npwt-client-web',
        'sonar.projectKey':'npwt-client-web',
        'sonar.login':'sqp_14dcc443b956f6d7f513eb5b6dac5480d66eaf3c',
        'sonar.projectVersion':'1.0',
        'sonar.language':'js',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources':'.',
         }
},()=>{})