from flask import Flask, render_template, request

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


if __name__ == '__main__':
    app.run()
