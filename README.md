# Code Transfer Application

Flask application to transfer code between local networks and recieve real-time updates.

## Installation

Clone repository with  git:
```bash
git clone https://github.com/Xeroknight24/codeApp
cd codeApp
```
Create a python virtual enviroment and install packages with pip and npm.

```bash
python3 -m virtualenv .env
source .env/bin/activate # .env/Scripts/activate.bat For Windows.
pip install -r requirements.txt
cd static/js
npm install
```

## Running and using the application

Return to root directory of project and run flask server.
```bash
python3 main.py
```
Now you can open application in your browser:
[localhost:5000](http://localhost:5000)
Also you can use your local ip instead of localhost.

