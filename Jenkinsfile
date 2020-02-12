pipeline {
    agent none
    stages {
        stage('Linting') {
            agent {
                docker { image 'node:12.15.0-stretch' }
            }
            steps {
                npm i
                npm run lint
            }
        }
        stage('Testing') {
            agent {
                docker { image 'node:12.15.0-stretch' }
            }
            steps {
                npm i
                npm test
            }
        }
    }
}