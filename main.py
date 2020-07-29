from flask import Flask, render_template, url_for, request, redirect, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
import arrow


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///code.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)

def dtObject():
    return arrow.utcnow().to('Asia/Tehran').datetime

class codePrint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codeNumber = db.Column(db.String(200), nullable=False)
    dateCreated = db.Column(db.DateTime)
    createdBy = db.Column(db.String(64))

    def __repr__(self):
        return '<Code %r>' % self

class codePrintSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = codePrint

codeSchema = codePrintSchema()
codesSchema = codePrintSchema(many = True)


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/user1')
def pageUser1():
    return render_template('user.html', userName="کاربر 1", user='user1')

@app.route('/user2')
def pageUser2():
    return render_template('user.html', userName="کاربر 2", user='user2')

@app.route('/user3')
def pageUser3():
    return render_template('user.html', userName="کاربر 3", user='user3')

@app.route('/user4')
def pageUser4():
    return render_template('user.html', userName="کاربر 4", user='user4')

@app.route('/getCode')
def getCode():
    return render_template('getCode.html')

@app.route('/add', methods=['POST'])
def add():
    if request.method == 'POST':
        code = request.form['code']
        newCode = codePrint(codeNumber=code,createdBy=request.form['user'],dateCreated=dtObject())
        db.session.add(newCode)
        db.session.commit()
        return render_template('codeSent.html',user=request.form['user'])

@app.route('/delCode/<int:id>', methods=['GET'])
def delete(id):
    if request.method == "GET":
        deleteTask = codePrint.query.get_or_404(id)
        db.session.delete(deleteTask)
        db.session.commit()
        return redirect('/getCode')

@app.route('/readCode')
def read():
    allCodes = codePrint.query.order_by(codePrint.dateCreated).all()
    return make_response(codesSchema.jsonify(allCodes),200)

if __name__ == "__main__":
    db.create_all()
    app.run(host='0.0.0.0')
