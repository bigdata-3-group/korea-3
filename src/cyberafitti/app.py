from flask import Flask, render_template, request
from run_model import run_model

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/youtube', methods=['GET', 'POST'])
def youtube():
    return render_template('youtube.html')

@app.route('/afreeca', methods=['GET', 'POST'])
def afreeca():
    return render_template('afreeca.html')

@app.route('/twitch', methods=['GET', 'POST'])
def twitch():
    return render_template('twitch.html')

@app.route('/model')
def model():
    return render_template('model.html')

@app.route('/download')
def download():
    return render_template('download.html')

@app.route('/demo', methods=['GET', 'POST'])
def demo():
    if request.method == "POST":
        query = request.form.get('query')
        return render_template('demo.html', predict=run_model(query))
    else:
        return render_template('demo.html')

if __name__ == '__main__':
    app.run()
