pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'sudo npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'sudo npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-todo-app:1.0 .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -p 3000:3000 my-todo-app:1.0'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Tests passed, build completed, and Docker container is running.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
