from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/youtube')
def hello_world2():
    return render_template('youtube.html')

@app.route('/afreeca')
def hello_world3():
    return render_template('afreeca.html')

@app.route('/twitch')
def hello_world4():
    return render_template('twitch.html')


if __name__ == '__main__':
    app.run()
