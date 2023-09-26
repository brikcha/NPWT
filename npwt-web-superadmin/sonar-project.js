const SonarqubeScanner = require ('sonarqube-scanner');

SonarqubeScanner({
    serverUrl : 'http://185.192.96.18:31265/',
    options : {
        'sonar.projectDescription': 'npwt-super-admin Sonar Analysis ',
        'sonar.projectName':'npwt-web-superadmin',
        'sonar.projectKey':'npwt-web-superadmin',
        'sonar.login':'sqp_9358a2575639deba58c2c4cf254fc7d3af4886d7',
        'sonar.projectVersion':'1.0',
        'sonar.language':'js',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources':'.',
         }
},()=>{})