const SonarqubeScanner = require ('sonarqube-scanner');

SonarqubeScanner({
    serverUrl : 'http://185.192.96.18:31265/',
    options : {
        'sonar.projectDescription': 'npwt-rest-api-backend Sonar Analysis ',
        'sonar.projectName':'npwt-rest-api-backend',
        'sonar.projectKey':'npwt-rest-api-backend',
        'sonar.login':'sqp_d7196fb853904d3ba6709db8447e962cf03e0e9c',
        'sonar.projectVersion':'1.0',
        'sonar.language':'js',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources':'.',
         }
},()=>{})