import webview
import os
import requests
from scrape import google_TTS, hippoSentences, power_thesaurus_synonyms, vocab_com_definitions, indo_definitions
from screeninfo import get_monitors


class Api:
    def get_google_tts(self, word):
        return google_TTS(word)

    def get_hippo_sentences(self, word):
        return hippoSentences(word)

    def get_power_thesaurus_synonyms(self, word):
        return power_thesaurus_synonyms(word)

    def get_vocab_com_definitions(self, word):
        return vocab_com_definitions(word)

    def get_indo_definitions(self, word):
        return indo_definitions(word)


def get_entrypoint():
    def exists(path):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    # dev
    try:
        url = 'http://localhost:3000'
        get = requests.get(url)
        if get.status_code == 200:
            return url
    except requests.exceptions.RequestException:
        print("Front end server is not running, trying front end build folder")

        # On packaged app
        if exists('../Resources/gui/index.html'):  # frozen py2app
            return '../Resources/gui/index.html'

        # Using vite build
        if exists('./gui/index.html'):  # pyinstaller
            return './gui/index.html'

        if exists('../gui/index.html'):  # dev mode
            return '../gui/index.html'

        raise Exception('No entry point for front end found')


entry_point = get_entrypoint()


if __name__ == '__main__':
    api = Api()

    monitor_dimensions = get_monitors()[0].__dict__
    width = monitor_dimensions["width"] or 800
    height = monitor_dimensions["height"] or 600

    window = webview.create_window(
        'Pywebview React Vite', entry_point, js_api=api, width=width, height=height)

    # http server serve local file since edgeHTML doesn't allow local file
    webview.start(debug=True, http_server=True)
