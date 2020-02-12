pipeline {
    agent none
    stages {
        stage('Linting') {
            agent {
                docker {
                    image 'node:12.15.0-stretch'
                    args '-u root'
                }
            }
            steps {
                sh 'ls -la'
                sh 'node --version'
                sh 'npm i'
                sh 'npm run lint'
            }
        }
        stage('Testing') {
            node {
                checkout scm
                docker.image('mongo:4.0').withRun('') { c ->
                    docker.image('node:12.15.0-stretch').inside("--link ${c.id}:database -e 'MONGODB_URI=mongodb://database:27017/todos'") {
                        sh 'ls -la'
                        sh 'npm i'
                        sh 'npm test'
                    }
                }
            }
        }
    }
}