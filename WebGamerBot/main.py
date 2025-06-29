from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)
app.secret_key = 'webgamer_secret_key'


# Dil kontrol fonksiyonu
def get_lang():
    lang = request.args.get('lang', 'tr')
    if lang not in ['tr', 'en']:
        lang = 'tr'
    return lang

@app.route('/')
def index():
    lang = get_lang()
    return render_template('index.html', user=session.get('user'), lang=lang)

@app.route('/game')
def game():
    lang = get_lang()
    if 'user' not in session:
        flash("Lütfen oyunu indirmeden önce giriş yapın veya kayıt olun." if lang == 'tr' else "Please log in or sign up before downloading the game.")
    return render_template('game.html', user=session.get('user'), lang=lang)

@app.route('/oyun1')
def oyun1():
    lang = get_lang()
    return render_template('oyun1.html', user=session.get('user'), lang=lang)

@app.route('/oyun2')
def oyun2():
    lang = get_lang()
    return render_template('oyun2.html', user=session.get('user'), lang=lang)

@app.route('/oyun3')
def oyun3():
    lang = get_lang()
    return render_template('oyun3.html', user=session.get('user'), lang=lang)

@app.route('/oyun4')
def oyun4():
    lang = get_lang()
    return render_template('oyun4.html', user=session.get('user'), lang=lang)

@app.route('/oyun5')
def oyun5():
    lang = get_lang()
    return render_template('oyun5.html', user=session.get('user'), lang=lang)

@app.route('/faq')
def faq():
    lang = get_lang()
    return render_template('faq.html', user=session.get('user'), lang=lang)

@app.route('/hakkimizda')
def hakkimizda():
    lang = get_lang()
    return render_template('hakkimizda.html', user=session.get('user'), lang=lang)

@app.route('/kayit', methods=['GET', 'POST'])
def kayit():
    lang = get_lang()
    if 'user' in session:
        return redirect(url_for('index', lang=lang))
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        session['user'] = username
        return redirect(url_for('index', lang=lang))
    return render_template('form.html', form_type='kayit', user=session.get('user'), lang=lang)

@app.route('/giris', methods=['GET', 'POST'])
def giris():
    lang = get_lang()
    if 'user' in session:
        return redirect(url_for('index', lang=lang))
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if email and password:
            session['user'] = email.split('@')[0]
            return redirect(url_for('index', lang=lang))
        else:
            flash("E-posta veya şifre hatalı." if lang == 'tr' else "Incorrect email or password.")
    return render_template('form.html', form_type='giris', user=session.get('user'), lang=lang)

@app.route('/cikis')
def cikis():
    lang = get_lang()
    session.pop('user', None)
    return redirect(url_for('index', lang=lang))

@app.route('/oturumsuz-devam')
def oturumsuz_devam():
    lang = get_lang()
    session['user'] = 'Ziyaretçi' if lang == 'tr' else 'Guest'
    return redirect(url_for('index', lang=lang))

if __name__ == '__main__':
    app.run(debug=True)
